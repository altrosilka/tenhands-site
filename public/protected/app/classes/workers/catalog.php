<?php
Class catalogWorker extends Dbworker{



	private function parseHash($hash){
		$a = array("a"=>"0","b"=>"1","c"=>"2","d"=>"3","e"=>"4","f"=>"5","g"=>"6","h"=>"7","k"=>"8","m"=>"9","l"=>";","x"=>",");
		$arr  = str_split($hash);
		$ret = '';
		foreach ($arr as $k => $v) {
			$ret .= $a[$v];
		}

		$jsonArr = explode(';',$ret);

		$json = new stdClass();
		$json->colors=array();
		$json->types=array();
		$json->shops=array();

		foreach ($jsonArr as $k => $v) {
			if ($v!=''){
				$farr = explode(',',$v);
				foreach ($farr as $key => $value) {
					if ($k == 0){
						array_push($json->colors, $value);
					} elseif ($k == 1){
						array_push($json->types, $value);
					} elseif ($k == 2){
						array_push($json->shops, $value);
					}
				}
			}
		}

		return $json;
	}


    private function structSelect($json){
		$query = '';
		$leftJoin = '';
		$colorsArray = '';
	

		if ($json->category !== null){
			$query = " L.category_id = '".$json->category."' ";	
		}
		

		if (count($json->types)>0){
			$qs = '';
			$types = array('','flag_isCasual','flag_isOffice','flag_isNight');
			foreach ($json->types as $type) {
				if ($qs != '')
					$qs .= ' OR ';
				$qs .= " L.".$types[$type]." = '1' ";
			}
			if ($query != '')
				$query .= ' AND ';
			$query .= '('.$qs.')';
		}
		if (count($json->shops)>0){
			$qs = '';
			foreach ($json->shops as $shop_id) {
				if ($qs != '')
					$qs .= ' OR ';
				$qs .= " L.shop_id = '".$shop_id."' ";
			}
			if ($query != '')
				$query .= ' AND ';
			$query .= '('.$qs.')';
		}

		if (count($json->colors)>0){
			$qs = '';
			$leftJoin = 'LEFT JOIN link_lots_with_colors AS C on C.lot_id = L.id';
			foreach ($json->colors as $color_id) {
				if ($qs != '')
					$qs .= ' OR ';
				$qs .= " C.color_id = '".$color_id."' ";		

				if ($colorsArray != '')
					$colorsArray .= ' OR ';
				$colorsArray .= " color = '".$color_id."' ";
			}
			if ($query != '')
				$query .= ' AND ';
			$query .= '('.$qs.')';
		}

		return array('query'=>$query, 'leftJoin'=>$leftJoin, 'colorsArray'=>$colorsArray);
    }





	private function getImagesForLot($lot_id){
		$images = '';
		$result = mysql_query("SELECT * FROM images WHERE lot_id = '".$lot_id."' ORDER BY photoorder ASC, name ASC",$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){
			if ($images != '')
				$images .= ',';
			$images .= '{
				"id":"'.$row['id'].'",
				"server":"'.$row['server'].'",
				"src":"'.$row['folder'].'/'.$lot_id.'/'.$row['name'].'.jpg"
			}';
		}
		return $images;
	}

	private function getImageForLotInSearch($lot_id, $colorsArray){

		$images = '{}';
		$query = 'SELECT * FROM images WHERE lot_id = "'.$lot_id.'" '.$colorsArray.' ORDER BY photoorder ASC, name ASC  LIMIT 1';
		$result = mysql_query($query,$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){
			$images = '{
				"id":"'.$row['id'].'",
				"server":"'.$row['server'].'",
				"src":"'.$row['folder'].'/'.$lot_id.'/'.$row['name'].'.jpg"
			}';
			return $images;
		}
		

		$result = mysql_query('SELECT * FROM images WHERE lot_id = "'.$lot_id.'" ORDER BY photoorder ASC, name ASC LIMIT 1',$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){
			$images = '{
				"id":"'.$row['id'].'",
				"server":"'.$row['server'].'",
				"src":"'.$row['folder'].'/'.$lot_id.'/'.$row['name'].'.jpg"
			}';
		}
		
		return $images;
	}



	private function mysqlAttachPhotosToCollection($query,$str_color = ''){
		$resp = '';

		$result = mysql_query($query,$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){
			$colorsArray = '';
			if ($str_color != ''){
				$colorsArray = ' AND ('.$str_color.')';
			}
			$lot_id = $row['id'];
			$image = $this->getImageForLotInSearch($lot_id, $colorsArray);

			if ($resp != '')
				$resp .= ',';
			$resp .= '{
				"id":"'.$row['id'].'",
				"shop_id":"'.$row['shop_id'].'",
				"star":"'.(($row['flag_favoirite'])?1:'').'",
				"str_colors":"'.$row['str_colors'].'",
				"category_id":"'.$row['category_id'].'",
				"image":'.$image.',
				"name":"'.htmlspecialchars($row['name'],ENT_QUOTES).'",
				"price":"'.floor($row['price']).'",
				"art":"'.$row['articule'].'",
				"googl_url":"'.$row['googl_url'].'"
			}';
		} 
		return $resp;
    }

	private function getCount($query){
		$count = 0;
		$result = mysql_query($query,$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){		
			$count = $row['C'];
		}
		return $count;
	}

	public function getLots($hash,$order, $page, $limit, $category = null){
		$page = $page-1;
		switch ($order) {
    		case 'price':
    			$orderStr = ' ORDER BY price ASC';
    			break;
    		
    		default:
    			$orderStr = ' ORDER BY id DESC';
    			break;
    	}

		$json = $this->parseHash($hash);

		$json->category = $category;

		$select = $this->structSelect($json);



		$query = $select["query"];
		$leftJoin = $select["leftJoin"];
		$colorsArray = $select["colorsArray"];

		$count = $this->getCount("SELECT COUNT(*) AS C FROM lots AS L ".$leftJoin." WHERE ".$query."  AND flag_expired = '0' AND flag_banned = '0'  ");
		$query = "SELECT L.* FROM lots AS L ".$leftJoin." WHERE ".$query."  AND flag_expired = '0' AND flag_banned = '0' GROUP BY L.id ".$orderStr." LIMIT ".($limit*$page).",".$limit;
		$resp = $this->mysqlAttachPhotosToCollection($query,$colorsArray);

		$resp = '{"count":"'.$count.'", "limit":'.$limit.',"lotsArray":['.$resp.']}';
		
		return $resp;
	}


	public function getUserLots($user_id, $page = 1, $limit = 2){
		$page = $page-1;

		//$count = $this->getCount("SELECT COUNT(*) AS C FROM lots AS L WHERE C.user_id = '".$user_id."' AND flag_expired != '1' ");
		$query = "SELECT L.* FROM `link_lots_with_users` AS B LEFT JOIN lots AS L ON B.lot_id = L.id  AND flag_expired != '1' GROUP BY L.id LIMIT ".($limit*$page).",".$limit;

		$resp = $this->mysqlAttachPhotosToCollection($query);

		$resp = '{"limit":'.$limit.',"lotsArray":['.$resp.']}';
		
		return $resp;
	}



	public function getRandomLots($lot_id,$shop_id, $category_id){
		

		$query = "SELECT * FROM lots WHERE id != '".$lot_id."' AND (shop_id = '".$shop_id."' OR category_id = '".$category_id."') AND flag_expired = 0 ORDER BY RAND() LIMIT 6";
			

		$resp = $this->mysqlAttachPhotosToCollection($query);

		return $resp;
	}



	public function getNewLots(){
		$query = 'SELECT * FROM lots ORDER BY id DESC LIMIT 10';
	
		$resp = $this->mysqlAttachPhotosToCollection($query,'');


		$resp = '['.$resp.']';
	

		$ret = $resp;


		return '{"lotsArray":'.$ret.'}';
	}


	public function issetLot($lot_id){
		$result = mysql_query("SELECT id FROM lots WHERE id = '".$lot_id."';",$this->link);
		while($row = mysql_fetch_assoc($result)){
			return true;
		}
		return false;
	}


	public function getLotById($id){

    	$json = '{}';
		$result = mysql_query("SELECT * FROM lots WHERE id = '".$id."';",$this->link) or die("Error " . mysql_error($this->link));
		while($row = mysql_fetch_array($result)){
			$lot_id = $row['id'];

			$images = $this->getImagesForLot($lot_id);
			
			$json = '{
				"id":"'.$row['id'].'",
				"time_find":"'.$row['unix_find'].'",
				"time_check":"'.$row['unix_check'].'",
				"id":"'.$row['id'].'","expired":"'.(($row['flag_expired']==1)?1:'').'",
				"shop_id":"'.$row['shop_id'].'",
				"str_colors":"'.$row['str_colors'].'",
				"category_id":"'.$row['category_id'].'",
				"images":['.$images.'],
				"name":"'.htmlspecialchars($row['name'],ENT_QUOTES).'",
				"price":"'.floor($row['price']).'",
				"googl_url":"'.$row['googl_url'].'"
			}';
		} 

		$ret = ''.$json.'';

		return $ret;
	}

}
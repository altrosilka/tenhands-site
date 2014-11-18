<?php
class Defines
{
	private $categories = null;
	private $shops = null;
	private $colors = null;

	public function __construct() {
        global $link;
        $this->link =& $link;
        $this->init();
    }

    public function loadCategories(){
        if ($this->categories !== null){
            return;
        }

    	$link = $this->link;
    	$categories = array();
    	$result = mysql_query("SELECT * FROM categories ",$link) or die("Error " . mysql_error($link));
		while($row = mysql_fetch_assoc($result)){
			array_push($categories, $row);
		}

    	$this->categories = $categories;
    }




    public function getColors(){
        $this->loadColors();
        return $this->colors;
    }
    public function getShops(){
        $this->loadShops();
        return $this->shops;
    }    
    public function getCategories(){
        $this->loadCategories();
        return $this->categories;
    }

    public function loadColors(){
        if ($this->colors !== null){
            return;
        }

        $link = $this->link;
        $colors = array();
        $result = mysql_query("SELECT * FROM colors WHERE active = 1;",$link) or die("Error " . mysql_error($link));
        while($row = mysql_fetch_assoc($result)){
            array_push($colors, $row);
        }

        $this->colors = $colors;
    }

    public function loadShops(){
        if ($this->shops !== null){
            return;
        }

        $link = $this->link;
        $shops = array();
        $result = mysql_query("SELECT * FROM shops WHERE active = 1;",$link) or die("Error " . mysql_error($link));
        while($row = mysql_fetch_assoc($result)){
            array_push($shops, $row);
        }

        $this->shops = $shops;
    }

    public function getShopById($id){
         $this->loadShops();
        foreach ($this->shops as $i => $shop) {
            if ($id === $shop['id'])
                return $shop;
        }
        return null;
    }


    public function getShopByController($controller){
        $this->loadShops();
        foreach ($this->shops as $i => $shop) {
            if ($controller === $shop['controller'])
                return $shop;
        }
        return null;
    }

    public function getCategoryById($id){
        $this->loadCategories();
        foreach ($this->categories as $i => $category) {
            if ($id === $category['id'])
                return $category;
        }
        return null;
    }
    public function getCategoryByName($name){
        $this->loadCategories();
        foreach ($this->categories as $i => $category) {
            if ($name === $category['english_name'])
                return $category;
        }
        return null;
    }



    public function getHashByShopId($id){
        $str = 'abcdefghkm';
        $strs = str_split($str);
        $ids = str_split($id);
        $ret = '';
        foreach ($ids as $key => $value) {
            $ret .= $strs[$value];
        }
        return 'll'.$ret;
    }


    public function init(){
        
        
    }
}
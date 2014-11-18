<?php
if (!empty($_FILES)) {
	require_once($_SERVER["DOCUMENT_ROOT"].'/default/config.php');
	require_once($_SERVER["DOCUMENT_ROOT"].'/upload/SimpleImage.php');
	$login = 0;
	$q = "SELECT * FROM `users` WHERE hash = '".$_COOKIE['user-hash']."';";
	$res = mysql_query($q, $link)  or die(mysql_error());
	while ($row = mysql_fetch_array($res)){
		$login = 1;
		$userId = $row['n'];
	}
	if ($login == 0)
		exit;
	
function toBase($num, $b=62) {
  $base='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $r = $num  % $b ;
  $res = $base[$r];
  $q = floor($num/$b);
  while ($q) {
    $r = $q % $b;
    $q =floor($q/$b);
    $res = $base[$r].$res;
  }
  return $res;
}
	
	function random_password($length = 12, $allow_uppercase = true, $allow_numbers = true){
		$out = '';
		$arr = array();
		for($i=97; $i<123; $i++) $arr[] = chr($i);
		if ($allow_uppercase) for($i=65; $i<91; $i++) $arr[] = chr($i);
		if ($allow_numbers) for($i=0; $i<10; $i++) $arr[] = $i;
		shuffle($arr);
		for($i=0; $i<$length; $i++)
		{
			$out .= $arr[mt_rand(0, sizeof($arr)-1)];
		}
		return $out;
	}


	if ($_POST['photo']=='1'){
		$result = mysql_query("SHOW TABLE STATUS LIKE 'photos'");
		$row = mysql_fetch_array($result);
		$nl = $row['Auto_increment'];
		$bnl = toBase($nl);
		$ext  = strtolower(strrchr(basename($_FILES['Filedata']['name']), "."));

		$pass = '';

		$targetPath = $_SERVER['DOCUMENT_ROOT'] . '/f/' .$bnl.$pass.$ext;
		$tempFile = $_FILES['Filedata']['tmp_name'];
		$targetFile =  str_replace('//','/',$targetPath);

		move_uploaded_file($tempFile,$targetFile);
		
		list($width, $height) = getimagesize($targetPath); 
		$small = 0;
		$image = new SimpleImage();
		$image->load($targetPath);
		if ($_POST['size']!=''){
			$small = 1;
			if ($width <= $_POST['size'] && ($_POST['normalmode']=="width" || $_POST['normalmode']=="height")){
				$image->save($_SERVER['DOCUMENT_ROOT'].'/f/s/'.$bnl.$pass.$ext);
			} else {
				$image->load($_SERVER['DOCUMENT_ROOT'].'/f/'.$bnl.$pass.$ext);
				if ($_POST['mode']=="square"){
					$image->square_crop($_POST['size'])->save($_SERVER['DOCUMENT_ROOT'].'/f/s/'.$bnl.$pass.$ext);
				}
				if ($_POST['mode']=="width"){
					$image->fit_to_width($_POST['size'])->save($_SERVER['DOCUMENT_ROOT'].'/f/s/'.$bnl.$pass.$ext);
				}
				if ($_POST['mode']=="height"){
					$image->fit_to_height($_POST['size'])->save($_SERVER['DOCUMENT_ROOT'].'/f/s/'.$bnl.$pass.$ext);
				}
			}
		}
		
		$image->load($targetPath);
		if ($width <= 300)
			$image->save($_SERVER['DOCUMENT_ROOT'].'/f/p/'.$bnl.$pass.$ext);
		else
			$image->fit_to_width(300)->save($_SERVER['DOCUMENT_ROOT'].'/f/p/'.$bnl.$pass.$ext);
	
		$query = "INSERT INTO `photos` (`small`,`ext`,`key`,`user`,`album`) VALUES ('".$_POST['size']."', '".$ext."', '".$bnl.$pass."', '".$userId."', '".$_POST['album']."');";
		mysql_query($query, $link);

		echo '{"r":{"url":"'.$bnl.$pass.$ext.'","small":"'.$_POST['size'].'"}}';
	} else {
		$result = mysql_query("SHOW TABLE STATUS LIKE 'dropbox'");
		$row = mysql_fetch_array($result);
		$nl = $row['Auto_increment'];
		$bnl = toBase($nl);
		$code = $bnl;
		$ext  = strtolower(strrchr(basename($_FILES['Filedata']['name']), "."));
		$pass = random_password(5,true,true);
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . '/p/f/' .$code.'-'.$pass.$ext;
		$tempFile = $_FILES['Filedata']['tmp_name'];
		$targetFile =  str_replace('//','/',$targetPath);
		
		

		move_uploaded_file($tempFile,$targetFile);

		$query = "INSERT INTO `dropbox` (`code`,`ext`,`pass`,`name`,`user`,`folder`) VALUES ('".$code."', '".$ext."', '".$pass."', '".htmlspecialchars($_FILES['Filedata']['name'], ENT_QUOTES)."', '".$userId."', '".$_POST['folder']."');";
		mysql_query($query, $link);

		echo '{"r":{"n":"'.$nl.'","pass":"'.$pass.'","code":"'.$code.'","ext":"'.$ext.'","name":"'.htmlspecialchars($_FILES['Filedata']['name'], ENT_QUOTES).'"}}';
	}

}
sleep(0);
?>

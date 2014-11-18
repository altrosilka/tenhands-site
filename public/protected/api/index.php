<?php

header('Access-Control-Allow-Origin: *');

require_once '../app/classes/apiClass.php';
require_once '../config.php';
require_once '../app/default/modules/dataBase/mysql_connect.php';


function error($type){
	switch ($type) {
		case 'miss':
			//echo '{"error":"missing one ore more parameters"}';
			trugger(404);
			break;
		
		case 'notLog':
			echo '{"error":"login is failed"}';

			break;
		
		default:
			echo '{"error":"'.$type.'"}';
			break;
	}
	exit;
}

function pullGet(){
	$url = $_SERVER['REQUEST_URI'];
	$pos = strpos($url,'?');
	$GET = array();
	if ($pos){
		$furl = substr($url,$pos+1);
		$url = substr($url,0,$pos);
		$q = explode("&",$furl);
		foreach($q as $el){
			$b = explode('=',$el);
			if (count($b)==2){
				$GET[$b[0]] = $b[1];
			}
		}
	}
	return $GET;
}
$G = pullGet();
$P = $_POST;


$API = new APIClass();

if (isset($_GET['page'])&&$_GET['page']!=''){
	$resp = $API->get($_GET['page'],$G);

	if (is_object($resp)){
		$resp = json_encode($resp);		
	}
	echo $resp;
}
else
	echo '{"error":"1"}';


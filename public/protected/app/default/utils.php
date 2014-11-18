<?php
function getJsonPromFile($file){
	if (file_exists($file)){
		return json_decode(file_get_contents($file));
	} else {
		return null;
	}
}

function plural_form($n, $forms) {
  return $n%10==1&&$n%100!=11?$forms[0]:($n%10>=2&&$n%10<=4&&($n%100<10||$n%100>=20)?$forms[1]:$forms[2]);
}

function requireClass($name){
	$classFile = $_SERVER['DOCUMENT_ROOT'].'/app/classes/'.$name.'.php';
	if (file_exists($classFile)){
		require_once $classFile;
	}
}

function trigger($i){
	$System = new LM_Controller();
	switch ($i){
		case '404':{
			header("HTTP/1.0 404 Not Found");
			$System->getView('pages/404');
			break;
		}
	}
	exit;
}

function convertUnixToRuDate($unix){
	$months = array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'); 
	return date('j', $unix).' '.$months[date('n', $unix)*1].' '.date('Y', $unix);
}
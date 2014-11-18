<?php

$URL_PARTrl = $_SERVER['REQUEST_URI'];
$root = $_SERVER["DOCUMENT_ROOT"].'';
$host = '';


define('folder_views',protected_folder.'/app/views');
define('folder_controllers',protected_folder.'/app/controllers');

Class LM_Controller {
	private $theme = 'default';

	public $defines = null;
	public $data = null;
	public $api = null;
	public $url = '';
	public $currentController = '';

	public function __construct() {
        $this->defines = new Defines();
        $this->api = new APIClass();
        $this->data = new Data($this->api, $this->defines);
    }

	public function echoMeta($meta){
		global $hb;

		if (!isset($meta['src']) || $meta['src'] == ''){
			$meta['src'] = 'http://overwatch.ws/images/social/vk_image.jpg';
		} else {
			$meta['src'] = ((strpos($meta['src'], 'http:') !== false) ? $meta['src'] : 'http://'.$_SERVER["HTTP_HOST"].''.$meta['src']);
		}

		if (!isset($meta['url']) || $meta['url'] == ''){
			$meta['url'] = 'http://'.$_SERVER["HTTP_HOST"].''.$_SERVER["REQUEST_URI"];
		} else {
			$meta['url'] = ((strpos($meta['url'], 'http:') !== false) ? $meta['url'] : 'http://'.$_SERVER["HTTP_HOST"].''.$meta['url']);
		}

		foreach ($meta as $key => $value) {
			$meta[$key] = strip_tags($value);
		}


		echo $hb->render(
		   'metahead',
		    $meta
		);
	}


	public function getView($name = '',$data = array()){

		global $hb;	

		if (is_array($name)){
			$data = $name;
			$name = '';
		}

		foreach ($data as $key => $value) {
			$$key = $value; 
		}

		if ($name === ''){
			$callers=debug_backtrace();
			$name = $callers[1]['class'].'/'.$callers[1]['function'];
		}
		$file = folder_views.'/'.$this->theme.'/'.$name.'.php';

		if (file_exists($file)){
			require_once($file);
		}
	}
}



$pos = strpos($URL_PARTrl,'?');
$g = $_GET;

$_GET = array();
if ($pos){
	$furl = substr($URL_PARTrl,$pos+1);
	$URL_PARTrl = substr($URL_PARTrl,0,$pos);
	$q = explode("&",$furl);
	foreach($q as $el){
		$b = explode('=',$el);
		if (count($b)==2){
			$_GET[$b[0]] = $b[1];
		}
	}
}



$URL_PART = explode("/",substr($URL_PARTrl,1));
if ($URL_PART[count($URL_PART)-1]==''){
	unset($URL_PART[count($URL_PART)-1]);
}


$controller = (!isset($URL_PART[0])) ? 'main' : $URL_PART[0];
$file = folder_controllers.'/'.$controller.'.php';

if (file_exists($file)){
	require_once($file);

	if (class_exists($controller)){
		$System = new $controller;
		$System->currentController = $controller;
		if (method_exists($System, 'intro')){
			$System->url = $URL_PART;
			call_user_func_array(array($System,'intro'), array());
		}
	}
} else {
	trigger(404);
}

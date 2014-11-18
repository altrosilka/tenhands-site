<?php
$G = null;
Class APIClass {
	private $link;

	public function __construct() {
        global $link;
        $this->link =& $link;
    }
    
    public function __destruct () {
        unset($this);
    }

    public function get($url,$array = array(),$object = false){
    	global $G, $link;

    	$v = explode('/',$url);
		if (count($v)===2){

	    	$file = protected_folder.'/api/'.$v[0].'/runpoint.php';

	    	$G = $array;
	    	require_once $file;

	    	$class = $v[0].'_api';
	    	$method = $v[1];

			$api = new $class($method,$G);
			$f_name = array($api, $method);

	
			if (is_callable($f_name)){
				$res = $api->$method();
				if ($object && is_string($res))
					return json_decode($res);
				else
					return $res;
			} else {
				return '{"error":"2"}';
			}
		}
    }
}

function error($type){
	switch ($type) {
		case 'miss':
			//echo '{"error":"missing one ore more parameters"}';
			trigger(404);
			exit;
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
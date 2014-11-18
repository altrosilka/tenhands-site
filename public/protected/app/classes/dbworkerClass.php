<?php
class Dbworker
{

	public function __construct() {
		global $link;
		$this->link =& $link;
	}

}

function requireWorker($name){
	require_once 'workers/'.$name.'.php';
	$workerName = $name.'Worker';
	$worker = new $workerName();
	return $worker;
}
<?php
Class maps_api {
	private $link;
	private $GET;
	public function __construct($method,$GET){
		global $link;
		$this->link =& $link;
		$this->GET = $GET;
	}

	public function getAllMaps(){
		$file = cache_folder.'/maps/all.json';
		if (file_exists($file)){
			return file_get_contents($file);
		} else {
			error('miss');
		}
	}
	public function getMapByShort(){
		$G = $this->GET;

		if (isset($G['short'])){
			$short = $G['short'];
			$maps = json_decode($this->getAllMaps());

			$map = __::find($maps, function($map) use ($short)  { return $short === $map->short; });

			if ($map !== false){
				return $map;
			} else {
				error('miss');
			}
		} else {
			error('miss');
		}
	}
}

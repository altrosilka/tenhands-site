<?php
Class heroes extends LM_Controller{
	private function sortHeroes($array){
		$arr = array(
			"offense"=>array(),
			"defense"=>array(),
			"tank"=>array(),
			"support"=>array()
		);

		foreach ($array as $hero) {
			array_push($arr[$hero->role], $hero);
		}

		return $arr;
	}

	public function intro(){
		$url_part = $this->url;

		if (isset($url_part[1])){
			$this->page($url_part[1]);
		} else {
			$this->index();
		}
	}
	
	public function index(){
		$meta = array();
		$meta['title'] = 'Герои - Overwatch';
		$meta['description'] = 'Все герои игры Overwatch, их характеристики и способности, таблица героев Overwatch';

		$data = array();
		$data['meta'] = $meta;
		$data['heroes'] = $this->sortHeroes($this->api->get('heroes/getAllHeroes',array(),true));

		$this->getView('heroes/index', $data);
	}

	public function page($name){
		$meta = array();

		$info = $this->api->get('heroes/getHeroInfo',array("url"=>$name),true);
		$features = $this->api->get('heroes/getHeroFeatures',array("url"=>$name),true);
		$info->url = $name;

		$meta['title'] = $info->name.' - Герои - Overwatch';
		$meta['description'] = 'Информация о герое '.$info->name.' из игры Overwatch: тактика, способности, видео, гайд';

		$data = array();
		$data['meta'] = $meta;
		$data['info'] = $info;
		$data['features'] = $features;

		$this->getView('heroes/page', $data);
	}
}
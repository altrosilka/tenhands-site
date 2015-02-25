<?php
Class pages extends LM_Controller{
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
		$meta['title'] = 'ЛК';
		$meta['description'] = 'фв';

		$data = array();
		$data['meta'] = $meta;
		$this->getView('pages/cabinet', $data);
	}

	public function page($name){
		$meta = array();

		if ($name === 'verifyEmail'){
			$meta['title'] = 'Десять Рук - подтверждение E-Mail адреса';
			$this->getView('pages/verifyEmail');
		}

		
	}
}
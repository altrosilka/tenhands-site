<?php
Class index extends LM_Controller{

	public function intro(){
		$this->index();
	}
	
	public function index(){
		$meta = array();
		$meta['title'] = 'title';
		$meta['description'] = 'description';
		$data = array();
		$data['meta'] = $meta;
		$this->getView('pages/index', $data);
	}
}
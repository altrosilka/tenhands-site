<?php
Class cabinet extends LM_Controller{
	public function intro(){
		$this->index();
	}
	
	public function index(){
		$meta = array();
		$meta['title'] = 'ЛК';
		$meta['description'] = 'фв';

		$data = array();
		$data['meta'] = $meta;
		$this->getView('pages/cabinet', $data);
	}
}
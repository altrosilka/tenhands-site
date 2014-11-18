<?php
Class intro extends LM_Controller{

	public function intro(){
		$url_part = $this->url;

		if (isset($url_part[1])){
			$this->redirect($url_part[1]);
		}
	}
	
	public function redirect($type){
		if ($type === 'vk'){
			header("Location: https://oauth.vk.com/authorize?client_id=4637584&redirect_uri=http://smm.dev:5338/getVkUserCodeAfterIntro&response_type=code&v=5.9&scope=groups,photos,video,audio,wall,offline,email,docs");
			die();
		} else {
			trigger(404);
		}
	}
}
<?php
$this->getView('utils/head');
$this->echoMeta($meta);
$this->getView('utils/header');


echo $hb->render(
   'heroes/page',
    array(
    	"info"=>$info,
    	"features"=>$features
    )
);


$this->getView('utils/footer');
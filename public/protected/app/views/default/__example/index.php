<?php
$this->getView('utils/head');
$this->echoMeta($meta);
$this->getView('utils/header');


echo $hb->render(
   'heroes/index',
    array(
    	"heroes"=>$heroes
    )
);


$this->getView('utils/footer');
<?php
class UserHelper
{
	public function __construct($worker) {
        $this->dbworker = $worker;
    }

    public function isLoggined(){
    	if (isset($_COOKIE['_uid']) && isset($_COOKIE['_hash'])){
            $user_id = $_COOKIE['_uid'];
            $hash = $_COOKIE['_hash'];
            
            $isCorrectHash = $this->dbworker->user->checkCorrectHash($user_id, $hash);
            return $isCorrectHash;
        } else {
            return false;
        }
    }


    public function getId(){
        if (isset($_COOKIE['_uid'])){
            return $_COOKIE['_uid'];
        } else {
            return null;
        }
    }

}
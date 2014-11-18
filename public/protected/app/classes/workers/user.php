<?php
Class userWorker extends Dbworker{
	/**
	 * Проверка на занятость email в таблице users
	 * @param  string $email 
	 * @return boolean        
	 */
	public function emailIsFree($email){
		$email = htmlspecialchars($email, ENT_QUOTES);
		$result = mysql_query("SELECT * FROM users WHERE email = '".$email."' ",$this->link) or die('{"error":"' . mysql_error($this->link).'"}');
		while($row = mysql_fetch_assoc($result)){
			return false;
		}
		return true;
	}

	/**
	 * Создает новую записть в таблице users
	 * @param  string $email    
	 * @param  string $password 
	 * @return boolean        	удалось добавить запись или нет
	 */
	public function insertNewUser($email, $password){
		$email = htmlspecialchars($email, ENT_QUOTES);
		$saltpass = hash('sha256',$password.registration_salt);
		$sessionHash = hash('sha256',$password.registration_salt.$email);
		$result = mysql_query("INSERT INTO users SET email = '".$email."', password = '".$saltpass."', sessionHash = '".$sessionHash."';",$this->link);
		if ($result === true){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Пробует войти за данного пользователя
	 * @param  string $email    
	 * @param  string $password 
	 * @return string/boolean           либо false (данные не верны) либо sessionHash из таблицы
	 */
	public function signIn($email, $password){
		$email = htmlspecialchars($email, ENT_QUOTES);
		$saltpass = hash('sha256',$password.registration_salt);
		$result = mysql_query("SELECT id,sessionHash FROM users WHERE email = '".$email."' AND password = '".$saltpass."' ",$this->link) or die('{"error":"' . mysql_error($this->link).'"}');
		while($row = mysql_fetch_assoc($result)){
			return array(
				"hash"=>$row['sessionHash'],
				"user_id"=>$row['id']
			);
		}
		return false;
	}

	/**
	 * проверяет валидная ли сессия, внутри которой пользователь хочет что-то сделать
	 * @param  int $id          ID юзера
	 * @param  string $sessionHash хэш сессии
	 * @return boolean
	 */
	public function checkCorrectHash($id, $sessionHash){
		$result = mysql_query("SELECT * FROM users WHERE id = '".$id."' AND sessionHash = '".$sessionHash."' ",$this->link) or die('{"error":"' . mysql_error($this->link).'"}');
		while($row = mysql_fetch_assoc($result)){
			return true;
		}
		return false;
	}



	public function userHaveLot($user_id, $lot_id){
		$result = mysql_query("SELECT id FROM link_lots_with_users WHERE user_id = '".$user_id."' AND lot_id = '".$lot_id."';",$this->link);
		while($row = mysql_fetch_assoc($result)){
			return true;
		}
		return false;
	}

	public function addToUserThisLot($user_id, $lot_id){
		$result = mysql_query("INSERT INTO link_lots_with_users SET user_id = '".$user_id."', lot_id = '".$lot_id."', unix = '".time()."';",$this->link);
		if ($result === true){
			return true;
		} else {
			return false;
		}
	}
	public function getUserLots($user_id){
		
		
	}
}
<?php
if (DB_HOST_INF !== ''){
	$link = mysql_connect(DB_HOST_INF,DB_USER_INF,DB_PASS_INF) or die("Error " . mysql_error($link));
	mysql_query("SET NAMES 'utf8';") or die(mysql_error()); 
	mysql_select_db(DB_BD_INF,$link);
}
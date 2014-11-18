<?php
$this->getView('utils/head');
$this->echoMeta(array());
$this->getView('utils/header');
?>

привет!!! это главная страница
<br>
<a href="/intro/vk/">это кнопка входа</a>
<br>
<?php
$this->getView('utils/footer');
exit;
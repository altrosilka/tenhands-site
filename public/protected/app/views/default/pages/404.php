<?php
$this->getView('utils/head');
$this->echoMeta(array());
$this->getView('utils/header');
?>
<div class="fixedBg page404"></div>
<section id="v_404">
  <header class="full">
    <h1>Страница не найдена</h1>
  </header>
  <div class="content stdText clearfix">
    К сожалению, по данному запросу мы не можем ничего показать :(
  </div>
</section>

<?php
$this->getView('utils/footer');
exit;
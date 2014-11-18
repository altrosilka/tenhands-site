<?php
$this->getView('utils/head');
$this->echoMeta(array());
?>

</head>
<body ng-app="Cabinet">
 <header>

 </header>

 <section ui-view class="view">

 </section>
<?php
$this->getView('utils/footer');
exit;
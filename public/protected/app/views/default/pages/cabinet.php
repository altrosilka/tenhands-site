<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <!--<meta http-equiv="content-type" content="text/html; charset=windows-1251" />-->
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="/pack/vendors.css" />
  <link rel="stylesheet" type="text/css" href="/pack/styles.css" />
  <link rel="stylesheet" type="text/css" href="/pack/cabinet.css" />
  <title>Личный кабинет</title>
  <base href="/cabinet/" />
</head> 

<body ng-app="Cabinet" ng-controller="C_cabinet as ctr" class="cabinet">
  <ng-include src="'cabinet/other/downloadExtension.html'"></ng-include>
  <nav class="toppanel">
    <div class="container">
      <menu>
        <a ui-sref="index">Кабинет</a>
        <a ui-sref="accounts">Аккаунты</a>
        <a ui-sref="channels">Наборы и Каналы</a>
      </menu>
    </div>
  </nav>
  <div class="content">
    

    <div class="container" style="height:2000px;">
      <section ui-view class="view">

      </section>
    </div>
  </div>

  <script type="text/javascript" src="/pack/vendor.js"></script>
  <script type="text/javascript" src="/pack/templates.js"></script>
  <script src="/pack/cabinet-templates.js"></script>
  <script type="text/javascript" src="/pack/scripts.js"></script>
</body>

</html>

<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <!--<meta http-equiv="content-type" content="text/html; charset=windows-1251" />-->
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="/pack/cabinet-vendor.css" />
  <link rel="stylesheet" type="text/css" href="/pack/cabinet-styles.css" />
  <title>Личный кабинет</title>
  <base href="/cabinet/" />
</head> 

<body ng-app="Cabinet" ng-controller="C_cabinet as ctr" class="cabinet">
  <ng-include src="'templates/other/downloadExtension.html'"></ng-include>
  <nav class="toppanel">
    <div class="container">
      <menu class="pull-left">
        <a ui-sref="index">Главная</a>
        <a ui-sref="public.sets">Публикация</a>
        <a class="ng-hide" ui-sref="analytic">Аналитика</a>
      </menu>

      <div class="pull-right userInfo">
        <div class="name" ng-bind="ctr.userName"></div>
        <div class="sep" ng-if="ctr.userName"></div>
        <div class="quit" ng-click="ctr.logout()">
          <span>Выйти</span>
          <i class="ion-log-out"></i>
        </div>
      </div>
    </div>
  </nav>
  <div class="content">
    

    <div class="container">
      <section ui-view>

      </section>
    </div>
  </div>

  <script type="text/javascript" src="/pack/cabinet-vendor.js"></script>
  <script type="text/javascript" src="/pack/cabinet-templates.js"></script>
  <script type="text/javascript" src="/pack/cabinet-scripts.js"></script>
</body>

</html>

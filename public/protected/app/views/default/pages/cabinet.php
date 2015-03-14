<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,500&subset=latin,cyrillic" rel="stylesheet" type="text/css">
  <link rel="stylesheet" type="text/css" href="/pack/cabinet-vendor.css" />
  <link rel="stylesheet" type="text/css" href="/pack/cabinet-styles.css" />
  <title>Личный кабинет - 10 Рук</title>
  <base href="/cabinet/" />
</head> 

<body ng-app="Cabinet" ng-controller="C_cabinet as ctr" class="cabinet">
  <ng-include src="'templates/other/downloadExtension.html'"></ng-include>
  <div class="preloader" ng-if="!ctr.disableLoader">
    <i class="ion-load-c fa-spin"></i>
  </div> 
  <nav class="toppanel">
    <div class="container">
      <menu class="pull-left">
        <a class="ng-hide" ui-sref="index" ng-class="{'active':ctr.getMainState() === 'index'}">Главная</a>
        <a ui-sref="public.sets" ng-class="{'active':ctr.getMainState() === 'public'}">Публикация</a>
        <a class="ng-hide" ui-sref="analytic" ng-class="{'active':ctr.getMainState() === 'analytic'}">Аналитика</a>
        <a ui-sref="account.plan" ng-class="{'active':ctr.getMainState() === 'account'}">Аккаунт</a>
        <a href="https://chrome.google.com/webstore/detail/%D0%B4%D0%B5%D1%81%D1%8F%D1%82%D1%8C-%D1%80%D1%83%D0%BA/oejjcepegjobphogjdihoahgoekjimkl" target="_blank">Расширение</a>
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

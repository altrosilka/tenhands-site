<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

  <link rel="stylesheet" type="text/css" href="/pack/admin-vendor.css" />
  <link rel="stylesheet" type="text/css" href="/pack/admin-styles.css" />
  <title>Админка</title>
  <base href="/adminpanel/" />
</head>

<body ng-app="App" ng-controller="C_main as ctr">

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header pull-right" >
      <span class="btn btn-primary" ng-click="ctr.setUrl('dev')" ng-class="{'disabled':ctr.urlIsActive('dev')}">dev</span> 
      <span class="btn btn-primary" ng-click="ctr.setUrl('production')" ng-class="{'disabled':ctr.urlIsActive('production')}">prod</span>
    </div>
  </div>
</nav>

  <tabset>
    <tab ng-repeat="(key, tab) in ctr.dashboard.lastUsers" heading="{{ctr.getTabHeading(key, tab)}}" active="tab.active">
      <table>
      <tr ng-repeat="user in tab">
      	<td ng-bind="user.email"></td>
      	<td ng-bind="user.name"></td>
      	<td>
      		<i ng-show="user.email_verified" class="ion-checkmark-round"></i>
      	</td>
      </tr>
      </table>
    </tab>
  </tabset>



  <script type="text/javascript" src="/pack/admin-vendor.js"></script>
  <script type="text/javascript" src="/pack/admin-templates.js"></script>
  <script type="text/javascript" src="/pack/admin-scripts.js"></script>
</body>

</html>

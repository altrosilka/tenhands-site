angular.module('Cabinet').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8';

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/login");

    $stateProvider

      .state('login', {
      url: "/login",
      controller: 'CV_login as ctr',
      templateUrl: "templates/views/login.html"
    })

    .state('index', {
        url: "/",
        controller: 'CV_index as ctr',
        templateUrl: "templates/views/index.html"
      })
      .state('channels', {
        url: "/sets/",
        controller: 'CV_sets as ctr',
        templateUrl: "templates/views/sets/index.html"
      })

    .state('accounts', {
      url: "/accounts/?error&network&success&account",
      controller: 'CV_accounts as ctr',
      templateUrl: "templates/views/accounts/index.html"
    })

  }
]);

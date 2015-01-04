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

    $urlRouterProvider.otherwise("/");

    $stateProvider 
      .state('index', {
        url: "/",
        controller: 'CCV_index as ctr',
        templateUrl: "cabinet/views/index.html"
      }) 
      .state('channels', {
        url: "/sets/",
        controller: 'CCV_sets as ctr',
        templateUrl: "cabinet/views/sets/index.html"
      })
      
  }
]);

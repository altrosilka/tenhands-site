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

    $stateProvider.state('index', {
      url: "/?successEmail",
      controller: 'CV_index as ctr',
      templateUrl: "templates/views/index.html"
    })
    $stateProvider.state('public', {
        url: "/public/",
        abstract: false,
        templateUrl: "templates/views/public/index.html"
      })
      .state('public.sets', {
        url: "sets/",
        controller: 'CV_public_sets as ctr',
        templateUrl: "templates/views/public/sets.html"
      })
      .state('public.accounts', {
        url: "accounts/?error&network&success&account",
        controller: 'CV_public_accounts as ctr',
        templateUrl: "templates/views/public/accounts.html"
      })
    $stateProvider.state('analytic', {
        url: "/analytic/",
        templateUrl: "templates/views/analytic/index.html"
      })
      .state('analytic.sandbox', {
        url: "sandbox/?branch&branches&from&to&param&param2",
        controller: 'CV_analytic_sandbox as fC',
        templateUrl: "templates/views/analytic/sandbox.html",
        reloadOnSearch: false
      })
  }
]);

App.config([
  '$stateProvider',
  '$urlRouterProvider', 
  '$locationProvider', 
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

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
      .state('admin_groups', {
        url: "/admin/groups/",
        controller: 'CCV_admin_groups as ctr',
        templateUrl: "cabinet/views/admin/groups/index.html"
      })
      .state('admin_groups_page', {
        url: "/admin/groups/:id/",
        controller: 'CCV_admin_groups.page as ctr',
        templateUrl: "cabinet/views/admin/groups/page.html"
      })
      .state('groups', {
        url: "/groups/",
        controller: 'CCV_groups as ctr',
        templateUrl: "cabinet/views/groups/index.html"
      })
      .state('groups_page', {
        url: "/groups/:id/?from&to",
        controller: 'CCV_groups.page as ctr',
        templateUrl: "cabinet/views/groups/page.html"
      })
      .state('search', {
        url: "/search/",
        controller: 'CCV_search as ctr',
        templateUrl: "cabinet/views/search/index.html"
      })
  }
]);

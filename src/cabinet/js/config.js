angular.module('Cabinet').config(
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8';

    $httpProvider.defaults.transformRequest = [function(data) {
      var param = function(obj) {
        var query = '';
        var name, value, fullSubName, subValue, innerObj, i;

        for (name in obj) {
          value = obj[name];

          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];


    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/login");

    $stateProvider.state('login', {
      url: "/login",
      controller: 'CV_login as ctr',
      templateUrl: "templates/views/login.html"
    })

    $stateProvider.state('index', {
      url: "/?successEmail&successRestore",
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
        templateUrl: "templates/views/public/accounts.html",
        resolve: {
          _accounts: function(S_selfapi) {
            return S_selfapi.getUserAccounts();
          }
        }
      })
      .state('public.history', {
        url: "history/?set_id",
        controller: 'CV_public_history as ctr',
        templateUrl: "templates/views/public/history.html"
      })
      .state('public.team', {
        url: "team/",
        controller: 'CV_public_team as ctr',
        templateUrl: "templates/views/public/team.html"
      })
      .state('public.table', {
        url: "table/",
        controller: 'CV_public_table as ctr',
        templateUrl: "templates/views/public/table.html"
      })

    $stateProvider.state('analytic', {
        url: "/analytic/",
        templateUrl: "templates/views/analytic/index.html"
      })
      .state('analytic.sandbox', {
        url: "sandbox/?branch&branches&from&to&param&param2",
        controller: 'CV_analytic_sandbox as ctr',
        templateUrl: "templates/views/analytic/sandbox.html",
        reloadOnSearch: false
      })

    $stateProvider.state('account', {
      url: "/account/",
      templateUrl: "templates/views/account/index.html"
    })
      .state('account.plan', {
        url: "plan/",
        controller: 'CV_account_plan as ctr',
        templateUrl: "templates/views/account/plan.html",
        reloadOnSearch: false
      })
  }
);

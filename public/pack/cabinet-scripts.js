angular.module('Cabinet', [
  'ui.router',
  'ngSanitize',
  'ngCookies',
  'ui.bootstrap',
  'templates'
]);
 
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

angular.module('Cabinet')
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: 'http://api.smm.dev/', 
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups',
      'channels/toggleDisableState':'channels/toggleDisableState',
      'sets/attachUserByEmail': 'sets/attachUserByEmail/',
      'sets/attachUserById': 'sets/attachUserById',
      'sets/detachUserById': 'sets/removeUserFromSet',
      addVkGroup: 'channels/vk',
      addFbGroup: 'channels/fb',
      addOkGroup: 'channels/ok',
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup',  
      signOut: 'auth/signout',  
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels', 
      getUserInfo: 'users/getCurrentUser',
      getUserState: 'users/getState',
      setUserName: 'users/setUserName',
      setUserCompanyName: 'users/setUserCompanyName',
      setUserPassword: 'users/setUserPassword',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/vk/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html' 
      },
      getVkWallPosts: 'analytic/getWallPosts'
    } 
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')
  .value('_timezone',6)

angular.module('Cabinet').run(
  ["$state", "S_selfapi", "S_eventer", function($state, S_selfapi, S_eventer) {

    S_selfapi.getUserInfo().then(function(resp) {


      if (resp.data.error) {
        //localStorageService.set('redirectUrl', $location.url());
        $state.go('login');
      } else { 
        S_eventer.sendEvent('setUserName', resp.data.data.name || resp.data.data.email);
      }
    })
  }]);

angular.module('Cabinet').controller('C_cabinet',

  ["$scope", "$state", "$cookies", "S_selfapi", "S_vk", function($scope, $state, $cookies, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer', function() {
      ctr.showAddExtensionLayer = true;
    });

    $scope.$on('setUserName', function(event, userName) {
      ctr.userName = userName;
    });

    ctr.logout = function() {
      S_selfapi.signOut().then(function() {
        $state.go('login');
      });
    }

    return ctr;
  }]
);

angular.module('Cabinet')
  .controller('CV_login',
    ["S_selfapi", "S_eventer", "$state", "$timeout", function(S_selfapi, S_eventer, $state, $timeout) {
      var ctr = {};

      ctr.signIn = function() {
        ctr.error = false;

        S_selfapi.signIn(ctr.email, ctr.password).then(function(resp) {

          if (resp.data.success) {
            $state.go('index');
            S_eventer.sendEvent('setUserName', resp.data.data.name);
          } else {
            ctr.error = true;
          }
        });
      }

      return ctr;
    }]
  );

angular.module('Cabinet').directive('customSelect', function() {
  return {
    transclude: true,
    scope: {
      selectId: '=customSelect',
      closeOnSelect: '=',
      options: '=',
      sectionFormat: '=',
      sectionDefault: '=',
      optionFormat: '=',
      optionDisabled: '&',
      optionActive: '&',
      onSelect: '&',
      options: '=',
      customContent: '=' 
    },
    controller: 'CD_customSelect as cSCtr',
    templateUrl: 'templates/directives/customSelect.html',
    link: function(scope, element, attrs, ctrl, transclude) {
      var parent = scope.$parent.$new();
      var current = scope;

      transclude(parent, function(clone, scope) {
        scope.$close = current.cSCtr.close;
        element.find('[data-role="custom-content"]').append(clone);
      });

      element.find('menu').on('click', function(event) {
        event.stopPropagation();
      });
    }
  }
})

angular.module('Cabinet')
  .directive('dateInterval', ["$filter", "_timezone", function($filter, _timezone) {
    return {
      scope: {
        start: '=',
        end: '=',
        format: '=' 
      },
      templateUrl: 'templates/directives/dateInterval.html',
      link: function($scope, $element, attrs) {
        var filterFormat = $scope.format || 'dd.MM.yyyy'


        $scope.$watch(function() {
          return $scope.start;
        }, function() {
          $scope.filteredStart = $filter('date')($scope.start, filterFormat, _timezone);
        });

        $scope.$watch(function() {
          return $scope.end;
        }, function() {
          $scope.filteredEnd = $filter('date')($scope.end, filterFormat, _timezone);
        })
      }
    }
  }])

angular.module('Cabinet')

.directive('sandboxChart', [
  'S_calculation',
  '_colors',
  function(S_calculation, _colors) {
    return {
      scope: {
        categories: '=',
        metaInfo: '=',
        colors: '=',
        axis: '=',
        series: '='
      },
      link: function($scope, element, attrs) {

        $scope.$watch('series', function(q) {
          if (!q) {
            return;
          }
          drawGraph($scope.series);
        });

        function drawGraph(series) {

          var graphObject = {
            chart: {
              animation: {
                duration: 2500,
                easing: 'easeOutBounce'
              }
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              line: {
                marker: {
                  enabled: true,
                  radius: 3,
                  symbol: 'circle'
                },
                lineWidth: 1
              }
            },
            tooltip: {
              shared: true,
              backgroundColor: '#fff',
              formatter: function() {
                //return S_calculation.formatterAnalyticTooltip(this.points, meta.scale);
              },
              useHTML: true,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              borderRadius: 0,
              shadow: false
            },
            legend: {
              enabled: false
            }
          }

          /*if (meta.scale === 'date' || meta.scale === 'week' || meta.scale === 'month') {

            angular.extend(graphObject, {
              xAxis: [{
                tickmarkPlacement: 'on',
                type: 'datetime',
                dateTimeLabelFormats: {
                  day: '%d.%m',
                  week: '%d.%m',
                  month: '%B',
                  year: '%Y'
                },
                minTickInterval: 24 * 3600 * 1000,
                tickPixelInterval: S_calculation.getAnalyticTickIntervals(meta.scale),
                labels: {
                  //formatter: function() {
                  //  return S_calculation.formatterAnalyticLabels(this.value, meta.scale);
                  //}
                }
              }],
              yAxis: axis,
              series: series
            });

          } else {

            angular.extend(graphObject, {
              xAxis: [{
                categories: categories,
                minTickInterval: 24 * 3600 * 1000,
                tickmarkPlacement: 'on',
                tickPixelInterval: S_calculation.getAnalyticTickIntervals(meta.scale),
                labels: {
                  formatter: function() {

                    return S_calculation.formatterAnalyticLabels(this.value, meta.scale);
                  }
                }
              }],
              yAxis: axis,
              series: series
            });
          }*/
          element.find('.chart').highcharts(graphObject).find('text:contains("Highcharts.com")').remove();
        }

      }
    }
  }
])

angular.module('Cabinet').directive('set', [function() {
  return {
    scope: {
      set: '=',
      guestAccess: '='
    },
    templateUrl: 'templates/directives/set.html',
    link: function($scope, $element) {

    },
    controller: ["S_selfapi", "S_utils", function(S_selfapi, S_utils) {
      var ctr = this;

      ctr.addNewUser = function(email) {
        if (!email || email === '') return;
        S_selfapi.attachUserToSetByEmail(ctr.openedSet.id, email).then(function(resp) {
          if (resp.data.success) {
            ctr.loadSetInfo(ctr.openedSet);
          }
        });
        ctr.newUserEmail = '';
      }


      ctr.openSet = function(set, type) {
        if (ctr.activeMode === type) {
          return;
        }
        ctr.activeMode = type;
        delete ctr.openedSetChannels;
        ctr.openedSet = set;
        ctr.loadSetInfo(set);
      }




      ctr.addChannel = function(type, set) {
        S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
          ctr.openSet(ctr.openedSet);
        });
      }

      ctr.toggleChannel = function(channel) {
        channel.disabled = !channel.disabled;
        S_selfapi.toggleChannel(channel.id, ctr.openedSet.id, channel.disabled).then(function(resp) {
          console.log(resp.data);
        });
      }

      ctr.toggleUser = function(user) {
        user.disabled = !user.disabled;

        if (user.disabled) {
          S_selfapi.detachUserFromSet(user.id, ctr.openedSet.id).then(function(resp) {
            console.log(resp.data);
          });
        } else {
          S_selfapi.attachUserToSet(user.id, ctr.openedSet.id).then(function(resp) {

          });
        }
      }



      ctr.loadSetInfo = function(set) {
        S_selfapi.loadSetFullInfo(set.id).then(function(resp) {
          ctr.openedSetChannels = resp.data.data.channels;
          ctr.openedSetUsers = resp.data.data.users;
        });
      }





      ctr.channelsPlural = {
        0: 'нет каналов',
        one: '{} канал',
        few: '{} канала',
        many: '{} каналов',
        other: '{} канала'
      };

      ctr.usersPlural = {
        0: 'нет пользователей',
        one: '{} пользователь',
        few: '{} пользователя',
        many: '{} пользователей',
        other: '{} пользователя'
      };


      ctr.getChannelsCount = function(q) {
        return ((q) ? q.length : 0);
      }

      ctr.getUsersCount = function(q) {
        return ((q) ? q.length : 0);
      }

      ctr.setIsAvtive = function(set) {
        return ctr.openedSet.id === set.id;
      }

      ctr.getChannelClass = function(c) {
        var classList = {};
        classList[c.network] = true;
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.getUserClass = function(c) {
        var classList = {};
        classList[c.network] = true;
        if (c.verified_email) {
          classList.verified = true;
        }
        if (c.not_confirmed) {
          classList.notConfirmed = true;
        }
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.getNetworkIconClass = function(network) {
        var q = {};
        switch (network) {
          case 'vk':
            {
              q['fa-vk'] = true;
              break;
            }
          case 'fb':
            {
              q['fa-facebook'] = true;
              break;
            }
          case 'tw':
            {
              q['fa-twitter'] = true;
              break;
            }
          case 'ig':
            {
              q['fa-instagram'] = true;
              break;
            }
        }
        return q;
      }


      ctr.getChannelLink = function(network, screenName) {
        return S_utils.getChannelLink(network, screenName);
      }

    }],
    controllerAs: 'ctr'
  }
}]);

/*
angular.module('App').filter('lastfmDateToLocal', ['localization',function(localization) {
  return function(date) {
    if (!date) {
      return;
    } 

    var parsed = moment(date,'DD MMM YYYY HH:mm'); 

    return parsed.format('DD') + ' ' + localization.months[parsed.month()] + ' ' + parsed.format('YYYY');
  }
}]);
*/
angular.module('parseVkUrls', []).filter('parseVkUrls', [function() {
  return function(input, removeLink) {
    if (!input) {
      return;
    }

    var regClub = /\[club([0-9]*)\|([^\]]*)\]/g;
    var regId = /\[id([0-9]*)\|([^\]]*)\]/g;



    var bytes = [];

    for (var i = 0; i < input.length; ++i) {
      bytes.push(input.charCodeAt(i));
    }

    var ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];

    input = emojiParseInText(input);
      
    var text = input.autoLink();

    text = (removeLink) ? text.replace(regClub, '<span>$2</span>') : text.replace(regClub, '<a class="link" href="/public/$1/">$2</a>');
    text = text.replace(regId, '<span>$2</span>').replace(/\n/g, "<br />");

    return text;
  }
}]);

angular.module('Cabinet')
  .service('S_enviroment', [
    '$q',
    '$http',
    '__extensionId',
    function($q, $http, __extensionId) {
      var service = {};

      service.extensionIsset = function() {
        var defer = $q.defer();
        $http({
          withCredentials: false,
          url: 'chrome-extension://' + __extensionId + '/pages/createPost.html',
          method: 'GET'
        }).then(function() {
          defer.resolve(true);
        }, function() {
          defer.resolve(false);
        }); 
        return defer.promise; 
      }

      service.callExtensionVkAuth = function() {
        var win = window.open('chrome-extension://' + __extensionId+'/pages/authVk.html', '_blank');
      }

      service.onPostMessage = function(next) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, function(e) {
          var key = e.message ? "message" : "data";
          var data = e[key];

          next(e, data);
        }, false);
      }

      return service;
    }
  ])

angular.module('Cabinet')
  .service('S_eventer', [
    '$rootScope',
    function($rootScope) {
      var service = {};

      service.sendEvent = function(name, arguments) {
        $rootScope.$broadcast(name, arguments);
      }
      
      return service;
    }
  ]);

angular.module('Cabinet')
  .service('S_location', ["$location", function($location) {
    var service = {};

    service.setFromTo = function(from, to) {
      from = (typeof from === 'string') ? from : moment(from).format('YYYYMMDD');
      to = (typeof to === 'string') ? to : moment(to).format('YYYYMMDD');
      $location.search(angular.extend($location.$$search, {
        from: from,
        to: to
      }));
    }

    service.setAttr = function(attr, value) {
      var obj = {};
      obj[attr] = value;
      $location.search(angular.extend($location.$$search, obj));
    }

    return service;
  }])

angular.module('Cabinet')
  .service('S_mapping', [function() {
    var service = {};
    
    return service;
  }]);

angular.module('Cabinet')
  .service('S_selfapi', [
    '$http',
    '__api',
    function($http, __api) {
      var service = {};
      var base = __api.baseUrl;

      service.getUserState = function() {
        return $http({
          url: base + __api.paths.getUserState,
          method: 'GET'
        });
      }

      service.setUserName = function(name) {
        return $http({
          url: base + __api.paths.setUserName,
          method: 'POST',
          data: {
            name: name
          }
        });
      }

      service.getVkWallPosts = function(owner_id) {
        return $http({
          url: base + __api.paths.getVkWallPosts,
          method: 'GET',
          params: {
            owner_id: owner_id
          }
        });
      }

      service.setUserPassword = function(obj) {
        return $http({
          url: base + __api.paths.setUserPassword,
          method: 'POST',
          data: obj
        });
      }

      service.setUserCompanyName = function(company) {
        return $http({
          url: base + __api.paths.setUserCompanyName,
          method: 'POST',
          data: {
            company: company
          }
        });
      }

      service.getUserInfo = function() {
        return $http({
          url: base + __api.paths.getUserInfo,
          method: 'GET'
        });
      }

      service.signOut = function() {
        return $http({
          url: base + __api.paths.signOut,
          method: 'GET'
        });
      }

      service.signIn = function(email, password) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signIn,
          method: 'POST',
          data: {
            email: email,
            password: password
          }
        });
      }

      service.signUp = function(email, password, name) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signUp,
          method: 'POST',
          data: {
            email: email,
            password: password,
            name: name
          }
        });
      }

      service.addNewSet = function(setName) {
        return $http({
          url: base + __api.paths.sets,
          method: 'POST',
          data: {
            name: setName
          }
        });
      }

      service.toggleChannel = function(channel_id, set_id, disabled) {
        return $http({
          url: base + __api.paths['channels/toggleDisableState'],
          method: 'GET',
          params: {
            set_id: set_id,
            id: channel_id,
            disabled: disabled
          }
        });
      }

      service.attachUserToSetByEmail = function(set_id, email) {
        return $http({
          url: base + __api.paths['sets/attachUserByEmail'],
          method: 'GET',
          params: {
            id: set_id,
            email: email
          }
        });
      }

      service.attachUserToSet = function(user_id, set_id) {
        return $http({
          url: base + __api.paths['sets/attachUserById'],
          method: 'GET',
          params: {
            id: set_id,
            user_id: user_id
          }
        });
      }
      service.detachUserFromSet = function(user_id, set_id) {
        return $http({
          url: base + __api.paths['sets/detachUserById'],
          method: 'GET',
          params: {
            id: set_id,
            user_id: user_id
          }
        });
      }


      service.getTwitterAuthUrl = function(setId) {
        return $http({
          url: base + __api.paths.getTwitterAuthUrl,
          method: 'GET',
          params: {
            set_id: setId
          }
        });
      }

      service.getFacebookAuthUrl = function() {
        return $http({
          url: base + __api.paths.getFacebookAuthUrl,
          method: 'GET'
        });
      }

      service.getVkAuthUrl = function() {
        return $http({
          url: base + __api.paths.getVkAuthUrl,
          method: 'GET'
        });
      }

      service.getVkAuthUrl = function() {
        return $http({
          url: base + __api.paths.getVkAuthUrl,
          method: 'GET'
        });
      }

      service.loadSetFullInfo = function(setId) {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET',
          params: {
            id: setId
          }
        });
      }

      service.getUserOwnSets = function() {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET'
        });
      }

      service.getUserAccounts = function() {
        return $http({
          url: base + __api.paths.accounts,
          method: 'GET'
        });
      }

      service.loadVkAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadVkAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.loadFbAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadFbAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.addOkGroup = function(feed_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addOkGroup,
          method: 'POST',
          data: {
            page_id: feed_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addVkGroup = function(feed_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addVkGroup,
          method: 'POST',
          data: {
            feed_id: feed_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addFbGroup = function(page_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addFbGroup,
          method: 'POST',
          data: {
            page_id: page_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addIgAccount = function(username, password, setId) {
        return $http({
          url: base + __api.paths.addIgAccount,
          method: 'POST',
          data: {
            username: username,
            password: password,
            set_id: setId
          }
        });
      }



      return service;
    }
  ]);

angular.module('Cabinet')
  .service('S_utils', ['$modal', function($modal) {
    var service = {};

    service.openAddChannelDialog = function(type, setId) {
      switch (type) {
        case 'vk':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelVk.html',
              controller: 'CCM_addChannelVk as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                } 
              }
            }).result;
          }

        case 'ok':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelOk.html',
              controller: 'CCM_addChannelOk as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }

        case 'ig':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelIg.html',
              controller: 'CCM_addChannelIg as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }


        case 'tw':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelTw.html',
              controller: 'CCM_addChannelTw as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
        case 'fb':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelFb.html',
              controller: 'CCM_addChannelFb as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
      }
    }

    service.getChannelLink = function(network, screenName) {
      switch (network) {
        case 'vk':
          {
            return 'https://vk.com/' + screenName;
          }
        case 'fb':
          {
            return 'https://www.facebook.com/' + screenName;
          }
        case 'tw':
          {
            return 'https://twitter.com/' + screenName;
          }
        case 'ig':
          {
            return 'https://instagram.com/' + screenName;
          }
      }
    }

    return service;
  }]);

angular.module('Cabinet')
  .service('S_vk', [ 
    '$q',
    '$http',
    'S_utils',
    function($q, $http, S_utils) {
      var service = {};

      service.default = {
        version: '5.26',
        language: 'ru'
      };

      var _requestStack = [];

      service.request = function(_method, _params, _response) {
        var defer = $q.defer();

        service.getToken().then(function(token) {
          var path = '/method/' + _method + '?' + 'access_token=' + token;
          _params['v'] = _params['v'] || service.default.version;
          _params['lang'] = _params['lang'] || service.default.language;

          for (var key in _params) {
            if (key === "message") {
              path += ('&' + key + '=' + encodeURIComponent(_params[key]));
            } else {
              if (typeof _params[key] === 'object' && _params[key].length){
                _.forEach(_params[key],function(val){
                  path += ('&' + key + '[]=' + val);
                });
              } else {
                path += ('&' + key + '=' + _params[key]);
              }
              
            }
          }

          $http.jsonp('https://api.vk.com' + path, {
            params: {
              callback: 'JSON_CALLBACK'
            }
          }).then(function(res) {
            if (typeof _response === 'function') {
              _response(res.data);
            } else {
              defer.resolve(res.data);
            }
          });

        });

        return defer.promise;
        

      };

      service.setToken = function(token) {
        service.token = token;
        if (_requestStack.length > 0) {
          angular.forEach(_requestStack, function(request) {
            request.resolve(token);
          });
        }
      };

      service.testRequest = function() {
        var defer = $q.defer();
        service.request('users.get', {}, function(resp) {
          if (resp.response) {
            defer.resolve();
          } else {
            defer.reject();
          }
        })
        return defer.promise;
      }

      service.getToken = function() {
        var defer = $q.defer();

        if (service.token) {
          defer.resolve(service.token);
        } else {
          _requestStack.push(defer);
        }

        return defer.promise;
      };

      return service;
    }
  ]);

angular.module('Cabinet')
  .controller('CD_customSelect', [
    '$timeout',
    '$scope',
    '$interpolate', 
    '$sce',
    function($timeout, $scope, $interpolate, $sce) {

      var ctr = this;
      $scope.length = 123;
 
      $scope.$watch('sectionFormat', function() {

        $scope.section = $sce.trustAsHtml($interpolate('<span>' + $scope.sectionFormat + '</span>')($scope));
      })

      ctr.close = function() {
        ctr.opened = false;
        $('body').off('click');
      }

      ctr.open = function() {
  
        ctr.opened = !ctr.opened;

        if (ctr.opened) {
          $timeout(function() {
            $('body').on('click', function(event) {

              $scope.$apply(function() {
                ctr.opened = false;
              });
              $(this).off('click');
            });
          });
        } else {
          $('body').off('click');
        }
      }

      ctr.isDisabled = function(option) {
        if (!$scope.optionDisabled()) {
          return;
        }
        return $scope.optionDisabled()(option, $scope.selectId);
      }

      ctr.isActive = function(option) {
        if (!$scope.optionActive()) {
          return;
        }
        return $scope.optionActive()(option, $scope.selectId);
      }

      ctr.selectOption = function($event, option) {
        $event.stopPropagation();
        $scope.selected = option;
        //$scope.onSelect()(option, $scope.selectId);

        //$scope.section = $sce.trustAsHtml($interpolate('<span>'+$scope.sectionFormat+'</span>')($scope));

        if ($scope.closeOnSelect) {
          ctr.open();
        }
      }

      return ctr;
    }
  ]);

angular.module('Cabinet').controller('CCM_addChannelFb', [
  '$scope',
  '$state',
  '$location',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $state, $location, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';
    ctr.selectedAccount = {};
    ctr.resolveAndAdd = function() {

      
      ctr.error = '';

      if (!ctr.selectedPage.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addFbGroup(ctr.selectedPage.id, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.error) {
          ctr.error = resp.data.text;
          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'fb';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }


    $scope.$watch(function(){
      return ctr.selectedAccount.id;
    }, function(id){
      if (!id) return;
      S_selfapi.loadFbAccountGroups(id).then(function(resp){
        ctr.pages = resp.data.data.pages;
        ctr.selectedPage = ctr.pages[0];
      });
    })
    
    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelIg', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';

    ctr.resolveAndAdd = function() {

      ctr.error = '';
      if (ctr.username === '') {
        ctr.error = 'укажи логин';
        return;
      }
      if (ctr.password === '') {
        ctr.error = 'укажи пароль';
        return;
      }


      S_selfapi.addIgAccount(ctr.username, ctr.password, setId).then(function(resp) {
        if (resp.data.error) {
          if (resp.data.code === 'enemy') {
            ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
          }
          if (resp.data.code === 'already') {
            ctr.error = 'группа уже добавлена';
          }

          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });

    }

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelOk', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;

    ctr.selectedAccount = {};
    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'ok';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    ctr.resolveAndAdd = function() {
      ctr.error = '';
      S_selfapi.addOkGroup(ctr.gid, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.success) {
          $modalInstance.close();
          S_eventer.sendEvent('trigger:updateChannels');
        } else {
          ctr.error = resp.data.text;
        }
      });
      /*
      
      $(window).on('focus',function(){
       
        $(window).off('focus');
      });*/
    }

    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelTw', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
   

    S_selfapi.getTwitterAuthUrl(setId).then(function(resp){
      ctr.authUrl = resp.data.data.url;
    });

    ctr.onAuthStart = function(){
      $modalInstance.close();
      $(window).on('focus',function(){
        S_eventer.sendEvent('trigger:updateChannels');
        $(window).off('focus');
      });
    }

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelVk', [
  '$scope',
  '$state',
  '$location',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $state, $location, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';
    ctr.selectedAccount = {};
    ctr.selectedGroup = {};
    ctr.resolveAndAdd = function() {

      ctr.error = '';

      if (!ctr.selectedGroup.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addVkGroup(ctr.selectedGroup.id, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.error) {
          ctr.error = resp.data.text;
          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'vk';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    $scope.$watch(function(){
      return ctr.selectedAccount.id;
    }, function(id){
      if (!id) return;
      S_selfapi.loadVkAccountGroups(id).then(function(resp){
        ctr.groups = resp.data.data.groups;
        ctr.selectedGroup = ctr.groups[0];
      });
    })


    ctr.addAccount = function() {
      S_enviroment.extensionIsset().then(function(resp) {
        if (resp) {
          S_enviroment.callExtensionVkAuth();
        } else {
          S_eventer.sendEvent('showAddExtensionLayer');
        }
      });

      $(window).on('focus', function() {
        $(window).off('focus');
        ctr.refreshAccounts();
      });
    }

    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('Cabinet').controller('CV_index', ["$scope", "$stateParams", "S_selfapi", "S_eventer", "$timeout", function($scope, $stateParams, S_selfapi, S_eventer, $timeout) {
  var ctr = this;

  ctr.saveName = function(name) {
    if (name === '') {
      return
    }

    ctr.state.reqName = false;
    S_eventer.sendEvent('setUserName', name);
    S_selfapi.setUserName(name);
  }

  ctr.saveUserCompany = function(name) {
    if (name === '') {
      return
    }

    ctr.state.unknownCompany = false;
    S_selfapi.setUserCompanyName(name);
  }


  ctr.changePassword = function(password) {
    if (password === '') {
      return
    }

    S_selfapi.setUserPassword({
      password: password
    }).then(function(resp) {
      if (resp.data.success) {
        ctr.state.randomPassword = false;
      }

      if (resp.data.error){

      }
    });
  }

  ctr.closeSuccessEmail = function(){
    ctr.showSuccessEmail = false;
  }

  S_selfapi.getUserState().then(function(resp) {
    ctr.state = resp.data.data;
  });

  if ($stateParams.successEmail){
    ctr.showSuccessEmail = true;
  }

  return ctr;
}]);

angular.module('Cabinet').controller('CV_public_accounts',
  ["$scope", "$state", "$filter", "$location", "S_vk", "S_utils", "S_enviroment", "S_selfapi", "S_eventer", function($scope, $state, $filter, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer) {
    var ctr = this;


    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = resp.data.data;
      });
    }

    S_selfapi.getFacebookAuthUrl().then(function(resp) {
      ctr.facebookAuthUrl = resp.data.data.url;
    });


    ctr.onVkAdding = function() {
      S_enviroment.extensionIsset().then(function(resp) {
        if (resp) {
          S_enviroment.callExtensionVkAuth();
        } else {
          S_eventer.sendEvent('showAddExtensionLayer');
        }
      });
      $(window).on('focus', function() {
        $(window).off('focus');
        ctr.refreshAccounts();
      });
    }
    ctr.refreshAccounts();


    ctr.getExpiresString = function(exp) {
      if (exp === 0) {
        return 'доступ открыт';
      }

      if (exp > 0) {
        return 'доступ до ' + $filter('date')(exp * 1000, 'dd-MM-yyyy');
      }
    }

    return ctr;
  }]
);

angular.module('Cabinet').controller('CV_public_sets', [
  '$scope',
  'S_vk',
  'S_utils',
  'S_selfapi',
  function($scope, S_vk, S_utils, S_selfapi) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;

      ctr.newSetName = '';
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets(true);
      });
    }

    

    ctr.updateSets = function(onlyOwn) {
      if (onlyOwn) {
        S_selfapi.getUserOwnSets().then(function(resp) {
          ctr.sets = resp.data.data;
        });
      } else {

      }
    }



    ctr.updateSets(true);

    $scope.$on('trigger:updateChannels', function() {
      ctr.updateSets(true);
    });

    return ctr;
  }
]);

angular.module('Cabinet')
  .controller('CV_analytic_sandbox',
    ["$timeout", "$scope", "$stateParams", "$filter", "_timezone", "S_location", "S_selfapi", "S_utils", function($timeout, $scope, $stateParams, $filter, _timezone, S_location, S_selfapi, S_utils) {
      var ctr = {};

      ctr.shortState = true;

      ctr.paramsArray = [{
        description: "Лайки",
        name: "likes"
      },{
        description: "Репосты",
        name: "reposts"
      },{
        description: "Комментарии",
        name: "comments"
      },{
        description: "ER",
        name: "er"
      }];

      ctr.selectedParams = [
        _.find(ctr.paramsArray, function(param) {
          return param.name === ($stateParams.param || ctr.paramsArray[0].name)
        }), (!$stateParams.param2) ? {} : _.find(ctr.paramsArray, function(param) {
          return param.name === $stateParams.param2
        })
      ];


      ctr.selectedParams = [{}, {}];
      ctr.timeIntervals = [{
        title: 'Неделя',
        id: 'week'
      }, {
        title: 'Месяц',
        id: 'month'
      }, {
        title: 'Год',
        id: 'year'
      }];
      ctr.selectedInterval = ctr.timeIntervals[0];
      ctr.selectedBranches = [];

      $scope.$watch(function() {
        return ctr.startDate.toString() + ctr.endDate.toString();
      }, function(date) {
        if (!date) {
          return;
        }
        if (ctr.selectIntervalArea) {
          ctr.selectedInterval = {};
        }

        S_location.setFromTo(ctr.startDate, ctr.endDate);

        loadInfo();
      });

      $scope.$watch(function() {
        return ctr.selectedParams[0].name;
      }, function(param) {
        if (!ctr.paramsArray) return;
        S_location.setAttr('param', param);
        loadInfo();
      });

      $scope.$watch(function() {
        return ctr.selectedParams[1].name;
      }, function(param) {
        if (!ctr.paramsArray) return;
        S_location.setAttr('param2', param);
        loadInfo();
      });

      ctr.endDate = (!$stateParams.to) ? moment().add(-1, 'days').toDate() : moment($stateParams.to, 'YYYYMMDD').toDate();
      ctr.startDate = (!$stateParams.from) ? moment().add(-7, 'days').toDate() : moment($stateParams.from, 'YYYYMMDD').toDate();

      ctr.branches = [];

      ctr.onBranchToggle = function(branch, branches) {
        ctr.selectedBranches = branches;
        loadInfo();
      }

      ctr.getColorByBranch = function(branch) {
        return S_color.getColorByPos(branch.pos).light;
      }

      ctr.getSelectPlaceholder = function(key) {
        if (key !== 'branches') {
          return (!ctr.selectedParams[key].description) ? 'Выберите параметр' : ctr.selectedParams[key].description;
        }



        return (ctr.selectedBranches.length > 0) ? (_.find(ctr.selectedBranches, {
          id: 0
        }) && ctr.selectedBranches.length === 1) ? 'Все филиалы' : 'Филиалов | ' + ctr.selectedBranches.length : 'Выберите филиалы';
      }



      ctr.selectParam = function(param, key) {

        if (ctr.paramIsActive(param, key)) {
          if (!key) {
            if (ctr.selectedParams[+!key].name) {
              ctr.selectedParams[key] = ctr.selectedParams[+!key];
              ctr.selectedParams[+!key] = {};
            } else {
              ctr.selectedParams[key] = {};
            }
          } else {
            ctr.selectedParams[key] = {};
          }

        } else {
          ctr.selectedParams[key] = param;
        }
      }

      ctr.paramIsActive = function(param, key) {
        return ctr.selectedParams[key].name == param.name;
      }

      ctr.paramAlreadySelected = function(param, key) {
        return ctr.selectedParams[+!key].name == param.name;
      }
      var no = true;
      ctr.intervalClick = function(event) {
        no = false;
        event.stopPropagation();
        event.preventDefault();

        setTimeout(function() {
          no = true;
        }, 100)
      }

      ctr.openSelectIntervalArea = function() {
        ctr.selectIntervalArea = true;
        setTimeout(function() {
          $('body').on('click', function() {
            if (no) {
              $scope.$apply(function() {
                ctr.closeSelectIntervalArea();
              })
              $('body').off('click');
            }
          });
        })
      }

      ctr.closeSelectIntervalArea = function() {
        ctr.selectIntervalArea = false;
        $('body').off('click');
      }

      ctr.intervalIsActive = function(interval) {
        return ctr.selectedInterval.id === interval.id;
      }

      ctr.setInterval = function(interval) {

        ctr.endDate = new Date();
        switch (interval.id) {
          case 'week':
            {
              ctr.startDate = moment().add(-6, 'days').toDate();
              break;
            }
          case 'month':
            {
              ctr.startDate = moment().add(-1, 'month').toDate();
              break;
            }
          case 'year':
            {
              ctr.startDate = moment().add(-1, 'year').toDate();
              break;
            }
        }
        ctr.selectedInterval = interval;
      }

      ctr.toggleState = function() {
        ctr.shortState = !ctr.shortState;
        ctr.stateChangeInProgress = true;
        $timeout(function() {
          ctr.stateChangeAfter = true;


          $timeout(function() {
            ctr.stateChangeInProgress = false;

            $timeout(function() {
              $(window).resize();
              $timeout(function() {
                ctr.stateChangeAfter = false;
              }, 100)
            }, 100)
          }, 100)
        }, 900)
      }


      function loadInfo() {


    
        var start = $filter('date')(ctr.startDate, 'yyyyMMdd', _timezone);
        var end = $filter('date')(ctr.endDate, 'yyyyMMdd', _timezone);

        var param1 = ctr.selectedParams[0].name;
        var param2 = ctr.selectedParams[1].name;

        var doubleAxis = (param2);


        var metric = param1;
        if (param2) {
          metric += ',' + param2;
        }

        S_selfapi.getVkWallPosts('-33393308').then(function(resp) {

          var series = [];
          var data = [];
          _.forEach(resp.data.data,function(post){
            var param = post[param1];
            data.push([post.date*1000, param]);
          });


          series.push({
            name: 'vk',
            data: data
          });

          ctr.graph = {
            series: series
          }

        });
      }

      return ctr;
    }]
  );

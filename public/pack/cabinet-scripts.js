angular.module('Cabinet', [
  'ui.router',
  'ui.select',
  'ngSanitize',
  'ngCookies',
  'ngAnimate',
  'ui.bootstrap',
  'ui.calendar',
  'templates',
  'LocalStorageModule'
]);
 
angular.module('Cabinet').config(
  ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

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
          _accounts: ["S_selfapi", function(S_selfapi) {
            return S_selfapi.getUserAccounts();
          }]
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
  }]
);

angular.module('Cabinet')
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: 'http://smm.dev/api/', 
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
      getVkAuthUrl: 'auth/vk/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html' 
      },
      getVkWallPosts: 'analytic/getWallPosts',
      getPostingHistory: 'postingHistory',
      getUserSetsTeam: 'sets/getTeam',
      restorePassword: 'auth/restorePassword',
      getTable: 'table',
      getPricingPlans: 'payments/getPlans'
    } 
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')
  .value('_timezone',6)

angular.module('Cabinet').run(
  ["$state", "S_selfapi", "S_eventer", function($state, S_selfapi, S_eventer) {
    S_selfapi.getUserInfo().then(function(resp) {
      S_eventer.sendEvent('disableLoader');
      S_eventer.sendEvent('setUserName', resp.data.name || resp.data.email);
    }, function() {
      S_eventer.sendEvent('disableLoader');
    });
  }]);

angular.module('Cabinet').controller('C_cabinet',

  ["$scope", "$state", "$timeout", "S_selfapi", "S_vk", function($scope, $state, $timeout, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer', function() {
      ctr.showAddExtensionLayer = true;
    });

    $scope.$on('setUserName', function(event, userName) {
      ctr.userName = userName;
    });
  
    $scope.$on('state:userRecieved', function(event, userName) {
      ctr.disableLoader = true;
    });

    $scope.$on('disableLoader', function(event, userName) {
      ctr.disableLoader = true;
    });
 
    ctr.logout = function() {
      S_selfapi.signOut().then(function() {
        $state.go('login');
      });
    }

    ctr.getMainState = function(){
      return $state.current.name.split('.')[0];
    }

    return ctr;
  }]
);

angular.module('Cabinet')
  .controller('CV_login',
    ["S_selfapi", "S_eventer", "$state", "$timeout", function(S_selfapi, S_eventer, $state, $timeout) {
      var ctr = this;

      ctr.email = ctr.password = '';

      ctr.auth = function(email, password) {
        if (ctr.authInProgress) {
          return;
        }
        ctr.authInProgress = true;
        ctr.error = false;
        S_selfapi.signIn(email, password).then(function(resp) {
          ctr.authInProgress = false;
          $state.go('index');
          S_eventer.sendEvent('setUserName', resp.data.name);
        }, function() {
          ctr.authInProgress = false;
          ctr.error = true;
        });
      }

      ctr.toggleRestorePassword = function() {
        ctr.restoreMode = !ctr.restoreMode;
      }


      ctr.restore = function(email, password) {
        if (ctr.authInProgress) {
          return;
        }
        ctr.authInProgress = true;
        ctr.error = false;

        S_selfapi.restorePassword(email).then(function(resp) {
          ctr.authInProgress = false;
          ctr.successRestore = true;
        }, function() {
          ctr.authInProgress = false;
          ctr.error = true;
        });
      }

      return ctr;
    }]);

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

angular.module('Cabinet').directive('member', [function() {
  return {
    scope: {
      member: '=',
      guestAccess: '='
    },
    templateUrl: 'templates/directives/member.html',
    link: function($scope, $element) {

    },
    controller: ["$scope", "S_selfapi", "S_utils", function($scope, S_selfapi, S_utils) {
      var ctr = this;

      var setCount = (($scope.member.sets_ids) ? $scope.member.sets_ids.length : 0);

      ctr.getName = function() {
        return (($scope.member.name) ? ($scope.member.name + ' / ' + $scope.member.email) : $scope.member.email)
      }

      ctr.setsPlural = {
        0: 'нет наборов',
        one: '{} набор',
        few: '{} набора',
        many: '{} наборов',
        other: '{} набора'
      };


      ctr.getSetsCount = function(q) {
        return setCount;
      }


      ctr.getSetClass = function(c) {
        var classList = {};
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.open = function() {
        ctr.activeMode = true;



        S_selfapi.loadSetFullInfo($scope.member.sets_ids.join(',')).then(function(resp) {
          ctr.sets = resp.data;
        });
      }

      ctr.toggleUserFromSet = function(set) {
        set.disabled = !set.disabled;

        if (set.disabled) {
          setCount -= 1;
          S_selfapi.detachUserFromSet($scope.member.id, set.id).then(function(resp) {
            console.log(resp.data);
          });
        } else {
          setCount += 1;
          S_selfapi.attachUserToSet($scope.member.id, set.id).then(function(resp) {

          });
        }
      }

    }],
    controllerAs: 'ctr'
  }
}]);

angular.module('Cabinet')
  .directive('notifyPanel', ["notifyPanel_service", function(notifyPanel_service) {
    return {
      scope: {
        id: '@notifyPanel'
      },  
      link: function($scope, $element, attrs) {
        if (!notifyPanel_service.checkId($scope.id)){ 
          $element.show().prepend('<span class="closer ion-close-round" data-close-notify></span>').find('[data-close-notify]').on('click',function(){
            $element.remove();
            notifyPanel_service.trackId($scope.id);
          });
        }
      }
    }
  }])
  .service('notifyPanel_service',["localStorageService", function(localStorageService){
    var service = {};

    var objectName = 'notifyPanel_ids';

    service.checkId = function(id){
      var q = localStorageService.get(objectName) || {};
      return q[id];
    }

    service.trackId = function(id){
      var q = localStorageService.get(objectName) || {};
      q[id] = 1;
      localStorageService.set(objectName, q);
    }

    return service;
  }]);

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
    controller: ["$scope", "S_selfapi", "S_utils", function($scope, S_selfapi, S_utils) {
      var ctr = this;

      ctr.addNewUser = function(email) {
        if (!email || email === '') return;
        S_selfapi.attachUserToSetByEmail(ctr.openedSet.id, email).then(function(resp) {
          ctr.loadSetInfo(ctr.openedSet);
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

      ctr.setNewName = function(name) {
        ctr.errorInName = false;
        if (name.length < 3) {
          ctr.errorInName = true;
          return
        }

        S_selfapi.editSetProperty($scope.set.id, 'name', name).then(function() {

        });
      }

      ctr.onNameKeyup = function(name) {
        ctr.errorInName = false;
        if (name.length < 3) {
          ctr.errorInName = true;
        }
      }


      ctr.addChannel = function(type, set) {
        S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
          ctr.loadSetInfo(ctr.openedSet);
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
          ctr.openedSetChannels = resp.data[0].channels;
          ctr.openedSetUsers = resp.data[0].users;
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

angular.module('Cabinet').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) { 
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});
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
  .service('S_selfapi',
    ["$http", "$q", "$state", "S_eventer", "__api", function($http, $q, $state, S_eventer, __api) {
      var service = {};
      var base = __api.baseUrl;

      function call(type, url, params, data) {
        var defer = $q.defer();

        $http({
          url: base + url,
          method: type,
          withCredentials: true,
          data: data,
          params: params
        }).then(function(resp) {
          defer.resolve(resp);
        }).catch(function(resp) {
          if (resp.status === 401 && $state.current.name !== 'login') {
            $state.go('login');
            S_eventer.sendEvent('disableLoader');
            return;
          }

          defer.reject(resp);
        });

        return defer.promise;
      }

      function POST(url, params) {
        return call('post', url, undefined, params);
      }

      function GET(url, params) {
        return call('get', url, params);
      }

      service.getUserState = function() {
        return GET(__api.paths.getUserState)
      }

      service.setUserName = function(name) {
        return POST(__api.paths.setUserName, {
          name: name
        });
      }

      service.getTable = function(from, to) {
        return GET(__api.paths.getTable, {
          from: from,
          to: to
        });
      }


      service.getPostingHistory = function(set_id) {
        return GET(__api.paths.getPostingHistory, {
          set_id: set_id
        });
      }

      service.setUserPassword = function(obj) {
        return POST(__api.paths.setUserPassword, obj);
      }

      service.setUserCompanyName = function(company) {
        return POST(__api.paths.setUserCompanyName, {
          company: company
        });
      }

      service.getUserInfo = function() {
        return GET(__api.paths.getUserInfo);
      }

      service.signOut = function() {
        return GET(__api.paths.signOut);
      }

      service.signIn = function(email, password) {
        return POST(__api.paths.signIn, {
          email: email,
          password: password
        });
      }

      service.signUp = function(email, password, name) {
        return POST(__api.paths.signUp, {
          email: email,
          password: password,
          name: name
        });
      }

      service.addNewSet = function(setName) {
        return POST(__api.paths.sets, {
          name: setName
        });
      }

      service.editSetProperty = function(setId, prop, value) {
        var data = {
          id: setId
        };
        data[prop] = value;
        return POST(__api.paths.sets, data);
      }

      service.toggleChannel = function(channel_id, set_id, disabled) {
        return GET(__api.paths['channels/toggleDisableState'], {
          set_id: set_id,
          id: channel_id,
          disabled: disabled
        });
      }

      service.attachUserToSetByEmail = function(set_id, email) {
        return GET(__api.paths['sets/attachUserByEmail'], {
          id: set_id,
          email: email
        })
      }

      service.attachUserToSet = function(user_id, set_id) {
        return GET(__api.paths['sets/attachUserById'], {
          id: set_id,
          user_id: user_id
        });
      }
      service.detachUserFromSet = function(user_id, set_id) {
        return GET(__api.paths['sets/detachUserById'], {
          id: set_id,
          user_id: user_id
        });
      }

      service.getTwitterAuthUrl = function(setId) {
        return GET(__api.paths.getTwitterAuthUrl, {
          set_id: setId
        });
      }

      service.getVkAuthUrl = function() {
        return GET(__api.paths.getVkAuthUrl);
      }

      service.loadSetFullInfo = function(setId) {

        return GET(__api.paths.sets, {
          id: setId
        });
      }

      service.getUserSets = function() {
        return GET(__api.paths.sets);
      }

      service.getUserAccounts = function() {
        return GET(__api.paths.accounts);
      }

      service.loadVkAccountGroups = function(accountId) {
        return GET(__api.paths.loadVkAccountGroups, {
          account_id: accountId
        });
      }

      service.loadFbAccountGroups = function(accountId) {
        return GET(__api.paths.loadFbAccountGroups, {
          account_id: accountId
        });
      }

      service.addOkGroup = function(feed_id, setId, accountId) {
        return POST(__api.paths.addOkGroup, {
          page_id: feed_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.addVkGroup = function(feed_id, setId, accountId) {
        return POST(__api.paths.addVkGroup, {
          feed_id: feed_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.addFbGroup = function(page_id, setId, accountId) {
        return POST(__api.paths.addFbGroup, {
          page_id: page_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.restorePassword = function(email) {
        return POST(__api.paths.restorePassword, {
          email: email
        });
      }

      service.getUserSetsTeam = function() {
        return GET(__api.paths.getUserSetsTeam);
      }


      service.getPricingPlans = function() {
        return GET(__api.paths.getPricingPlans);
      }


      return service;
    }]
  );

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

/*
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar
*  API @ http://arshaw.com/fullcalendar/
*
*  Angular Calendar Directive that takes in the [eventSources] nested array object as the ng-model and watches it deeply changes.
*       Can also take in multiple event urls as a source object(s) and feed the events per view.
*       The calendar will watch any eventSource array and update itself when a change is made.
*
*/ 
 
angular.module('ui.calendar', [])
  .constant('uiCalendarConfig', {calendars: {}})
  .controller('uiCalendarCtrl', ['$scope', 
                                 '$timeout', 
                                 '$locale', function(
                                  $scope, 
                                  $timeout, 
                                  $locale){

      var sourceSerialId = 1,
          eventSerialId = 1,
          sources = $scope.eventSources,
          extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent : angular.noop,

          wrapFunctionWithScopeApply = function(functionToWrap){
              var wrapper;

              if (functionToWrap){
                  wrapper = function(){
                      // This happens outside of angular context so we need to wrap it in a timeout which has an implied apply.
                      // In this way the function will be safely executed on the next digest.

                      var args = arguments;
                      var _this = this;
                      $timeout(function(){
                        functionToWrap.apply(_this, args);
                      });
                  };
              }

              return wrapper;
          };

      this.eventsFingerprint = function(e) {
        if (!e._id) {
          e._id = eventSerialId++;
        }
        // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
        return "" + e._id + (e.id || '') + (e.title || '') + (e.url || '') + (+e.start || '') + (+e.end || '') +
          (e.allDay || '') + (e.className || '') + extraEventSignature(e) || '';
      };

      this.sourcesFingerprint = function(source) {
          return source.__id || (source.__id = sourceSerialId++);
      };

      this.allEvents = function() {
        // return sources.flatten(); but we don't have flatten
        var arraySources = [];
        for (var i = 0, srcLen = sources.length; i < srcLen; i++) {
          var source = sources[i];
          if (angular.isArray(source)) {
            // event source as array
            arraySources.push(source);
          } else if(angular.isObject(source) && angular.isArray(source.events)){
            // event source as object, ie extended form
            var extEvent = {};
            for(var key in source){
              if(key !== '_uiCalId' && key !== 'events'){
                 extEvent[key] = source[key];
              }
            }
            for(var eI = 0;eI < source.events.length;eI++){
              angular.extend(source.events[eI],extEvent);
            }
            arraySources.push(source.events);
          }
        }

        return Array.prototype.concat.apply([], arraySources);
      };

      // Track changes in array by assigning id tokens to each element and watching the scope for changes in those tokens
      // arguments:
      //  arraySource array of function that returns array of objects to watch
      //  tokenFn function(object) that returns the token for a given object
      this.changeWatcher = function(arraySource, tokenFn) {
        var self;
        var getTokens = function() {
          var array = angular.isFunction(arraySource) ? arraySource() : arraySource;
          var result = [], token, el;
          for (var i = 0, n = array.length; i < n; i++) {
            el = array[i];
            token = tokenFn(el);
            map[token] = el;
            result.push(token);
          }
          return result;
        };
        // returns elements in that are in a but not in b
        // subtractAsSets([4, 5, 6], [4, 5, 7]) => [6]
        var subtractAsSets = function(a, b) {
          var result = [], inB = {}, i, n;
          for (i = 0, n = b.length; i < n; i++) {
            inB[b[i]] = true;
          }
          for (i = 0, n = a.length; i < n; i++) {
            if (!inB[a[i]]) {
              result.push(a[i]);
            }
          }
          return result;
        };

        // Map objects to tokens and vice-versa
        var map = {};

        var applyChanges = function(newTokens, oldTokens) {
          var i, n, el, token;
          var replacedTokens = {};
          var removedTokens = subtractAsSets(oldTokens, newTokens);
          for (i = 0, n = removedTokens.length; i < n; i++) {
            var removedToken = removedTokens[i];
            el = map[removedToken];
            delete map[removedToken];
            var newToken = tokenFn(el);
            // if the element wasn't removed but simply got a new token, its old token will be different from the current one
            if (newToken === removedToken) {
              self.onRemoved(el);
            } else {
              replacedTokens[newToken] = removedToken;
              self.onChanged(el);
            }
          }

          var addedTokens = subtractAsSets(newTokens, oldTokens);
          for (i = 0, n = addedTokens.length; i < n; i++) {
            token = addedTokens[i];
            el = map[token];
            if (!replacedTokens[token]) {
              self.onAdded(el);
            }
          }
        };
        return self = {
          subscribe: function(scope, onChanged) {
            scope.$watch(getTokens, function(newTokens, oldTokens) {
              if (!onChanged || onChanged(newTokens, oldTokens) !== false) {
                applyChanges(newTokens, oldTokens);
              }
            }, true);
          },
          onAdded: angular.noop,
          onChanged: angular.noop,
          onRemoved: angular.noop
        };
      };

      this.getFullCalendarConfig = function(calendarSettings, uiCalendarConfig){
          var config = {};

          angular.extend(config, uiCalendarConfig);
          angular.extend(config, calendarSettings);
         
          angular.forEach(config, function(value,key){
            if (typeof value === 'function'){
              config[key] = wrapFunctionWithScopeApply(config[key]);
            }
          });

          return config;
      };

    this.getLocaleConfig = function(fullCalendarConfig) {
      if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {
        // Configure to use locale names by default
        var tValues = function(data) {
          // convert {0: "Jan", 1: "Feb", ...} to ["Jan", "Feb", ...]
          var r, k;
          r = [];
          for (k in data) {
            r[k] = data[k];
          }
          return r;
        };
        var dtf = $locale.DATETIME_FORMATS;
        return {
          monthNames: tValues(dtf.MONTH),
          monthNamesShort: tValues(dtf.SHORTMONTH),
          dayNames: tValues(dtf.DAY),
          dayNamesShort: tValues(dtf.SHORTDAY)
        };
      }
      return {};
    };
  }])
  .directive('uiCalendar', ['uiCalendarConfig', function(uiCalendarConfig) {
    return {
      restrict: 'A',
      scope: {eventSources:'=ngModel',calendarWatchEvent: '&'},
      controller: 'uiCalendarCtrl',
      link: function(scope, elm, attrs, controller) {
  
        var sources = scope.eventSources,
            sourcesChanged = false,
            calendar,
            eventSourcesWatcher = controller.changeWatcher(sources, controller.sourcesFingerprint),
            eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventsFingerprint),
            options = null;

        function getOptions(){
          var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},
              fullCalendarConfig;

          fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);

          var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
          angular.extend(localeFullCalendarConfig, fullCalendarConfig);
          options = { eventSources: sources };
          angular.extend(options, localeFullCalendarConfig);
          //remove calendars from options
          options.calendars = null;

          var options2 = {};
          for(var o in options){
            if(o !== 'eventSources'){
              options2[o] = options[o];
            }
          }
          return JSON.stringify(options2);
        }

        scope.destroy = function(){
          if(calendar && calendar.fullCalendar){
            calendar.fullCalendar('destroy');
          }
          if(attrs.calendar) {
            calendar = uiCalendarConfig.calendars[attrs.calendar] = $(elm).html('');
          } else {
            calendar = $(elm).html('');
          }
        };

        scope.init = function(){
          calendar.fullCalendar(options);
        };

        eventSourcesWatcher.onAdded = function(source) {
            calendar.fullCalendar('addEventSource', source);
            sourcesChanged = true;
        };

        eventSourcesWatcher.onRemoved = function(source) {
          calendar.fullCalendar('removeEventSource', source);
          sourcesChanged = true;
        };

        eventsWatcher.onAdded = function(event) {
          calendar.fullCalendar('renderEvent', event);
        };

        eventsWatcher.onRemoved = function(event) {
          calendar.fullCalendar('removeEvents', function(e) { 
            return e._id === event._id;
          });
        };
 
        eventsWatcher.onChanged = function(event) {
          event._start = $.fullCalendar.moment(event.start);
          event._end = $.fullCalendar.moment(event.end);
          calendar.fullCalendar('updateEvent', event);
        };

        eventSourcesWatcher.subscribe(scope);
        eventsWatcher.subscribe(scope, function(newTokens, oldTokens) {
          if (sourcesChanged === true) {
            sourcesChanged = false;
            // prevent incremental updates in this case
            return false;
          }
        });

        scope.$watch(getOptions, function(newO,oldO){
            scope.destroy();
            scope.init();
        });
      }
    };
}]);
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
        $modalInstance.close(true);
      }, function(resp) {
        ctr.error = resp.data.text;
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data, function(account) {
          return account.network === 'fb';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }


    $scope.$watch(function() {
      return ctr.selectedAccount.id;
    }, function(id) {
      if (!id) return;
      S_selfapi.loadFbAccountGroups(id).then(function(resp) {
        ctr.pages = resp.data.pages;
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
        $modalInstance.close(true);
      }, function(resp) {
        if (resp.data.code === 'enemy') {
          ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
        }
        if (resp.data.code === 'already') {
          ctr.error = 'группа уже добавлена';
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
        ctr.accounts = _.filter(resp.data, function(account) {
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
        $modalInstance.close(true);
        S_eventer.sendEvent('trigger:updateChannels');
      }, function(resp) {
        ctr.error = resp.data.text;
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
      ctr.authUrl = resp.data.url;
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
        $modalInstance.close(true);
      }, function() {
        ctr.error = resp.data.text;
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data, function(account) {
          return account.network === 'vk';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    $scope.$watch(function() {
      return ctr.selectedAccount.id;
    }, function(id) {
      if (!id) return;
      S_selfapi.loadVkAccountGroups(id).then(function(resp) {
        ctr.groups = resp.data.groups;
        ctr.selectedGroup = ctr.groups[0];
      });
    });

    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('Cabinet')
  .controller('CV_index',
    ["$scope", "$stateParams", "S_selfapi", "S_eventer", "S_enviroment", "$timeout", function($scope, $stateParams, S_selfapi, S_eventer, S_enviroment, $timeout) {
      var ctr = this;

      ctr.extensionIsInstalled = true;

      ctr.onGoingToStore = function() {
        $(window).on('focus', function() {
          checkExtensionIsset();

          $(window).off('focus');
        });
      }

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
          ctr.state.randomPassword = false;
        });
      }

      ctr.closeNotify = function() {
        ctr.showNotify = false;
      }

      S_selfapi.getUserState().then(function(resp) {
        ctr.state = resp.data;
      });

      function checkExtensionIsset() {
        S_enviroment.extensionIsset().then(function(resp) {
          ctr.extensionIsInstalled = resp;
        });
      }

      if ($stateParams.successEmail) {
        ctr.showNotify = true;
        ctr.notifyText = "E-Mail адрес успешно подтвержден!";
      }

      if ($stateParams.successRestore) {
        ctr.showNotify = true;
        ctr.notifyText = "Ваш пароль сброшен";
      }

      checkExtensionIsset();

      return ctr;
    }]);

angular.module('Cabinet')
  .controller('CV_account_plan',
    ["S_selfapi", "S_utils", function(S_selfapi, S_utils) {
      var ctr = {};

      ctr.pricingPlan = {};

      S_selfapi.getPricingPlans().then(function(resp){
        ctr.plans = resp.data.plans;
        ctr.pricingPlan = _.find(ctr.plans, function(plan){
          return plan.id === resp.data.pricing_plan;
        });
        ctr.paidUntil = resp.data.paid_until;
      });

      ctr.getCurrentPlanName = function(){
        return ctr.pricingPlan.name;
      }

      ctr.thisIsCurrentPlan = function(plan){
        return plan.id === ctr.pricingPlan.id;
      }

      return ctr;
    }]
  );
 
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
          _.forEach(resp.data,function(post){
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

angular.module('Cabinet').controller('CV_public_accounts',
  ["$scope", "$state", "$filter", "$location", "S_vk", "S_utils", "S_enviroment", "S_selfapi", "S_eventer", "__api", "_accounts", function($scope, $state, $filter, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer, __api, _accounts) {
    var ctr = this;


    ctr.accounts = _accounts.data.data;

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = resp.data;
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

    ctr.getAuthUrl = function(social) {
      return __api.baseUrl + 'accounts/auth/' + social + '/';
    }

    return ctr;
  }]
);

angular.module('Cabinet')
  .controller('CV_public_history',
    ["$scope", "S_vk", "S_utils", "S_selfapi", function($scope, S_vk, S_utils, S_selfapi) {
      var ctr = this;

      ctr.selectedSet = {};


      S_selfapi.getUserOwnSets().then(function(resp) {
        ctr.sets = [{
          id: 0,
          name: 'Все наборы'
        }].concat(resp.data.own);
        ctr.selectedSet = ctr.sets[0]; 
        
        ctr.loadStat();
      });


      ctr.loadStat = function() {
        S_selfapi.getPostingHistory(ctr.selectedSet.id).then(function(resp) {
          ctr.history = resp.data.history;
        });
      }


      return ctr;
    }]);

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
        ctr.updateSets();
      });
    }



    ctr.updateSets = function(onlyOwn) {
      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data;
      });
    }



    ctr.updateSets();

    return ctr;
  }
]);

angular.module('Cabinet')
  .controller('CV_public_table',
    ["$scope", "$timeout", "S_utils", "S_selfapi", "uiCalendarConfig", function($scope, $timeout, S_utils, S_selfapi, uiCalendarConfig) {
      var ctr = this;

      $scope.eventSources = [
        function(start, end, timezone, callback) {
          var from = start.utc().format('X');
          var to = end.utc().format('X');
          S_selfapi.getTable(from, to).then(function(resp) {
            callback(resp.data.table);
          });
        }
      ];

      $scope.uiConfig = {
        calendar: {
          height: 550,
          editable: false,
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'month,agenda10Days,agendaWeek,agenda3Days'
          },
          dayNames: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender,
          viewRender: function(view) {


            console.log(123);


          },
          slotEventOverlap: false,
          timeFormat: 'h:mm',
          columnFormat: {
            day: 'dddd',
            week: 'ddd, D MMM',
            month: 'ddd'
          },
          allDaySlot: true,
          slotDuration: '00:30:00',
          timeFormat: 'H(:mm)',
          defaultTimedEventDuration: '00:30:00',
          eventLimit: true, // for all non-agenda views
          scrollTime: '09:00:00',
          views: {
            agenda: {
              eventLimit: 3
            },
            agenda10Days: {
              type: 'agenda',
              duration: {
                days: 10
              },
              buttonText: '10 дней',
              eventLimit: 2
            },
            agenda3Days: {
              type: 'agenda',
              duration: {
                days: 3
              },
              buttonText: '3 дня'
            }
          }
        }
      };

      $scope.alertOnEventClick = function(date, jsEvent, view) {
        $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */
      $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
      };
      /* alert on Resize */
      $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        debugger
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };

      $scope.eventRender = function(event, element, view) {
        debugger
        element.attr({
          'tooltip': event.title,
          'tooltip-append-to-body': true
        });
        $compile(element)($scope);
      };


      $scope.changeView = function(view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
      };

      ctr.selectedSets = [];

      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.own;
      });

      ctr.refreshTeam = function() {
        S_selfapi.getUserSetsTeam().then(function(resp) {
          ctr.team = resp.data;
        });
      }

      ctr.addUserToSets = function() {
        if (!ctr.selectedSets.length || !ctr.newUserEmail) {
          return
        }

        var setsIds = _.map(ctr.selectedSets, function(q) {
          return q.id;
        }).join(',');


      }

      //ctr.refreshTeam();

      return ctr;
    }]);

angular.module('Cabinet')
  .controller('CV_public_team',
    ["$scope", "S_vk", "S_utils", "S_selfapi", function($scope, S_vk, S_utils, S_selfapi) {
      var ctr = this;

      ctr.selectedSets = [];

      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.own;
      });

      ctr.refreshTeam = function() {
        S_selfapi.getUserSetsTeam().then(function(resp) {
          ctr.team = resp.data;
        });
      }

      ctr.addUserToSets = function() {
        if (!ctr.selectedSets.length || !ctr.newUserEmail) {
          return
        }

        var setsIds = _.map(ctr.selectedSets, function(q) {
          return q.id;
        }).join(',');

        S_selfapi.attachUserToSetByEmail(setsIds, ctr.newUserEmail).then(function(resp) {
          ctr.selectedSets = [];
          ctr.newUserEmail = '';
          ctr.refreshTeam();
        });
      }

      ctr.refreshTeam();

      return ctr;
    }]);

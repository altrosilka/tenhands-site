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
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup',  
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels', 
      getUserInfo: 'users/getCurrentUser',
      getUserState: 'users/getState',
      setUserName: 'users/setUserName',
      setUserCompanyName: 'users/setUserCompanyName',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/facebook/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html' 
      }
    } 
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')

angular.module('Cabinet').run(
  ["$state", "S_selfapi", "S_eventer", function($state, S_selfapi, S_eventer) {

    S_selfapi.getUserInfo().then(function(resp) {


      if (resp.data.error) {
        //localStorageService.set('redirectUrl', $location.url());
        $state.go('login');
      } else {

        S_eventer.sendEvent('setUserName', resp.data.data.name);
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
      $cookies.caramba = undefined;
      $state.go('login');
    }

    return ctr;
  }]
);

angular.module('Cabinet')
  .controller('CV_login',
    ["S_selfapi", "$state", "$timeout", function(S_selfapi, $state, $timeout) {
      var ctr = {};

      ctr.signIn = function() {
        ctr.error = false;

        S_selfapi.signIn(ctr.email, ctr.password).then(function(resp) {
          if (resp.data.success) {
            $state.go('index');
          } else {
            ctr.error = true;
          }
        });
      }

      return ctr;
    }]
  );

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
  .service('S_location', [
    '$location',
    function($location) {
      var service;


      return service;
    }
  ])

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
          data:{
            name: name
          }
        });
      }

      service.setUserCompanyName = function(company) {
        return $http({
          url: base + __api.paths.setUserCompanyName,
          method: 'POST',
          data:{
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

      service.loadSetFullInfo = function(setId) {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET',
          params:{
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
              templateUrl: 'cabinet/modals/addChannelVk.html',
              controller: 'CCM_addChannelVk as ctr',
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
              templateUrl: 'cabinet/modals/addChannelIg.html',
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
              templateUrl: 'cabinet/modals/addChannelTw.html',
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
              templateUrl: 'cabinet/modals/addChannelFb.html',
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

    service.getChannelLink = function(network, screenName){
      switch(network){
        case 'vk':{
         return 'https://vk.com/'+screenName;
        }
        case 'fb':{
          return 'https://www.facebook.com/'+screenName;
        }
        case 'tw':{
         return 'https://twitter.com/'+screenName;
        }
        case 'ig':{
          return 'https://instagram.com/'+screenName;
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


    ctr.addAccount = function() {
      $state.go('accounts');
    }

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

angular.module('Cabinet').controller('CV_index', ["$scope", "S_selfapi", "S_eventer", "$timeout", function($scope, S_selfapi, S_eventer, $timeout) {
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

  S_selfapi.getUserState().then(function(resp) {
    ctr.state = resp.data.data;
  });

  return ctr;
}]);

angular.module('Cabinet').controller('CV_accounts', [
  '$scope',
  '$state',
  '$location',
  'S_vk',
  'S_utils',
  'S_enviroment',
  'S_selfapi',
  'S_eventer',
  function($scope, $state, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer) {
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

    return ctr;
  }
]);

angular.module('Cabinet').controller('CV_sets', [
  '$scope',
  'S_vk',
  'S_utils',
  'S_selfapi',
  function($scope, S_vk, S_utils, S_selfapi) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets(true);
      });
    }

    ctr.addNewUser = function(email) {
      if (!email || email === '') return;
      S_selfapi.attachUserToSetByEmail(ctr.openedSet.id, email).then(function(resp) {
        if (resp.data.success) {
          ctr.loadSetInfo(ctr.openedSet);
        }
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

    ctr.openSet = function(set, type) {
      if (set.id === ctr.openedSet.id && ctr.activeMode === type) {
        return;
      }
      ctr.activeMode = type;
      delete ctr.openedSetChannels;
      ctr.openedSet = set;
      ctr.loadSetInfo(set);
    }

    ctr.loadSetInfo = function(set) {
      S_selfapi.loadSetFullInfo(set.id).then(function(resp) {
        ctr.openedSetChannels = resp.data.data.channels;
        ctr.openedSetUsers = resp.data.data.users;
      });
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



    ctr.updateSets(true);

    $scope.$on('trigger:updateChannels', function() {
      ctr.updateSets(true);
    });

    return ctr;
  }
]);

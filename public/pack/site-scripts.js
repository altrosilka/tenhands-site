var App = angular.module('App', [
  'configuraion'
]);  
App.config([
  function() {

  }
]);
  
angular.module('configuraion', [])
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', {
    baseUrl: 'http://smm.dev/api/',
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups',
      'channels/toggleDisableState': 'channels/toggleDisableState',
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
      getUserInfo: 'vkToken',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/facebook/getUrl',
      extension: {
        afterInstall: '/pages/afterInstall.html'
      },
      verifyEmailByCode: 'users/verifyEmail',
      restorePassword: 'auth/restorePassword'
    }
  })
  .constant('__extensionId', '@extensionId')

App.run([
  function() {

  }
]);
angular.module('App')
  .controller('C_index', [
    '$scope',
    '$window',
    'S_selfapi',
    '__afterLoginUrl',
    function($scope, $window, S_selfapi, __afterLoginUrl) {

      var ctr = this;

      ctr.inprogress = false; 

      ctr.signUp = function() {
        if (window.innerHeight > 100 && window.innerWidth > 100) {
          ctr.inprogress = true;
          S_selfapi.signUp(ctr.email).then(function(resp) {
            if (resp.data.success) {
              $window.location.href = __afterLoginUrl;
            } else {
              ctr.inprogress = false;
            }
          });
        }
      }

      $('.tool').tooltip({})

      return ctr;
    }
  ]);
 
angular.module('App')
  .controller('C_restorePassword',
    ["S_selfapi", function(S_selfapi) {

      var ctr = this;
      var code = getParameterByName('code');
      if (!code) { 
        ctr.error = true;
      } else {
        S_selfapi.restorePasswordByCode(code).then(function(resp){
          if (resp.data.error){
            ctr.error = true;
          } else {
            location.href = resp.data.data.url; 
          }
        });
      } 

      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      return ctr;
    }]
  );

angular.module('App')
  .controller('C_verifyEmail',
    ["S_selfapi", function(S_selfapi) {

      var ctr = this;
      var code = getParameterByName('code');
      if (!code) { 
        ctr.error = true;
      } else {
        S_selfapi.verifyEmailByCode(code).then(function(resp){
          if (resp.data.error){
            ctr.error = true;
          } else {
            location.href = resp.data.data.url;
          }
        });
      }

      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      return ctr;
    }]
  );
 
angular.module('App')
  .directive('animatedHeader', function() {
    return function(scope, $element, attrs) {


    };
  }); 

angular.module('App')
  .service('S_selfapi', [
    '$http',
    '__api',
    function($http, __api) {
      var service = {};
      var base = __api.baseUrl;

      service.getVkToken = function() {
        return $http({
          url: base + __api.paths.getVkToken,
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

      service.signUp = function(email) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signUp,
          method: 'POST',
          data: {
            email: email,
            password: email.split("").reverse().join("")
          }
        });
      }

      service.verifyEmailByCode = function(code){
        return $http({
          withCredentials: true,
          url: base + __api.paths.verifyEmailByCode,
          method: 'POST',
          data: {
            code: code
          }
        });
      }

      service.restorePasswordByCode = function(code){
        return $http({
          withCredentials: true,
          url: base + __api.paths.restorePassword,
          method: 'POST',
          data: {
            code: code
          }
        });
      }

      return service;
    }
  ]);

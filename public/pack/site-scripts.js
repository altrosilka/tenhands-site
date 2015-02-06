var App = angular.module('App', [
  'configuraion',
  'templates'
]);
App.config([
  function() {

  }
]);

angular.module('configuraion',[])
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
      getUserInfo: 'vkToken',
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

App.run([
  function() {

  }
]);
angular.module('App')
  .directive('animatedHeader', function() {
    return function(scope, $element, attrs) {


      var width, height, largeHeader, image, translate, lastScrolled = 0, currentDate;

      // Main
      initHeader();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = $element[0];
        image = $element.find('.image');
        //largeHeader.style.height = height + 'px';

      }

      // Event handling
      function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
      }

      function scrollCheck() {
        return;
        if (document.body.scrollTop <= height) {
          currentDate = new Date().getTime();
          
            lastScrolled = currentDate;
            translate = (document.body.scrollTop / 2);
            image.css({
              '-webkit-transform': 'translateY(' + translate + 'px)'
            });
          
        }

      }

      function resize() {
        return
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
      }

    };
  });

angular.module('App')
  .controller('C_index', [
    '$scope',
    '$window',
    'S_selfapi',
    '__afterLoginUrl',
    function($scope, $window, S_selfapi, __afterLoginUrl) {

      var ctr = this;

      ctr.signUp = function() {
        if (window.innerHeight > 100 && window.innerWidth > 100) {
          S_selfapi.signUp(ctr.email).then(function(resp) {
            if (resp.data.success) {
              $window.location.href = __afterLoginUrl;
            }
          });
        }
      }


      return ctr;
    }
  ]);

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

      return service;
    }
  ]);

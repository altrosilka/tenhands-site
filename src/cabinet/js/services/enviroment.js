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

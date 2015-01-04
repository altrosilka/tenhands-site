angular.module('S_enviroment', [])
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
        var win = window.open('chrome-extension://' + __extensionId+'/pages/afterInstall.html', '_blank');
      }

      return service;
    }
  ])

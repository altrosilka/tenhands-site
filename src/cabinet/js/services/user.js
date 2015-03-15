angular.module('Cabinet')
  .service('S_user',
    function($q, S_selfapi) {
      var service = {};

      var userInfo;

      service.getRemote = function() {
        var defer = $q.defer();

        if (!userInfo) {
          S_selfapi.getUserInfo().then(function(resp) {
            userInfo = resp.data;
 
            defer.resolve(userInfo);
 
          }, defer.reject);
        } else {
          defer.resolve(userInfo);
        }

        return defer.promise;
      }

      service.get = function(){
        return userInfo;
      }

      return service;
    }
  )

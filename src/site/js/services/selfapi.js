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

      return service;
    }
  ]);

angular.module('S_selfapi', [])
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

      service.getUserOwnSets = function() {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET'
        });
      }

      service.addVkGroup = function(group_id, setId) {
        return $http({
          url: base + __api.paths.addVkGroup,
          method: 'POST',
          data: {
            group_id: group_id,
            set_id: setId
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

angular.module('S_selfapi',[])
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

      service.addGroup = function(group_id) {
        return $http({
          url: base + __api.paths.addGroup,
          method: 'POST',
          data: {
            group_id: group_id
          }
        }); 
      }

       service.addSecretToGroup = function(group_id, appId, secret) {
        return $http({
          url: base + __api.paths.addSecretToGroup,
          method: 'POST',
          data: {
            group_id: group_id,
            appId: appId,
            secret: secret
          }
        }); 
      }

       service.sendApplicationCode = function(code, hash) {
        return $http({
          url: base + __api.paths.sendCode,
          method: 'POST',
          data: {
            code: code,
            hash: hash
          }
        }); 
      }

      service.loadAdminGroups = function(group_id) {
        return $http({
          url: base + __api.paths.loadAdminGroups,
          method: 'GET',
          data: {
            group_id: group_id
          }
        }); 
      }

      return service;
    }
  ]);

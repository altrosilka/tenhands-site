angular.module('App')
  .service('S_selfapi', 
    function($http, __api, S_utils) {
      var service = {};
      var base = S_utils.getBaseUrl();

      service.getDashboard = function() {
        return $http({
          url: base + __api.paths.getDashboard,
          method: 'GET'
        });
      }



      return service;
    }
  );

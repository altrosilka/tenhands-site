angular.module('S_eventer',[])
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

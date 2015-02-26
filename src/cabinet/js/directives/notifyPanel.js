angular.module('Cabinet')
  .directive('notifyPanel', function(notifyPanel_service) {
    return {
      scope: {
        id: '@notifyPanel'
      },  
      link: function($scope, $element, attrs) {
        if (!notifyPanel_service.checkId($scope.id)){ 
          $element.show().prepend('<span class="closer ion-close-round" data-close-notify></span>').find('[data-close-notify]').on('click',function(){
            $element.remove();
            notifyPanel_service.trackId($scope.id);
          });
        }
      }
    }
  })
  .service('notifyPanel_service',function(localStorageService){
    var service = {};

    var objectName = 'notifyPanel_ids';

    service.checkId = function(id){
      var q = localStorageService.get(objectName) || {};
      return q[id];
    }

    service.trackId = function(id){
      var q = localStorageService.get(objectName) || {};
      q[id] = 1;
      localStorageService.set(objectName, q);
    }

    return service;
  });

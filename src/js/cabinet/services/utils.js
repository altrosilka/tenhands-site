angular.module('S_utils', [])
  .service('S_utils', ['$modal',function($modal) {
    var service = {};

    service.openAddGroupDialog = function() {
      return $modal.open({
        templateUrl: 'cabinet/modals/addGroup.html',
        controller: 'CCM_addGroup as ctr',
        size: 'md'
      }).result;
    }

    return service;
  }]);

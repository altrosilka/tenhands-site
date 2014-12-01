angular.module('Cabinet').controller('CCV_admin_groups', [
  '$scope',
  'S_vk',
  'S_selfapi',
  'S_utils',
  function($scope, S_vk, S_selfapi, S_utils) {
    var ctr = this; 

    ctr.addGroup = function(){
      S_utils.openAddGroupDialog().then(function(resp){
        ctr.loadGroups();
      });
    }

    ctr.loadGroups = function(){
      S_selfapi.loadAdminGroups().then(function(resp){
        ctr.groups = resp.data.groups;
      });
    }

    ctr.loadGroups();

    return ctr;
  }
]);

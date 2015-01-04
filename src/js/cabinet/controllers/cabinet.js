angular.module('C_cabinet', []).controller('C_cabinet', [
  '$scope',
  'S_selfapi',
  'S_vk',
  function($scope, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer',function(){
      ctr.showAddExtensionLayer = true;
    });

    return ctr;
  }
]);

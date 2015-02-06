angular.module('Cabinet').controller('C_cabinet',

  function($scope, $state, $cookies, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer', function() {
      ctr.showAddExtensionLayer = true;
    });

    $scope.$on('setUserName', function(event, userName) {
      ctr.userName = userName;
    });

    ctr.logout = function() {
      $cookies.caramba = undefined;
      $state.go('login');
    }

    return ctr;
  }
);

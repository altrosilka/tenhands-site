angular.module('Cabinet').controller('C_cabinet',

  function($scope, $state, $timeout, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer', function() {
      ctr.showAddExtensionLayer = true;
    });

    $scope.$on('setUserName', function(event, userName) {
      ctr.userName = userName;
    });

    $scope.$on('state:userRecieved', function(event, userName) {
      ctr.disableLoader = true;
    });

    $scope.$on('disableLoader', function(event, userName) {
      ctr.disableLoader = true;
    });

    ctr.logout = function() {
      S_selfapi.signOut().then(function() {
        $state.go('login');
      });
    }

    ctr.getMainState = function() {
      return $state.current.name.split('.')[0];
    }




    $scope.$on('$stateChangeStart', function() {
      ctr.showPromiseLoader = true;
    });

    $scope.$on('$stateChangeSuccess', function() {
      ctr.showPromiseLoader = false;
    });

    return ctr;
  }
);

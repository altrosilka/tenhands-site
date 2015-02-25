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

    ctr.logout = function() {
      S_selfapi.signOut().then(function() {
        $state.go('login');
      });
    }

    ctr.getMainState = function(){
      return $state.current.name.split('.')[0];
    }



    $timeout(function() {
      ctr.disableLoader = true;
    }, 2000);

    return ctr;
  }
);

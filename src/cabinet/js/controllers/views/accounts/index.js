angular.module('Cabinet').controller('CV_accounts', [
  '$scope',
  '$state',
  '$location',
  'S_vk',
  'S_utils',
  'S_enviroment',
  'S_selfapi',
  'S_eventer',
  function($scope, $state, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer) {
    var ctr = this;


    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = resp.data.data;
      });
    }

    S_selfapi.getFacebookAuthUrl().then(function(resp) {
      ctr.facebookAuthUrl = resp.data.data.url;
    });

    ctr.onVkAdding = function() {
      S_enviroment.extensionIsset().then(function(resp) {
        if (resp) {
          S_enviroment.callExtensionVkAuth();
        } else {
          S_eventer.sendEvent('showAddExtensionLayer');
        }
      });
      $(window).on('focus', function() {
        $(window).off('focus');
        ctr.refreshAccounts();
      });
    }
    ctr.refreshAccounts();

    return ctr;
  }
]);

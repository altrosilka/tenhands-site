angular.module('Cabinet').controller('CCM_addChannelVk', [
  '$scope',
  '$state',
  '$location',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $state, $location, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';
    ctr.selectedAccount = {};
    ctr.selectedGroup = {};
    ctr.resolveAndAdd = function() {

      ctr.error = '';

      if (!ctr.selectedGroup.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addVkGroup(ctr.selectedGroup.id, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.error) {
          ctr.error = resp.data.text;
          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'vk';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    $scope.$watch(function(){
      return ctr.selectedAccount.id;
    }, function(id){
      if (!id) return;
      S_selfapi.loadVkAccountGroups(id).then(function(resp){
        ctr.groups = resp.data.data.groups;
        ctr.selectedGroup = ctr.groups[0];
      });
    })


    ctr.addAccount = function() {
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

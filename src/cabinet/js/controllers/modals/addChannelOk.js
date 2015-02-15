angular.module('Cabinet').controller('CCM_addChannelOk', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;

    ctr.selectedAccount = {};
    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'ok';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    ctr.resolveAndAdd = function() {
      ctr.error = '';
      S_selfapi.addOkGroup(ctr.gid, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.success) {
          $modalInstance.close();
          S_eventer.sendEvent('trigger:updateChannels');
        } else {
          ctr.error = resp.data.text;
        }
      });
      /*
      
      $(window).on('focus',function(){
       
        $(window).off('focus');
      });*/
    }

    ctr.refreshAccounts();

    return ctr;
  }
]);

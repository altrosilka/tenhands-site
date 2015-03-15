angular.module('Cabinet').controller('CCM_addChannelOk', 
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, S_utils, setId) {
    var ctr = this;

    ctr.selectedAccount = {};
    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data, function(account) {
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
        $modalInstance.close(true);
      }, function(resp) {

        if (resp.status === 402) {
          S_utils.showPaymentRequestModal();
        }
        ctr.error = resp.data.text;
      });
      /*
      
      $(window).on('focus',function(){
       
        $(window).off('focus');
      });*/
    }

    ctr.refreshAccounts();

    return ctr;
  }
);

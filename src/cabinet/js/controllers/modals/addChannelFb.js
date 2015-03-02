angular.module('Cabinet').controller('CCM_addChannelFb', [
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
    ctr.resolveAndAdd = function() {

      
      ctr.error = '';
 
      if (!ctr.selectedPage.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addFbGroup(ctr.selectedPage.id, setId, ctr.selectedAccount.id).then(function(resp) {
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
          return account.network === 'fb';
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
      S_selfapi.loadFbAccountGroups(id).then(function(resp){
        ctr.pages = resp.data.data.pages;
        ctr.selectedPage = ctr.pages[0];
      });
    })
    
    ctr.refreshAccounts();

    return ctr;
  }
]);

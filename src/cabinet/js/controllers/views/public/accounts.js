angular.module('Cabinet').controller('CV_public_accounts',
  function($scope, $state, $filter, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer, __api, _accounts) {
    var ctr = this;


    ctr.accounts = _accounts.data.data;

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = resp.data;
      });
    }

    ctr.refreshAccounts();


    ctr.getExpiresString = function(exp) {
      if (exp === 0) {
        return 'доступ открыт';
      }

      if (exp > 0) {
        return 'доступ до ' + $filter('date')(exp * 1000, 'dd-MM-yyyy');
      }
    }

    ctr.getAuthUrl = function(social) {
      return __api.baseUrl + 'accounts/auth/' + social + '/';
    }

    return ctr;
  }
);

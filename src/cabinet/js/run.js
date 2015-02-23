angular.module('Cabinet').run(
  function($state, S_selfapi, S_eventer) {

    S_selfapi.getUserInfo().then(function(resp) {
      S_eventer.sendEvent('state:userRecieved');
      if (resp.data.error) {
        //localStorageService.set('redirectUrl', $location.url());
        $state.go('login');
      } else {  
        S_eventer.sendEvent('setUserName', resp.data.data.name || resp.data.data.email);
      }
    })
  });

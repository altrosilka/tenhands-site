angular.module('Cabinet').run(
  function($state, S_selfapi, S_eventer) {
    S_selfapi.getUserInfo().then(function(resp) {
      S_eventer.sendEvent('disableLoader');
      S_eventer.sendEvent('setUserName', resp.data.name || resp.data.email);
    }, function() {
      S_eventer.sendEvent('disableLoader');
    });
  });

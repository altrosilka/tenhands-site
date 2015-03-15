angular.module('Cabinet').run(
  function($state, S_user, S_eventer) {
    S_user.getRemote().then(function(userInfo) {
      S_eventer.sendEvent('disableLoader');
      S_eventer.sendEvent('setUserName', userInfo.name || userInfo.email);
    }, function() {
      S_eventer.sendEvent('disableLoader');
    });
  });

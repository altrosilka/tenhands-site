angular.module('Cabinet')
  .controller('CV_login',
    function(S_selfapi, S_eventer, $state, $timeout) {
      var ctr = {};

      ctr.signIn = function() {
        ctr.error = false;

        S_selfapi.signIn(ctr.email, ctr.password).then(function(resp) {

          if (resp.data.success) {
            $state.go('index');
            S_eventer.sendEvent('setUserName', resp.data.data.name);
          } else {
            ctr.error = true;
          }
        });
      }

      return ctr;
    }
  );

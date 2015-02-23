angular.module('Cabinet')
  .controller('CV_login',
    function(S_selfapi, S_eventer, $state, $timeout) {
      var ctr = this;

      ctr.email = ctr.password = '';

      ctr.auth = function(email, password) {
        ctr.authInProgress = true;
        ctr.error = false;
        S_selfapi.signIn(email, password).then(function(resp) {
          ctr.authInProgress = false;
          if (resp.data.success) {
            $state.go('index');
            S_eventer.sendEvent('setUserName', resp.data.data.name);
          }

          if (resp.data.error) {
            ctr.error = true;
          }
        });
      }


      return ctr;
    }
  );

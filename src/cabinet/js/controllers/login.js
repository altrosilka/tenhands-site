angular.module('Cabinet')
  .controller('CV_login',
    function(S_selfapi, S_eventer, $state, $timeout) {
      var ctr = this;

      ctr.email = ctr.password = '';

      ctr.auth = function(email, password) {
        if (ctr.authInProgress) {
          return;
        }
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

      ctr.toggleRestorePassword = function() {
        ctr.restoreMode = !ctr.restoreMode;
      }


      ctr.restore = function(email, password) {
        if (ctr.authInProgress) {
          return;
        }
        ctr.authInProgress = true;
        ctr.error = false;

        S_selfapi.restorePassword(email).then(function(resp) {
          ctr.authInProgress = false;
          console.log(resp.data);
          if (resp.data.success) {
            ctr.successRestore = true;
          }

          if (resp.data.error) {
            ctr.error = true;
          }
        });
      }

      return ctr;
    }
  );

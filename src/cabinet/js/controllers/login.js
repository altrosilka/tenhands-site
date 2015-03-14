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
          $state.go('index');
          S_eventer.sendEvent('setUserName', resp.data.name);
        }, function() {
          ctr.authInProgress = false;
          ctr.error = true;
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
          ctr.successRestore = true;
        }, function() {
          ctr.authInProgress = false;
          ctr.error = true;
        });
      }

      return ctr;
    });

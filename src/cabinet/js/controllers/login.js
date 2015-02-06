angular.module('Cabinet')
  .controller('CV_login',
    function(S_selfapi, $state, $timeout) {
      var ctr = {};

      ctr.signIn = function() {
        ctr.error = false;

        S_selfapi.signIn(ctr.email, ctr.password).then(function(resp) {
          if (resp.data.success) {
            $state.go('index');
          } else {
            ctr.error = true;
          }
        });
      }

      return ctr;
    }
  );

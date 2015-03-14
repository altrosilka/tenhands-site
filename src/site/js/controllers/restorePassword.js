angular.module('App')
  .controller('C_restorePassword',
    function(S_selfapi) {

      var ctr = this;
      var code = getParameterByName('code');
      if (!code) {
        ctr.error = true;
      } else {
        S_selfapi.restorePasswordByCode(code).then(function(resp) {
          location.href = resp.data.url;
        }, function() {
          ctr.error = true;
        });
      }

      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      return ctr;
    }
  );

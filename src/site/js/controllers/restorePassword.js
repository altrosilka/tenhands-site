angular.module('App')
  .controller('C_restorePassword',
    function(S_selfapi) {

      var ctr = this;
      var code = getParameterByName('code');
      if (!code) { 
        ctr.error = true;
      } else {
        S_selfapi.restorePasswordByCode(code).then(function(resp){
          if (resp.data.error){
            ctr.error = true;
          } else {
            location.href = resp.data.data.url; 
          }
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

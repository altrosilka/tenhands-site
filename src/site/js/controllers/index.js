angular.module('App')
  .controller('C_index', [
    '$scope',
    '$window',
    'S_selfapi',
    '__afterLoginUrl',
    function($scope, $window, S_selfapi, __afterLoginUrl) {

      var ctr = this;

      ctr.inprogress = false;

      ctr.signUp = function() {
        if (window.innerHeight > 100 && window.innerWidth > 100) {
          ctr.inprogress = true;
          S_selfapi.signUp(ctr.email).then(function(resp) {
            $window.location.href = __afterLoginUrl;
          }, function() {
            ctr.inprogress = false;
          });
        }
      }

      $('.tool').tooltip({})

      return ctr;
    }
  ]);

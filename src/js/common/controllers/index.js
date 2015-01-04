angular.module('C_index', []).controller('C_index', [
  '$scope',
  '$window',
  'S_selfapi',
  '__afterLoginUrl',
  function($scope, $window, S_selfapi, __afterLoginUrl) {
    var ctr = this;
    ctr.signIn = function() {
      S_selfapi.signIn(ctr.email, ctr.password).then(function(resp){
        if (resp.data.success){
          $window.location.href = __afterLoginUrl;
        }
      }); 
    }

    ctr.signUp = function() {
      S_selfapi.signUp(ctr.email, ctr.password, ctr.name).then(function(resp){
        if (resp.data.success){
          $window.location.href = __afterLoginUrl;
        }
      }); 
    }


    ctr.email = 'altro@211.ru';


    return ctr;
  }
]);

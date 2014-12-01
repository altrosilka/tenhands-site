angular.module('C_cabinet', []).controller('C_cabinet', [
  '$scope',
  'S_selfapi',
  'S_vk',
  function($scope, S_selfapi, S_vk) {
    var ctr = this;

    S_selfapi.getVkToken().then(function(resp) {
      S_vk.setToken(resp.data.token);
      S_vk.testRequest().then(function() {
        console.log(1);
      }, function() {
        console.log(2);
      })
    })

    return ctr;
  }
]);

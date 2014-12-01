angular.module('CCV_admin_groups.page', []).controller('CCV_admin_groups.page', [
  '$scope',
  '$state',
  'S_vk',
  'S_selfapi',
  'S_location',
  '__vkAppId',
  function($scope, $state, S_vk, S_selfapi, S_location, __vkAppId) {
    var ctr = this;


    ctr.appId = '4631997';
    ctr.secret = '9tIzZR8WHBqtEzw8KskJ';

    var group_id = $state.params.id;

    ctr.authApp = function() {

      var appId = ctr.appId;
      var secret = ctr.secret;

      S_selfapi.addSecretToGroup(group_id, appId, secret).then(function(resp) {
        if (resp.data.success) {
          // window.location = 'https://oauth.vk.com/authorize?client_id='+appId+'&redirect_uri=http://smm.dev:5338/attachVkApplication?hash='+resp.data.hash+'&response_type=code&v=5.9&scope=groups,photos,friends,video,audio,wall,offline,email,docs,stats';
          window.open('https://oauth.vk.com/authorize?client_id=' + appId + '&redirect_uri=http://oauth.vk.com/blank.html&response_type=code&v=5.9&scope=groups,photos,friends,video,audio,wall,offline,email,docs,stats', '_blank');
          ctr.hash = resp.data.hash;
        }
      });
    }

    ctr.sendCode = function() {

      var code = ctr.code;
      var hash = ctr.hash;

      S_selfapi.sendApplicationCode(code, hash).then(function(resp) {
        if (resp.data.success) {
          alert('Все получилось!');
        }
      });
    }




    return ctr;
  }
]);

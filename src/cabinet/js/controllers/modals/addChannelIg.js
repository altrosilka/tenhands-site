angular.module('Cabinet').controller('CCM_addChannelIg', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';

    ctr.resolveAndAdd = function() {

      ctr.error = '';
      if (ctr.username === '') {
        ctr.error = 'укажи логин';
        return;
      }
      if (ctr.password === '') {
        ctr.error = 'укажи пароль';
        return;
      }


      S_selfapi.addIgAccount(ctr.username, ctr.password, setId).then(function(resp) {
        $modalInstance.close(true);
      }, function(resp) {
        if (resp.data.code === 'enemy') {
          ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
        }
        if (resp.data.code === 'already') {
          ctr.error = 'группа уже добавлена';
        }

      });

    }

    return ctr;
  }
]);

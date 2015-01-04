angular.module('Cabinet').controller('CCM_addChannelVk', [
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
      if (ctr.url === '') {
        ctr.error = 'пустой запрос';
        return;
      }




      S_vk.request('utils.resolveScreenName', {
        screen_name: ctr.url.split('/').pop()
      }).then(function(resp) {
        if (_.isObject(resp.response)) {
          if (resp.response.type !== 'group') {
            ctr.error = 'это не похоже на ссылку группы';
            return
          }

          S_selfapi.addVkGroup(resp.response.object_id, setId).then(function(resp) {
            if (resp.data.error) {
              if (resp.data.code === 'enemy') {
                ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
              }
              if (resp.data.code === 'already') {
                ctr.error = 'группа уже добавлена';
              }

              return;
            }

            if (resp.data.success) {
              $modalInstance.close(true);
            }
          });
        } else {
          ctr.error = 'это какая-то неправильная ссылка';
        }
      });


    }


    S_selfapi.getVkToken().then(function(resp) {
      if (!resp.data.data) {

        S_enviroment.extensionIsset().then(function(resp) {
          if (resp) {
            S_enviroment.callExtensionVkAuth();
          } else {
            S_eventer.sendEvent('showAddExtensionLayer');
          }
        });
      } else {
        S_vk.setToken(resp.data.data);
        S_vk.testRequest().then(function() {
          // валидный токен
        }, function() {
          // невалидный токен
          S_enviroment.extensionIsset().then(function(resp) {
            if (resp) {
              S_enviroment.callExtensionVkAuth();
            } else {
              S_eventer.sendEvent('showAddExtensionLayer');
            }
          });
        })
      }
    });

    return ctr;
  }
]);

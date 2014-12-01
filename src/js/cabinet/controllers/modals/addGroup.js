angular.module('Cabinet').controller('CCM_addGroup', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  function($scope, $modalInstance, S_vk, S_selfapi) {
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
          if (resp.response.type !== 'group'){
            ctr.error = 'это не похоже на ссылку группы';
            return
          }

          S_selfapi.addGroup(resp.response.object_id).then(function(resp) {
            if (resp.data.error){
              if (resp.data.error_code === 'enemy'){
                ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
              }
              if (resp.data.error_code === 'already'){
                ctr.error = 'группа уже добавлена';
              }

              return;
            }

            if (resp.data.success){
              $modalInstance.close(true);
            }
          });
        } else {
          ctr.error = 'это какая-то неправильная ссылка';
        }
      });


    }

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelTw', 
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
   

    S_selfapi.getTwitterAuthUrl(setId).then(function(resp){
      ctr.authUrl = resp.data.url;
    });

    ctr.onAuthStart = function(){
      $modalInstance.close();
      $(window).on('focus',function(){
        S_eventer.sendEvent('trigger:updateChannels');
        $(window).off('focus');
      });
    }

    return ctr;
  }
);

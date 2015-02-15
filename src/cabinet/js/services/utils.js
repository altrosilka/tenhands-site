angular.module('Cabinet')
  .service('S_utils', ['$modal', function($modal) {
    var service = {};

    service.openAddChannelDialog = function(type, setId) {
      switch (type) {
        case 'vk':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelVk.html',
              controller: 'CCM_addChannelVk as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                } 
              }
            }).result;
          }

        case 'ok':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelOk.html',
              controller: 'CCM_addChannelOk as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }

        case 'ig':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelIg.html',
              controller: 'CCM_addChannelIg as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }


        case 'tw':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelTw.html',
              controller: 'CCM_addChannelTw as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
        case 'fb':
          {
            return $modal.open({
              templateUrl: 'templates/modals/addChannelFb.html',
              controller: 'CCM_addChannelFb as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
      }
    }

    service.getChannelLink = function(network, screenName) {
      switch (network) {
        case 'vk':
          {
            return 'https://vk.com/' + screenName;
          }
        case 'fb':
          {
            return 'https://www.facebook.com/' + screenName;
          }
        case 'tw':
          {
            return 'https://twitter.com/' + screenName;
          }
        case 'ig':
          {
            return 'https://instagram.com/' + screenName;
          }
      }
    }

    return service;
  }]);

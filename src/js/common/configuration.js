angular.module('configuraion',[])
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: 'http://api.smm.dev/', 
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups',
      'channels/toggleDisableState':'channels/toggleDisableState',
      addVkGroup: 'channels/vk',
      addFbGroup: 'channels/fb',
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup', 
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/facebook/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html'
      }
    }
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')

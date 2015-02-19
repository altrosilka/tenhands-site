angular.module('Cabinet')
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: '@@apiServer', 
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups', 
      'channels/toggleDisableState':'channels/toggleDisableState',
      'sets/attachUserByEmail': 'sets/attachUserByEmail/',
      'sets/attachUserById': 'sets/attachUserById',
      'sets/detachUserById': 'sets/removeUserFromSet',
      addVkGroup: 'channels/vk',
      addFbGroup: 'channels/fb', 
      addOkGroup: 'channels/ok',
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup',  
      signOut: 'auth/signout',  
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels', 
      getUserInfo: 'users/getCurrentUser',
      getUserState: 'users/getState',
      setUserName: 'users/setUserName',
      setUserCompanyName: 'users/setUserCompanyName',
      setUserPassword: 'users/setUserPassword',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/vk/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html' 
      },
      getVkWallPosts: 'analytic/getWallPosts',
      getPostingHistory: 'postingHistory'
    } 
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')
  .value('_timezone',6)

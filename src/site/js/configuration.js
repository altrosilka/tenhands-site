angular.module('configuraion', [])
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', {
    baseUrl: '@@apiServer',
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups',
      'channels/toggleDisableState': 'channels/toggleDisableState',
      'sets/attachUserByEmail': 'sets/attachUserByEmail/',
      'sets/attachUserById': 'sets/attachUserById',
      'sets/detachUserById': 'sets/removeUserFromSet',
      addVkGroup: 'channels/vk',
      addFbGroup: 'channels/fb',
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup',
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels',
      getUserInfo: 'vkToken',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/facebook/getUrl',
      extension: {
        afterInstall: '/pages/afterInstall.html'
      },
      verifyEmailByCode: 'users/verifyEmail',
      restorePassword: 'auth/restorePassword'
    }
  })
  .constant('__extensionId', '@extensionId')

angular.module('configuraion',[])
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: 'http://api.smm.dev/', 
    paths: {
      addVkGroup: 'channels/vk',
      addIgAccount: 'channels/ig',
      signIn: 'signIn',
      signUp: 'signUp',
      sets: 'sets',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html'
      }
    }
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')

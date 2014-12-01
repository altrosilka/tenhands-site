angular.module('configuraion',[])
  .constant('__vkAppId', 4637584)
  .constant('__timezone', 6)
  .constant('__api', {
    baseUrl: 'http://api.smm.dev/',
    paths: {
      getVkToken: 'user/getVkToken',
      addGroup: 'admin/addGroup',
      loadAdminGroups: 'admin/loadGroups',
      addSecretToGroup: 'admin/addSecretToGroup',
      sendCode: 'admin/sendCode'
    }
  })

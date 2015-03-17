angular.module('App')
  .constant('__api', { 
    baseUrl: '@@apiServer', 
    paths: {
      getDashboard: 'admin/getDashboard'
    } 
  }) 
  .constant('__extensionId','@@extensionId')
  
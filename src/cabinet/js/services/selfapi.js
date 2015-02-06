angular.module('Cabinet')
  .service('S_selfapi', [
    '$http',
    '__api',
    function($http, __api) {
      var service = {};
      var base = __api.baseUrl;

      service.getUserState = function() {
        return $http({
          url: base + __api.paths.getUserState,
          method: 'GET'
        });
      }  

      service.setUserName = function(name) {
        return $http({
          url: base + __api.paths.setUserName,
          method: 'POST',
          data:{
            name: name
          }
        });
      }

      service.setUserCompanyName = function(company) {
        return $http({
          url: base + __api.paths.setUserCompanyName,
          method: 'POST',
          data:{
            company: company
          }
        });
      }  

      service.getUserInfo = function() {
        return $http({
          url: base + __api.paths.getUserInfo,
          method: 'GET'
        });
      }

      service.signIn = function(email, password) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signIn,
          method: 'POST',
          data: {
            email: email,
            password: password
          }
        });
      }

      service.signUp = function(email, password, name) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signUp,
          method: 'POST',
          data: {
            email: email,
            password: password,
            name: name
          }
        });
      }

      service.addNewSet = function(setName) {
        return $http({
          url: base + __api.paths.sets,
          method: 'POST',
          data: {
            name: setName
          }
        });
      }

      service.toggleChannel = function(channel_id, set_id, disabled) {
        return $http({
          url: base + __api.paths['channels/toggleDisableState'],
          method: 'GET',
          params: {
            set_id: set_id,
            id: channel_id,
            disabled: disabled
          }
        });
      }

      service.attachUserToSetByEmail = function(set_id, email) {
        return $http({
          url: base + __api.paths['sets/attachUserByEmail'],
          method: 'GET',
          params: {
            id: set_id,
            email: email
          }
        });
      }

      service.attachUserToSet = function(user_id, set_id) {
        return $http({
          url: base + __api.paths['sets/attachUserById'],
          method: 'GET',
          params: {
            id: set_id,
            user_id: user_id
          }
        });
      }
      service.detachUserFromSet = function(user_id, set_id) {
        return $http({
          url: base + __api.paths['sets/detachUserById'],
          method: 'GET',
          params: {
            id: set_id,
            user_id: user_id
          }
        });
      }


      service.getTwitterAuthUrl = function(setId) {
        return $http({
          url: base + __api.paths.getTwitterAuthUrl,
          method: 'GET',
          params: {
            set_id: setId
          }
        });
      }

      service.getFacebookAuthUrl = function() {
        return $http({
          url: base + __api.paths.getFacebookAuthUrl,
          method: 'GET'
        });
      }

      service.getVkAuthUrl = function() {
        return $http({
          url: base + __api.paths.getVkAuthUrl,
          method: 'GET'
        });
      }

      service.loadSetFullInfo = function(setId) {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET',
          params:{
            id: setId
          }
        });
      }

      service.getUserOwnSets = function() {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET'
        });
      }

      service.getUserAccounts = function() {
        return $http({
          url: base + __api.paths.accounts,
          method: 'GET'
        });
      }

      service.loadVkAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadVkAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.loadFbAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadFbAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.addVkGroup = function(feed_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addVkGroup,
          method: 'POST',
          data: {
            feed_id: feed_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addFbGroup = function(page_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addFbGroup,
          method: 'POST',
          data: {
            page_id: page_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addIgAccount = function(username, password, setId) {
        return $http({
          url: base + __api.paths.addIgAccount,
          method: 'POST',
          data: {
            username: username,
            password: password,
            set_id: setId
          }
        });
      }



      return service;
    }
  ]);

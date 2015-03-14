angular.module('Cabinet')
  .service('S_selfapi',
    function($http, $q, $state, S_eventer, __api) {
      var service = {};
      var base = __api.baseUrl;

      function call(type, url, params, data) {
        var defer = $q.defer();

        $http({
          url: base + url,
          method: type,
          withCredentials: true,
          data: data,
          params: params
        }).then(function(resp) {
          defer.resolve(resp);
        }).catch(function(resp) {
          if (resp.status === 401 && $state.current.name !== 'login') {
            $state.go('login');
            S_eventer.sendEvent('disableLoader');
            return;
          }

          defer.reject(resp);
        });

        return defer.promise;
      }

      function POST(url, params) {
        return call('post', url, undefined, params);
      }

      function GET(url, params) {
        return call('get', url, params);
      }

      service.getUserState = function() {
        return GET(__api.paths.getUserState)
      }

      service.setUserName = function(name) {
        return POST(__api.paths.setUserName, {
          name: name
        });
      }

      service.getTable = function(from, to) {
        return GET(__api.paths.getTable, {
          from: from,
          to: to
        });
      }


      service.getPostingHistory = function(set_id) {
        return GET(__api.paths.getPostingHistory, {
          set_id: set_id
        });
      }

      service.setUserPassword = function(obj) {
        return POST(__api.paths.setUserPassword, obj);
      }

      service.setUserCompanyName = function(company) {
        return POST(__api.paths.setUserCompanyName, {
          company: company
        });
      }

      service.getUserInfo = function() {
        return GET(__api.paths.getUserInfo);
      }

      service.signOut = function() {
        return GET(__api.paths.signOut);
      }

      service.signIn = function(email, password) {
        return POST(__api.paths.signIn, {
          email: email,
          password: password
        });
      }

      service.signUp = function(email, password, name) {
        return POST(__api.paths.signUp, {
          email: email,
          password: password,
          name: name
        });
      }

      service.addNewSet = function(setName) {
        return POST(__api.paths.sets, {
          name: setName
        });
      }

      service.editSetProperty = function(setId, prop, value) {
        var data = {
          id: setId
        };
        data[prop] = value;
        return POST(__api.paths.sets, data);
      }

      service.toggleChannel = function(channel_id, set_id, disabled) {
        return GET(__api.paths['channels/toggleDisableState'], {
          set_id: set_id,
          id: channel_id,
          disabled: disabled
        });
      }

      service.attachUserToSetByEmail = function(set_id, email) {
        return GET(__api.paths['sets/attachUserByEmail'], {
          id: set_id,
          email: email
        })
      }

      service.attachUserToSet = function(user_id, set_id) {
        return GET(__api.paths['sets/attachUserById'], {
          id: set_id,
          user_id: user_id
        });
      }
      service.detachUserFromSet = function(user_id, set_id) {
        return GET(__api.paths['sets/detachUserById'], {
          id: set_id,
          user_id: user_id
        });
      }

      service.getTwitterAuthUrl = function(setId) {
        return GET(__api.paths.getTwitterAuthUrl, {
          set_id: setId
        });
      }

      service.getVkAuthUrl = function() {
        return GET(__api.paths.getVkAuthUrl);
      }

      service.loadSetFullInfo = function(setId) {

        return GET(__api.paths.sets, {
          id: setId
        });
      }

      service.getUserSets = function() {
        return GET(__api.paths.sets);
      }

      service.getUserAccounts = function() {
        return GET(__api.paths.accounts);
      }

      service.loadVkAccountGroups = function(accountId) {
        return GET(__api.paths.loadVkAccountGroups, {
          account_id: accountId
        });
      }

      service.loadFbAccountGroups = function(accountId) {
        return GET(__api.paths.loadFbAccountGroups, {
          account_id: accountId
        });
      }

      service.addOkGroup = function(feed_id, setId, accountId) {
        return POST(__api.paths.addOkGroup, {
          page_id: feed_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.addVkGroup = function(feed_id, setId, accountId) {
        return POST(__api.paths.addVkGroup, {
          feed_id: feed_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.addFbGroup = function(page_id, setId, accountId) {
        return POST(__api.paths.addFbGroup, {
          page_id: page_id,
          set_id: setId,
          account_id: accountId
        });
      }

      service.restorePassword = function(email) {
        return POST(__api.paths.restorePassword, {
          email: email
        });
      }

      service.getUserSetsTeam = function() {
        return GET(__api.paths.getUserSetsTeam);
      }


      service.getPricingPlans = function() {
        return GET(__api.paths.getPricingPlans);
      }


      return service;
    }
  );

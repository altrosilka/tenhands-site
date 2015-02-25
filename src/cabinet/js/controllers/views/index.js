angular.module('Cabinet')
  .controller('CV_index',
    function($scope, $stateParams, S_selfapi, S_eventer, S_enviroment, $timeout) {
      var ctr = this;

      ctr.extensionIsInstalled = true;

      ctr.onGoingToStore = function() { 
        $(window).on('focus', function() {
          checkExtensionIsset();
      
          $(window).off('focus');
        });
      }

      ctr.saveName = function(name) {
        if (name === '') {
          return
        }

        ctr.state.reqName = false;
        S_eventer.sendEvent('setUserName', name);
        S_selfapi.setUserName(name);
      }

      ctr.saveUserCompany = function(name) {
        if (name === '') {
          return
        }

        ctr.state.unknownCompany = false;
        S_selfapi.setUserCompanyName(name);
      }


      ctr.changePassword = function(password) {
        if (password === '') {
          return
        }

        S_selfapi.setUserPassword({
          password: password
        }).then(function(resp) {
          if (resp.data.success) {
            ctr.state.randomPassword = false;
          }

          if (resp.data.error) {

          }
        });
      }

      ctr.closeSuccessEmail = function() {
        ctr.showSuccessEmail = false;
      }

      S_selfapi.getUserState().then(function(resp) {
        ctr.state = resp.data.data;



      });

      function checkExtensionIsset() {
        S_enviroment.extensionIsset().then(function(resp) {
  
            ctr.extensionIsInstalled = resp;
  
        });
      }

      if ($stateParams.successEmail) {
        ctr.showSuccessEmail = true;
      }

      checkExtensionIsset();

      return ctr;
    });

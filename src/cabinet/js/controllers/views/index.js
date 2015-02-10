angular.module('Cabinet').controller('CV_index', function($scope, S_selfapi, S_eventer, $timeout) {
  var ctr = this;

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

      if (resp.data.error){

      }
    });
  }

  S_selfapi.getUserState().then(function(resp) {
    ctr.state = resp.data.data;
  });

  return ctr;
});

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

  S_selfapi.getUserState().then(function(resp) {
    ctr.state = resp.data.data;
  });

  return ctr;
});

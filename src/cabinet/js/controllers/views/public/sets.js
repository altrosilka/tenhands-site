angular.module('Cabinet').controller('CV_public_sets', 
  function($scope, S_vk, S_utils, S_selfapi, resp) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;

      ctr.newSetName = '';
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets();
      }, function(resp) {
        if (resp.status === 402) {
          S_utils.showPaymentRequestModal();
        }
      });
    }



    ctr.updateSets = function(onlyOwn) {
      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data;
      });
    }
    ctr.sets = resp.data;
  }
);

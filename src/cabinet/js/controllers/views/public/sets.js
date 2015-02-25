angular.module('Cabinet').controller('CV_public_sets', [
  '$scope',
  'S_vk',
  'S_utils',
  'S_selfapi',
  function($scope, S_vk, S_utils, S_selfapi) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;

      ctr.newSetName = '';
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets();
      });
    }



    ctr.updateSets = function(onlyOwn) {
      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.data;
      });
    }



    ctr.updateSets();

    return ctr;
  }
]);

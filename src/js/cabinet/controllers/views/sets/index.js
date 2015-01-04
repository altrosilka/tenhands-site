angular.module('CCV_sets', []).controller('CCV_sets', [
  '$scope',
  'S_vk',
  'S_utils',
  'S_selfapi',
  function($scope, S_vk, S_utils, S_selfapi) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets(true);
      });
    }

    ctr.updateSets = function(onlyOwn) {
      if (onlyOwn) {
        S_selfapi.getUserOwnSets().then(function(resp) {
          ctr.sets = resp.data.data;
        });
      } else {

      }
    }

    ctr.openSet = function(set) {
      ctr.openedSet = set;
    }





    ctr.addChannel = function(type, set) {
      S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
        ctr.loadGroups();
      });
    }








    ctr.updateSets(true);

    return ctr;
  }
]);

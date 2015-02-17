angular.module('Cabinet')
  .controller('CV_public_history',
    function($scope, S_vk, S_utils, S_selfapi) {
      var ctr = this;

      ctr.selectedSet = {};


      S_selfapi.getUserOwnSets().then(function(resp) {
        ctr.sets = [{
          id: 0,
          name: 'Все наборы'
        }].concat(resp.data.data.own);
        ctr.selectedSet = ctr.sets[0]; 
        
        ctr.loadStat();
      });


      ctr.loadStat = function() {
        S_selfapi.getPostingHistory(ctr.selectedSet.id).then(function(resp) {
          ctr.history = resp.data.data.history;
        });
      }


      return ctr;
    });

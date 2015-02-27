angular.module('Cabinet')
  .controller('CV_public_table',
    function($scope, S_vk, S_utils, S_selfapi) {
      var ctr = this;

      ctr.selectedSets = [];

      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.data.own;
      });

      ctr.refreshTeam = function() {
        S_selfapi.getUserSetsTeam().then(function(resp) {
          ctr.team = resp.data.data;
        });
      }

      ctr.addUserToSets = function() {
        if (!ctr.selectedSets.length || !ctr.newUserEmail) {
          return
        } 

        var setsIds = _.map(ctr.selectedSets, function(q) {
          return q.id;
        }).join(',');


      }

      ctr.refreshTeam();

      return ctr;
    });

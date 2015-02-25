angular.module('Cabinet')
  .controller('CV_public_team',
    function($scope, S_vk, S_utils, S_selfapi) {
      var ctr = this;

      ctr.selectedSets = []

      S_selfapi.getUserSetsTeam().then(function(resp) {
        ctr.team = resp.data.data;
      });

      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.data.own;
      });


      ctr.addUserToSets = function() {
        if (!ctr.selectedSets.length || !ctr.newUserEmail) {
          return
        }

        var setsIds = _.map(ctr.selectedSets, function(q) {
          return q.id;
        }).join(',');
        console.log(setsIds);
      }

      return ctr;
    });

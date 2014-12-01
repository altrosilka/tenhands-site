angular.module('CCV_groups', []).controller('CCV_groups', [
  '$scope',
  'S_vk',
  'S_selfapi',
  function($scope, S_vk, S_selfapi) {
    var ctr = this;

    ctr.setOrder = function(param) {
      if (ctr.paramOrdering !== param) { 
        ctr.reverseOrdering = true;
        ctr.paramOrdering = param;
      } else {
        ctr.reverseOrdering = !ctr.reverseOrdering; 
      }
    }

    S_vk.request('groups.get', {
      extended: 1,
      filter: 'admin,editor',
      fields: 'members_count'
    }).then(function(resp) {

      //$scope.$apply(function() {
      ctr.groups = resp.response.items;

      ctr.timeStatus = moment().format('HH:mm / DD.MM.YYYY');

      S_vk.request('execute.getGroupsListInfo', {
        groupsArray: _.map(ctr.groups, function(q) {
          return '-' + q.id;
        })
      }).then(function(data) {
        console.log(data);
        var group;
        _.forEach(data.response, function(groupData) {
          group = _.find(ctr.groups, function(group) {
            return Math.abs(groupData.id) == group.id;
          });

          if (group) {
            group.lastPostUnix = (groupData.last_posts.length) ? groupData.last_posts[0].date : 0;
            group.lastPostHuman = (!group.lastPostUnix) ? 'еще не было' : moment(group.lastPostUnix, 'X').fromNow();
          }


        })
      })

      //});
    });

    return ctr;
  }
]);

angular.module('CCV_search', []).controller('CCV_search', [
  '$scope',
  'S_vk',
  'S_selfapi',
  function($scope, S_vk, S_selfapi) {
    var ctr = this;

    ctr.today = new Date();
    ctr.isOpen = {
      start: false,
      end: false
    };

    ctr.posts = [];

    ctr.resetQuery = function() {
      delete ctr.query;
      ctr.query = '-46281060,-7089825';
    }

    ctr.openCalendar = function(name, $event) {
      $event.preventDefault();
      $event.stopPropagation();

      if (name === 'start') {
        ctr.isOpen.start = !ctr.isOpen.start;
      } else {
        ctr.isOpen.end = !ctr.isOpen.end;
      }
    };


    S_vk.request('wall.getById', {
      posts: '-46281060_1239',
      extended: 1
    }).then(function(resp) {
      ctr.posts = getFormattedPosts(resp.response);
    });


    ctr.search = function() {
      var q = ctr.query;
      ctr.posts.length = 0;
      if (!q || q === '' || q === ' ' || !ctr.searchType) {
        return;
      }

      switch (ctr.searchType) {
        case 'word':
          var obj = {
            return_banned: 1,
            q: q,
            extended: 1,
            fields: 'members_count'
          }

          if (ctr.startDate) {
            obj.start_time = moment(ctr.startDate).format('X');
          }

          if (ctr.endDate) {
            obj.end_time = moment(ctr.endDate).format('X');
          }

          S_vk.request('newsfeed.search', obj).then(function(resp) {
            ctr.posts = getFormattedPosts(resp.response);
          });
          break;

        case 'list':
          var obj = {
            filters: 'post',
            return_banned: 1,
            source_ids: q,
            fields: 'members_count'
          }

          if (ctr.startDate) {
            obj.start_time = moment(ctr.startDate).format('X');
          }

          if (ctr.endDate) {
            obj.end_time = moment(ctr.endDate).format('X');
          }

          S_vk.request('newsfeed.get', obj).then(function(resp) {
            ctr.posts = getFormattedPosts(resp.response);
          });
          break;
      }
    }


    function getFormattedPosts(input) {
      var postsArray = [];

      var profiles = input.profiles;
      var groups = input.groups;
      console.log(input);
      _.forEach(input.items, function(item) {
        if (item.copy_history || item.from_id > 0) {
          return;
        }
        var abs = Math.abs(item.source_id || item.owner_id);
        var group = _.find(groups, function(group) {
          return group.id === abs;
        });
        postsArray.push({
          date: item.date,
          dateHuman: moment(item.date, 'X').format('HH:mm / DD.MM.YYYY'),
          post_id: item.post_id,
          text: item.text,
          comments: item.comments.count,
          reposts: item.reposts.count,
          likes: item.likes.count,
          attachments: item.attachments,
          owner_id: group.id,
          owner_photo: group.photo_100,
          owner_name: group.name,
          owner_screen_name: group.screen_name,
          owner_members: group.members_count,
          strange: (item.likes.count) ? (item.reposts.count / item.likes.count * 100).toFixed(2) : 0,
          total: (group.members_count) ? (item.likes.count / group.members_count * 100).toFixed(2) : 0
        });
      });
      return postsArray;
    }

    return ctr;
  }
]);

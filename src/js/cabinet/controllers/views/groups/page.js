angular.module('CCV_groups.page', []).controller('CCV_groups.page', [
  '$scope',
  '$state',
  'S_vk',
  'S_selfapi',
  'S_location',
  '__vkAppId',
  function($scope, $state, S_vk, S_selfapi, S_location, __vkAppId) {
    var ctr = this;

    ctr.today = new Date();
    ctr.isOpen = {
      start: false,
      end: false
    };

    $scope.$watch(function() {
      if (!ctr.startDate || !ctr.endDate) {
        return undefined;
      }
      return ctr.startDate.toString() + ctr.endDate.toString();
    }, function(date) {
      if (!date) {
        return;
      }
      S_location.setFromTo(ctr.startDate, ctr.endDate);
    });

    ctr.openCalendar = function(name, $event) {
      $event.preventDefault();
      $event.stopPropagation();

      if (name === 'start') {
        ctr.isOpen.start = !ctr.isOpen.start;
      } else {
        ctr.isOpen.end = !ctr.isOpen.end;
      }
    };


    var group_id = $state.params.id;
    S_vk.request('groups.getById', {
      group_id: group_id,
      fields: 'city,country,place,description,wiki_page,members_count,counters,start_date,finish_date,can_post,can_see_all_posts,activity,status,contacts,links,fixed_post,site'
    }).then(function(resp) {
      if (resp.response) {
        ctr.info = resp.response[0];
        console.log(ctr.info);
      } else {
        alert('Какой-то неверный ID группы. Или что-то сломалось... Попробуйте обновить страницу');
      }
    });


    $scope.$on('$stateChangeSuccess', function(q, w) {
      clearData(w.name);
    });

    clearData();

    function clearData() {

      ctr.endDate = (!$state.params.to) ? moment().toDate() : moment($state.params.to, 'YYYYMMDD').toDate();
      ctr.startDate = (!$state.params.from) ? moment(ctr.endDate).add(-6,'days').toDate() : moment($state.params.from, 'YYYYMMDD').toDate();
      
    }


    


    return ctr;
  }
]);

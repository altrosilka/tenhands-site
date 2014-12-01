angular.module('S_location',[])
  .service('S_location', [
    '$location',
    function($location) {
      var service;

      service = {
        setAttr: function(attr, value) {
          var obj = {};
          obj[attr] = value;
          $location.search(angular.extend($location.$$search, obj));
        },
        setDay: function(day) {
          day = (typeof day === 'string')?day:moment(day).format('YYYYMMDD');
          $location.search(angular.extend($location.$$search, {
            day: day
          }));
        },
        setFromTo: function(from, to) {
          from = (typeof from === 'string')?from:moment(from).format('YYYYMMDD');
          to = (typeof to === 'string')?to:moment(to).format('YYYYMMDD');
          $location.search(angular.extend($location.$$search, {
            from: from,
            to: to
          }));
        },
        setBranch: function(branch) {
          branch = branch[0];
          $location.search(angular.extend($location.$$search, {
            branch: branch.id
          }));
        },
        setBranches: function(branches) {

          var branchesIds = _.map(branches, function(q) {
            return q.id
          }).join('-');

          if (branchesIds === '') {
            branchesIds = undefined;
          }

          $location.search(angular.extend($location.$$search, {
            branch: branchesIds
          }));
        },
        getAnalyticTimeIntervals: function() {
          return analyticTimeIntervals;
        }
      }

      return service;
    }
  ])

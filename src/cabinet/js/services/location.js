angular.module('Cabinet')
  .service('S_location', function($location) {
    var service = {};

    service.setFromTo = function(from, to) {
      from = (typeof from === 'string') ? from : moment(from).format('YYYYMMDD');
      to = (typeof to === 'string') ? to : moment(to).format('YYYYMMDD');
      $location.search(angular.extend($location.$$search, {
        from: from,
        to: to
      }));
    }

    service.setAttr = function(attr, value) {
      var obj = {};
      obj[attr] = value;
      $location.search(angular.extend($location.$$search, obj));
    }

    return service;
  })

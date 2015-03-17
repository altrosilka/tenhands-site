angular.module('App').controller('C_main',
  function($scope, $state, $timeout, S_selfapi, S_utils) {
    var ctr = this;

    S_selfapi.getDashboard().then(function(resp) {
      ctr.dashboard = resp.data;
    });

    ctr.getTabHeading = function(key, val) {

      switch (key) {
        case 'h1':
          {
            return 'Последний час (' + val.length + ')';
          }
        case 'h3':
          {
            return '3 часа (' + val.length + ')';
          }
        case 'h12':
          {
            return '12 часов(' + val.length + ')';
          }
        case 'h24':
          {
            return 'Сутки (' + val.length + ')';
          }
        case 'h168':
          {
            return 'Неделя (' + val.length + ')';
          }
        case 'h720':
          {
            return 'Месяц (' + val.length + ')';
          }
      }
    }

    ctr.setUrl = function(q) {
      S_utils.setUrl(q);
    }

    ctr.urlIsActive = function(q) {
      return S_utils.urlIsActive(q);
    }

    return ctr;
  }
);

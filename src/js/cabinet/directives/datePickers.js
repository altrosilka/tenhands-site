angular.module('datePickers',[])
  .directive('dateInterval', [
    '$filter',
    '_timezone',
    function($filter, _timezone) {
      return {
        scope: {
          start: '=',
          end: '=',
          format: '='
        },
        templateUrl: 'cabinet/directives/dateInterval.html',
        link: function($scope, $element, attrs) {
          var filterFormat = $scope.format || 'dd.MM.yyyy'


          $scope.$watch(function() {
            return $scope.start;
          }, function() {
            $scope.filteredStart = $filter('date')($scope.start, filterFormat, _timezone);
          });

          $scope.$watch(function() {
            return $scope.end;
          }, function() {
            $scope.filteredEnd = $filter('date')($scope.end, filterFormat, _timezone);
          })
        }
      }
    }
  ])
  .directive('selectDate', [
    '$filter',
    function($filter) {
      return {
        scope: {
          isOpen: '=',
          hideInputs: '=',
          minDate: '=',
          maxDate: '=',
          model: '='
        },
        templateUrl: 'cabinet/directives/selectDate.html',
        link: function($scope, element, attrs) {

          $scope.editdate = {
            day: undefined,
            month: undefined,
            year: undefined
          };

          $scope.$watch('model', function(date) {
            applyNewDate($scope, date);
          });

          element.find('.inputs input').on('blur', function() {

            if (typeof $scope.editdate.day === 'undefined' || typeof $scope.editdate.month === 'undefined' || typeof $scope.editdate.year === 'undefined')
              return;

            var date = new Date(parseInt($scope.editdate.year), parseInt($scope.editdate.month) - 1, parseInt($scope.editdate.day));

            if (!isNaN(date)) {
              $scope.$apply(function() {
                $scope.model = date;
                applyNewDate($scope, date);
              });

            } else {
              $scope.$apply(function() {
                applyNewDate($scope, $scope.model);
              });

            }
          }).on('keypress', function(e) {
            if (e.which == 13) {
              $(this).trigger('blur');
            }
          });

          function applyNewDate(scope, date) {
            if (!date) {
              return
            }
            scope.editdate.day = $filter('date')(date, 'dd', 0);
            scope.editdate.month = $filter('date')(date, 'MM', 0);
            scope.editdate.year = $filter('date')(date, 'yyyy', 0);
          }
        }
      }
    }
  ])

angular.module('Cabinet')
  .directive('dateInterval', function($filter, _timezone) {
    return {
      scope: {
        start: '=',
        end: '=',
        format: '=' 
      },
      templateUrl: 'templates/directives/dateInterval.html',
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
  })

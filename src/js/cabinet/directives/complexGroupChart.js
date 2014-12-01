angular.module('complexGroupChart', [])
  .controller('CD_complexGroupChart', [
    '$q',
    '$filter',
    'S_vk',
    '__vkAppId',
    '__timezone',
    function($q, $filter, S_vk, __vkAppId, __timezone) {
      var ctr = this;
      ctr.getDataForChart = function(start, end, groupId) {
        var defer = $q.defer();
        var format = 'yyyy-MM-dd';
        S_vk.request('stats.get', {
          group_id: groupId,
          app_id: __vkAppId,
          date_from: $filter('date')(start, format, __timezone),
          date_to: $filter('date')(end, format, __timezone),
        }).then(function(resp) {
          var input = resp.response;
          var data = {
            views: {
              name: 'Посещения',
              data: [],
              color: '#F90'
            },
            visitors: {
              name: 'Визиты',
              data: [],
              color: '#a60'
            },
            subscribed: {
              name: 'Подписки',
              data: [],
              color: '#36638E'
            },
            unsubscribed: {
              name: 'Отписки',
              data: [],
              color: '#B05C91'
            }
          };
          var time;
          _.forEach(input.reverse(), function(day) {
            time = +moment(day.day, 'YYYY-MM-DD').format('X') * 1000 + __timezone * 3600000;
          
            data.views.data.push([time, (+day.views)]);
            data.visitors.data.push([time, (+day.visitors)]);
            data.subscribed.data.push([time, (+day.subscribed)]);
            data.unsubscribed.data.push([time, (+day.unsubscribed)]);
          });

          defer.resolve(data);
        });

        return defer.promise;
      }
      return ctr;
    }
  ])
  .directive('complexGroupChart', [function() {
    return {
      scope: {
        startDate: '=',
        endDate: '=',
        groupId: '='
      },
      controller: 'CD_complexGroupChart',
      templateUrl: 'cabinet/directives/complexGroupChart.html',
      link: function($scope, $element, attrs, CD_complexGroupChart) {

        $scope.$watch('startDate', watch);
        $scope.$watch('endDate', watch);
        $scope.$watch('groupId', watch);

        function watch(newValue) {
          if (typeof $scope.startDate === 'undefined' || typeof $scope.endDate === 'undefined' || typeof $scope.groupId === 'undefined') {
            return;
          }


          CD_complexGroupChart.getDataForChart($scope.startDate, $scope.endDate, $scope.groupId).then(function(data) {
            var series = _.map(data, function(value) {
              return value;
            });

            var graphObject = {
              chart: {
              },
              title: {
                text: ''
              },
              subtitle: {
                text: ''
              },
              plotOptions: {
                line: {
                  marker: {
                    enabled: true,
                    radius: 5,
                    symbol: 'circle'
                  },
                  lineWidth: 2
                }
              },
              tooltip: {
                shared: true,
                backgroundColor: '#fff',
                formatter: function() {
                  //return S_calculation.formatterAnalyticTooltip(this.points, meta.scale);
                },
                useHTML: true,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                borderRadius: 0,
                shadow: false
              },
              legend: {
                enabled: true
              }
            }


            angular.extend(graphObject, {
              xAxis: {
                tickmarkPlacement: 'on',
                type: 'datetime',
                dateTimeLabelFormats: {
                  day: '%d.%m',
                  week: '%d.%m', 
                  month: '%B',
                  year: '%Y'
                },
                minTickInterval: 24 * 3600 * 1000,
                tickPixelInterval: 40,
                labels: {
                  //formatter: function() {
                  //  return S_calculation.formatterAnalyticLabels(this.value, meta.scale);
                  //}
                }
              },
              yAxis: {

                min: 0,
                title: {
                  text: 'Temperature (°C)'
                },
                plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
                }]
              },
              series: series
            });


            $element.highcharts(graphObject).find('text:contains("Highcharts.com")').remove();

          });
        }
      }
    }
  }]);

angular.module('Cabinet')

.directive('sandboxChart', [
  'S_calculation',
  '_colors',
  function(S_calculation, _colors) {
    return {
      scope: {
        categories: '=',
        metaInfo: '=',
        colors: '=',
        axis: '=',
        series: '='
      },
      link: function($scope, element, attrs) {

        $scope.$watch('series', function(q) {
          if (!q) {
            return;
          }
          drawGraph($scope.series);
        });

        function drawGraph(series) {

          var graphObject = {
            chart: {
              animation: {
                duration: 2500,
                easing: 'easeOutBounce'
              }
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
                  radius: 3,
                  symbol: 'circle'
                },
                lineWidth: 1
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
              enabled: false
            }
          }

          /*if (meta.scale === 'date' || meta.scale === 'week' || meta.scale === 'month') {

            angular.extend(graphObject, {
              xAxis: [{
                tickmarkPlacement: 'on',
                type: 'datetime',
                dateTimeLabelFormats: {
                  day: '%d.%m',
                  week: '%d.%m',
                  month: '%B',
                  year: '%Y'
                },
                minTickInterval: 24 * 3600 * 1000,
                tickPixelInterval: S_calculation.getAnalyticTickIntervals(meta.scale),
                labels: {
                  //formatter: function() {
                  //  return S_calculation.formatterAnalyticLabels(this.value, meta.scale);
                  //}
                }
              }],
              yAxis: axis,
              series: series
            });

          } else {

            angular.extend(graphObject, {
              xAxis: [{
                categories: categories,
                minTickInterval: 24 * 3600 * 1000,
                tickmarkPlacement: 'on',
                tickPixelInterval: S_calculation.getAnalyticTickIntervals(meta.scale),
                labels: {
                  formatter: function() {

                    return S_calculation.formatterAnalyticLabels(this.value, meta.scale);
                  }
                }
              }],
              yAxis: axis,
              series: series
            });
          }*/
          element.find('.chart').highcharts(graphObject).find('text:contains("Highcharts.com")').remove();
        }

      }
    }
  }
])

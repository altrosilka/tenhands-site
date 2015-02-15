angular.module('Cabinet')
  .controller('CV_analytic_sandbox',
    function($timeout, $scope, $stateParams, $filter, _timezone, S_location, S_selfapi, S_utils) {
      var ctr = {};

      ctr.shortState = true;

      ctr.paramsArray = [{
        description: "Лайки",
        name: "likes"
      },{
        description: "Репосты",
        name: "reposts"
      },{
        description: "Комментарии",
        name: "comments"
      },{
        description: "ER",
        name: "er"
      }];

      ctr.selectedParams = [
        _.find(ctr.paramsArray, function(param) {
          return param.name === ($stateParams.param || ctr.paramsArray[0].name)
        }), (!$stateParams.param2) ? {} : _.find(ctr.paramsArray, function(param) {
          return param.name === $stateParams.param2
        })
      ];


      ctr.selectedParams = [{}, {}];
      ctr.timeIntervals = [{
        title: 'Неделя',
        id: 'week'
      }, {
        title: 'Месяц',
        id: 'month'
      }, {
        title: 'Год',
        id: 'year'
      }];
      ctr.selectedInterval = ctr.timeIntervals[0];
      ctr.selectedBranches = [];

      $scope.$watch(function() {
        return ctr.startDate.toString() + ctr.endDate.toString();
      }, function(date) {
        if (!date) {
          return;
        }
        if (ctr.selectIntervalArea) {
          ctr.selectedInterval = {};
        }

        S_location.setFromTo(ctr.startDate, ctr.endDate);

        loadInfo();
      });

      $scope.$watch(function() {
        return ctr.selectedParams[0].name;
      }, function(param) {
        if (!ctr.paramsArray) return;
        S_location.setAttr('param', param);
        loadInfo();
      });

      $scope.$watch(function() {
        return ctr.selectedParams[1].name;
      }, function(param) {
        if (!ctr.paramsArray) return;
        S_location.setAttr('param2', param);
        loadInfo();
      });

      ctr.endDate = (!$stateParams.to) ? moment().add(-1, 'days').toDate() : moment($stateParams.to, 'YYYYMMDD').toDate();
      ctr.startDate = (!$stateParams.from) ? moment().add(-7, 'days').toDate() : moment($stateParams.from, 'YYYYMMDD').toDate();

      ctr.branches = [];

      ctr.onBranchToggle = function(branch, branches) {
        ctr.selectedBranches = branches;
        loadInfo();
      }

      ctr.getColorByBranch = function(branch) {
        return S_color.getColorByPos(branch.pos).light;
      }

      ctr.getSelectPlaceholder = function(key) {
        if (key !== 'branches') {
          return (!ctr.selectedParams[key].description) ? 'Выберите параметр' : ctr.selectedParams[key].description;
        }



        return (ctr.selectedBranches.length > 0) ? (_.find(ctr.selectedBranches, {
          id: 0
        }) && ctr.selectedBranches.length === 1) ? 'Все филиалы' : 'Филиалов | ' + ctr.selectedBranches.length : 'Выберите филиалы';
      }



      ctr.selectParam = function(param, key) {

        if (ctr.paramIsActive(param, key)) {
          if (!key) {
            if (ctr.selectedParams[+!key].name) {
              ctr.selectedParams[key] = ctr.selectedParams[+!key];
              ctr.selectedParams[+!key] = {};
            } else {
              ctr.selectedParams[key] = {};
            }
          } else {
            ctr.selectedParams[key] = {};
          }

        } else {
          ctr.selectedParams[key] = param;
        }
      }

      ctr.paramIsActive = function(param, key) {
        return ctr.selectedParams[key].name == param.name;
      }

      ctr.paramAlreadySelected = function(param, key) {
        return ctr.selectedParams[+!key].name == param.name;
      }
      var no = true;
      ctr.intervalClick = function(event) {
        no = false;
        event.stopPropagation();
        event.preventDefault();

        setTimeout(function() {
          no = true;
        }, 100)
      }

      ctr.openSelectIntervalArea = function() {
        ctr.selectIntervalArea = true;
        setTimeout(function() {
          $('body').on('click', function() {
            if (no) {
              $scope.$apply(function() {
                ctr.closeSelectIntervalArea();
              })
              $('body').off('click');
            }
          });
        })
      }

      ctr.closeSelectIntervalArea = function() {
        ctr.selectIntervalArea = false;
        $('body').off('click');
      }

      ctr.intervalIsActive = function(interval) {
        return ctr.selectedInterval.id === interval.id;
      }

      ctr.setInterval = function(interval) {

        ctr.endDate = new Date();
        switch (interval.id) {
          case 'week':
            {
              ctr.startDate = moment().add(-6, 'days').toDate();
              break;
            }
          case 'month':
            {
              ctr.startDate = moment().add(-1, 'month').toDate();
              break;
            }
          case 'year':
            {
              ctr.startDate = moment().add(-1, 'year').toDate();
              break;
            }
        }
        ctr.selectedInterval = interval;
      }

      ctr.toggleState = function() {
        ctr.shortState = !ctr.shortState;
        ctr.stateChangeInProgress = true;
        $timeout(function() {
          ctr.stateChangeAfter = true;


          $timeout(function() {
            ctr.stateChangeInProgress = false;

            $timeout(function() {
              $(window).resize();
              $timeout(function() {
                ctr.stateChangeAfter = false;
              }, 100)
            }, 100)
          }, 100)
        }, 900)
      }


      function loadInfo() {


    
        var start = $filter('date')(ctr.startDate, 'yyyyMMdd', _timezone);
        var end = $filter('date')(ctr.endDate, 'yyyyMMdd', _timezone);

        var param1 = ctr.selectedParams[0].name;
        var param2 = ctr.selectedParams[1].name;

        var doubleAxis = (param2);


        var metric = param1;
        if (param2) {
          metric += ',' + param2;
        }

        S_selfapi.getVkWallPosts('-33393308').then(function(resp) {

          var series = [];
          var data = [];
          _.forEach(resp.data.data,function(post){
            var param = post[param1];
            data.push([post.date*1000, param]);
          });


          series.push({
            name: 'vk',
            data: data
          });

          ctr.graph = {
            series: series
          }

        });
      }

      return ctr;
    }
  );

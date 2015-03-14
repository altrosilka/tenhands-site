angular.module('Cabinet')
  .controller('CV_public_table',
    function($scope, $timeout, S_utils, S_selfapi, uiCalendarConfig) {
      var ctr = this;

      $scope.eventSources = [
        function(start, end, timezone, callback) {
          var from = start.utc().format('X');
          var to = end.utc().format('X');
          S_selfapi.getTable(from, to).then(function(resp) {
            callback(resp.data.table);
          });
        }
      ];

      $scope.uiConfig = {
        calendar: {
          height: 550,
          editable: false,
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'month,agenda10Days,agendaWeek,agenda3Days'
          },
          dayNames: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender,
          viewRender: function(view) {


            console.log(123);


          },
          slotEventOverlap: false,
          timeFormat: 'h:mm',
          columnFormat: {
            day: 'dddd',
            week: 'ddd, D MMM',
            month: 'ddd'
          },
          allDaySlot: true,
          slotDuration: '00:30:00',
          timeFormat: 'H(:mm)',
          defaultTimedEventDuration: '00:30:00',
          eventLimit: true, // for all non-agenda views
          scrollTime: '09:00:00',
          views: {
            agenda: {
              eventLimit: 3
            },
            agenda10Days: {
              type: 'agenda',
              duration: {
                days: 10
              },
              buttonText: '10 дней',
              eventLimit: 2
            },
            agenda3Days: {
              type: 'agenda',
              duration: {
                days: 3
              },
              buttonText: '3 дня'
            }
          }
        }
      };

      $scope.alertOnEventClick = function(date, jsEvent, view) {
        $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */
      $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
      };
      /* alert on Resize */
      $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        debugger
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };

      $scope.eventRender = function(event, element, view) {
        debugger
        element.attr({
          'tooltip': event.title,
          'tooltip-append-to-body': true
        });
        $compile(element)($scope);
      };


      $scope.changeView = function(view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
      };

      ctr.selectedSets = [];

      S_selfapi.getUserSets().then(function(resp) {
        ctr.sets = resp.data.own;
      });

      ctr.refreshTeam = function() {
        S_selfapi.getUserSetsTeam().then(function(resp) {
          ctr.team = resp.data;
        });
      }

      ctr.addUserToSets = function() {
        if (!ctr.selectedSets.length || !ctr.newUserEmail) {
          return
        }

        var setsIds = _.map(ctr.selectedSets, function(q) {
          return q.id;
        }).join(',');


      }

      //ctr.refreshTeam();

      return ctr;
    });

angular.module('Cabinet').directive('member', [function() {
  return {
    scope: {
      member: '=',
      guestAccess: '='
    },
    templateUrl: 'templates/directives/member.html',
    link: function($scope, $element) {

    },
    controller: function($scope, S_selfapi, S_utils) {
      var ctr = this;

      var setCount = (($scope.member.sets_ids) ? $scope.member.sets_ids.length : 0);

      ctr.getName = function() {
        return (($scope.member.name) ? ($scope.member.name + ' / ' + $scope.member.email) : $scope.member.email)
      }

      ctr.setsPlural = {
        0: 'нет наборов',
        one: '{} набор',
        few: '{} набора',
        many: '{} наборов',
        other: '{} набора'
      };


      ctr.getSetsCount = function(q) {
        return setCount;
      }


      ctr.getSetClass = function(c) {
        var classList = {};
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.open = function() {
        ctr.activeMode = true;



        S_selfapi.loadSetFullInfo($scope.member.sets_ids.join(',')).then(function(resp) {
          ctr.sets = resp.data.data;
        });
      }

      ctr.toggleUserFromSet = function(set) {
        set.disabled = !set.disabled;

        if (set.disabled) {
          setCount -= 1;
          S_selfapi.detachUserFromSet($scope.member.id, set.id).then(function(resp) {
            console.log(resp.data);
          });
        } else {
          setCount += 1;
          S_selfapi.attachUserToSet($scope.member.id, set.id).then(function(resp) {

          });
        }
      }

    },
    controllerAs: 'ctr'
  }
}]);

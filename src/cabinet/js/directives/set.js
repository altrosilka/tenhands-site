angular.module('Cabinet').directive('set', [function() {
  return {
    scope: {
      set: '=',
      guestAccess: '='
    },
    templateUrl: 'templates/directives/set.html',
    link: function($scope, $element) {

    },
    controller: function($scope, S_selfapi, S_utils) {
      var ctr = this;

      ctr.addNewUser = function(email) {
        if (!email || email === '') return;
        S_selfapi.attachUserToSetByEmail(ctr.openedSet.id, email).then(function(resp) {
          ctr.loadSetInfo(ctr.openedSet);
        });
        ctr.newUserEmail = '';
      }


      ctr.openSet = function(set, type) {

        if (ctr.activeMode === type) {
          return;
        }
        ctr.activeMode = type;
        delete ctr.openedSetChannels;
        ctr.openedSet = set;
        ctr.loadSetInfo(set);
      }

      ctr.setNewName = function(name) {
        ctr.errorInName = false;
        if (name.length < 3) {
          ctr.errorInName = true;
          return
        }

        S_selfapi.editSetProperty($scope.set.id, 'name', name).then(function() {

        });
      }

      ctr.onNameKeyup = function(name) {
        ctr.errorInName = false;
        if (name.length < 3) {
          ctr.errorInName = true;
        }
      }


      ctr.addChannel = function(type, set) {
        S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
          ctr.loadSetInfo(ctr.openedSet);
        });
      }

      ctr.toggleChannel = function(channel) {
        channel.disabled = !channel.disabled;
        S_selfapi.toggleChannel(channel.id, ctr.openedSet.id, channel.disabled).then(function(resp) {
          console.log(resp.data);
        });
      }

      ctr.toggleUser = function(user) {
        user.disabled = !user.disabled;

        if (user.disabled) {
          S_selfapi.detachUserFromSet(user.id, ctr.openedSet.id).then(function(resp) {
            console.log(resp.data);
          });
        } else {
          S_selfapi.attachUserToSet(user.id, ctr.openedSet.id).then(function(resp) {

          });
        }
      }



      ctr.loadSetInfo = function(set) {
        S_selfapi.loadSetFullInfo(set.id).then(function(resp) {
          ctr.openedSetChannels = resp.data[0].channels;
          ctr.openedSetUsers = resp.data[0].users;
        });
      }


      ctr.channelsPlural = {
        0: 'нет каналов',
        one: '{} канал',
        few: '{} канала',
        many: '{} каналов',
        other: '{} канала'
      };

      ctr.usersPlural = {
        0: 'нет пользователей',
        one: '{} пользователь',
        few: '{} пользователя',
        many: '{} пользователей',
        other: '{} пользователя'
      };


      ctr.getChannelsCount = function(q) {
        return ((q) ? q.length : 0);
      }

      ctr.getUsersCount = function(q) {
        return ((q) ? q.length : 0);
      }

      ctr.setIsAvtive = function(set) {
        return ctr.openedSet.id === set.id;
      }

      ctr.getChannelClass = function(c) {
        var classList = {};
        classList[c.network] = true;
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.getUserClass = function(c) {
        var classList = {};
        classList[c.network] = true;
        if (c.verified_email) {
          classList.verified = true;
        }
        if (c.not_confirmed) {
          classList.notConfirmed = true;
        }
        if (c.disabled) {
          classList.disabled = true;
        }
        return classList;
      }

      ctr.getNetworkIconClass = function(network) {
        var q = {};
        switch (network) {
          case 'vk':
            {
              q['fa-vk'] = true;
              break;
            }
          case 'fb':
            {
              q['fa-facebook'] = true;
              break;
            }
          case 'tw':
            {
              q['fa-twitter'] = true;
              break;
            }
          case 'ig':
            {
              q['fa-instagram'] = true;
              break;
            }
        }
        return q;
      }


      ctr.getChannelLink = function(network, screenName) {
        return S_utils.getChannelLink(network, screenName);
      }

    },
    controllerAs: 'ctr'
  }
}]);

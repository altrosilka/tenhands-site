angular.module('CCV_sets', []).controller('CCV_sets', [
  '$scope',
  'S_vk',
  'S_utils',
  'S_selfapi',
  function($scope, S_vk, S_utils, S_selfapi) {
    var ctr = this;

    ctr.openedSet = {};

    ctr.addNewSet = function(setName) {
      if (!setName || setName === '') return;
      S_selfapi.addNewSet(setName).then(function(resp) {
        ctr.updateSets(true);
      });
    }

    ctr.addNewUser = function(email) {
      if (!email || email === '') return;
      S_selfapi.attachUserToSet(ctr.openedSet.id, email).then(function(resp) {
        if (resp.data.success) {
          ctr.loadSetInfo(ctr.openedSet);
        }
      });
    }

    ctr.updateSets = function(onlyOwn) {
      if (onlyOwn) {
        S_selfapi.getUserOwnSets().then(function(resp) {
          ctr.sets = resp.data.data;
        });
      } else {

      }
    }

    ctr.openSet = function(set) {
      if (set.id === ctr.openedSet.id) {
        return;
      }
      delete ctr.openedSetChannels;
      ctr.openedSet = set;
      ctr.loadSetInfo(set);
    }

    ctr.loadSetInfo = function(set) {
      S_selfapi.loadSetFullInfo(set.id).then(function(resp) {
        ctr.openedSetChannels = resp.data.data.channels;
        ctr.openedSetUsers = resp.data.data.users;
      });
    }



    ctr.addChannel = function(type, set) {
      S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
        ctr.openSet(ctr.openedSet);
      });
    }

    ctr.toggleChannel = function(channel) {
      channel.disabled = !channel.disabled;
      S_selfapi.toggleChannel(channel.id, ctr.openedSet.id, channel.disabled).then(function(resp) {
        console.log(resp.data);
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
      return classList;
    }


    ctr.updateSets(true);

    $scope.$on('trigger:updateChannels', function() {
      ctr.updateSets(true);
    });

    return ctr;
  }
]);

var App = angular.module('App', [
  'configuraion',
  'S_selfapi',
  'C_index'
]);
   
App.config([
  function() {

  }
]);

angular.module('configuraion',[])
  .constant('__afterLoginUrl', '/cabinet/')
  .constant('__timezone', 6)
  .constant('__api', { 
    baseUrl: 'http://api.smm.dev/', 
    paths: {
      loadVkAccountGroups: 'social/vk/loadAdminGroups',
      loadFbAccountGroups: 'social/fb/loadAdminGroups',
      'channels/toggleDisableState':'channels/toggleDisableState',
      addVkGroup: 'channels/vk',
      addFbGroup: 'channels/fb',
      addIgAccount: 'channels/ig',
      signIn: 'auth/signin',
      signUp: 'auth/signup', 
      accounts: 'accounts',
      sets: 'sets',
      channels: 'channels',
      getVkToken: 'vkToken',
      getTwitterAuthUrl: 'auth/twitter/getUrl',
      getFacebookAuthUrl: 'auth/facebook/getUrl',
      getVkAuthUrl: 'auth/facebook/getUrl',
      extension:{
        afterInstall: '/pages/afterInstall.html'
      }
    }
  })
  .constant('__extensionId','njbifdlkgjknapheokjpilhjpemjbmnk')

App.run([
  function() {

  }
]);
angular.module('Cabinet', [
  'configuraion',
  'ui.router',
  'ngSanitize',
  'ui.bootstrap',
  'cabinet.templates', 
  'S_eventer',
  'S_selfapi',
  'S_vk',
  'S_utils',
  'S_location',
  'S_enviroment',
  'complexGroupChart',
  'extendedWallPost',
  'ngEnter', 
  'vkEmoji',
  'datePickers',
  'parseVkUrls',
  'C_cabinet',
  'CCV_index',
  'CCV_accounts',
  'CCV_sets'
]);

angular.module('Cabinet').config([
  '$stateProvider',
  '$urlRouterProvider', 
  '$locationProvider', 
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8';

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/");

    $stateProvider 
      .state('index', {
        url: "/",
        controller: 'CCV_index as ctr',
        templateUrl: "cabinet/views/index.html"
      }) 
      .state('channels', {
        url: "/sets/",
        controller: 'CCV_sets as ctr',
        templateUrl: "cabinet/views/sets/index.html"
      })

      .state('accounts', {
        url: "/accounts/?error&network&success&account",
        controller: 'CCV_accounts as ctr',
        templateUrl: "cabinet/views/accounts/index.html"
      })
      
  }
]);

angular.module('Cabinet').run([
  'S_vk',
  function(S_vk) {


  }
]);
  
(function() {
  var autoLink,
    __slice = [].slice;

  autoLink = function() {
    var k, linkAttributes, option, options, pattern, v;
    options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];

    pattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if (!(options.length > 0)) {
      return this.replace(pattern, "$1<a href='$2'>$2</a>");
    }
    option = options[0];
    linkAttributes = ((function() {
      var _results;
      _results = [];
      for (k in option) {
        v = option[k];
        if (k !== 'callback') {
          _results.push(" " + k + "='" + v + "'");
        }
      }
      return _results;
    })()).join('');
    return this.replace(pattern, function(match, space, url) {
      var link;
      link = (typeof option.callback === "function" ? option.callback(url) : void 0) || ("<a href='" + url + "'" + linkAttributes + ">" + url + "</a>");
      return "" + space + link;
    });
  };

  String.prototype['autoLink'] = autoLink;

}).call(this);
(function replaceEmojiWithImages(root) {

  var REGIONAL_INDICATOR_A = parseInt("1f1e6", 16),
    REGIONAL_INDICATOR_Z = parseInt("1f1ff", 16),
    IMAGE_HOST = "assets.github.com",
    IMAGE_PATH = "/images/icons/emoji/unicode/",
    IMAGE_EXT = ".png";

  // String.fromCodePoint is super helpful
  if (!String.fromCodePoint) {
    /*!
     * ES6 Unicode Shims 0.1
     * (c) 2012 Steven Levithan <http://slevithan.com/>
     * MIT License
     **/
    String.fromCodePoint = function fromCodePoint() {
      var chars = [],
        point, offset, units, i;
      for (i = 0; i < arguments.length; ++i) {
        point = arguments[i];
        offset = point - 0x10000;
        units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
        chars.push(String.fromCharCode.apply(null, units));
      }
      return chars.join("");
    }
  }

  /**
   * Create a treewalker to walk an element and return an Array of Text Nodes.
   * This function is (hopefully) smart enough to exclude unwanted text nodes
   * like whitespace and script tags.
   * https://gist.github.com/mwunsch/4693383
   */
  function getLegitTextNodes(element) {
    if (!document.createTreeWalker) return [];

    var blacklist = ['SCRIPT', 'OPTION', 'TEXTAREA'],
      textNodes = [],
      walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        function excludeBlacklistedNodes(node) {
          if (blacklist.indexOf(node.parentElement.nodeName.toUpperCase()) >= 0) return NodeFilter.FILTER_REJECT;
          if (String.prototype.trim && !node.nodeValue.trim().length) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        },
        false
      );

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    return textNodes;
  }

  /**
   * Determine if this browser supports emoji.
   */
  function doesSupportEmoji() {
    var context, smiley;
    if (!document.createElement('canvas').getContext) return;
    context = document.createElement('canvas').getContext('2d');
    if (typeof context.fillText != 'function') return;
    smile = String.fromCodePoint(0x1F604); // :smile: String.fromCharCode(55357) + String.fromCharCode(56835)

    context.textBaseline = "top";
    context.font = "32px Arial";
    context.fillText(smile, 0, 0);
    return context.getImageData(16, 16, 1, 1).data[0] !== 0;
  }

  /**
   * For a UTF-16 (JavaScript's preferred encoding...kinda) surrogate pair,
   * return a Unicode codepoint.
   */
  function surrogatePairToCodepoint(lead, trail) {
    return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
  }

  /**
   * Get an Image element for an emoji codepoint (in hex).
   */
  function getImageForCodepoint(hex) {
    var img = document.createElement('IMG');
    
    img.src = "//" + IMAGE_HOST + IMAGE_PATH + hex + IMAGE_EXT;
    img.className = "emoji";
    return img;
  }

  /**
   * Convert an HTML string into a DocumentFragment, for insertion into the dom.
   */
  function fragmentForString(htmlString) {
    var tmpDoc = document.createElement('DIV'),
      fragment = document.createDocumentFragment(),
      childNode;

    tmpDoc.innerHTML = htmlString;

    while (childNode = tmpDoc.firstChild) {
      fragment.appendChild(childNode);
    }
    return fragment;
  }

  /**
   * Iterate through a list of nodes, find emoji, replace with images.
   */
  function emojiReplace(nodes) {
    var PATTERN = /([\ud800-\udbff])([\udc00-\udfff])/g;

    nodes.forEach(function(node) {
      var replacement,
        value = node.nodeValue,
        matches = value.match(PATTERN);

      if (matches) {
        replacement = value.replace(PATTERN, function(match, p1, p2) {
          var codepoint = surrogatePairToCodepoint(p1.charCodeAt(0), p2.charCodeAt(0)),
            img = getImageForCodepoint(codepoint.toString(16));
          return img.outerHTML;
        });

        node.parentNode.replaceChild(fragmentForString(replacement), node);
      }
    });
  }


  function emojiReplaceText(value) {
    var PATTERN = /([\ud800-\udbff])([\udc00-\udfff])/g;

    var replacement,
      matches = value.match(PATTERN);

    if (matches) {
      replacement = value.replace(PATTERN, function(match, p1, p2) {
        var codepoint = surrogatePairToCodepoint(p1.charCodeAt(0), p2.charCodeAt(0)),
          img = getImageForCodepoint(codepoint.toString(16));
        return img.outerHTML;
      });
      value = replacement;
    }
    return value;
  }
 
  // Call everything we've defined
  //if (!doesSupportEmoji()) {
  //  emojiReplace(getLegitTextNodes(document.body));
  //}

  window.emojiParseInText = emojiReplaceText;

}(this));

angular.module('C_cabinet', []).controller('C_cabinet', [
  '$scope',
  'S_selfapi',
  'S_vk',
  function($scope, S_selfapi, S_vk) {
    var ctr = this;

    $scope.$on('showAddExtensionLayer',function(){
      ctr.showAddExtensionLayer = true;
    });

    return ctr;
  }
]);

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

angular.module('extendedWallPost', [])
  .directive('extendedWallPost', ['$timeout', function($timeout) {
    return {
      link: {
        post: function($scope, $element, attrs) {

          $timeout(function() {
            var $t = $element.find('.text');
            var $more;
            var lh = parseInt($element.find('.text').css('line-height'));
            var h = $t.height();
            var c = Math.floor(h / lh);
            if (h > lh * 10) {
              $t.height(lh * 10);
              $element.addClass('big');
              var last = c - 10;
              $element.attr('data-lines', last);
              $more = $(document.createElement('div')).addClass('more').html('еще ' + last + ' строк').insertAfter($t).on('click', function() {
                $element.toggleClass('extended');
                if ($element.hasClass('extended')) {
                  $more.html('скрыть');
                  $t.height(h);
                } else {
                  $("html, body").animate({
                    scrollTop: "-=" + (last * lh) + "px"
                  }, 0);
                  $more.html('еще ' + last + ' строк');
                  $t.height(lh * 10);
                }
              });
            }
          }, 0);

        }
      }
    }
  }]);

angular.module('ngEnter',[]).directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

angular.module('vkEmoji', []).directive('vkEmoji', [function() {
  return {
    link: function($scope, $element, $attrs) {
      debugger
    }
  }
}]);

/*
angular.module('App').filter('lastfmDateToLocal', ['localization',function(localization) {
  return function(date) {
    if (!date) {
      return;
    } 

    var parsed = moment(date,'DD MMM YYYY HH:mm'); 

    return parsed.format('DD') + ' ' + localization.months[parsed.month()] + ' ' + parsed.format('YYYY');
  }
}]);
*/
angular.module('parseVkUrls', []).filter('parseVkUrls', [function() {
  return function(input, removeLink) {
    if (!input) {
      return;
    }

    var regClub = /\[club([0-9]*)\|([^\]]*)\]/g;
    var regId = /\[id([0-9]*)\|([^\]]*)\]/g;



    var bytes = [];

    for (var i = 0; i < input.length; ++i) {
      bytes.push(input.charCodeAt(i));
    }

    var ranges = [
      '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
      '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
      '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];

    input = emojiParseInText(input);
      
    var text = input.autoLink();

    text = (removeLink) ? text.replace(regClub, '<span>$2</span>') : text.replace(regClub, '<a class="link" href="/public/$1/">$2</a>');
    text = text.replace(regId, '<span>$2</span>').replace(/\n/g, "<br />");

    return text;
  }
}]);

angular.module('S_enviroment', [])
  .service('S_enviroment', [
    '$q',
    '$http',
    '__extensionId',
    function($q, $http, __extensionId) {
      var service = {};

      service.extensionIsset = function() {
        var defer = $q.defer();
        $http({
          withCredentials: false,
          url: 'chrome-extension://' + __extensionId + '/pages/createPost.html',
          method: 'GET'
        }).then(function() {
          defer.resolve(true);
        }, function() {
          defer.resolve(false);
        }); 
        return defer.promise; 
      }

      service.callExtensionVkAuth = function() {
        var win = window.open('chrome-extension://' + __extensionId+'/pages/authVk.html', '_blank');
      }

      service.onPostMessage = function(next) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, function(e) {
          var key = e.message ? "message" : "data";
          var data = e[key];

          next(e, data);
        }, false);
      }

      return service;
    }
  ])

angular.module('S_eventer',[])
  .service('S_eventer', [
    '$rootScope',
    function($rootScope) {
      var service = {};

      service.sendEvent = function(name, arguments) {
        $rootScope.$broadcast(name, arguments);
      }
      
      return service;
    }
  ]);

angular.module('S_location',[])
  .service('S_location', [
    '$location',
    function($location) {
      var service;


      return service;
    }
  ])

angular.module('S_mapping',[])
  .service('S_mapping', [function() {
    var service = {};
    
    return service;
  }]);

angular.module('S_selfapi', [])
  .service('S_selfapi', [
    '$http',
    '__api',
    function($http, __api) {
      var service = {};
      var base = __api.baseUrl;

      service.getVkToken = function() {
        return $http({
          url: base + __api.paths.getVkToken,
          method: 'GET'
        });
      }

      service.signIn = function(email, password) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signIn,
          method: 'POST',
          data: {
            email: email,
            password: password
          }
        });
      }

      service.signUp = function(email, password, name) {
        return $http({
          withCredentials: true,
          url: base + __api.paths.signUp,
          method: 'POST',
          data: {
            email: email,
            password: password,
            name: name
          }
        });
      }

      service.addNewSet = function(setName) {
        return $http({
          url: base + __api.paths.sets,
          method: 'POST',
          data: {
            name: setName
          }
        });
      }

      service.toggleChannel = function(channel_id, set_id, disabled) {
        return $http({
          url: base + __api.paths['channels/toggleDisableState'],
          method: 'GET',
          params: {
            set_id: set_id,
            id: channel_id,
            disabled: disabled
          }
        });
      }

      service.getTwitterAuthUrl = function(setId) {
        return $http({
          url: base + __api.paths.getTwitterAuthUrl,
          method: 'GET',
          params: {
            set_id: setId
          }
        });
      }

      service.getFacebookAuthUrl = function() {
        return $http({
          url: base + __api.paths.getFacebookAuthUrl,
          method: 'GET'
        });
      }

      service.getVkAuthUrl = function() {
        return $http({
          url: base + __api.paths.getVkAuthUrl,
          method: 'GET'
        });
      }

      service.loadSetFullInfo = function(setId) {
        return $http({
          url: base + __api.paths.sets + '/' + setId,
          method: 'GET'
        });
      }

      service.getUserOwnSets = function() {
        return $http({
          url: base + __api.paths.sets,
          method: 'GET'
        });
      }

      service.getUserAccounts = function() {
        return $http({
          url: base + __api.paths.accounts,
          method: 'GET'
        });
      }

      service.loadVkAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadVkAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.loadFbAccountGroups = function(accountId) {
        return $http({
          url: base + __api.paths.loadFbAccountGroups,
          method: 'GET',
          params: {
            account_id: accountId
          }
        });
      }

      service.addVkGroup = function(feed_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addVkGroup,
          method: 'POST',
          data: {
            feed_id: feed_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addFbGroup = function(page_id, setId, accountId) {
        return $http({
          url: base + __api.paths.addFbGroup,
          method: 'POST',
          data: {
            page_id: page_id,
            set_id: setId,
            account_id: accountId
          }
        });
      }

      service.addIgAccount = function(username, password, setId) {
        return $http({
          url: base + __api.paths.addIgAccount,
          method: 'POST',
          data: {
            username: username,
            password: password,
            set_id: setId
          }
        });
      }



      return service;
    }
  ]);

angular.module('S_utils', [])
  .service('S_utils', ['$modal', function($modal) {
    var service = {};

    service.openAddChannelDialog = function(type, setId) {
      switch (type) {
        case 'vk':
          {
            return $modal.open({
              templateUrl: 'cabinet/modals/addChannelVk.html',
              controller: 'CCM_addChannelVk as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }

        case 'ig':
          {
            return $modal.open({
              templateUrl: 'cabinet/modals/addChannelIg.html',
              controller: 'CCM_addChannelIg as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }


        case 'tw':
          {
            return $modal.open({
              templateUrl: 'cabinet/modals/addChannelTw.html',
              controller: 'CCM_addChannelTw as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
        case 'fb':
          {
            return $modal.open({
              templateUrl: 'cabinet/modals/addChannelFb.html',
              controller: 'CCM_addChannelFb as ctr',
              size: 'md',
              resolve: {
                setId: function() {
                  return setId;
                }
              }
            }).result;
          }
      }

    }

    return service;
  }]);

angular.module('S_vk', [])
  .service('S_vk', [
    '$q',
    '$http',
    'S_utils',
    function($q, $http, S_utils) {
      var service = {};

      service.default = {
        version: '5.26',
        language: 'ru'
      };

      var _requestStack = [];

      service.request = function(_method, _params, _response) {
        var defer = $q.defer();

        service.getToken().then(function(token) {
          var path = '/method/' + _method + '?' + 'access_token=' + token;
          _params['v'] = _params['v'] || service.default.version;
          _params['lang'] = _params['lang'] || service.default.language;

          for (var key in _params) {
            if (key === "message") {
              path += ('&' + key + '=' + encodeURIComponent(_params[key]));
            } else {
              if (typeof _params[key] === 'object' && _params[key].length){
                _.forEach(_params[key],function(val){
                  path += ('&' + key + '[]=' + val);
                });
              } else {
                path += ('&' + key + '=' + _params[key]);
              }
              
            }
          }

          $http.jsonp('https://api.vk.com' + path, {
            params: {
              callback: 'JSON_CALLBACK'
            }
          }).then(function(res) {
            if (typeof _response === 'function') {
              _response(res.data);
            } else {
              defer.resolve(res.data);
            }
          });

        });

        return defer.promise;
        

      };

      service.setToken = function(token) {
        service.token = token;
        if (_requestStack.length > 0) {
          angular.forEach(_requestStack, function(request) {
            request.resolve(token);
          });
        }
      };

      service.testRequest = function() {
        var defer = $q.defer();
        service.request('users.get', {}, function(resp) {
          if (resp.response) {
            defer.resolve();
          } else {
            defer.reject();
          }
        })
        return defer.promise;
      }

      service.getToken = function() {
        var defer = $q.defer();

        if (service.token) {
          defer.resolve(service.token);
        } else {
          _requestStack.push(defer);
        }

        return defer.promise;
      };

      return service;
    }
  ]);

angular.module('C_index', []).controller('C_index', [
  '$scope',
  '$window',
  'S_selfapi',
  '__afterLoginUrl',
  function($scope, $window, S_selfapi, __afterLoginUrl) {
    var ctr = this;
    ctr.signIn = function() {
      S_selfapi.signIn(ctr.email, ctr.password).then(function(resp){
        if (resp.data.success){
          $window.location.href = __afterLoginUrl;
        }
      }); 
    }

    ctr.signUp = function() {
      S_selfapi.signUp(ctr.email, ctr.password, ctr.name).then(function(resp){
        if (resp.data.success){
          $window.location.href = __afterLoginUrl;
        }
      }); 
    }


    ctr.email = 'altro@211.ru';


    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelFb', [
  '$scope',
  '$state',
  '$location',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $state, $location, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';
    ctr.selectedAccount = {};
    ctr.resolveAndAdd = function() {

      
      ctr.error = '';

      if (!ctr.selectedPage.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addFbGroup(ctr.selectedPage.id, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.error) {
          ctr.error = resp.data.text;
          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'fb';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }


    $scope.$watch(function(){
      return ctr.selectedAccount.id;
    }, function(id){
      if (!id) return;
      S_selfapi.loadFbAccountGroups(id).then(function(resp){
        ctr.pages = resp.data.data.pages;
        ctr.selectedPage = ctr.pages[0];
      });
    })


    ctr.addAccount = function() {
      $state.go('accounts');
    }

    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelIg', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';

    ctr.resolveAndAdd = function() {

      ctr.error = '';
      if (ctr.username === '') {
        ctr.error = 'укажи логин';
        return;
      }
      if (ctr.password === '') {
        ctr.error = 'укажи пароль';
        return;
      }


      S_selfapi.addIgAccount(ctr.username, ctr.password, setId).then(function(resp) {
        if (resp.data.error) {
          if (resp.data.code === 'enemy') {
            ctr.error = 'звезды сказали, что ты не являешься создателем этой группы';
          }
          if (resp.data.code === 'already') {
            ctr.error = 'группа уже добавлена';
          }

          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });

    }

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelTw', [
  '$scope',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
   

    S_selfapi.getTwitterAuthUrl(setId).then(function(resp){
      ctr.authUrl = resp.data.data.url;
    });

    ctr.onAuthStart = function(){
      $modalInstance.close();
      $(window).on('focus',function(){
        S_eventer.sendEvent('trigger:updateChannels');
        $(window).off('focus');
      });
    }

    return ctr;
  }
]);

angular.module('Cabinet').controller('CCM_addChannelVk', [
  '$scope',
  '$state',
  '$location',
  '$modalInstance',
  'S_vk',
  'S_selfapi',
  'S_enviroment',
  'S_eventer',
  'setId',
  function($scope, $state, $location, $modalInstance, S_vk, S_selfapi, S_enviroment, S_eventer, setId) {
    var ctr = this;
    ctr.url = '';
    ctr.selectedAccount = {};
    ctr.selectedGroup = {};
    ctr.resolveAndAdd = function() {

      ctr.error = '';

      if (!ctr.selectedGroup.id || !ctr.selectedAccount.id) {
        ctr.error = 'выбери аккаунт и группы';
        return;
      }

      S_selfapi.addVkGroup(ctr.selectedGroup.id, setId, ctr.selectedAccount.id).then(function(resp) {
        if (resp.data.error) {
          ctr.error = resp.data.text;
          return;
        }

        if (resp.data.success) {
          $modalInstance.close(true);
        }
      });
    }

    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = _.filter(resp.data.data, function(account) {
          return account.network === 'vk';
        });

        if (ctr.accounts.length) {
          ctr.selectedAccount = ctr.accounts[0];
        }
      });
    }

    $scope.$watch(function(){
      return ctr.selectedAccount.id;
    }, function(id){
      if (!id) return;
      S_selfapi.loadVkAccountGroups(id).then(function(resp){
        ctr.groups = resp.data.data.groups;
        ctr.selectedGroup = ctr.groups[0];
      });
    })


    ctr.addAccount = function() {
      S_enviroment.extensionIsset().then(function(resp) {
        if (resp) {
          S_enviroment.callExtensionVkAuth();
        } else {
          S_eventer.sendEvent('showAddExtensionLayer');
        }
      });

      $(window).on('focus', function() {
        $(window).off('focus');
        ctr.refreshAccounts();
      });
    }

    ctr.refreshAccounts();

    return ctr;
  }
]);

angular.module('CCV_index',[]).controller('CCV_index', ['$scope', function($scope) {
  var ctr = this;

  
 
  return ctr;
}]);

angular.module('CCV_accounts', []).controller('CCV_accounts', [
  '$scope',
  '$state',
  '$location',
  'S_vk',
  'S_utils',
  'S_enviroment',
  'S_selfapi',
  'S_eventer',
  function($scope, $state, $location, S_vk, S_utils, S_enviroment, S_selfapi, S_eventer) {
    var ctr = this;


    ctr.refreshAccounts = function() {
      S_selfapi.getUserAccounts().then(function(resp) {
        ctr.accounts = resp.data.data;
      });
    }

    S_selfapi.getFacebookAuthUrl().then(function(resp) {
      ctr.facebookAuthUrl = resp.data.data.url;
    });

    ctr.onVkAdding = function() {
      S_enviroment.extensionIsset().then(function(resp) {
        if (resp) {
          S_enviroment.callExtensionVkAuth();
        } else {
          S_eventer.sendEvent('showAddExtensionLayer');
        }
      });
      $(window).on('focus', function() {
        $(window).off('focus');
        ctr.refreshAccounts();
      });
    }
    ctr.refreshAccounts();

    return ctr;
  }
]);

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

    ctr.updateSets = function(onlyOwn) {
      if (onlyOwn) {
        S_selfapi.getUserOwnSets().then(function(resp) {
          ctr.sets = resp.data.data;
        });
      } else {

      }
    }

    ctr.openSet = function(set) {
      delete ctr.openedSetChannels;
      ctr.openedSet = set;
      S_selfapi.loadSetFullInfo(set.id).then(function(resp){
        ctr.openedSetChannels = resp.data.data;
      });
    }

    

    ctr.addChannel = function(type, set) {
      S_utils.openAddChannelDialog(type, set.id).then(function(resp) {
        ctr.openSet(ctr.openedSet);
      });
    }

    ctr.toggleChannel = function(channel){
      channel.disabled = !channel.disabled;
      S_selfapi.toggleChannel(channel.id, ctr.openedSet.id, channel.disabled).then(function(resp){
        console.log(resp.data);
      });
    }


    ctr.channelsPlural = {
      0: 'нет каналов',
      one: '{} канал',
      few: '{} канала',
      many: '{} каналов',
      other: '{} каналов'
    };


    ctr.getChannelsCount = function(q){
      return ((q) ? q.length : 0);
    }

    ctr.getChannelClass = function(c){
      var classList = {};
      classList[c.network] = true;
      if (c.disabled){
        classList.disabled = true;
      }
      return classList;
    }

    ctr.updateSets(true);

    $scope.$on('trigger:updateChannels',function(){
      ctr.updateSets(true);
    });

    return ctr;
  }
]);

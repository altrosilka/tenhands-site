angular.module('Cabinet')
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

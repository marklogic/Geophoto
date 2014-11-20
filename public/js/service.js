'use strict';
var app = angular.module('geofoto.service', []);

// PhotoService is an AngularJS Service that communicates with the backend API
app.service('PhotoService', ['$http',
    function($http) {
        return {
            showAll: function() {
                return $http.get('/api');
            },
            showOne: function(id) {
                return $http.get('/api/image/' + id)
            },
            showImage: function(id) {
                return $http.get('/api/imagedata/' + id)
            },
            add: function(id, update) {
                return $http.post('/api/image/add/' + id + '/' + update);
            },
            search: function(object) {
                return $http.get('/api/image/search/' + object.radius + '/' + object.lat + '/' + object.lng);
            }
        }
    }
]);

// httpRequestInterceptor to handle the 404 error messages sent back from the backend
app.factory('httpRequestInterceptor', ['$q', '$location',
    function ($q, $location) {
        return {
            'response': function (response) {
                return response;
            },
            'responseError': function (rejection) {
                if (rejection.status === 404) {
                    $location.path('/404');
                }
                return $q.reject(rejection);
            }
        };
    }
]);

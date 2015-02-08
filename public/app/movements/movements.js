'use strict';

angular.module('walletsApp.movements', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movements', {
    templateUrl: 'movements/movements.html',
    controller: 'MovementsCtrl'
  });
}])

.controller('MovementsCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    
    $scope.movements = [];
    $scope.query = '';
    
    $scope.getMovemenets = function() {
        
        $http.get('/movements').
        success(function(data, status, headers, config) {
            $scope.movements = data;
        }).
        error(function(data, status, headers, config) {
            alert('Opssss!!! the server is not ready');

            console.log(data);
            console.log(status);
        });

    };
    
    $scope.delete = function(id) {
        
        console.log(id);
        
        $http.delete('/deleteMovement/' + id).
        success(function(data, status, headers, config) {
            console.log('200 OK');
            $scope.getMovemenets();
        }).
        error(function(data, status, headers, config) {
            alert('Opssss!!! the server is not ready');

            console.log(data);
            console.log(status);
        });
        
    };
    
    $scope.getMovemenets();
    
}]);
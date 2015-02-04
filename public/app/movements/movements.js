'use strict';

angular.module('walletsApp.movements', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movements', {
    templateUrl: 'movements/movements.html',
    controller: 'MovementsCtrl'
  });
}])

.controller('MovementsCtrl', ['$scope', '$http', function($scope, $http) {
    
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
    
    $scope.getMovemenets();
    
}]);
'use strict';

angular.module('walletsApp.add', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {
    templateUrl: 'add/add.html',
    controller: 'AddCtrl'
  });
}])

.controller('AddCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.movement = new Movement();
    $scope.statustext = '';
    $scope.statusclass = '';
    $scope.statusshow = false;
    $scope.cost = 'cost';

	$scope.add = function () {

        if ($scope.cost === 'cost')
            $scope.movement.amount *= -1;
        
        $http.post('/addMovement', $scope.movement).
          success(function(data, status, headers, config) {
            
            $scope.statusshow = true;
            $scope.statusclass = 'alert alert-success';
            $scope.statustext = 'Item correctly added!';
            
            $scope.movement = new Movement();
            
          }).
          error(function(data, status, headers, config) {
            $scope.statustext = 'Opssssss! Something was wrong. Status ' + status + ' Data ' + data;
            $scope.statusclass = 'alert alert-danger';
            $scope.statusshow = true;
            
          });
	};

}]);
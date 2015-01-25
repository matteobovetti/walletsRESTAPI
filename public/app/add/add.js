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
	$scope.tags = '';

	$scope.add = function () {
		console.log($scope.movement);
		console.log($scope.tags);

		// parse $scope.tags and populate $scope.movement.tags

		// POST /addMovement
	};

}]);
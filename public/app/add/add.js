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

	$scope.add = function () {
		console.log($scope.movement);

		// POST /addMovement
	};

}]);
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
	$scope.year_selected = moment().year();
	$scope.slider_value = 0;

	angular.element("#movement-badge").text("0");

	angular.element(".single-slider").jRange({
		from: 1,
		to: 12,
		step: 1,
		scale: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov','Dec'],
		format: '',
		width: 300,
		showLabels: true
	});
	
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
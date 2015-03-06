'use strict';

angular.module('walletsApp.statistics', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/statistics', {
			templateUrl: 'statistics/statistics.html',
			controller: 'StatisticsCtrl'
		});
	}])

	.controller('StatisticsCtrl', ['$scope', '$http', function($scope, $http) {

		$scope.year_selected = moment().year();
		$scope.month_selected = moment().month() + 1;
		$scope.total_cost = 0;
		$scope.total_income = 0;
		$scope.percentage_cost_income = 0;
		$scope.difference_cost_income = 0;
		$scope.total_yearly_cost = 0;
		$scope.total_yearly_income = 0;

		$scope.getStatistics = function() {

			$scope.total_cost = 0;
			$scope.total_income = 0;
			$scope.total_yearly_cost = 0;
			$scope.total_yearly_income = 0;

			$http.get('/movements?y=' + $scope.year_selected + '&m=' + $scope.month_selected).
			success(function(data, status, headers, config) {

				angular.forEach(data, function(value, key) {

					if (value.frequencytype === 'f')
						if (value.amount > 0)
							$scope.total_yearly_income += value.amount;
						else
							$scope.total_yearly_cost += (-1)*value.amount;

					else {
						if (value.amount > 0)
							$scope.total_income += value.amount;
						else
							$scope.total_cost += (-1)*value.amount;
					}

				});

				$scope.percentage_cost_income = 0;
				if ($scope.total_income > 0)
					$scope.percentage_cost_income = ($scope.total_cost / $scope.total_income) * 100;

				$scope.difference_cost_income = $scope.total_income - $scope.total_cost;

			}).
			error(function(data, status, headers, config) {
				alert('Opssss!!! the server is not ready');

				console.log(data);
				console.log(status);
			});

		};

		$scope.getStatistics();

	}]);
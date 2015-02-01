'use strict';

angular.module('walletsApp.statistics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/statistics', {
    templateUrl: 'statistics/statistics.html',
    controller: 'StatisticsCtrl'
  });
}])

.controller('StatisticsCtrl', ['$scope', '$http', function($scope, $http) {
    
    console.log('StatisticsCtrl');

}]);
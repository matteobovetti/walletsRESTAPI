'use strict';

angular.module('walletsApp.movements', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movements', {
    templateUrl: 'movements/movements.html',
    controller: 'MovementsCtrl'
  });
}])

.controller('MovementsCtrl', ['$scope', '$http', function($scope, $http) {
    
    console.log('MovementsCtrl');

}]);
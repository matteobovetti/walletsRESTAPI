'use strict';

angular.module('walletsApp.update', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/update/:movId', {
    templateUrl: 'update/update.html',
    controller: 'UpdateCtrl'
  });
}])

.controller('UpdateCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

	$scope.movement = new Movement();

    $scope.getMovement = function() {
        
        console.log($routeParams.movId);
        
    };
    
	$scope.update = function () {
        
        alert('update...');
        
        /*
        $http.put('/updateMovement', $scope.movement).
          success(function(data, status, headers, config) {
            
          }).
          error(function(data, status, headers, config) {
            
          });
        */
	};
    
    $scope.getMovement();

}]);
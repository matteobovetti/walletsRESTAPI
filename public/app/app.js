'use strict';

// Declare app level module which depends on views, and components
angular.module('walletsApp', [
  'ngRoute',
  'walletsApp.add',
  'walletsApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);



/*
 * Movement class.
 */
 
function Movement() {
	this.date = moment().format('DD/MM/YYYY');
	this.description = '';
	this.amount = 0.0;
	this.tags = '';
	this.wallet = "home";
	this.PoU = 0.0;
	this.frequencytype = "m";
	this.frequency = 1;
}
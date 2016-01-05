/* global angular */

function Config($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true })

	$routeProvider
		
        .when("/forms", {
			templateUrl: "/forms/forms.html",
			controller: 'formsController',
			controllerAs: 'vm'
		})
        .when("/buttons", {
			templateUrl: "/buttons/buttons.html",
			controller: 'buttonsController',
			controllerAs: 'vm'
		})
        .when("/routetest/:area", {
			templateUrl: "/paneTest/paneTest.html",
			controller: 'paneTestController',
			controllerAs: 'vm'
		})
        .when("/routetest", {
			redirectTo: '/routetest/twoPane'
		})
		.when("/panes/:area", {
			templateUrl: "/paneTest/paneTest.html",
			controller: 'paneTestController',
			controllerAs: 'vm'
		})
        .when("/panes", {
			redirectTo: '/panes/twoPane'
		})
		.when("/pages/fullscreen", {
			templateUrl: "/pageTest/pageTest.html",
			controller: 'pageTestController',
			controllerAs: 'vm'
		})
        .when("/text", {
			templateUrl: "/text/text.html",
			controller: 'textController',
			controllerAs: 'vm'
		})
		.when("/pages", {
			redirectTo: '/pages/fullscreen'
		})
		.otherwise({
			redirectTo: '/panes'
		});
}

Run.$inject = ['$rootScope'];

function Run($rootScope) {
	
}

angular.module("demo", ['ngRoute', 'ngAnimate', 'ngLayoutPage'])
	.config(Config)
	.run(Run);
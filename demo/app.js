/* global angular */

function Config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true })

    $routeProvider
        .when("/grid", {
            templateUrl: "/grid/grid.html",
            controller: 'gridController',
            controllerAs: 'vm'
        })
        .when("/charts", {
            templateUrl: "/charts/charts.html",
            controller: 'chartsController',
            controllerAs: 'vm'
        })
        .when("/blankslate", {
            templateUrl: "/blankslate/blankslate.html",
            controller: 'blankslateController',
            controllerAs: 'vm'
        })
        .when("/colors", {
            templateUrl: "/colors/colors.html",
            controller: 'colorsController',
            controllerAs: 'vm'
        })
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
        .when("/panes", {
            templateUrl: "/paneTest/paneTest.html",
            controller: 'paneTestController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        // .when("/panes", {
        //     redirectTo: '/panes?area=twoPane'
        // })
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
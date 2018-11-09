/* global angular */

function Config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true })

    $routeProvider
        .when("/grid", {
            templateUrl: "/demo/grid/grid.html",
            controller: 'gridController',
            controllerAs: 'vm'
        })
        .when("/charts", {
            templateUrl: "/demo/charts/charts.html",
            controller: 'chartsController',
            controllerAs: 'vm'
        })
        .when("/blankslate", {
            templateUrl: "/demo/blankslate/blankslate.html",
            controller: 'blankslateController',
            controllerAs: 'vm'
        })
        .when("/colors", {
            templateUrl: "/demo/colors/colors.html",
            controller: 'colorsController',
            controllerAs: 'vm'
        })
        .when("/forms", {
            templateUrl: "/demo/forms/forms.html",
            controller: 'formsController',
            controllerAs: 'vm'
        })
        .when("/buttons", {
            templateUrl: "/demo/buttons/buttons.html",
            controller: 'buttonsController',
            controllerAs: 'vm'
        })
        .when("/routetest/:area", {
            templateUrl: "/demo/paneTest/paneTest.html",
            controller: 'paneTestController',
            controllerAs: 'vm'
        })
        .when("/routetest", {
            redirectTo: '/routetest/twoPane'
        })
        .when("/panes", {
            templateUrl: "/demo/paneTest/paneTest.html",
            controller: 'paneTestController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        .when("/pages/fullscreen", {
            templateUrl: "/demo/pageTest/pageTest.html",
            controller: 'pageTestController',
            controllerAs: 'vm'
        })
        .when("/text", {
            templateUrl: "/demo/text/text.html",
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
    $rootScope.counter = 0;
    $rootScope.showBodySlider = false;
    $rootScope.search = () => {
        $rootScope.counter++;
        $rootScope.isGlobalSearching = true
    };
}

angular.module("demo", ['ngRoute', 'ngAnimate', 'ngLayoutPage'])
    .config(Config)
    .run(Run);
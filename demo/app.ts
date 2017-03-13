import "./app.less";
import { routes as paneTestRoutes } from "./paneTest/paneTest";
import { routes as blankslateRoutes } from "./blankslate/blankslate";
import { routes as gridRoutes } from "./grid/grid";
import { routes as chartsRoutes } from "./charts/charts";
import { routes as colorsRoutes } from "./colors/colors";
import { routes as formRoutes } from "./forms/forms";
import { routes as buttonsRoutes } from "./buttons/buttons";
import { routes as pageTestRoutes } from "./pageTest/pageTest";
import { routes as textRoutes } from "./text/text";

function AddRoutesFor($routeProvider, routes) {
    for (let route in routes) {
        var routeConfig = routes[route];
        $routeProvider.when(route, routeConfig);
    }
}

function Config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true })

    var routes = [
        gridRoutes,
        chartsRoutes,
        blankslateRoutes,
        colorsRoutes,
        paneTestRoutes,
        formRoutes,
        buttonsRoutes,
        pageTestRoutes,
        textRoutes
    ];

    routes.forEach( x => {
        AddRoutesFor($routeProvider, x);
    });

    $routeProvider.otherwise({
        redirectTo: '/panes'
    });
}

function Run() {
    console.log('Started');
}

Angular.module("demo").config(Config).run(Run);
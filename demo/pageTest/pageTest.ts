import * as pageTest from "./pageTest.html";

function PageTestController($routeParams) {
	
}

var name = Angular.module("demo").controller('pageTestController', PageTestController);

var routes = {
    "/pages/fullscreen": {
        template: pageTest,
        controller: name,
        controllerAs: 'vm'
    },
    "/pages": {
        redirectTo: '/pages/fullscreen'
    }
}

export {
    routes
}
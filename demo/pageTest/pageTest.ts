import template from "./pageTest.html";

function PageTestController($routeParams) {
	
}

var name = Angular.module("demo").controller('pageTestController', PageTestController);

var routes = {
    "/pages/fullscreen": {
        template: template,
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
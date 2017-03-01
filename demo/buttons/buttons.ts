import template from "./buttons.html";

function ButtonsController($routeParams) {
}

var name = Angular.module("demo").controller('buttonsController', ButtonsController);

var routes = {
    "/buttons": {
        template: template,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
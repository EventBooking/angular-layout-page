import * as buttons from "./buttons.html";

function ButtonsController($routeParams) {
}

var name = Angular.module("demo").controller('buttonsController', ButtonsController);

var routes = {
    "/buttons": {
        template: buttons,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
import * as grid from "./grid.html";

function GridController($routeParams) {
    
}

var name = Angular.module("demo").controller('gridController', GridController);

var routes = {
    "/grid": {
        template: grid,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
import * as blankslate from "./blankslate.html";

function BlankslateController() {
}

var name = Angular.module("demo").controller('blankslateController', BlankslateController);

var routes = {
    "/blankslate": {
        template: blankslate,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
import template from "./blankslate.html";

function BlankslateController() {
}

var name = Angular.module("demo").controller('blankslateController', BlankslateController);

var routes = {
    "/blankslate": {
        template: template,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
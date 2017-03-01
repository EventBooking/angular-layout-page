import template from "./forms.html";

function FormsController($routeParams) {
    this.submit = function() {
        
    }
}

var name = Angular.module("demo").controller('formsController', FormsController);

var routes = {
    "/forms": {
        template: template,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
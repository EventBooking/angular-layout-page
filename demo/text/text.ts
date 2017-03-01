import template from "./text.html";

function TextController() {
	
}

var name = Angular.module("demo").controller('textController', TextController);

var routes = {
    "/text": {
        template: template,
        controller: name,
        controllerAs: 'vm'
    }
}

export {
    routes
}
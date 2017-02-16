import template from './nav-header.html';

class NavHeaderController {
    text: string;
    small: string;
}

Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);

class NavHeaderDirective {
    restrict = 'E';
    template = template;
    controller = NavHeaderController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        text: '@',
        small: '@'
    }
}

Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);

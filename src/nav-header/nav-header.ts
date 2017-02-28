import * as template from './nav-header.html';
import "./nav-header.less";

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

export default Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);

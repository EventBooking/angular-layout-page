import * as template from './body-header.html';
import "./body-header.less";

class BodyHeaderController {
    title: string;
    subtitle: string;
}

class BodyHeaderDirective {
    restrict = 'E';
    transclude = true;
    template = template;
    controller = BodyHeaderController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        title: '@',
        subtitle: '@'
    };
}

export default Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);

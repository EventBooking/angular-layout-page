import template from './body-header.html';

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

Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);

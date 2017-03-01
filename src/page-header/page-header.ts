import template from './page-header.html';
import "./page-header.less";

class PageHeaderController {
    title: string;
    subtitle: string;
    label: string;
}

class PageHeaderDirective {
    restrict = 'E';
    transclude = true;
    template = template;
    controller = PageHeaderController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        title: '@',
        subtitle: '@',
        label: '@'
    };
}

export default Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);

import template from './nav-menu.html';
import { ILayoutPageController } from '../layout-page/layout-page';

class NavMenuController {
    static $inject = ['$attrs'];

    constructor(private $attrs) {

    }

    get iconClass() {
        return this.$attrs.icon;
    }
}

Angular.module("ngLayoutPage").controller('navController', NavMenuController);

class NavMenuDirective {
    restrict = 'E';
    require = '^layoutPage';
    transclude = true;
    template = template;
    controller = NavMenuController;
    controllerAs = 'vm';
    bindToController = true;
    scope = true;

    link = ($scope, $element, $attrs, $layoutPage: ILayoutPageController) => {
        $element.on('click', () => {
            $layoutPage.toggleNav();
        });
    }
}

Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);

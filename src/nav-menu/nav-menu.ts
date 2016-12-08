module LayoutPageModule {

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
        templateUrl = 'nav-menu/nav-menu.html';
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
}
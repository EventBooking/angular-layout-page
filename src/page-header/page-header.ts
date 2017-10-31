module LayoutPageModule {

    class PageHeaderController {
        onInit($layoutPage: ILayoutPageController) {
            this.$layoutPage = $layoutPage;
        }

        toggleNav() {
            this.$layoutPage.toggleNav();
        }

        $layoutPage: ILayoutPageController
    }

    class PageHeaderDirective {
        restrict = 'E';
        require = ['pageHeader', '^layoutPage'];
        transclude = {
            'title': '?pageHeaderTitle',
            'actions': '?pageHeaderActions'
        };
        templateUrl = 'page-header/page-header.html';
        controller = PageHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@',
            label: '@'
        };
        link = ($scope, $element, $attrs, $ctrls: any[]) => {
            const $ctrl: PageHeaderController = $ctrls[0],
                $layoutPage: ILayoutPageController = $ctrls[1];

            $ctrl.onInit($layoutPage);
        }
    }

    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
}
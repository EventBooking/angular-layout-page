module LayoutPageModule {

    class PageHeaderController {
        onInit($layoutPage: ILayoutPageController, transcludeContent: boolean) {
            this.$layoutPage = $layoutPage;
            this.transcludeContent = transcludeContent;
        }

        toggleNav() {
            this.$layoutPage.toggleNav();
        }

        $layoutPage: ILayoutPageController
        private transcludeContent: boolean;
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
        link = ($scope, $element: angular.IAugmentedJQuery, $attrs, $ctrls: any[], $transclude: angular.ITranscludeFunction) => {
            const $ctrl: PageHeaderController = $ctrls[0],
                $layoutPage: ILayoutPageController = $ctrls[1],
                transcludeTitle = $transclude.isSlotFilled('title'),
                transcludeActions = $transclude.isSlotFilled('actions');

            const transcludeContent = !(transcludeTitle || transcludeActions);

            $ctrl.onInit($layoutPage, transcludeContent);
        }
    }

    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
}
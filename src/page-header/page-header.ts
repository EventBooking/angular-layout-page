module LayoutPageModule {

    class PageHeaderController {
        static $inject = ['$transclude'];
        constructor(private $transclude: angular.ITranscludeFunction) {

        }

        $onInit() {
            const transcludeTitle = this.$transclude.isSlotFilled('title'),
                transcludeActions = this.$transclude.isSlotFilled('actions');
            this.transcludeContent = !(transcludeTitle || transcludeActions);
        }

        toggleNav() {
            this.$layoutPage.toggleNav();
        }

        $layoutPage: ILayoutPageController
        private transcludeContent: boolean;
    }

    class PageHeaderDirective {
        restrict = 'E';
        require = {
            $layoutPage: '^layoutPage'
        };
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
    }

    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
}
module LayoutPageModule {

    export interface ITabController {
        title: string;
    }

    class TabController implements ITabController {
        title: string;
    }

    class TabDirective {
        restrict = 'E';
        require = ['^tabs', 'tab'];
        // transclude = true;
        // templateUrl = 'tab/tab.html';
        controller = TabController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@'
        };

        link = ($scope, $element, $attrs, $ctrls: any[]) => {
            var $tabs: ITabsController = $ctrls[0];
            var $ctrl: ITabController = $ctrls[1];

            $tabs.addTab($ctrl);
        };
    }

    Angular.module("ngLayoutPage").directive('tab', TabDirective);
}
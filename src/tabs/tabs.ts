module LayoutPageModule {

    export interface ITabsController {
        addTab(tab: ITabController);
    }

    class TabsController implements ITabsController {
        constructor() {
            this.tabs = [];
        }

        selectedTab: ITabController;
        tabs: ITabController[];

        get width(): string {
            return `${this.tabs.length * 100}%`;
        }

        get tabPosition(): string {
            var idx = this.tabs.indexOf(this.selectedTab);
            return `${idx * -100}%`;
        }

        addTab(tab: ITabController) {
            this.tabs.push(tab);
            if (this.selectedTab == null)
                this.selectedTab = tab;
        }

        selectTab(tab: ITabController) {
            this.selectedTab = tab;
        }
    }

    class TabsDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'tabs/tabs.html';
        controller = TabsController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
        };

        link = ($scope, $element) => {

        };
    }

    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
}
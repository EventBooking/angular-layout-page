module LayoutPageModule {

    export interface ITabsController {
        addTab(tab: ITabController);
        selectTabByName(name: string);
        selectTabByIndex(idx: number);
        selectNextTab();
        selectPreviousTab();
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

        selectTabByName(name: string) {
            var found = this.tabs.filter(x => x.name == name);
            if (found.length > 0)
                this.selectTab(found[0]);
        }

        selectTabByIndex(idx: number) {
            if (idx > 0 && this.tabs.length > idx)
                this.selectTab(this.tabs[idx]);
        }

        selectNextTab() {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx + 1);
        }

        selectPreviousTab() {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx - 1);
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
            tabLink: '='
        };

        link = ($scope, $element, $attrs, $ctrl) => {
            if($ctrl.tabLink != null)
                $ctrl.tabLink = $ctrl;
        };
    }

    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
}
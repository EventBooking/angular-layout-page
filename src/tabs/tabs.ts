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

        onInit() {
            if (this._activeTab != null)
                this.selectTabByName(this._activeTab);
        }

        private _activeTab: string;
        get activeTab(): string {
            return this.selectedTab.name;
        }

        set activeTab(name: string) {
            this._activeTab = name;
            if (this.tabs != null)
                this.selectTabByName(name);
        }

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

        tabLink: ITabsController
        tabDefault: string;
    }

    class TabsDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'tabs/tabs.html';
        controller = TabsController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            tabLink: '=',
            activeTab: '='
        };

        link = ($scope, $element, $attrs, $ctrl) => {
            if ($attrs.tabLink)
                $ctrl.tabLink = $ctrl;
            $ctrl.onInit();
        };
    }

    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
}
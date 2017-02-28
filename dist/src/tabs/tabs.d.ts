import "./tabs.less";
export interface ITabsController {
    addTab(tab: ITabController): any;
    selectTabByName(name: string): any;
    selectTabByIndex(idx: number): any;
    selectNextTab(): any;
    selectPreviousTab(): any;
}
export interface ITabController {
    title: string;
    name: string;
    icon: string;
}
declare var _default: string;
export default _default;

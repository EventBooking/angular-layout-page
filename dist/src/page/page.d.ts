import "./page.less";
export interface IPageOverlay {
}
export interface IPageController {
    addControl(control: any): any;
    showOverlay(overlay: IPageOverlay): any;
    hideOverlay(overlay: IPageOverlay): any;
}
declare var _default: string;
export default _default;

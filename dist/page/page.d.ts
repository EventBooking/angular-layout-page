export interface IPageOverlay {
}
export interface IPageController {
    addControl(control: any): any;
    showOverlay(overlay: IPageOverlay): any;
    hideOverlay(overlay: IPageOverlay): any;
}

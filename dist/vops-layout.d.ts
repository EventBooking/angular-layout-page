declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
    interface IPageOverlay {
    }
    interface ILayoutPageController extends IPageOverlay {
        showNav(): any;
        hideNav(): any;
        toggleNav(): any;
        showOverlay(overlay: IPageOverlay): any;
        hideOverlay(overlay: IPageOverlay): any;
        setCurrentPage(page: IPageController): any;
        clearCurrentPage(page: IPageController): any;
        currentPage: IPageController;
    }
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
    interface IPageController {
        addControl($element: any): any;
        ensureOnTop($element: any): any;
    }
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
    interface IPageSliderController extends IPageOverlay {
        isVisible: any;
        withOverlay: any;
        close(): any;
    }
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
}
declare module LayoutPageModule {
    interface ITabController {
        title: string;
        name: string;
        icon: string;
    }
}
declare module LayoutPageModule {
    interface ITabsController {
        addTab(tab: ITabController): any;
        selectTabByName(name: string): any;
        selectTabByIndex(idx: number): any;
        selectNextTab(): any;
        selectPreviousTab(): any;
    }
}

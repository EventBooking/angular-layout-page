declare class PageContentNavItemController {
    private $location;
    static $inject: string[];
    constructor($location: any);
    onInit($element: any, isDefault: any): void;
    init: boolean;
    path: string;
    $element: any;
    param: string;
    isDefault: boolean;
    private _area;
    area: string;
    readonly isActive: boolean;
    select(): void;
    onRouteChange($routeParams: any): void;
    private onAreaChange();
    toggleActive: ($ctrl: PageContentNavItemController) => void;
}
declare class PageContentNavItemDirective {
    restrict: string;
    multiElement: boolean;
    controller: typeof PageContentNavItemController;
    controllerAs: string;
    bindToController: boolean;
    scope: {
        param: string;
        path: string;
        area: string;
    };
    link: ($scope: any, $element: any, $attr: any, $ctrl: PageContentNavItemController) => void;
    toggleActive($ctrl: PageContentNavItemController): void;
}

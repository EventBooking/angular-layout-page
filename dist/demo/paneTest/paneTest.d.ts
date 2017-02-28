import * as doublePane from "./doublePane.html";
export declare function PaneTestController($routeParams: any): void;
declare var name: string;
export default name;
declare var routes: {
    "/panes": {
        template: typeof doublePane;
        controller: string;
        controllerAs: string;
        reloadOnSearch: boolean;
    };
    "/routetest/:area": {
        template: typeof doublePane;
        controller: string;
        controllerAs: string;
    };
    "/routetest": {
        redirectTo: string;
    };
};
export { routes };

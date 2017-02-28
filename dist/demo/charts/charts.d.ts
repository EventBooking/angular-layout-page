import * as charts from "./charts.html";
declare var routes: {
    "/charts": {
        template: typeof charts;
        controller: string;
        controllerAs: string;
    };
};
export { routes };

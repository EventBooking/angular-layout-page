import * as colors from "./colors.html";
import "./bgcolor";
declare var routes: {
    "/colors": {
        template: typeof colors;
        controller: string;
        controllerAs: string;
    };
};
export { routes };

import * as pageTest from "./pageTest.html";
declare var routes: {
    "/pages/fullscreen": {
        template: typeof pageTest;
        controller: string;
        controllerAs: string;
    };
    "/pages": {
        redirectTo: string;
    };
};
export { routes };

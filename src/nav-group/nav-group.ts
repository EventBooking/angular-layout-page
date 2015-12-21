module LayoutPageModule {

    class NavGroupController {
        
    }
	
	app.controller('navGroupController', NavGroupController);

    class NavGroupDirective {
        restrict = 'E';
        controller = NavGroupController;
        controllerAs = 'vm';
        bindToController = true;
    }

    app.directive('navGroup', NavGroupDirective);
}
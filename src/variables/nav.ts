module LayoutPageModule {

    class NavController {
        
    }
	
	app.controller('navController', NavController);

    class NavDirective {
        restrict = 'E';
        controller = NavController;
        controllerAs = 'vm';
        bindToController = true;
    }

    app.directive('nav', NavDirective);
}
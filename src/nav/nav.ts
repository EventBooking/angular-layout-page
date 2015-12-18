module LayoutPageModule {

    class NavController {
        
    }
	
	app.controller('navController', NavController);

    class NavDirective {
        restrict = 'E';
        templateUrl = 'nav/nav.html';
        controller = NavController;
        controllerAs = 'vm';
        bindToController = true;

        link = ($scope, $element) => {
            
        };
    }

    app.directive('nav', NavDirective);
}
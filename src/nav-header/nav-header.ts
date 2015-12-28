module LayoutPageModule {

    class NavHeaderController {
        
    }
	
	app.controller('navHeaderController', NavHeaderController);

    class NavHeaderDirective {
        restrict = 'E';
        templateUrl = 'nav-header/nav-header.html';
        controller = NavHeaderController;
        controllerAs = 'navHeader';
        bindToController = true;
        scope = {
            text: '@',
            small: '@'
        }
    }

    app.directive('navHeader', NavHeaderDirective);
}
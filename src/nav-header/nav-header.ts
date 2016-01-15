module LayoutPageModule {

    class NavHeaderController {
        
    }
	
	Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);

    class NavHeaderDirective {
        restrict = 'E';
        templateUrl = 'nav-header/nav-header.html';
        controller = NavHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            text: '@',
            small: '@'
        }
    }

    Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);
}
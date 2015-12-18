module LayoutPageModule {

    class NavGroupController {
        
    }
	
	app.controller('navGroupController', NavGroupController);

    class NavGroupDirective {
        restrict = 'E';
        templateUrl = 'nav-group/nav-group.html';
        controller = NavGroupController;
        controllerAs = 'vm';
        bindToController = true;

        link = ($scope, $element) => {
            
        };
    }

    app.directive('navGroup', NavGroupDirective);
}
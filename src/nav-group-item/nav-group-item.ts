module LayoutPageModule {

    class navGroupItemController {
        
    }
	
	app.controller('navGroupItemController', NavGroupItemController);

    class NavGroupItemDirective {
        restrict = 'E';
        templateUrl = 'nav-group-item/nav-group-item.html';
        controller = NavGroupItemController;
        controllerAs = 'vm';
        bindToController = true;

        link = ($scope, $element) => {
            
        };
    }

    app.directive('navGroupItem', NavGroupItemDirective);
}
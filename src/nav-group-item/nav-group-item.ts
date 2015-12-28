module LayoutPageModule {

    class NavGroupItemController {
        static $inject = ['$attrs'];
        
        constructor(private $attrs) {
            
        }
        
        get hasIcon() {
            return this.iconClass != null && this.iconClass.length > 0;
        }
        
        get iconClass() {
            return this.$attrs.icon;
        }
    }
	
	app.controller('navGroupItemController', NavGroupItemController);

    class NavGroupItemDirective {
        restrict = 'AEC';
        transclude = true;
        templateUrl = 'nav-group-item/nav-group-item.html';
        controller = NavGroupItemController;
        controllerAs = 'navGroupItem';
        bindToController = true;
        scope = true;

        link = ($scope, $element, $attrs) => {
            
        };
    }

    app.directive('navGroupItem', NavGroupItemDirective);
}
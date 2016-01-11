module LayoutPageModule {

    class BlankslateController {
        subtitle: string;
        
        get hasSubtitle() {
            return !(this.subtitle == null || this.subtitle.trim().length == 0)
        }
    }

    class BlankslateDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'blankslate/blankslate.html';
        controller = BlankslateController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            icon: '@',
            title: '@',
            subtitle: '@'
        };
    }

    app.directive('blankslate', BlankslateDirective);
}
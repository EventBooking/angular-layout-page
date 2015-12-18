module LayoutPageModule {

    class BodyHeaderController {
    }

    class BodyHeaderDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'body-header/body-header.html';
        controller = BodyHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@'
        };
    }

    app.directive('bodyHeader', BodyHeaderDirective);
}
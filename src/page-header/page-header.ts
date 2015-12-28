module LayoutPageModule {

    class PageHeaderController {
    }

    class PageHeaderDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'page-header/page-header.html';
        multiElement = true;
        controller = PageHeaderController;
        controllerAs = 'pageHeader';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@'
        };
    }

    app.directive('pageHeader', PageHeaderDirective);
}
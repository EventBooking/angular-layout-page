module LayoutPageModule {

    class PageHeaderController {
    }

    class PageHeaderDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'page-header/page-header.html';
        multiElement = true;
        controller = PageHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@'
        };
    }

    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
}
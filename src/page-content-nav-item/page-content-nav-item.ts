module LayoutPageModule {

    class PageContentNavItemController {
        static $inject = ['$routeParams', '$location'];

        constructor($routeParams, private $location) {
            this.isActive = $routeParams.area === this.area;
        }

        path: string;
        area: string;
        isActive;

        select() {
            var url = [this.path, this.area].join("/");
            this.$location.url(url);
        }
    }

    class PageContentNavItemDirective {
        restrict = 'E';
        multiElement = true;
        controller = PageContentNavItemController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            path: '@',
            area: '@'
        };

        link = ($scope, $element) => {
            var ctrl: PageContentNavItemController = $scope[this.controllerAs];

            $element.addClass('page-content-nav-item');
            $element.toggleClass('page-content-nav-item--active', ctrl.isActive);
            $element.on('click', () => {
                ctrl.select();
                $scope.$apply();
            });
        };
    }

    app.directive('pageContentNavItem', PageContentNavItemDirective);
}
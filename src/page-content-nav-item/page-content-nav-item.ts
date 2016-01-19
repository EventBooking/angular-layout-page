module LayoutPageModule {

    class PageContentNavItemController {
        static $inject = ['$routeParams', '$location'];

        constructor(private $routeParams, private $location) {

        }

        onInit($element) {
            this.init = true;
            this.$element = $element;
            this.area = this.$routeParams.area;
        }

        init: boolean;
        path: string;
        $element: any;

        private _area: string;
        get area(): string {
            return this._area;
        }

        set area(value: string) {
            this._area = value;
            if (!this.init)
                return;

            this.$location.search({
                area: this.path
            });

            this.toggleActive(this);
        }

        get isActive() {
            return this.path == this.area;
        }

        select() {
            this.area = this.path;
        }

        toggleActive = ($ctrl: PageContentNavItemController) => { }
    }

    class PageContentNavItemDirective {
        restrict = 'E';
        multiElement = true;
        controller = PageContentNavItemController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            path: '@',
            area: '='
        };

        link = ($scope, $element, $attr, $ctrl: PageContentNavItemController) => {
            var clickEvent = `click.${$scope.id}`;

            $ctrl.$element = $element;

            $element.on(clickEvent, () => {
                $ctrl.select();
                $scope.$apply();
            });

            $ctrl.toggleActive = this.toggleActive;
            $ctrl.onInit($element);
        };

        toggleActive($ctrl: PageContentNavItemController) {
            $ctrl.$element.toggleClass('page-content-nav-item--active', $ctrl.isActive);
        }
    }

    Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);
}
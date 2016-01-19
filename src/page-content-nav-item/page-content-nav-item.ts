module LayoutPageModule {

    class PageContentNavItemController {
        static $inject = ['$location'];

        constructor(private $location) {

        }

        onInit($element) {
            this.init = true;
            this.$element = $element;
            this.toggleActive(this);
        }

        init: boolean;
        path: string;
        $element: any;
        param: string;

        private _area: string;
        get area(): string {
            return this._area;
        }

        set area(value: string) {
            this._area = value;
            if (!this.init)
                return;

            var params = {};
            params[this.param || 'area'] = value;
            this.$location.search(params);

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
            param: '@',
            path: '@',
            area: '='
        };

        link = ($scope, $element, $attr, $ctrl: PageContentNavItemController) => {
            var clickEvent = `click.${$scope.$id}`;

            console.log($ctrl);

            $element.on(clickEvent, () => {
                console.log($ctrl.area, $ctrl.path);
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
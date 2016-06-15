module LayoutPageModule {

    class PageContentNavItemController {
        static $inject = ['$location'];

        constructor(private $location) {

        }

        onInit($element, isDefault) {
            this.init = true;
            this.$element = $element;
            this.isDefault = isDefault;
            this.toggleActive(this);
        }

        init: boolean;
        path: string;
        $element: any;
        param: string;
        isDefault: boolean;

        private _area: string;
        get area(): string {
            return this._area;
        }

        set area(value: string) {
            this._area = value;
            this.onAreaChange();
        }

        get isActive() {
            if (this._area == null)
                return this.isDefault;
            return this.path.toLowerCase() == this._area.toLowerCase();
        }

        select() {
            this.area = this.path;
        }

        onRouteChange($routeParams) {
            this._area = $routeParams[this.param || 'area'];
            this.toggleActive(this);
        }

        private onAreaChange() {
            if (!this.init)
                return;

            var name = this.param || 'area';

            if (this.param == null) {
                var params = {};
                params[name] = this._area;
                this.$location.search(params);
            } else {
                this.$location.search(name, this._area);
            }

            this.toggleActive(this);
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

            $element.on(clickEvent, () => {
                $ctrl.select();
                $scope.$apply();
            });

            $ctrl.toggleActive = this.toggleActive;
            $ctrl.onInit($element, $attr.default != null);

            $scope.$on('$routeUpdate', function (evt, current) {
                $ctrl.onRouteChange(current.params);
            });
        };

        toggleActive($ctrl: PageContentNavItemController) {
            $ctrl.$element.toggleClass('page-content-nav-item--active', $ctrl.isActive);
        }
    }

    Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);
}
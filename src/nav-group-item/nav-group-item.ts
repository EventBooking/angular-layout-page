module LayoutPageModule {

    class NavGroupItemController {
        static $inject = ['$attrs', '$location', '$window'];

        constructor(private $attrs, private $location: angular.ILocationService, private $window: angular.IWindowService) {

        }

        get hasIcon() {
            return this.iconClass != null && this.iconClass.length > 0;
        }

        get iconClass() {
            return this.$attrs.icon;
        }

        get href() {
            return this.$attrs.href;
        }

        selected: string[];

        get isSelected(): boolean {
            var path = this.$location.path();
            if (this.href != null && path.indexOf(this.href) === 0)
                return true;
            if (this.selected == null)
                return false;
            var result = this.selected.filter(x => path.indexOf(x) === 0);
            return result.length > 0;
        }

        navigate(newTab: boolean = false): void {
            if (newTab) {
                this.$window.open(this.href, '_blank');
                return;
            }

            this.$location.url(this.href);
        }
    }

    Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);

    class NavGroupItemDirective {
        static $inject = ['$compile'];

        constructor(private $compile) {

        }

        restrict = 'AEC';
        transclude = true;
        templateUrl = 'nav-group-item/nav-group-item.html';
        controller = NavGroupItemController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            selected: '='
        };

        link = ($scope, $element, $attrs) => {
            var ctrl: NavGroupItemController = $scope[this.controllerAs],
                clickEvent = `click.${$scope.$id}`;

            // ToDo: this is probably done incorrectly and should be controlled by the nav-group instead
            $scope.$on('$routeChangeSuccess', () => {
                $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
            });
            $element.toggleClass('nav-group-item--selected', ctrl.isSelected);

            $element.on(clickEvent, e => {
                ctrl.navigate(e.ctrlKey || (e.which == 2));
                $scope.$apply();
            });
        };
    }

    Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);
}
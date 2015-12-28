module LayoutPageModule {

    class NavGroupItemController {
        static $inject = ['$attrs', '$location'];

        constructor(private $attrs, private $location) {

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

        get values(): string[] {
            return this.$attrs.values || [];
        }

        path: string;

        get isSelected(): boolean {
            var path = this.$location.path();
            if (this.href != null && path.indexOf(this.href) === 0)
                return true;
            var result = this.values.filter(x => path.indexOf(x) === 0);
            return result.length > 0;
        }

        navigate(): void {
            this.$location.path(this.href);
        }
    }

    app.controller('navGroupItemController', NavGroupItemController);

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
        scope = true;

        link = ($scope, $element, $attrs) => {
            var ctrl: NavGroupItemController = $scope[this.controllerAs],
                clickEvent = `click.${$scope.$id}`;

            $scope.$on('$routeChangeSuccess', () => {
                $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
            });

            $element.on(clickEvent, () => {
                ctrl.navigate();
                $scope.$apply();
            });
        };
    }

    app.directive('navGroupItem', NavGroupItemDirective);
}
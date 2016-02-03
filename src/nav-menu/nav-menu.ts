module LayoutPageModule {

    class NavMenuController {
        static $inject = ['$attrs'];

        constructor(private $attrs) {

        }

        onInit(toggleShown) {
            this.toggleShown = toggleShown;
        }

        $element: any;

        get iconClass() {
            return this.$attrs.icon;
        }

        private _isNavShown: boolean;
        get isNavShown(): boolean {
            return this._isNavShown;
        }
        set isNavShown(value: boolean) {
            this._isNavShown = value;
            this.toggleShown(this);
        }

        toggleShown($ctrl: NavMenuController) { };
    }

    Angular.module("ngLayoutPage").controller('navController', NavMenuController);

    class NavMenuDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'nav-menu/nav-menu.html';
        controller = NavMenuController;
        controllerAs = 'vm';
        bindToController = true;
        scope = true;

        link = ($scope, $element, $attrs, $ctrl: NavMenuController) => {
            $element.on('click', () => {
                $ctrl.isNavShown = !$ctrl.isNavShown; 
            });
            $ctrl.onInit(this.toggleShown);
        }

        toggleShown($ctrl: NavMenuController) {
            angular.element('body').toggleClass('nav--show', $ctrl.isNavShown);
        };
    }

    Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);
}
module LayoutPageModule {

    export interface IPageOverlay {

    }

    export interface IPageController {
        addControl($element: angular.IAugmentedJQuery);
        showOverlay(overlay: IPageOverlay);
        hideOverlay(overlay: IPageOverlay);
        ensureOnTop($element: angular.IAugmentedJQuery);
    }

    class PageController implements IPageController {

        constructor() {
            this.controls = [];
            this.overlays = [];
        }

        onInit($element) {
            this.$element = $element;
        }

        addControl($element: angular.IAugmentedJQuery) {
            if (this.$element == null) {
                this.controls.push($element);
                return;
            }

            this.$element.append($element);
        }

        showOverlay(overlay: IPageOverlay) {
            var idx = this.overlays.indexOf(overlay);
            if (idx > -1)
                return;

            this.overlays.push(overlay);
            this.$element.addClass("page--overlay");
        }

        ensureOnTop($element) {
            this.$element.append($element);
        }

        hideOverlay(overlay: IPageOverlay) {
            var idx = this.overlays.indexOf(overlay);
            if (idx < 0)
                return;
                
            this.overlays.splice(idx, 1);

            if (this.overlays.length == 0)
                this.$element.removeClass("page--overlay");
        }

        overlays: IPageOverlay[];
        controls: any[];
        $element: any;
    }

    class PageDirective {
        static $inject = ['$rootScope'];

        constructor(private $rootScope: angular.IRootScopeService) {
            
        }

        restrict = 'C';
        controller = PageController;

        link = ($scope, $element, $attrs, $ctrl: PageController) => {
            $ctrl.controls.forEach(x => {
                $element.append(x);
            });
            $ctrl.controls = [];
            $ctrl.onInit($element);

            this.$rootScope.$emit('$page.$create', $element);
            $scope.$on("$destroy", () => {
                this.$rootScope.$emit('$page.$destroy', $element);
            });
        }
    }

    Angular.module("ngLayoutPage").directive('page', PageDirective);
}
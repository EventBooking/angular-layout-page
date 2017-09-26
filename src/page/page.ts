module LayoutPageModule {

    export interface IPageController {
        addControl($element: any);
        ensureOnTop($element: any);
    }

    class PageController {
        onInit($element) {
            this.$element = $element;
        }

        addControl($element) {
            if (this.$element == null) {
                this.controls.push($element);
                return;
            }

            this.$element.append($element);
        }

        ensureOnTop($element) {
            this.$element.append($element);
        }
        
        controls: any[] = [];
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

            this.$rootScope.$emit('$page.$create', $element, $ctrl);
            $scope.$on("$destroy", () => {
                this.$rootScope.$emit('$page.$destroy', $element, $ctrl);
            });
        }
    }

    Angular.module("ngLayoutPage").directive('page', PageDirective);
}
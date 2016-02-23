module LayoutPageModule {

    export interface IPageController {
        addControl(control: any);
    }

    class PageController implements IPageController {

        constructor() {
            this.controls = [];
        }

        onInit($element) {
            this.$element = $element;
        }

        addControl(control: any) {
            if (this.$element == null) {
                this.controls.push(control);
                return;
            }

            this.$element.append(control);
        }

        controls: any[];
        $element: any;
    }

    class PageDirective {
        restrict = 'C';
        controller = PageController;

        link = ($scope, $element, $attrs, $ctrl: PageController) => {
            $ctrl.controls.forEach(x => {
                $element.append(x);
            });
            
            $ctrl.controls = [];

            $ctrl.onInit($element);
        }
    }

    Angular.module("ngLayoutPage").directive('page', PageDirective);
}
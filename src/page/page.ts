module LayoutPageModule {

    export interface IPageController {
        addControl(control: any);
    }

    class PageController implements IPageController {
        onInit($element) {
            this.$element = $element;
        }

        addControl(control: any) {
            this.$element.append(control);
        }

        $element: any;
    }

    class PageDirective {
        restrict = 'C';
        controller = PageController;

        link = ($scope, $element, $attrs, $ctrl: PageController) => {
            $ctrl.onInit($element);
        }
    }

    Angular.module("ngLayoutPage").directive('page', PageDirective);
}
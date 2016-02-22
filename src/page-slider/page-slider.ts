module LayoutPageModule {

    export interface IPageSliderController {
        close();
    }

    class PageSliderController implements IPageSliderController {
        private _slideIf;

        get slideIf() {
            return this._slideIf;
        }

        set slideIf(value) {
            this._slideIf = value;
            if (this.toggleVisibility)
                this.toggleVisibility();
        }

        onClose;
        toggleVisibility;
        withFooter: boolean;

        close() {
            this.slideIf = null;
            this.onClose();
        }
    }

    class PageSliderDirective {
        restrict = 'E';
        require = '^page';
        transclude = true;
        controller = PageSliderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            slideIf: '=',
            onClose: '&'
        };

        link = ($scope, $element, $attrs, $page: LayoutPageModule.IPageController, $transclude) => {
            var $ctrl: PageSliderController = $scope[this.controllerAs],
                sliderScope = null;

            $page.addControl($element);
            $scope.$on("$destroy", () => {
                $element.remove();
            });

            $ctrl.toggleVisibility = () => {
                var isVisible = !!$ctrl.slideIf;

                $element.empty()
                    .toggleClass("is-visible", isVisible);

                if (sliderScope) {
                    sliderScope.$destroy();
                    sliderScope = null;
                }

                if (!isVisible)
                    return;

                $transclude((clone, scope) => {
                    $element.append(clone);
                    sliderScope = scope;
                });
            };

            $ctrl.toggleVisibility();
        };
    }

    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
}
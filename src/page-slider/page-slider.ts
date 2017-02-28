import "./page-slider.less";
import { IPageOverlay, IPageController } from "../page/page";

export interface IPageSliderController {
    isVisible;
    withOverlay;
    close();
}

class PageSliderController implements IPageSliderController, IPageOverlay {
    private _slideIf;

    get slideIf() {
        return this._slideIf;
    }

    set slideIf(value) {
        this._slideIf = value;
        if (this.toggleVisibility)
            this.toggleVisibility();
    }

    get isVisible() {
        return this._slideIf;
    }

    onClose;
    toggleVisibility;
    withFooter: boolean;
    withOverlay: boolean;

    close() {
        this.slideIf = null;
        this.onClose();
    }
}

class PageSliderDirective {
    static $inject = ['$rootScope'];

    constructor(private $rootScope: angular.IRootScopeService) {

    }

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

    link = ($scope, $element, $attrs, $page: IPageController, $transclude) => {
        var $ctrl: PageSliderController = $scope[this.controllerAs],
            sliderScope = null;

        $ctrl.withOverlay = $attrs.showOverlay != null;

        $page.addControl($element);

        $scope.$on("$destroy", () => {
            $element.remove();
        });

        $ctrl.toggleVisibility = () => {
            var isVisible = !!$ctrl.slideIf;

            if (isVisible)
                this.$rootScope.$emit('$pageSlider.$show', $element);
            else this.$rootScope.$emit('$pageSlider.$hide', $element);

            $element.empty()
                .toggleClass("is-visible", isVisible);

            if ($ctrl.withOverlay) {
                if (isVisible)
                    $page.showOverlay($ctrl);
                else
                    $page.hideOverlay($ctrl);
            }

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

export default Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
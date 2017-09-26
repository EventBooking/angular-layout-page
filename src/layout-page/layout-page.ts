module LayoutPageModule {

    export interface IPageOverlay {

    }

    export interface ILayoutPageController extends IPageOverlay {
        showNav();
        hideNav();
        toggleNav();
        showOverlay(overlay: IPageOverlay);
        hideOverlay(overlay: IPageOverlay);
    }

    class LayoutPageController implements ILayoutPageController {
        static $inject = ['$element', '$timeout'];

        constructor(private $element: angular.IAugmentedJQuery, private $timeout: angular.ITimeoutService) {
            
        }

        showNav() {
            this.setNavVis(true);
        }

        hideNav() {
            this.setNavVis(false);
        }

        toggleNav() {
            this.setNavVis(!this.isNavVisible);
        }

        showOverlay(overlay: IPageOverlay) {
            var idx = this.overlays.indexOf(overlay);
            if (idx > -1)
                return;

            this.overlays.push(overlay);

            if (this.timer)
                this.$timeout.cancel(this.timer);
            this.forceHide();
            this.$element.addClass("layout-page--overlay");
        }

        private forceHide() {
            this.$element.removeClass("layout-page--overlay layout-page--hiding");
        }

        hideOverlay(overlay: IPageOverlay) {
            var idx = this.overlays.indexOf(overlay);
            if (idx < 0)
                return;

            this.overlays.splice(idx, 1);

            if (this.overlays.length > 0)
                return;

            this.$element.addClass('layout-page--hiding');
            this.timer = this.$timeout(() => {
                this.forceHide();
            }, this.transitionTime);
        }

        private setNavVis(isVisible: boolean) {
            this.isNavVisible = isVisible;
            this.$element.toggleClass('nav--show', isVisible);
        }

        private isNavVisible: boolean = false;
        private overlays: IPageOverlay[] = [];
        private timer;
        private transitionTime = 250;
    }

    Angular.module("ngLayoutPage").controller('layoutPageController', LayoutPageController);

    class LayoutPageDirective {
        restrict = 'EAC';
        controller = LayoutPageController;
        controllerAs = 'vm';
        bindToController = true;
    }

    Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);
}
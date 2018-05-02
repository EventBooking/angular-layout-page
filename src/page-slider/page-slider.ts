module LayoutPageModule {

    export interface IPageSliderController extends IPageOverlay {
        isVisible;
        withOverlay;
        close();
    }

    class PageSliderController implements IPageSliderController {
        static $inject = ['$rootScope', '$scope', '$timeout', '$element', '$transclude', '$attrs'];

        constructor(
            private $rootScope: angular.IRootScopeService,
            private $scope: angular.IScope,
            private $timeout: angular.ITimeoutService,
            private $element: angular.IAugmentedJQuery,
            private $transclude: angular.ITranscludeFunction,
            private $attrs: angular.IAttributes) {
        }

        $onInit() {
            this.withOverlay = this.$attrs.showOverlay != null;
            this.isOutsideOfPage = !this.page;

            if (this.isOutsideOfPage) {
                const unbind$Page$Create = this.$rootScope.$on("$page.$create", this.onPageCreate);
                const unbind$Page$Destroy = this.$rootScope.$on("$page.$destroy", this.onPageDestroy);

                this._destroyPage = () => {
                    unbind$Page$Create();
                    unbind$Page$Destroy();
                };
            }

            this.$element.detach();
            this.destroyScope();
        }

        private _destroyPage = () => { };
        $onDestroy() {
            this.$element.remove();
            this._destroyPage();
        }

        $postLink() {
            if (this.isVisible)
                this.show();
            this.isInitialized = true;
        }

        private onPageCreate = (e: angular.IAngularEvent, $pageElement: angular.IAugmentedJQuery, _$page: LayoutPageModule.IPageController) => {
            if (!this.isOutsideOfPage)
                return;

            if (this.isVisible)
                this.show();
        };

        private onPageDestroy = () => {
            if (!this.isOutsideOfPage)
                return;

            this.close();
            this.$element.detach();
        };

        private showOverlay() {
            if (!this.withOverlay)
                return;

            this.$layoutPage.showOverlay(this);
        };

        private hideOverlay() {
            if (!this.withOverlay)
                return;

            this.$layoutPage.hideOverlay(this);
        };

        private emitEvent(eventName: string) {
            this.$rootScope.$emit(eventName, this.$element);
        };

        private fixBrowserReflowBatchingIssue() {
            this.$element.css("opacity");
        };

        private destroyScope() {
            if (!this.sliderScope)
                return;

            this.sliderScope.$destroy();
            this.sliderScope = null;
        };

        private transclude() {
            this.destroyScope();

            this.$transclude((clone, scope) => {
                this.$element.append(clone);
                this.sliderScope = scope;
            });
        };

        private $timer = null;
        private cancelTimer() {
            if (!this.$timer)
                return;

            this.$timeout.cancel(this.$timer);
        };

        private showElement() {
            this.cancelTimer();
            this.$page.ensureOnTop(this.$element);
            this.fixBrowserReflowBatchingIssue();
            this.$element.empty().addClass("is-visible");
            this.transclude();
        };

        private hideElement() {
            this.cancelTimer();

            if (!this.$element.is(".is-visible"))
                return;

            this.destroyScope();
            this.$element.addClass('is-hiding');
            this.$timer = this.$timeout(() => {
                this.$element.removeClass("is-visible is-hiding")
                    .detach()
                    .empty();
            }, 250);
        };

        private hideNavigation() {
            this.$layoutPage.hideNav();
        };

        private show() {
            if (!this.$page)
                return;

            this.emitEvent('$pageSlider.$show');
            this.showElement();
            this.showOverlay();
        };

        private hide() {
            this.emitEvent('$pageSlider.$hide');
            this.hideElement();
            this.hideOverlay();
            this.hideNavigation();
        };

        private _slideIf;

        get slideIf() {
            return this._slideIf;
        }

        set slideIf(value) {
            const visibilityChanged = value !== this._slideIf;
            this._slideIf = value;

            if (!this.isInitialized)
                return;

            if (this._slideIf) {
                this.show();
                return;
            }

            this.hide();
        }

        get isVisible() {
            return !!this._slideIf;
        }

        close() {
            this.slideIf = null;
            this.onClose();
        }

        get $page(): IPageController {
            return this.$layoutPage.currentPage;
        }

        isInitialized: boolean;
        onClose: () => void;
        withFooter: boolean;
        withOverlay: boolean;
        sliderScope: angular.IScope = null;
        isOutsideOfPage: boolean;

        $layoutPage: ILayoutPageController;
        page: IPageController;
    }

    class PageSliderDirective {
        restrict = 'E';
        require = {
            $layoutPage: '^layoutPage',
            page: '?^page'
        };
        transclude = true;
        controller = PageSliderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            slideIf: '=',
            onClose: '&'
        };
    }

    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
}
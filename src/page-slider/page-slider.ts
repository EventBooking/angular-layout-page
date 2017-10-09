module LayoutPageModule {

    export interface IPageSliderController extends IPageOverlay {
        isVisible;
        withOverlay;
        close();
    }

    class PageSliderController implements IPageSliderController {
        $postLink() {
            if (this.isVisible)
                this.show();
            this.isInitialized = true;
        }

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

        isInitialized: boolean;
        onClose: () => void;
        show: () => void;
        hide: () => void;
        withFooter: boolean;
        withOverlay: boolean;
    }

    class PageSliderDirective {
        static $inject = ['$rootScope', '$timeout'];

        constructor(private $rootScope: angular.IRootScopeService, private $timeout: angular.ITimeoutService) {

        }

        restrict = 'E';
        require = ['pageSlider', '^layoutPage', '?^page'];
        transclude = true;
        controller = PageSliderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            slideIf: '=',
            onClose: '&'
        };

        link = ($scope, $element: angular.IAugmentedJQuery, $attrs, $ctrls: any[], $transclude) => {
            let $page: LayoutPageModule.IPageController = $ctrls[2],
                sliderScope = null;

            const $ctrl: PageSliderController = $ctrls[0],
                $layoutPage: LayoutPageModule.ILayoutPageController = $ctrls[1],
                withOverlay = $attrs.showOverlay != null,
                isOutsideOfPage = !$page;

            const onPageCreate = (e: angular.IAngularEvent, $pageElement: angular.IAugmentedJQuery, _$page: LayoutPageModule.IPageController) => {
                $page = _$page;

                if (!isOutsideOfPage)
                    return;

                if ($ctrl.isVisible)
                    $ctrl.show();
            };

            const onPageDestroy = () => {
                if (!isOutsideOfPage)
                    return;

                $ctrl.close();
                $element.detach();
            };

            const onPageSliderShow = (e: angular.IAngularEvent, $sliderElement: angular.IAugmentedJQuery) => {
                if (!isOutsideOfPage || $sliderElement == $element)
                    return;

                $ctrl.close();
            };

            const showOverlay = () => {
                if (!$ctrl.withOverlay)
                    return;

                $layoutPage.showOverlay($ctrl);
            };

            const hideOverlay = () => {
                if (!$ctrl.withOverlay)
                    return;

                $layoutPage.hideOverlay($ctrl);
            };

            const emitEvent = (eventName: string) => {
                this.$rootScope.$emit(eventName, $element);
            };

            const fixBrowserReflowBatchingIssue = () => {
                $element.css("opacity");
            };

            const destroyScope = () => {
                if (!sliderScope)
                    return;

                sliderScope.$destroy();
                sliderScope = null;
            };

            const transclude = () => {
                destroyScope();

                $transclude((clone, scope) => {
                    $element.append(clone);
                    sliderScope = scope;
                });
            };

            let $timer = null;
            const cancelTimer = () => {
                if (!$timer)
                    return;

                this.$timeout.cancel($timer);
            };

            const showElement = () => {
                cancelTimer();
                $page.ensureOnTop($element);
                fixBrowserReflowBatchingIssue();
                $element.empty().addClass("is-visible");
                transclude();
            };

            const hideElement = () => {
                cancelTimer();

                if (!$element.is(".is-visible"))
                    return;

                destroyScope();
                $element.addClass('is-hiding');
                $timer = this.$timeout(() => {
                    $element.removeClass("is-visible is-hiding")
                        .detach()
                        .empty();
                }, 250);
            };

            const hideNavigation = () => {
                $layoutPage.hideNav();
            };

            const show = () => {
                if (!$page)
                    return;

                emitEvent('$pageSlider.$show');
                showElement();
                showOverlay();
            };

            const hide = () => {
                emitEvent('$pageSlider.$hide');
                hideElement();
                hideOverlay();
                hideNavigation();
            };

            const initProperties = () => {
                $ctrl.show = show;
                $ctrl.hide = hide;
                $ctrl.withOverlay = withOverlay;
            };

            const initPage = () => {
                if (isOutsideOfPage) {
                    const unbind$Page$Create = this.$rootScope.$on("$page.$create", onPageCreate);
                    const unbind$Page$Destroy = this.$rootScope.$on("$page.$destroy", onPageDestroy);
                    const unbind$PageSlider$Show = this.$rootScope.$on("$pageSlider.$show", onPageSliderShow);

                    const unbind$Page = () => {
                        unbind$Page$Create();
                        unbind$Page$Destroy();
                        unbind$PageSlider$Show();
                    }

                    return unbind$Page;
                }
                else {
                    const noop = () => { };
                    return noop;
                }
            }

            const initSlider = () => {
                initProperties();
                const destroyPage = initPage();
                $element.detach();
                destroyScope();
                return destroyPage;
            };

            const destroySlider = initSlider();

            $scope.$on("$destroy", () => {
                $element.remove();
                destroySlider();
            });
        };
    }

    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
}
module LayoutPageModule {

    export interface IPageSliderController extends IPageOverlay {
        isVisible;
        withOverlay;
        close();
    }

    class PageSliderController implements IPageSliderController {
        private _slideIf;

        get slideIf() {
            return this._slideIf;
        }

        set slideIf(value) {
            const visibilityChanged = value == this._slideIf;
            this._slideIf = value;

            if (this.toggleVisibility)
                this.toggleVisibility();
        }

        get isVisible() {
            return !!this._slideIf;
        }

        onClose: () => void;
        toggleVisibility: () => void;
        withFooter: boolean;
        withOverlay: boolean;

        close() {
            this.slideIf = null;
            this.onClose();
        }
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
                if (!isOutsideOfPage)
                    return;

                $page = _$page;
                $pageElement.append($element);
                toggleVisibility();
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

            const toggleOverlay = (isVisible: boolean) => {
                if (!$ctrl.withOverlay)
                    return;

                if (isVisible) {
                    $layoutPage.showOverlay($ctrl);
                    return;
                }

                $layoutPage.hideOverlay($ctrl);
            };

            const emitEvents = (isVisible: boolean) => {
                const eventName = isVisible ? '$pageSlider.$show' : '$pageSlider.$hide';
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

            const transclude = (isVisible: boolean) => {
                if (!isVisible)
                    return;

                destroyScope();

                $transclude((clone, scope) => {
                    $element.append(clone);
                    sliderScope = scope;
                });
            };

            let $timer = null;
            const modifyElement = (isVisible: boolean) => {
                if ($timer)
                    this.$timeout.cancel($timer);

                if (isVisible) {
                    $page.ensureOnTop($element);
                    fixBrowserReflowBatchingIssue();
                    $element.empty().addClass("is-visible");
                    transclude(isVisible);
                    return;
                }

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

            const hideNavigation = (isVisible: boolean) => {
                if (!isVisible)
                    return;

                $layoutPage.hideNav();
            };

            const toggleVisibility = () => {
                if (!$page)
                    return;

                var isVisible = $ctrl.isVisible;
                emitEvents(isVisible);
                modifyElement(isVisible);
                toggleOverlay(isVisible);
                hideNavigation(isVisible);
            };

            const initProperties = () => {
                $ctrl.toggleVisibility = toggleVisibility;
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
                    $page.addControl($element);
                    const noop = () => { };
                    return noop;
                }
            }

            const initSlider = () => {
                initProperties();
                const destroyPage = initPage();
                toggleVisibility();
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
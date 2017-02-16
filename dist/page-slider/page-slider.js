var PageSliderController = (function () {
    function PageSliderController() {
    }
    Object.defineProperty(PageSliderController.prototype, "slideIf", {
        get: function () {
            return this._slideIf;
        },
        set: function (value) {
            this._slideIf = value;
            if (this.toggleVisibility)
                this.toggleVisibility();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageSliderController.prototype, "isVisible", {
        get: function () {
            return this._slideIf;
        },
        enumerable: true,
        configurable: true
    });
    PageSliderController.prototype.close = function () {
        this.slideIf = null;
        this.onClose();
    };
    return PageSliderController;
}());
var PageSliderDirective = (function () {
    function PageSliderDirective($rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.restrict = 'E';
        this.require = '^page';
        this.transclude = true;
        this.controller = PageSliderController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            slideIf: '=',
            onClose: '&'
        };
        this.link = function ($scope, $element, $attrs, $page, $transclude) {
            var $ctrl = $scope[_this.controllerAs], sliderScope = null;
            $ctrl.withOverlay = $attrs.showOverlay != null;
            $page.addControl($element);
            $scope.$on("$destroy", function () {
                $element.remove();
            });
            $ctrl.toggleVisibility = function () {
                var isVisible = !!$ctrl.slideIf;
                if (isVisible)
                    _this.$rootScope.$emit('$pageSlider.$show', $element);
                else
                    _this.$rootScope.$emit('$pageSlider.$hide', $element);
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
                $transclude(function (clone, scope) {
                    $element.append(clone);
                    sliderScope = scope;
                });
            };
            $ctrl.toggleVisibility();
        };
    }
    return PageSliderDirective;
}());
PageSliderDirective.$inject = ['$rootScope'];
Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);

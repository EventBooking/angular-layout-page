var PageSliderCancelDirective = (function () {
    function PageSliderCancelDirective() {
        this.restrict = 'A';
        this.require = '^pageSlider';
        this.link = function ($scope, $element, $attrs, slider) {
            var clickEvent = "click." + $scope.$id;
            $element.on(clickEvent, function () {
                $scope.$apply(slider.close());
            });
            $scope.$on('$destroy', function () {
                $element.off(clickEvent);
            });
        };
    }
    return PageSliderCancelDirective;
}());
Angular.module("ngLayoutPage").directive('pageSliderCancel', PageSliderCancelDirective);

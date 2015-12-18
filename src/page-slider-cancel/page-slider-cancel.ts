module LayoutPageModule {

    class PageSliderCancelDirective {
        restrict = 'A';
        require = '^pageSlider';
        link = ($scope, $element, $attrs, slider: IPageSliderController) => {
            
            $element.on('click.pageSliderCancel',() => {
                $scope.$apply(slider.close());
            });

            $scope.$on('$destroy',() => {
                $element.off('click.pageSliderCancel');
            });
        };
    }

    app.directive('pageSliderCancel', PageSliderCancelDirective);
}
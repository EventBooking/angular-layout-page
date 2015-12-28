module LayoutPageModule {

    class PageSliderCancelDirective {
        restrict = 'A';
        require = '^pageSlider';
        link = ($scope, $element, $attrs, slider: IPageSliderController) => {
            var clickEvent = `click.${$scope.$id}`;
            
            $element.on(clickEvent,() => {
                $scope.$apply(slider.close());
            });

            $scope.$on('$destroy',() => {
                $element.off(clickEvent);
            });
        };
    }

    app.directive('pageSliderCancel', PageSliderCancelDirective);
}
module LayoutPageModule {

    class PaneHeaderController {
        showClose: boolean;
        pageSlider: IPageSliderController;

        close() {
            if (this.pageSlider == null)
                return;
            this.pageSlider.close();
        }
    }

    class PaneHeaderDirective {
        restrict = 'E';
        require = '?^pageSlider';
        transclude = true;
        templateUrl = 'pane-header/pane-header.html';
        controller = PaneHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@'
        };

        link = ($scope, $element, $attrs, pageSlider: IPageSliderController) => {
            $element.removeAttr("title");

            var ctrl: PaneHeaderController = $scope[this.controllerAs];
            ctrl.pageSlider = pageSlider;
            ctrl.showClose = $attrs.showClose != null;
        };
    }

    app.directive('paneHeader', PaneHeaderDirective);
}
module LayoutPageModule {

    class PaneFooterDirective {
        restrict = 'E';
        transclude = true;
        template = '<div class="pane-footer-content" ng-transclude></div>';

        link = ($scope, $element) => {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }

    Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
}
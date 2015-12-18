module LayoutPageModule {

    class PaneFooterDirective {
        restrict = 'E';

        link = ($scope, $element) => {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }

    app.directive('paneFooter', PaneFooterDirective);
}
module LayoutPageModule {

    class PaneFooterDirective {
        restrict = 'E';

        link = ($scope, $element) => {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }

    Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
}
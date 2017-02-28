import "./pane-footer.less";

class PaneFooterDirective {
    restrict = 'E';

    link = ($scope, $element) => {
        $element.parent(".pane").addClass("pane--withFooter");
    };
}

export default Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
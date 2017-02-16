var PaneFooterDirective = (function () {
    function PaneFooterDirective() {
        this.restrict = 'E';
        this.link = function ($scope, $element) {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }
    return PaneFooterDirective;
}());
Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);

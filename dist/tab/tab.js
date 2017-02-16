var TabController = (function () {
    function TabController() {
    }
    return TabController;
}());
var TabDirective = (function () {
    function TabDirective() {
        this.restrict = 'E';
        this.require = ['^tabs', 'tab'];
        this.controller = TabController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            title: '@',
            name: '@',
            icon: '@'
        };
        this.link = function ($scope, $element, $attrs, $ctrls) {
            var $tabs = $ctrls[0];
            var $ctrl = $ctrls[1];
            $tabs.addTab($ctrl);
            angular.element($element).removeAttr('title');
        };
    }
    return TabDirective;
}());
Angular.module("ngLayoutPage").directive('tab', TabDirective);

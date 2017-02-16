import template from './nav-menu.html';
var NavMenuController = (function () {
    function NavMenuController($attrs) {
        this.$attrs = $attrs;
    }
    Object.defineProperty(NavMenuController.prototype, "iconClass", {
        get: function () {
            return this.$attrs.icon;
        },
        enumerable: true,
        configurable: true
    });
    return NavMenuController;
}());
NavMenuController.$inject = ['$attrs'];
Angular.module("ngLayoutPage").controller('navController', NavMenuController);
var NavMenuDirective = (function () {
    function NavMenuDirective() {
        this.restrict = 'E';
        this.require = '^layoutPage';
        this.transclude = true;
        this.template = template;
        this.controller = NavMenuController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = true;
        this.link = function ($scope, $element, $attrs, $layoutPage) {
            $element.on('click', function () {
                $layoutPage.toggleNav();
            });
        };
    }
    return NavMenuDirective;
}());
Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);

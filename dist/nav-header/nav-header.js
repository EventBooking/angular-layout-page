import template from './nav-header.html';
var NavHeaderController = (function () {
    function NavHeaderController() {
    }
    return NavHeaderController;
}());
Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
var NavHeaderDirective = (function () {
    function NavHeaderDirective() {
        this.restrict = 'E';
        this.template = template;
        this.controller = NavHeaderController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            text: '@',
            small: '@'
        };
    }
    return NavHeaderDirective;
}());
Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);

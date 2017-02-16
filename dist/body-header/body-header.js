import template from './body-header.html';
var BodyHeaderController = (function () {
    function BodyHeaderController() {
    }
    return BodyHeaderController;
}());
var BodyHeaderDirective = (function () {
    function BodyHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
        this.controller = BodyHeaderController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            title: '@',
            subtitle: '@'
        };
    }
    return BodyHeaderDirective;
}());
Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);

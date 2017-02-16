import template from './page-header.html';
var PageHeaderController = (function () {
    function PageHeaderController() {
    }
    return PageHeaderController;
}());
var PageHeaderDirective = (function () {
    function PageHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
        this.controller = PageHeaderController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            title: '@',
            subtitle: '@',
            label: '@'
        };
    }
    return PageHeaderDirective;
}());
Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);

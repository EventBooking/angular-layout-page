import template from "./blankslate.html";
var BlankslateController = (function () {
    function BlankslateController() {
    }
    Object.defineProperty(BlankslateController.prototype, "hasSubtitle", {
        get: function () {
            return !(this.subtitle == null || this.subtitle.trim().length == 0);
        },
        enumerable: true,
        configurable: true
    });
    return BlankslateController;
}());
var BlankslateDirective = (function () {
    function BlankslateDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
        this.controller = BlankslateController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            icon: '@',
            title: '@',
            subtitle: '@'
        };
    }
    return BlankslateDirective;
}());
Angular.module("ngLayoutPage").directive('blankslate', BlankslateDirective);

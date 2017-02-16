var PageController = (function () {
    function PageController() {
        this.controls = [];
        this.overlays = [];
    }
    PageController.prototype.onInit = function ($element) {
        this.$element = $element;
    };
    PageController.prototype.addControl = function (control) {
        if (this.$element == null) {
            this.controls.push(control);
            return;
        }
        this.$element.append(control);
    };
    PageController.prototype.showOverlay = function (overlay) {
        var idx = this.overlays.indexOf(overlay);
        if (idx > -1)
            return;
        this.overlays.push(overlay);
        this.$element.addClass("page--overlay");
    };
    PageController.prototype.hideOverlay = function (overlay) {
        var idx = this.overlays.indexOf(overlay);
        if (idx < 0)
            return;
        this.overlays.splice(idx, 1);
        if (this.overlays.length == 0)
            this.$element.removeClass("page--overlay");
    };
    return PageController;
}());
var PageDirective = (function () {
    function PageDirective($rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.restrict = 'C';
        this.controller = PageController;
        this.link = function ($scope, $element, $attrs, $ctrl) {
            $ctrl.controls.forEach(function (x) {
                $element.append(x);
            });
            $ctrl.controls = [];
            $ctrl.onInit($element);
            _this.$rootScope.$emit('$page.$create', $element);
            $scope.$on("$destroy", function () {
                _this.$rootScope.$emit('$page.$destroy', $element);
            });
        };
    }
    return PageDirective;
}());
PageDirective.$inject = ['$rootScope'];
Angular.module("ngLayoutPage").directive('page', PageDirective);

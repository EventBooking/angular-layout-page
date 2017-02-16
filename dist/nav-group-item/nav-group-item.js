import template from './nav-group-item.html';
var NavGroupItemController = (function () {
    function NavGroupItemController($attrs, $location, $window) {
        this.$attrs = $attrs;
        this.$location = $location;
        this.$window = $window;
    }
    Object.defineProperty(NavGroupItemController.prototype, "hasIcon", {
        get: function () {
            return this.iconClass != null && this.iconClass.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavGroupItemController.prototype, "iconClass", {
        get: function () {
            return this.$attrs.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavGroupItemController.prototype, "href", {
        get: function () {
            return this.$attrs.href;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavGroupItemController.prototype, "isSelected", {
        get: function () {
            var path = this.$location.path();
            if (this.href != null && path.indexOf(this.href) === 0)
                return true;
            if (this.selected == null)
                return false;
            var result = this.selected.filter(function (x) { return path.indexOf(x) === 0; });
            return result.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    NavGroupItemController.prototype.navigate = function (newTab) {
        if (newTab === void 0) { newTab = false; }
        if (newTab) {
            this.$window.open(this.href, '_blank');
            return;
        }
        this.$location.url(this.href);
    };
    return NavGroupItemController;
}());
NavGroupItemController.$inject = ['$attrs', '$location', '$window'];
Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
var NavGroupItemDirective = (function () {
    function NavGroupItemDirective($compile) {
        this.$compile = $compile;
        this.restrict = 'AEC';
        this.require = ['navGroupItem', '^layoutPage'];
        this.transclude = true;
        this.template = template;
        this.controller = NavGroupItemController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            selected: '='
        };
        this.link = function ($scope, $element, $attrs, ctrls) {
            var $ctrl = ctrls[0], $layoutPage = ctrls[1], clickEvent = "click." + $scope.$id;
            // ToDo: this is probably done incorrectly and should be controlled by the nav-group instead
            $scope.$on('$routeChangeSuccess', function () {
                $element.toggleClass('nav-group-item--selected', $ctrl.isSelected);
                $layoutPage.hideNav();
            });
            $element.toggleClass('nav-group-item--selected', $ctrl.isSelected);
            $element.on(clickEvent, function (e) {
                if (($ctrl.href || "").length === 0)
                    return;
                $ctrl.navigate(e.ctrlKey || (e.which == 2));
                $scope.$apply();
            });
        };
    }
    return NavGroupItemDirective;
}());
NavGroupItemDirective.$inject = ['$compile'];
Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);

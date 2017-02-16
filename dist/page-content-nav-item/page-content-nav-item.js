var PageContentNavItemController = (function () {
    function PageContentNavItemController($location) {
        this.$location = $location;
        this.toggleActive = function ($ctrl) { };
    }
    PageContentNavItemController.prototype.onInit = function ($element, isDefault) {
        this.init = true;
        this.$element = $element;
        this.isDefault = isDefault;
        this.toggleActive(this);
    };
    Object.defineProperty(PageContentNavItemController.prototype, "area", {
        get: function () {
            return this._area;
        },
        set: function (value) {
            this._area = value;
            this.onAreaChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageContentNavItemController.prototype, "isActive", {
        get: function () {
            if (this._area == null)
                return this.isDefault;
            return this.path.toLowerCase() == this._area.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    PageContentNavItemController.prototype.select = function () {
        this.area = this.path;
    };
    PageContentNavItemController.prototype.onRouteChange = function ($routeParams) {
        this._area = $routeParams[this.param || 'area'];
        this.toggleActive(this);
    };
    PageContentNavItemController.prototype.onAreaChange = function () {
        if (!this.init)
            return;
        var name = this.param || 'area';
        if (this.param == null) {
            var params = {};
            params[name] = this._area;
            this.$location.search(params);
        }
        else {
            this.$location.search(name, this._area);
        }
        this.toggleActive(this);
    };
    return PageContentNavItemController;
}());
PageContentNavItemController.$inject = ['$location'];
var PageContentNavItemDirective = (function () {
    function PageContentNavItemDirective() {
        var _this = this;
        this.restrict = 'E';
        this.multiElement = true;
        this.controller = PageContentNavItemController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            param: '@',
            path: '@',
            area: '='
        };
        this.link = function ($scope, $element, $attr, $ctrl) {
            var clickEvent = "click." + $scope.$id;
            $element.on(clickEvent, function () {
                $ctrl.select();
                $scope.$apply();
            });
            $ctrl.toggleActive = _this.toggleActive;
            $ctrl.onInit($element, $attr.default != null);
            $scope.$on('$routeUpdate', function (evt, current) {
                $ctrl.onRouteChange(current.params);
            });
        };
    }
    PageContentNavItemDirective.prototype.toggleActive = function ($ctrl) {
        $ctrl.$element.toggleClass('page-content-nav-item--active', $ctrl.isActive);
    };
    return PageContentNavItemDirective;
}());
Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);

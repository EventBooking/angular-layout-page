var LayoutPageModule;
(function (LayoutPageModule) {
    var Module = (function () {
        function Module(name, modules, config) {
            this.module = angular.module(name, modules, config);
        }
        Module.prototype.config = function (appConfig) {
            this.module.config(appConfig);
            return this;
        };
        Module.prototype.run = function (appRun) {
            this.module.run(appRun);
            return this;
        };
        Module.prototype.controller = function (name, controller) {
            this.module.controller(name, controller);
            return this;
        };
        Module.prototype.directive = function (name, directive) {
            this.module.directive(name, DirectiveFactory.create(directive));
            return this;
        };
        Module.prototype.filter = function (name, filter) {
            this.module.filter(name, FilterFactory.create(filter));
            return this;
        };
        Module.prototype.service = function (name, service) {
            this.module.service(name, service);
            return this;
        };
        Module.prototype.provider = function (name, provider) {
            this.module.provider(name, provider);
            return this;
        };
        Module.prototype.factory = function (name, factory) {
            this.module.factory(name, factory);
            return this;
        };
        Module.prototype.constant = function (name, value) {
            this.module.constant(name, value);
            return this;
        };
        return Module;
    })();
    LayoutPageModule.Module = Module;
    // filters
    var FilterFactory = (function () {
        function FilterFactory() {
        }
        FilterFactory.create = function (type) {
            var filter = function () {
                var inject = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inject[_i - 0] = arguments[_i];
                }
                var instance = Activator.create(type, inject);
                return function () {
                    var options = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        options[_i - 0] = arguments[_i];
                    }
                    return instance.filter.apply(instance, options);
                };
            };
            filter["$inject"] = type["$inject"];
            return filter;
        };
        return FilterFactory;
    })();
    // directives
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        DirectiveFactory.create = function (type) {
            var directive = function () {
                var inject = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inject[_i - 0] = arguments[_i];
                }
                return Activator.create(type, inject);
            };
            directive["$inject"] = type["$inject"];
            return directive;
        };
        return DirectiveFactory;
    })();
    var Activator = (function () {
        function Activator() {
        }
        Activator.create = function (type, params) {
            var instance = Object.create(type.prototype);
            instance.constructor.apply(instance, params);
            return instance;
        };
        return Activator;
    })();
})(LayoutPageModule || (LayoutPageModule = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="angular.ts"/>
var app = new LayoutPageModule.Module("ngLayoutPage", []);
var LayoutPageModule;
(function (LayoutPageModule) {
    var BodyHeaderController = (function () {
        function BodyHeaderController() {
        }
        return BodyHeaderController;
    })();
    var BodyHeaderDirective = (function () {
        function BodyHeaderDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'body-header/body-header.html';
            this.controller = BodyHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@'
            };
        }
        return BodyHeaderDirective;
    })();
    app.directive('bodyHeader', BodyHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavGroupItemController = (function () {
        function NavGroupItemController($attrs, $location) {
            this.$attrs = $attrs;
            this.$location = $location;
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
        NavGroupItemController.prototype.navigate = function () {
            this.$location.path(this.href);
        };
        NavGroupItemController.$inject = ['$attrs', '$location'];
        return NavGroupItemController;
    })();
    app.controller('navGroupItemController', NavGroupItemController);
    var NavGroupItemDirective = (function () {
        function NavGroupItemDirective($compile) {
            var _this = this;
            this.$compile = $compile;
            this.restrict = 'AEC';
            this.transclude = true;
            this.templateUrl = 'nav-group-item/nav-group-item.html';
            this.controller = NavGroupItemController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                selected: '='
            };
            this.link = function ($scope, $element, $attrs) {
                var ctrl = $scope[_this.controllerAs], clickEvent = "click." + $scope.$id;
                $scope.$on('$routeChangeSuccess', function () {
                    $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
                });
                $element.on(clickEvent, function () {
                    ctrl.navigate();
                    $scope.$apply();
                });
            };
        }
        NavGroupItemDirective.$inject = ['$compile'];
        return NavGroupItemDirective;
    })();
    app.directive('navGroupItem', NavGroupItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavHeaderController = (function () {
        function NavHeaderController() {
        }
        return NavHeaderController;
    })();
    app.controller('navHeaderController', NavHeaderController);
    var NavHeaderDirective = (function () {
        function NavHeaderDirective() {
            this.restrict = 'E';
            this.templateUrl = 'nav-header/nav-header.html';
            this.controller = NavHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                text: '@',
                small: '@'
            };
        }
        return NavHeaderDirective;
    })();
    app.directive('navHeader', NavHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageContentNavItemController = (function () {
        function PageContentNavItemController($routeParams, $location) {
            this.$location = $location;
            this.isActive = $routeParams.area === this.area;
        }
        PageContentNavItemController.prototype.select = function () {
            var url = [this.path, this.area].join("/");
            this.$location.url(url);
        };
        PageContentNavItemController.$inject = ['$routeParams', '$location'];
        return PageContentNavItemController;
    })();
    var PageContentNavItemDirective = (function () {
        function PageContentNavItemDirective() {
            var _this = this;
            this.restrict = 'E';
            this.multiElement = true;
            this.controller = PageContentNavItemController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                path: '@',
                area: '@'
            };
            this.link = function ($scope, $element) {
                var ctrl = $scope[_this.controllerAs], clickEvent = "click." + $scope.id;
                $element.toggleClass('page-content-nav-item--active', ctrl.isActive);
                $element.on(clickEvent, function () {
                    ctrl.select();
                    $scope.$apply();
                });
            };
        }
        return PageContentNavItemDirective;
    })();
    app.directive('pageContentNavItem', PageContentNavItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageHeaderController = (function () {
        function PageHeaderController() {
        }
        return PageHeaderController;
    })();
    var PageHeaderDirective = (function () {
        function PageHeaderDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'page-header/page-header.html';
            this.multiElement = true;
            this.controller = PageHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@'
            };
        }
        return PageHeaderDirective;
    })();
    app.directive('pageHeader', PageHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderController = (function () {
        function PageSliderController() {
        }
        Object.defineProperty(PageSliderController.prototype, "slideIf", {
            get: function () {
                return this._slideIf;
            },
            set: function (value) {
                this._slideIf = value;
                if (this.toggleVisibility)
                    this.toggleVisibility();
            },
            enumerable: true,
            configurable: true
        });
        PageSliderController.prototype.close = function () {
            this.slideIf = null;
            this.onClose();
        };
        return PageSliderController;
    })();
    var PageSliderDirective = (function () {
        function PageSliderDirective() {
            var _this = this;
            this.restrict = 'E';
            this.transclude = true;
            this.controller = PageSliderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                slideIf: '=',
                onClose: '&'
            };
            this.link = function ($scope, $element, $attrs, $ctrl, $transclude) {
                var ctrl = $scope[_this.controllerAs], sliderScope = null;
                ctrl.toggleVisibility = function () {
                    var isVisible = !!ctrl.slideIf;
                    $element.empty()
                        .toggleClass("is-visible", isVisible);
                    if (sliderScope) {
                        sliderScope.$destroy();
                        sliderScope = null;
                    }
                    if (!isVisible)
                        return;
                    $transclude(function (clone, scope) {
                        $element.append(clone);
                        sliderScope = scope;
                    });
                };
                ctrl.toggleVisibility();
            };
        }
        return PageSliderDirective;
    })();
    app.directive('pageSlider', PageSliderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderCancelDirective = (function () {
        function PageSliderCancelDirective() {
            this.restrict = 'A';
            this.require = '^pageSlider';
            this.link = function ($scope, $element, $attrs, slider) {
                var clickEvent = "click." + $scope.$id;
                $element.on(clickEvent, function () {
                    $scope.$apply(slider.close());
                });
                $scope.$on('$destroy', function () {
                    $element.off(clickEvent);
                });
            };
        }
        return PageSliderCancelDirective;
    })();
    app.directive('pageSliderCancel', PageSliderCancelDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PaneFooterDirective = (function () {
        function PaneFooterDirective() {
            this.restrict = 'E';
            this.link = function ($scope, $element) {
                $element.parent(".pane").addClass("pane--withFooter");
            };
        }
        return PaneFooterDirective;
    })();
    app.directive('paneFooter', PaneFooterDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PaneHeaderController = (function () {
        function PaneHeaderController() {
        }
        PaneHeaderController.prototype.close = function () {
            if (this.pageSlider == null)
                return;
            this.pageSlider.close();
        };
        return PaneHeaderController;
    })();
    var PaneHeaderDirective = (function () {
        function PaneHeaderDirective() {
            var _this = this;
            this.restrict = 'E';
            this.require = '?^pageSlider';
            this.transclude = true;
            this.templateUrl = 'pane-header/pane-header.html';
            this.controller = PaneHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@'
            };
            this.link = function ($scope, $element, $attrs, pageSlider) {
                $element.removeAttr("title");
                var ctrl = $scope[_this.controllerAs];
                ctrl.pageSlider = pageSlider;
                ctrl.showClose = $attrs.showClose != null;
            };
        }
        return PaneHeaderDirective;
    })();
    app.directive('paneHeader', PaneHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYW5ndWxhci50cyIsIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvYm9keS1oZWFkZXIvYm9keS1oZWFkZXIudHMiLCIuLi9zcmMvbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0udHMiLCIuLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLnRzIiwiLi4vc3JjL3BhZ2UtY29udGVudC1uYXYtaXRlbS9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0udHMiLCIuLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIi4uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsIi4uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyJdLCJuYW1lcyI6WyJMYXlvdXRQYWdlTW9kdWxlIiwiTGF5b3V0UGFnZU1vZHVsZS5Nb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLk1vZHVsZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTW9kdWxlLmNvbmZpZyIsIkxheW91dFBhZ2VNb2R1bGUuTW9kdWxlLnJ1biIsIkxheW91dFBhZ2VNb2R1bGUuTW9kdWxlLmNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk1vZHVsZS5kaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk1vZHVsZS5maWx0ZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk1vZHVsZS5zZXJ2aWNlIiwiTGF5b3V0UGFnZU1vZHVsZS5Nb2R1bGUucHJvdmlkZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk1vZHVsZS5mYWN0b3J5IiwiTGF5b3V0UGFnZU1vZHVsZS5Nb2R1bGUuY29uc3RhbnQiLCJMYXlvdXRQYWdlTW9kdWxlLkZpbHRlckZhY3RvcnkiLCJMYXlvdXRQYWdlTW9kdWxlLkZpbHRlckZhY3RvcnkuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkZpbHRlckZhY3RvcnkuY3JlYXRlIiwiTGF5b3V0UGFnZU1vZHVsZS5EaXJlY3RpdmVGYWN0b3J5IiwiTGF5b3V0UGFnZU1vZHVsZS5EaXJlY3RpdmVGYWN0b3J5LmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5EaXJlY3RpdmVGYWN0b3J5LmNyZWF0ZSIsIkxheW91dFBhZ2VNb2R1bGUuQWN0aXZhdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5BY3RpdmF0b3IuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkFjdGl2YXRvci5jcmVhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5oYXNJY29uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5ocmVmIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmlzU2VsZWN0ZWQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIubmF2aWdhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5zZWxlY3QiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIuc2xpZGVJZiIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIuY2xvc2UiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVGb290ZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVGb290ZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIuY2xvc2UiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sZ0JBQWdCLENBd0d0QjtBQXhHRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFjckJBO1FBR0lDLGdCQUFZQSxJQUFZQSxFQUFFQSxPQUFrQkEsRUFBRUEsTUFBaUJBO1lBQzNEQyxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUN4REEsQ0FBQ0E7UUFFREQsdUJBQU1BLEdBQU5BLFVBQU9BLFNBQW1CQTtZQUN0QkUsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVERixvQkFBR0EsR0FBSEEsVUFBSUEsTUFBZ0JBO1lBQ2hCRyxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFD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QWlDQTtnQkFDL0RBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUU3QkEsSUFBSUEsSUFBSUEsR0FBeUJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2dCQUMzREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUM5Q0EsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsMEJBQUNBO0lBQURBLENBQUNBLEFBcEJENUQsSUFvQkNBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDckRBLENBQUNBLEVBcENNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFvQ3RCIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vZHVsZSB7XHJcbiAgICAgICAgY29uZmlnKGFwcENvbmZpZzogRnVuY3Rpb24pOiBJTW9kdWxlO1xyXG4gICAgICAgIHJ1bihhcHBSdW46IEZ1bmN0aW9uKTogSU1vZHVsZTtcclxuICAgICAgICBjb250cm9sbGVyKG5hbWU6IHN0cmluZywgY29udHJvbGxlcjogRnVuY3Rpb24pOiBJTW9kdWxlO1xyXG4gICAgICAgIGRpcmVjdGl2ZShuYW1lOiBzdHJpbmcsIGRpcmVjdGl2ZTogYW55KTogSU1vZHVsZTtcclxuICAgICAgICBmaWx0ZXIobmFtZTogc3RyaW5nLCBmaWx0ZXI6IGFueSk6IElNb2R1bGU7XHJcbiAgICAgICAgc2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2U6IEZ1bmN0aW9uKTogSU1vZHVsZTtcclxuICAgICAgICBwcm92aWRlcihuYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBhbnkpOiBJTW9kdWxlO1xyXG4gICAgICAgIGZhY3RvcnkobmFtZTogc3RyaW5nLCBmYWN0b3J5OiBGdW5jdGlvbik6IElNb2R1bGU7XHJcbiAgICAgICAgY29uc3RhbnQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogSU1vZHVsZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9kdWxlIGltcGxlbWVudHMgSU1vZHVsZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtb2R1bGU6IG5nLklNb2R1bGU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbW9kdWxlcz86IHN0cmluZ1tdLCBjb25maWc/OiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIG1vZHVsZXMsIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcoYXBwQ29uZmlnOiBGdW5jdGlvbik6IElNb2R1bGUge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5jb25maWcoYXBwQ29uZmlnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBydW4oYXBwUnVuOiBGdW5jdGlvbik6IElNb2R1bGUge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5ydW4oYXBwUnVuKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250cm9sbGVyKG5hbWU6IHN0cmluZywgY29udHJvbGxlcjogRnVuY3Rpb24pOiBJTW9kdWxlIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuY29udHJvbGxlcihuYW1lLCBjb250cm9sbGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXJlY3RpdmUobmFtZTogc3RyaW5nLCBkaXJlY3RpdmUpOiBJTW9kdWxlIHtcclxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuZGlyZWN0aXZlKG5hbWUsIERpcmVjdGl2ZUZhY3RvcnkuY3JlYXRlKGRpcmVjdGl2ZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpbHRlcihuYW1lOiBzdHJpbmcsIGZpbHRlcik6IElNb2R1bGUge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5maWx0ZXIobmFtZSwgRmlsdGVyRmFjdG9yeS5jcmVhdGUoZmlsdGVyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2U6IEZ1bmN0aW9uKTogSU1vZHVsZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLnNlcnZpY2UobmFtZSwgc2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdmlkZXIobmFtZTogc3RyaW5nLCBwcm92aWRlcik6IElNb2R1bGUge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5wcm92aWRlcihuYW1lLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmFjdG9yeShuYW1lOiBzdHJpbmcsIGZhY3Rvcnk6IEZ1bmN0aW9uKTogSU1vZHVsZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlLmZhY3RvcnkobmFtZSwgZmFjdG9yeSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RhbnQobmFtZTogc3RyaW5nLCB2YWx1ZSk6IElNb2R1bGUge1xyXG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5jb25zdGFudChuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaWx0ZXJzXHJcbiAgICBjbGFzcyBGaWx0ZXJGYWN0b3J5IHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSAoLi4uaW5qZWN0OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gQWN0aXZhdG9yLmNyZWF0ZSh0eXBlLCBpbmplY3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICguLi5vcHRpb25zOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5maWx0ZXIuYXBwbHkoaW5zdGFuY2UsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmlsdGVyW1wiJGluamVjdFwiXSA9IHR5cGVbXCIkaW5qZWN0XCJdO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkaXJlY3RpdmVzXHJcbiAgICBjbGFzcyBEaXJlY3RpdmVGYWN0b3J5IHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcyk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3RpdmUgPSAoLi4uaW5qZWN0OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFjdGl2YXRvci5jcmVhdGUodHlwZSwgaW5qZWN0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlyZWN0aXZlW1wiJGluamVjdFwiXSA9IHR5cGVbXCIkaW5qZWN0XCJdO1xyXG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhY3RpdmF0b3JcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGl2YXRvckNsYXNzIHtcclxuICAgICAgICBuZXcoLi4ucGFyYW1zOiBhbnlbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQWN0aXZhdG9yIHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IElBY3RpdmF0b3JDbGFzcywgcGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKHR5cGUucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuY29uc3RydWN0b3IuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImFuZ3VsYXIudHNcIi8+XHJcblxyXG52YXIgYXBwID0gbmV3IExheW91dFBhZ2VNb2R1bGUuTW9kdWxlKFwibmdMYXlvdXRQYWdlXCIsIFtdKTsiLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmljb25DbGFzcyAhPSBudWxsICYmIHRoaXMuaWNvbkNsYXNzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcy4kbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKHggPT4gcGF0aC5pbmRleE9mKHgpID09PSAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgodGhpcy5ocmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmNvbnRyb2xsZXIoJ25hdkdyb3VwSXRlbUNvbnRyb2xsZXInLCBOYXZHcm91cEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUVDJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2R3JvdXBJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgY3RybC5pc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm5hdmlnYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgnbmF2R3JvdXBJdGVtJywgTmF2R3JvdXBJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHRcclxuXHRhcHAuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCduYXZIZWFkZXInLCBOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm91dGVQYXJhbXMnLCAnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRyb3V0ZVBhcmFtcywgcHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9ICRyb3V0ZVBhcmFtcy5hcmVhID09PSB0aGlzLmFyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgYXJlYTogc3RyaW5nO1xyXG4gICAgICAgIGlzQWN0aXZlO1xyXG5cclxuICAgICAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBbdGhpcy5wYXRoLCB0aGlzLmFyZWFdLmpvaW4oXCIvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwodXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYWdlLWNvbnRlbnQtbmF2LWl0ZW0tLWFjdGl2ZScsIGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ3BhZ2VIZWFkZXInLCBQYWdlSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfc2xpZGVJZjtcclxuXHJcbiAgICAgICAgZ2V0IHNsaWRlSWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHNsaWRlSWYodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGVWaXNpYmlsaXR5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNsb3NlO1xyXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHk7XHJcbiAgICAgICAgd2l0aEZvb3RlcjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJZiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICR0cmFuc2NsdWRlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVZpc2liaWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWaXNpYmxlID0gISFjdHJsLnNsaWRlSWY7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImlzLXZpc2libGVcIiwgaXNWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoIChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICAgICAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlci5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwucGFnZVNsaWRlciA9IHBhZ2VTbGlkZXI7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0Nsb3NlID0gJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xyXG59Il19
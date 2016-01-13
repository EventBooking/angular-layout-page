/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
var app = new AngularTypescriptModule.Module("ngLayoutPage", []);
var LayoutPageModule;
(function (LayoutPageModule) {
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
    })();
    var BlankslateDirective = (function () {
        function BlankslateDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'blankslate/blankslate.html';
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
    })();
    app.directive('blankslate', BlankslateDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS50cyIsIi4uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS50cyIsIi4uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIl0sIm5hbWVzIjpbIkxheW91dFBhZ2VNb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5CbGFua3NsYXRlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQmxhbmtzbGF0ZUNvbnRyb2xsZXIuaGFzU3VidGl0bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5oYXNJY29uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5ocmVmIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmlzU2VsZWN0ZWQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIubmF2aWdhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5zZWxlY3QiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIuc2xpZGVJZiIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIuY2xvc2UiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVGb290ZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVGb290ZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIuY2xvc2UiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJEaXJlY3RpdmUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLDJDQUEyQztBQUMzQyx5R0FBeUc7QUFFekcsSUFBSSxHQUFHLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDSGpFLElBQU8sZ0JBQWdCLENBeUJ0QjtBQXpCRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUFDO1FBTUFDLENBQUNBO1FBSEdELHNCQUFJQSw2Q0FBV0E7aUJBQWZBO2dCQUNJRSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUN2RUEsQ0FBQ0E7OztXQUFBRjtRQUNMQSwyQkFBQ0E7SUFBREEsQ0FBQ0EsQUFOREQsSUFNQ0E7SUFFREE7UUFBQUk7WUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsZUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDbEJBLGdCQUFXQSxHQUFHQSw0QkFBNEJBLENBQUNBO1lBQzNDQSxlQUFVQSxHQUFHQSxvQkFBb0JBLENBQUNBO1lBQ2xDQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEJBLFVBQUtBLEdBQUdBO2dCQUNKQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFaREosSUFZQ0E7SUFFREEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsRUFBRUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtBQUNyREEsQ0FBQ0EsRUF6Qk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQXlCdEI7QUN6QkQsSUFBTyxnQkFBZ0IsQ0FtQnRCO0FBbkJELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFBQU07UUFDQUMsQ0FBQ0E7UUFBREQsMkJBQUNBO0lBQURBLENBQUNBLEFBREROLElBQ0NBO0lBRURBO1FBQUFRO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsOEJBQThCQSxDQUFDQTtZQUM3Q0EsZUFBVUEsR0FBR0Esb0JBQW9CQSxDQUFDQTtZQUNsQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFYRFIsSUFXQ0E7SUFFREEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsRUFBRUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtBQUNyREEsQ0FBQ0EsRUFuQk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQW1CdEI7QUNuQkQsSUFBTyxnQkFBZ0IsQ0F5RXRCO0FBekVELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFHSVUsZ0NBQW9CQSxNQUFNQSxFQUFVQSxTQUFTQTtZQUF6QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBQUE7WUFBVUEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBQUE7UUFFN0NBLENBQUNBO1FBRURELHNCQUFJQSwyQ0FBT0E7aUJBQVhBO2dCQUNJRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMvREEsQ0FBQ0E7OztXQUFBRjtRQUVEQSxzQkFBSUEsNkNBQVNBO2lCQUFiQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FBQUg7UUFFREEsc0JBQUlBLHdDQUFJQTtpQkFBUkE7Z0JBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQzVCQSxDQUFDQTs7O1dBQUFKO1FBSURBLHNCQUFJQSw4Q0FBVUE7aUJBQWRBO2dCQUNJSyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDakNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO29CQUNuREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQTtvQkFDdEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2dCQUNqQkEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQUEsQ0FBQ0EsSUFBSUEsT0FBQUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBckJBLENBQXFCQSxDQUFDQSxDQUFDQTtnQkFDOURBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1lBQzdCQSxDQUFDQTs7O1dBQUFMO1FBRURBLHlDQUFRQSxHQUFSQTtZQUNJTSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7UUFoQ01OLDhCQUFPQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtRQWlDN0NBLDZCQUFDQTtJQUFEQSxDQUFDQSxBQWxDRFYsSUFrQ0NBO0lBRURBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLHdCQUF3QkEsRUFBRUEsc0JBQXNCQSxDQUFDQSxDQUFDQTtJQUVqRUE7UUFHSWlCLCtCQUFvQkEsUUFBUUE7WUFIaENDLGlCQThCQ0E7WUEzQnVCQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFBQTtZQUk1QkEsYUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDakJBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0Esb0NBQW9DQSxDQUFDQTtZQUNuREEsZUFBVUEsR0FBR0Esc0JBQXNCQSxDQUFDQTtZQUNwQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsUUFBUUEsRUFBRUEsR0FBR0E7YUFDaEJBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BO2dCQUM1QkEsSUFBSUEsSUFBSUEsR0FBMkJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQ3hEQSxVQUFVQSxHQUFHQSxXQUFTQSxNQUFNQSxDQUFDQSxHQUFLQSxDQUFDQTtnQkFFdkNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLHFCQUFxQkEsRUFBRUE7b0JBQzlCQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSwwQkFBMEJBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN0RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLEVBQUVBO29CQUNwQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7b0JBQ2hCQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBO1FBeEJGQSxDQUFDQTtRQUpNRCw2QkFBT0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUE2QmxDQSw0QkFBQ0E7SUFBREEsQ0FBQ0EsQUE5QkRqQixJQThCQ0E7SUFFREEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsY0FBY0EsRUFBRUEscUJBQXFCQSxDQUFDQSxDQUFDQTtBQUN6REEsQ0FBQ0EsRUF6RU0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQXlFdEI7QUN6RUQsSUFBTyxnQkFBZ0IsQ0FxQnRCO0FBckJELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFBQW1CO1FBRUFDLENBQUNBO1FBQURELDBCQUFDQTtJQUFEQSxDQUFDQSxBQUZEbkIsSUFFQ0E7SUFFSkEsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EscUJBQXFCQSxFQUFFQSxtQkFBbUJBLENBQUNBLENBQUNBO0lBRXhEQTtRQUFBcUI7WUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsZ0JBQVdBLEdBQUdBLDRCQUE0QkEsQ0FBQ0E7WUFDM0NBLGVBQVVBLEdBQUdBLG1CQUFtQkEsQ0FBQ0E7WUFDakNBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLElBQUlBLEVBQUVBLEdBQUdBO2dCQUNUQSxLQUFLQSxFQUFFQSxHQUFHQTthQUNiQSxDQUFBQTtRQUNMQSxDQUFDQTtRQUFERCx5QkFBQ0E7SUFBREEsQ0FBQ0EsQUFWRHJCLElBVUNBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7QUFDbkRBLENBQUNBLEVBckJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFxQnRCO0FDckJELElBQU8sZ0JBQWdCLENBMkN0QjtBQTNDRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBR0l1QixzQ0FBWUEsWUFBWUEsRUFBVUEsU0FBU0E7WUFBVEMsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBQUE7WUFDdkNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBLEtBQUtBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQU1ERCw2Q0FBTUEsR0FBTkE7WUFDSUUsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQzVCQSxDQUFDQTtRQWJNRixvQ0FBT0EsR0FBR0EsQ0FBQ0EsY0FBY0EsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFjbkRBLG1DQUFDQTtJQUFEQSxDQUFDQSxBQWZEdkIsSUFlQ0E7SUFFREE7UUFBQTBCO1lBQUFDLGlCQXFCQ0E7WUFwQkdBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEsZUFBVUEsR0FBR0EsNEJBQTRCQSxDQUFDQTtZQUMxQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsSUFBSUEsRUFBRUEsR0FBR0E7Z0JBQ1RBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1pBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBO2dCQUNwQkEsSUFBSUEsSUFBSUEsR0FBaUNBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQzlEQSxVQUFVQSxHQUFHQSxXQUFTQSxNQUFNQSxDQUFDQSxFQUFJQSxDQUFDQTtnQkFFdENBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLCtCQUErQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JFQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQTtvQkFDcEJBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO29CQUNkQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELGtDQUFDQTtJQUFEQSxDQUFDQSxBQXJCRDFCLElBcUJDQTtJQUVEQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxvQkFBb0JBLEVBQUVBLDJCQUEyQkEsQ0FBQ0EsQ0FBQ0E7QUFDckVBLENBQUNBLEVBM0NNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUEyQ3RCO0FDM0NELElBQU8sZ0JBQWdCLENBb0J0QjtBQXBCRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUE0QjtRQUNBQyxDQUFDQTtRQUFERCwyQkFBQ0E7SUFBREEsQ0FBQ0EsQUFERDVCLElBQ0NBO0lBRURBO1FBQUE4QjtZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLDhCQUE4QkEsQ0FBQ0E7WUFDN0NBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEsZUFBVUEsR0FBR0Esb0JBQW9CQSxDQUFDQTtZQUNsQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFaRDlCLElBWUNBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDckRBLENBQUNBLEVBcEJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFvQnRCO0FDcEJELElBQU8sZ0JBQWdCLENBcUV0QjtBQXJFRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFNckJBO1FBQUFnQztRQXFCQUMsQ0FBQ0E7UUFsQkdELHNCQUFJQSx5Q0FBT0E7aUJBQVhBO2dCQUNJRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7aUJBRURGLFVBQVlBLEtBQUtBO2dCQUNiRSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDdEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1lBQ2hDQSxDQUFDQTs7O1dBTkFGO1FBWURBLG9DQUFLQSxHQUFMQTtZQUNJRyxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBQ0xILDJCQUFDQTtJQUFEQSxDQUFDQSxBQXJCRGhDLElBcUJDQTtJQUVEQTtRQUFBb0M7WUFBQUMsaUJBcUNDQTtZQXBDR0EsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsZUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDbEJBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLE9BQU9BLEVBQUVBLEdBQUdBO2dCQUNaQSxPQUFPQSxFQUFFQSxHQUFHQTthQUNmQSxDQUFDQTtZQUVGQSxTQUFJQSxHQUFHQSxVQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxFQUFFQSxLQUFLQSxFQUFFQSxXQUFXQTtnQkFDaERBLElBQUlBLElBQUlBLEdBQXlCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUN0REEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBRXZCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBO29CQUNwQkEsSUFBSUEsU0FBU0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBRS9CQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQTt5QkFDWEEsV0FBV0EsQ0FBQ0EsWUFBWUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7b0JBRTFDQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDZEEsV0FBV0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7d0JBQ3ZCQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDdkJBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQTt3QkFDWEEsTUFBTUEsQ0FBQ0E7b0JBRVhBLFdBQVdBLENBQUVBLFVBQUNBLEtBQUtBLEVBQUVBLEtBQUtBO3dCQUN0QkEsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3ZCQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDeEJBLENBQUNBLENBQUNBLENBQUNBO2dCQUNQQSxDQUFDQSxDQUFDQTtnQkFFRkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUM1QkEsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsMEJBQUNBO0lBQURBLENBQUNBLEFBckNEcEMsSUFxQ0NBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDckRBLENBQUNBLEVBckVNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFxRXRCO0FDckVELElBQU8sZ0JBQWdCLENBbUJ0QjtBQW5CRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUFzQztZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxZQUFPQSxHQUFHQSxhQUFhQSxDQUFDQTtZQUN4QkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsTUFBNkJBO2dCQUMzREEsSUFBSUEsVUFBVUEsR0FBR0EsV0FBU0EsTUFBTUEsQ0FBQ0EsR0FBS0EsQ0FBQ0E7Z0JBRXZDQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFDQTtvQkFDbkJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNsQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUNBO29CQUNsQkEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzdCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCxnQ0FBQ0E7SUFBREEsQ0FBQ0EsQUFkRHRDLElBY0NBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLGtCQUFrQkEsRUFBRUEseUJBQXlCQSxDQUFDQSxDQUFDQTtBQUNqRUEsQ0FBQ0EsRUFuQk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQW1CdEI7QUNuQkQsSUFBTyxnQkFBZ0IsQ0FXdEI7QUFYRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUF3QztZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVmQSxTQUFJQSxHQUFHQSxVQUFDQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDcEJBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELDBCQUFDQTtJQUFEQSxDQUFDQSxBQU5EeEMsSUFNQ0E7SUFFREEsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsRUFBRUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtBQUNyREEsQ0FBQ0EsRUFYTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBV3RCO0FDWEQsSUFBTyxnQkFBZ0IsQ0FvQ3RCO0FBcENELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFBQTBDO1FBU0FDLENBQUNBO1FBTEdELG9DQUFLQSxHQUFMQTtZQUNJRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDeEJBLE1BQU1BLENBQUNBO1lBQ1hBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBQzVCQSxDQUFDQTtRQUNMRiwyQkFBQ0E7SUFBREEsQ0FBQ0EsQUFURDFDLElBU0NBO0lBRURBO1FBQUE2QztZQUFBQyxpQkFvQkNBO1lBbkJHQSxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxZQUFPQSxHQUFHQSxjQUFjQSxDQUFDQTtZQUN6QkEsZUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDbEJBLGdCQUFXQSxHQUFHQSw4QkFBOEJBLENBQUNBO1lBQzdDQSxlQUFVQSxHQUFHQSxvQkFBb0JBLENBQUNBO1lBQ2xDQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEJBLFVBQUtBLEdBQUdBO2dCQUNKQSxLQUFLQSxFQUFFQSxHQUFHQTtnQkFDVkEsUUFBUUEsRUFBRUEsR0FBR0E7YUFDaEJBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLFVBQWlDQTtnQkFDL0RBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUU3QkEsSUFBSUEsSUFBSUEsR0FBeUJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2dCQUMzREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUM5Q0EsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsMEJBQUNBO0lBQURBLENBQUNBLEFBcEJEN0MsSUFvQkNBO0lBRURBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDckRBLENBQUNBLEVBcENNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFvQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUvZGlzdC9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlLmQudHNcIi8+XHJcblxyXG52YXIgYXBwID0gbmV3IEFuZ3VsYXJUeXBlc2NyaXB0TW9kdWxlLk1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgICAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGljb246ICdAJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdib2R5LWhlYWRlci9ib2R5LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQm9keUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNJY29uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmljb25DbGFzcy5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaHJlZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmhyZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZDogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHJlZiAhPSBudWxsICYmIHBhdGguaW5kZXhPZih0aGlzLmhyZWYpID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcih4ID0+IHBhdGguaW5kZXhPZih4KSA9PT0gMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKHRoaXMuaHJlZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcC5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFQyc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsIGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5uYXZpZ2F0ZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0YXBwLmNvbnRyb2xsZXIoJ25hdkhlYWRlckNvbnRyb2xsZXInLCBOYXZIZWFkZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiAnQCcsXHJcbiAgICAgICAgICAgIHNtYWxsOiAnQCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgnbmF2SGVhZGVyJywgTmF2SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvdXRlUGFyYW1zJywgJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcigkcm91dGVQYXJhbXMsIHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSAkcm91dGVQYXJhbXMuYXJlYSA9PT0gdGhpcy5hcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgIGFyZWE6IHN0cmluZztcclxuICAgICAgICBpc0FjdGl2ZTtcclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gW3RoaXMucGF0aCwgdGhpcy5hcmVhXS5qb2luKFwiL1wiKTtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgbXVsdGlFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBwYXRoOiAnQCcsXHJcbiAgICAgICAgICAgIGFyZWE6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLmlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCBjdHJsLmlzQWN0aXZlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCdwYWdlQ29udGVudE5hdkl0ZW0nLCBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhcHAuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIGNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgX3NsaWRlSWY7XHJcblxyXG4gICAgICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlSWYgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlVmlzaWJpbGl0eSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25DbG9zZTtcclxuICAgICAgICB0b2dnbGVWaXNpYmlsaXR5O1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkdHJhbnNjbHVkZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFnZVNsaWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgY3RybC50b2dnbGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9ICEhY3RybC5zbGlkZUlmO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJpcy12aXNpYmxlXCIsIGlzVmlzaWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKCAoY2xvbmUsIHNjb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICAgICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZVNsaWRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICc/XnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwidGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFuZUhlYWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgICAgICBjdHJsLnBhZ2VTbGlkZXIgPSBwYWdlU2xpZGVyO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dDbG9zZSA9ICRhdHRycy5zaG93Q2xvc2UgIT0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcclxufSJdfQ==
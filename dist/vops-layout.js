/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
Angular.module("ngLayoutPage", []);
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
    Angular.module("ngLayoutPage").directive('blankslate', BlankslateDirective);
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
    Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var DoughnutController = (function () {
        function DoughnutController() {
            this.innerRadius = 65; // 75%
            this.animateSpeed = 10;
            this._value = 0;
        }
        DoughnutController.prototype.onInit = function ($element, context, animate) {
            this.$element = $element;
            this.context = context;
            this.animate = animate;
        };
        Object.defineProperty(DoughnutController.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (newVal) {
                var oldVal = this._value;
                this._value = newVal;
                if (this.animate != null) {
                    this.animate(this, oldVal, newVal);
                }
            },
            enumerable: true,
            configurable: true
        });
        return DoughnutController;
    })();
    var DoughnutDirective = (function () {
        function DoughnutDirective($interval) {
            var _this = this;
            this.$interval = $interval;
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'doughnut/doughnut.html';
            this.controller = DoughnutController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                value: '@',
                color: '@',
                colorClass: '@',
                emptyColorClass: '@'
            };
            this.link = function ($scope, $element, $attr, $ctrl) {
                var context = $element.find("canvas").get(0).getContext("2d");
                $ctrl.onInit($element, context, function ($ctrl, from, to) {
                    return _this.animate($ctrl, from, to);
                });
                var promise = _this.watchSize($ctrl);
                $scope.$on("$destroy", function () {
                    _this.$interval.cancel(promise);
                });
            };
        }
        DoughnutDirective.prototype.getSize = function ($ctrl) {
            var size = $ctrl.$element.width() + $ctrl.$element.height();
            return size;
        };
        DoughnutDirective.prototype.watchSize = function ($ctrl) {
            var _this = this;
            var size = 0;
            var promise = this.$interval(function () {
                var temp = _this.getSize($ctrl);
                var changed = size != temp;
                size = temp;
                if (changed)
                    _this.animate($ctrl, $ctrl.value, $ctrl.value);
            }, 100);
            return promise;
        };
        DoughnutDirective.prototype.convertToRadians = function (percent) {
            var radians = percent / 100 * 360 * Math.PI / 180;
            return radians;
        };
        DoughnutDirective.prototype.drawWedge = function ($ctrl, cX, cY, radius, from, to, color) {
            var fromRadians = this.convertToRadians(from);
            var toRadians = this.convertToRadians(to);
            // draw the wedge
            $ctrl.context.save();
            $ctrl.context.beginPath();
            $ctrl.context.moveTo(cX, cY);
            $ctrl.context.arc(cX, cY, radius, 0, toRadians, false);
            $ctrl.context.closePath();
            $ctrl.context.fillStyle = color;
            $ctrl.context.fill();
            $ctrl.context.restore();
        };
        DoughnutDirective.prototype.drawDonut = function ($ctrl, cX, cY, radius, color) {
            // cut out an inner-circle == donut
            $ctrl.context.beginPath();
            $ctrl.context.moveTo(cX, cY);
            $ctrl.context.fillStyle = color;
            $ctrl.context.arc(cX, cY, radius * ($ctrl.innerRadius / 100), 0, 2 * Math.PI, false);
            $ctrl.context.fill();
        };
        DoughnutDirective.prototype.draw = function ($ctrl, from, to, emptyColor, fillColor) {
            // define the donut
            $ctrl.context.canvas.width = $ctrl.$element.width();
            $ctrl.context.canvas.height = $ctrl.$element.height();
            var cX = this.getX($ctrl);
            var cY = this.getY($ctrl);
            var radius = this.getRadius(cX, cY);
            this.drawWedge($ctrl, cX, cY, radius, 0, 100, emptyColor);
            this.drawWedge($ctrl, cX, cY, radius, from, to, fillColor);
            var bgcolor = $ctrl.$element.css("background-color");
            if (bgcolor == "rgba(0, 0, 0, 0)")
                bgcolor = "white";
            this.drawDonut($ctrl, cX, cY, radius, bgcolor);
        };
        DoughnutDirective.prototype.getX = function ($ctrl) {
            var cX = Math.floor($ctrl.context.canvas.width / 2);
            return cX;
        };
        DoughnutDirective.prototype.getY = function ($ctrl) {
            var cY = Math.floor($ctrl.context.canvas.height / 2);
            return cY;
        };
        DoughnutDirective.prototype.getRadius = function (x, y) {
            var radius = Math.min(x, y);
            return radius;
        };
        DoughnutDirective.prototype.getElementStyle = function (className, style) {
            var $body = angular.element("body");
            var $element = angular.element("<div class=\"" + className + "\"></div>");
            $body.append($element);
            var value = $element.css(style);
            $element.remove();
            return value;
        };
        DoughnutDirective.prototype.animate = function ($ctrl, from, to) {
            $ctrl.context.clearRect(0, 0, $ctrl.context.canvas.width, $ctrl.context.canvas.height);
            var emptyColor = this.getElementStyle($ctrl.emptyColorClass || "doughnut-empty-color", "background-color");
            var fillColor = this.getElementStyle($ctrl.colorClass || "doughnut-fill-color", "background-color");
            if ($ctrl.color)
                fillColor = $ctrl.color;
            var nFrom = Number(from);
            var nTo = Number(to);
            if (nFrom < nTo)
                return this.animateUp($ctrl, nFrom, nTo, emptyColor, fillColor);
            else
                return this.animateDown($ctrl, nFrom, nTo, emptyColor, fillColor);
        };
        DoughnutDirective.prototype.animateUp = function ($ctrl, from, to, emptyColor, fillColor) {
            var _this = this;
            this.cancelAnimation($ctrl);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value > to) {
                    _this.cancelAnimation($ctrl);
                    return;
                }
                _this.draw($ctrl, from, value, emptyColor, fillColor);
                value++;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.animateDown = function ($ctrl, from, to, emptyColor, fillColor) {
            var _this = this;
            this.cancelAnimation($ctrl);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value < to) {
                    _this.cancelAnimation($ctrl);
                    return;
                }
                _this.draw($ctrl, to, value, emptyColor, fillColor);
                value--;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.cancelAnimation = function ($ctrl) {
            if ($ctrl.animationPromise)
                this.$interval.cancel($ctrl.animationPromise);
        };
        DoughnutDirective.$inject = ['$interval'];
        return DoughnutDirective;
    })();
    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
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
    Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
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
    Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavHeaderController = (function () {
        function NavHeaderController() {
        }
        return NavHeaderController;
    })();
    Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
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
    Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
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
            var params = {};
            params[this.param || 'area'] = this._area;
            this.$location.search(params);
            this.toggleActive(this);
        };
        PageContentNavItemController.$inject = ['$location'];
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
    })();
    Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);
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
                subtitle: '@',
                label: '@'
            };
        }
        return PageHeaderDirective;
    })();
    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
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
    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
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
    Angular.module("ngLayoutPage").directive('pageSliderCancel', PageSliderCancelDirective);
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
    Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
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
    Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS50cyIsIi4uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci50cyIsIi4uL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsIi4uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS50cyIsIi4uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIl0sIm5hbWVzIjpbIkxheW91dFBhZ2VNb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5CbGFua3NsYXRlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQmxhbmtzbGF0ZUNvbnRyb2xsZXIuaGFzU3VidGl0bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXRDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci52YWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS53YXRjaFNpemUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnZlcnRUb1JhZGlhbnMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmRyYXdXZWRnZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuZHJhd0RvbnV0IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5kcmF3IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRYIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRZIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRSYWRpdXMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEVsZW1lbnRTdHlsZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuYW5pbWF0ZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuYW5pbWF0ZVVwIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5hbmltYXRlRG93biIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuY2FuY2VsQW5pbWF0aW9uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmhhc0ljb24iLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIuaWNvbkNsYXNzIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmhyZWYiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIuaXNTZWxlY3RlZCIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5uYXZpZ2F0ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2SGVhZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uSW5pdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5hcmVhIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmlzQWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLnNlbGVjdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uQXJlYUNoYW5nZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZS50b2dnbGVBY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5zbGlkZUlmIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLHlHQUF5RztBQUV6RyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0huQyxJQUFPLGdCQUFnQixDQXlCdEI7QUF6QkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUFBQztRQU1BQyxDQUFDQTtRQUhHRCxzQkFBSUEsNkNBQVdBO2lCQUFmQTtnQkFDSUUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7WUFDdkVBLENBQUNBOzs7V0FBQUY7UUFDTEEsMkJBQUNBO0lBQURBLENBQUNBLEFBTkRELElBTUNBO0lBRURBO1FBQUFJO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsNEJBQTRCQSxDQUFDQTtZQUMzQ0EsZUFBVUEs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LGdCQUFnQixLQUFoQixnQkFBZ0IsUUFvQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUvZGlzdC9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlLmQudHNcIi8+XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgICAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGljb246ICdAJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdibGFua3NsYXRlJywgQmxhbmtzbGF0ZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JvZHlIZWFkZXInLCBCb2R5SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHQsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgICAgICBjb250ZXh0OiBhbnk7XHJcbiAgICAgICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgICAgIGFuaW1hdGU6ICgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpID0+IHt9O1xyXG5cclxuICAgICAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgdmFsdWUobmV3VmFsOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgb2xkVmFsLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGludGVydmFsJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGludGVydmFsKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnZG91Z2hudXQvZG91Z2hudXQuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IERvdWdobnV0Q29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnQCcsXHJcbiAgICAgICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmwpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gJGVsZW1lbnQuZmluZChcImNhbnZhc1wiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsIGNvbnRleHQsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKSArICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdhdGNoU2l6ZSgkY3RybCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBzaXplICE9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gdGVtcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoJGN0cmwsICRjdHJsLnZhbHVlLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSk7XHJcbiAgICAgICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8pO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyB0aGUgd2VkZ2VcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzLCAwLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZW1wdHlDb2xvciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSB0aGUgZG9udXRcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5jYW52YXMud2lkdGggPSAkY3RybC4kZWxlbWVudC53aWR0aCgpO1xyXG4gICAgICAgICAgICAkY3RybC5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybCk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybCk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsIGNYLCBjWSwgcmFkaXVzLCAwLCAxMDAsIGVtcHR5Q29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIilcclxuICAgICAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCBjWCwgY1ksIHJhZGl1cywgYmdjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRYKCRjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoJGN0cmwuY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WSgkY3RybCkge1xyXG4gICAgICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKCRjdHJsLmNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYWRpdXMoeCwgeSkge1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gTWF0aC5taW4oeCwgeSk7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEVsZW1lbnRTdHlsZShjbGFzc05hbWUsIHN0eWxlKSB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAkYm9keS5hcHBlbmQoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkZWxlbWVudC5jc3Moc3R5bGUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgJGN0cmwuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgJGN0cmwuY29udGV4dC5jYW52YXMud2lkdGgsICRjdHJsLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZW1wdHlDb2xvciwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGVtcHR5Q29sb3IsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBlbXB0eUNvbG9yLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxBbmltYXRpb24oJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxBbmltYXRpb24oJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGVtcHR5Q29sb3IsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBlbXB0eUNvbG9yLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxBbmltYXRpb24oJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxBbmltYXRpb24oJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgdG8sIHZhbHVlLCBlbXB0eUNvbG9yLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUtLTtcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbigkY3RybCkge1xyXG4gICAgICAgICAgICBpZiAoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXZpZ2F0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCh0aGlzLmhyZWYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFQyc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsIGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5uYXZpZ2F0ZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2R3JvdXBJdGVtJywgTmF2R3JvdXBJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHRcclxuXHRBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZIZWFkZXJDb250cm9sbGVyJywgTmF2SGVhZGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtaGVhZGVyL25hdi1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGV4dDogJ0AnLFxyXG4gICAgICAgICAgICBzbWFsbDogJ0AnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2SGVhZGVyJywgTmF2SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBpc0RlZmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmlzRGVmYXVsdCA9IGlzRGVmYXVsdDtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0OiBib29sZWFuO1xyXG4gICAgICAgIHBhdGg6IHN0cmluZztcclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG4gICAgICAgIHBhcmFtOiBzdHJpbmc7XHJcbiAgICAgICAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9hcmVhOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFyZWEoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYXJlYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkFyZWFDaGFuZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0FjdGl2ZSgpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ10gPSB0aGlzLl9hcmVhO1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gocGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlID0gKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7IH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgcGFyYW06ICdAJyxcclxuICAgICAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgICAgICBhcmVhOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsICRhdHRyLmRlZmF1bHQgIT0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVVcGRhdGUnLCBmdW5jdGlvbihldnQsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICRjdHJsLm9uUm91dGVDaGFuZ2UoY3VycmVudC5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0b2dnbGVBY3RpdmUoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgJGN0cmwuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhZ2UtY29udGVudC1uYXYtaXRlbS0tYWN0aXZlJywgJGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBjbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgICAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ2xvc2U7XHJcbiAgICAgICAgdG9nZ2xlVmlzaWJpbGl0eTtcclxuICAgICAgICB3aXRoRm9vdGVyOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUlmID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzbGlkZUlmOiAnPScsXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IFBhZ2VTbGlkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc1Zpc2libGUgPSAhIWN0cmwuc2xpZGVJZjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwiaXMtdmlzaWJsZVwiLCBpc1Zpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXJTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkdHJhbnNjbHVkZSggKGNsb25lLCBzY29wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBzY29wZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY3RybC50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVGb290ZXInLCBQYW5lRm9vdGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc2hvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgICAgIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFuZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcInRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICAgICAgY3RybC5zaG93Q2xvc2UgPSAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcclxufSJdfQ==
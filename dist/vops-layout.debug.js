/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
Angular.module("ngLayoutPage", []);
var LayoutPageModule;
(function (LayoutPageModule) {
    var BarGraphController = (function () {
        function BarGraphController() {
            this.barSteps = 10;
            this.init = true;
            this.setTicks();
            this.setPercent();
        }
        Object.defineProperty(BarGraphController.prototype, "style", {
            get: function () {
                return {
                    width: this.percent + "%"
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BarGraphController.prototype, "isFull", {
            get: function () {
                return this.percent == 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BarGraphController.prototype, "barMin", {
            get: function () {
                return this._barMin;
            },
            set: function (value) {
                this._barMin = value;
                this.setTicks();
                this.setPercent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BarGraphController.prototype, "barMax", {
            get: function () {
                return this._barMax;
            },
            set: function (value) {
                this._barMax = value;
                this.setTicks();
                this.setPercent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BarGraphController.prototype, "barValue", {
            get: function () {
                return this._barValue;
            },
            set: function (value) {
                this._barValue = value;
                this.setPercent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BarGraphController.prototype, "barSteps", {
            get: function () {
                return this._barSteps;
            },
            set: function (value) {
                this._barSteps = value;
                this.setTicks();
            },
            enumerable: true,
            configurable: true
        });
        BarGraphController.prototype.setPercent = function () {
            if (!this.init)
                return;
            var min = Number(this.barMin);
            var max = Number(this.barMax);
            var x = Number(this.barValue);
            if (x < min)
                x = min;
            if (x > max)
                x = max;
            var div = max - min;
            if (div <= 0)
                div = 1; // prevent divide by zero error
            this.percent = 100 * (x - min) / div;
        };
        BarGraphController.prototype.setTicks = function () {
            if (!this.init)
                return;
            var min = Number(this.barMin);
            var max = Number(this.barMax);
            var div = Number(this.barSteps == null ? 10 : this.barSteps);
            if (div <= 0)
                div = 1; // prevent divide by zero error
            var steps = (max - min) / div;
            var ticks = [];
            for (var index = min; index <= max; index += steps) {
                var value = index.toString();
                if (index > 999)
                    value = (index / 1000) + "K";
                if (index > 999999)
                    value = (index / 1000000) + "M";
                if (index > 999999999)
                    value = (index / 1000000000) + "B";
                ticks.push(value);
            }
            this.ticks = ticks;
        };
        return BarGraphController;
    })();
    var BarGraphDirective = (function () {
        function BarGraphDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'bar-graph/bar-graph.html';
            this.controller = BarGraphController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                barMin: '@',
                barMax: '@',
                barValue: '@',
                barSteps: '@?'
            };
        }
        return BarGraphDirective;
    })();
    Angular.module("ngLayoutPage").directive('barGraph', BarGraphDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
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
            this.percentOffset = -25;
            this._value = 0;
        }
        DoughnutController.prototype.onInit = function ($element, contextHole, contextFill, contextBg, animate) {
            this.$element = $element;
            this.contextHole = contextHole;
            this.contextFill = contextFill;
            this.contextBg = contextBg;
            this.animate = animate;
            this.animate(this, 0, this.value);
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
                var contextHole = $element.find("canvas.doughnut-hole").get(0).getContext("2d");
                var contextFill = $element.find("canvas.doughnut-fill").get(0).getContext("2d");
                var contextBg = $element.find("canvas.doughnut-bg").get(0).getContext("2d");
                $ctrl.onInit($element, contextHole, contextFill, contextBg, function ($ctrl, from, to) {
                    return _this.animate($ctrl, from, to);
                });
                _this.init($ctrl, 0, $ctrl.value);
                var promise = _this.watchSize($ctrl);
                $scope.$watch(function () {
                    return _this.getBgColor($ctrl);
                }, function (bgcolor) {
                    // did background color change?
                    if (bgcolor != $ctrl.holeColor)
                        _this.initHole($ctrl);
                });
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
            var size = this.getSize($ctrl);
            var promise = this.$interval(function () {
                var temp = _this.getSize($ctrl);
                var changed = size != temp;
                size = temp;
                if (changed)
                    _this.init($ctrl, 0, $ctrl.value);
            }, 100);
            return promise;
        };
        DoughnutDirective.prototype.convertToRadians = function (percent) {
            var radians = percent / 100 * 360 * Math.PI / 180;
            return radians;
        };
        DoughnutDirective.prototype.drawWedge = function ($ctrl, context, cX, cY, radius, from, to, color) {
            var fromRadians = this.convertToRadians(from + $ctrl.percentOffset);
            var toRadians = this.convertToRadians(to + $ctrl.percentOffset);
            // draw the wedge
            context.save();
            context.beginPath();
            context.moveTo(cX, cY);
            context.arc(cX, cY, radius, this.convertToRadians($ctrl.percentOffset), toRadians, false);
            context.closePath();
            context.fillStyle = color;
            context.fill();
            context.restore();
        };
        DoughnutDirective.prototype.drawDonut = function ($ctrl, context, cX, cY, radius, color) {
            // cut out an inner-circle == donut
            context.beginPath();
            context.moveTo(cX, cY);
            context.fillStyle = color;
            context.arc(cX, cY, radius * ($ctrl.innerRadius / 100), 0, 2 * Math.PI, false);
            context.fill();
        };
        DoughnutDirective.prototype.setSize = function ($ctrl, context) {
            context.canvas.width = $ctrl.$element.width();
            context.canvas.height = $ctrl.$element.height();
        };
        DoughnutDirective.prototype.draw = function ($ctrl, from, to, fillColor) {
            this.reset($ctrl.contextFill);
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            this.drawWedge($ctrl, $ctrl.contextFill, cX, cY, radius, from, to, fillColor);
        };
        DoughnutDirective.prototype.getX = function (context) {
            var cX = Math.floor(context.canvas.width / 2);
            return cX;
        };
        DoughnutDirective.prototype.getY = function (context) {
            var cY = Math.floor(context.canvas.height / 2);
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
        DoughnutDirective.prototype.reset = function (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        };
        DoughnutDirective.prototype.init = function ($ctrl, from, to) {
            this.initBg($ctrl, from, to);
            this.initHole($ctrl);
            this.reset($ctrl.contextFill);
            this.setSize($ctrl, $ctrl.contextFill);
        };
        DoughnutDirective.prototype.initBg = function ($ctrl, from, to) {
            this.reset($ctrl.contextBg);
            this.setSize($ctrl, $ctrl.contextBg);
            var emptyColor = this.getElementStyle($ctrl.emptyColorClass || "doughnut-empty-color", "background-color");
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            this.drawWedge($ctrl, $ctrl.contextBg, cX, cY, radius, 0, 100, emptyColor);
        };
        DoughnutDirective.prototype.initHole = function ($ctrl) {
            this.reset($ctrl.contextHole);
            this.setSize($ctrl, $ctrl.contextHole);
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            $ctrl.holeColor = this.getBgColor($ctrl);
            this.drawDonut($ctrl, $ctrl.contextHole, cX, cY, radius, $ctrl.holeColor);
        };
        DoughnutDirective.prototype.getBgColor = function ($ctrl) {
            var bgcolor = $ctrl.$element.css("background-color");
            if (bgcolor == "rgba(0, 0, 0, 0)")
                bgcolor = "white";
            return bgcolor;
        };
        DoughnutDirective.prototype.animate = function ($ctrl, from, to) {
            var fillColor = this.getElementStyle($ctrl.colorClass || "doughnut-fill-color", "background-color");
            if ($ctrl.color)
                fillColor = $ctrl.color;
            var nFrom = Number(from);
            var nTo = Number(to);
            if (nFrom < nTo)
                return this.animateUp($ctrl, nFrom, nTo, fillColor);
            else
                return this.animateDown($ctrl, nFrom, nTo, fillColor);
        };
        DoughnutDirective.prototype.animateUp = function ($ctrl, from, to, fillColor) {
            var _this = this;
            this.cancel($ctrl.animationPromise);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value > to) {
                    _this.cancel($ctrl.animationPromise);
                    return;
                }
                _this.draw($ctrl, from, value, fillColor);
                value++;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.animateDown = function ($ctrl, from, to, fillColor) {
            var _this = this;
            this.cancel($ctrl.animationPromise);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value < to) {
                    _this.cancel($ctrl.animationPromise);
                    return;
                }
                _this.draw($ctrl, to, value, fillColor);
                value--;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.cancel = function (promise) {
            if (promise)
                this.$interval.cancel(promise);
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
    var NavMenuController = (function () {
        function NavMenuController($attrs) {
            this.$attrs = $attrs;
        }
        NavMenuController.prototype.onInit = function (toggleShown) {
            this.toggleShown = toggleShown;
        };
        Object.defineProperty(NavMenuController.prototype, "iconClass", {
            get: function () {
                return this.$attrs.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavMenuController.prototype, "isNavShown", {
            get: function () {
                return this._isNavShown;
            },
            set: function (value) {
                this._isNavShown = value;
                this.toggleShown(this);
            },
            enumerable: true,
            configurable: true
        });
        NavMenuController.prototype.toggleShown = function ($ctrl) { };
        ;
        NavMenuController.$inject = ['$attrs'];
        return NavMenuController;
    })();
    Angular.module("ngLayoutPage").controller('navController', NavMenuController);
    var NavMenuDirective = (function () {
        function NavMenuDirective() {
            var _this = this;
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'nav-menu/nav-menu.html';
            this.controller = NavMenuController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = true;
            this.link = function ($scope, $element, $attrs, $ctrl) {
                $element.on('click', function () {
                    $ctrl.isNavShown = !$ctrl.isNavShown;
                });
                $ctrl.onInit(_this.toggleShown);
            };
        }
        NavMenuDirective.prototype.toggleShown = function ($ctrl) {
            angular.element('body').toggleClass('nav--show', $ctrl.isNavShown);
        };
        ;
        return NavMenuDirective;
    })();
    Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageController = (function () {
        function PageController() {
            this.controls = [];
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
        return PageController;
    })();
    var PageDirective = (function () {
        function PageDirective() {
            this.restrict = 'C';
            this.controller = PageController;
            this.link = function ($scope, $element, $attrs, $ctrl) {
                $ctrl.controls.forEach(function (x) {
                    $element.append(x);
                });
                $ctrl.controls = [];
                $ctrl.onInit($element);
            };
        }
        return PageDirective;
    })();
    Angular.module("ngLayoutPage").directive('page', PageDirective);
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
            this.require = '^page';
            this.transclude = true;
            this.controller = PageSliderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                slideIf: '=',
                onClose: '&'
            };
            this.link = function ($scope, $element, $attrs, $page, $transclude) {
                var $ctrl = $scope[_this.controllerAs], sliderScope = null;
                $page.addControl($element);
                $scope.$on("$destroy", function () {
                    $element.remove();
                });
                $ctrl.toggleVisibility = function () {
                    var isVisible = !!$ctrl.slideIf;
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
                $ctrl.toggleVisibility();
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
var LayoutPageModule;
(function (LayoutPageModule) {
    var TabController = (function () {
        function TabController() {
        }
        return TabController;
    })();
    var TabDirective = (function () {
        function TabDirective() {
            this.restrict = 'E';
            this.require = ['^tabs', 'tab'];
            // transclude = true;
            // templateUrl = 'tab/tab.html';
            this.controller = TabController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                name: '@'
            };
            this.link = function ($scope, $element, $attrs, $ctrls) {
                var $tabs = $ctrls[0];
                var $ctrl = $ctrls[1];
                $tabs.addTab($ctrl);
            };
        }
        return TabDirective;
    })();
    Angular.module("ngLayoutPage").directive('tab', TabDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var TabsController = (function () {
        function TabsController() {
            this.tabs = [];
        }
        TabsController.prototype.onInit = function () {
            if (this._activeTab != null)
                this.selectTabByName(this._activeTab);
        };
        Object.defineProperty(TabsController.prototype, "activeTab", {
            get: function () {
                return this.selectedTab.name;
            },
            set: function (name) {
                this._activeTab = name;
                if (this.tabs != null)
                    this.selectTabByName(name);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabsController.prototype, "width", {
            get: function () {
                return this.tabs.length * 100 + "%";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabsController.prototype, "tabPosition", {
            get: function () {
                var idx = this.tabs.indexOf(this.selectedTab);
                return idx * -100 + "%";
            },
            enumerable: true,
            configurable: true
        });
        TabsController.prototype.addTab = function (tab) {
            this.tabs.push(tab);
            if (this.selectedTab == null)
                this.selectedTab = tab;
        };
        TabsController.prototype.selectTab = function (tab) {
            this.selectedTab = tab;
        };
        TabsController.prototype.selectTabByName = function (name) {
            var found = this.tabs.filter(function (x) { return x.name == name; });
            if (found.length > 0)
                this.selectTab(found[0]);
        };
        TabsController.prototype.selectTabByIndex = function (idx) {
            if (idx > 0 && this.tabs.length > idx)
                this.selectTab(this.tabs[idx]);
        };
        TabsController.prototype.selectNextTab = function () {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx + 1);
        };
        TabsController.prototype.selectPreviousTab = function () {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx - 1);
        };
        return TabsController;
    })();
    var TabsDirective = (function () {
        function TabsDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'tabs/tabs.html';
            this.controller = TabsController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                tabLink: '=',
                activeTab: '='
            };
            this.link = function ($scope, $element, $attrs, $ctrl) {
                if ($attrs.tabLink)
                    $ctrl.tabLink = $ctrl;
                $ctrl.onInit();
            };
        }
        return TabsDirective;
    })();
    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbIkxheW91dFBhZ2VNb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaENvbnRyb2xsZXIuc3R5bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5pc0Z1bGwiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJNaW4iLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJNYXgiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJWYWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLmJhclN0ZXBzIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaENvbnRyb2xsZXIuc2V0UGVyY2VudCIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLnNldFRpY2tzIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaERpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5CbGFua3NsYXRlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQmxhbmtzbGF0ZUNvbnRyb2xsZXIuaGFzU3VidGl0bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXRDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci52YWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS53YXRjaFNpemUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnZlcnRUb1JhZGlhbnMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmRyYXdXZWRnZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuZHJhd0RvbnV0IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5zZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5kcmF3IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRYIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRZIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRSYWRpdXMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEVsZW1lbnRTdHlsZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUucmVzZXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXRCZyIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuaW5pdEhvbGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEJnQ29sb3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGVVcCIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuYW5pbWF0ZURvd24iLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNhbmNlbCIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5oYXNJY29uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5ocmVmIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmlzU2VsZWN0ZWQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIubmF2aWdhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZNZW51Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIuaXNOYXZTaG93biIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRyb2xsZXIub25Jbml0IiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udHJvbGxlci5hZGRDb250cm9sIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uSW5pdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5hcmVhIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmlzQWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLnNlbGVjdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uQXJlYUNoYW5nZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZS50b2dnbGVBY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5zbGlkZUlmIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIub25Jbml0IiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5hY3RpdmVUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLndpZHRoIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci50YWJQb3NpdGlvbiIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuYWRkVGFiIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5zZWxlY3RUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLnNlbGVjdFRhYkJ5TmFtZSIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0VGFiQnlJbmRleCIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0TmV4dFRhYiIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0UHJldmlvdXNUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNEaXJlY3RpdmUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLDJDQUEyQztBQUMzQyx5R0FBeUc7QUFFekcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNIbkMsSUFBTyxnQkFBZ0IsQ0FtSXRCO0FBbklELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFDSUM7WUFDSUMsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pCQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFDdEJBLENBQUNBO1FBRURELHNCQUFJQSxxQ0FBS0E7aUJBQVRBO2dCQUNJRSxNQUFNQSxDQUFDQTtvQkFDSEEsS0FBS0EsRUFBS0EsSUFBSUEsQ0FBQ0EsT0FBT0EsTUFBR0E7aUJBQzVCQSxDQUFBQTtZQUNMQSxDQUFDQTs7O1dBQUFGO1FBRURBLHNCQUFJQSxzQ0FBTUE7aUJBQVZBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUMvQkEsQ0FBQ0E7OztXQUFBSDtRQUdEQSxzQkFBSUEsc0NBQU1BO2lCQUFWQTtnQkFDSUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDeEJBLENBQUNBO2lCQUVESixVQUFXQSxLQUFhQTtnQkFDcEJJLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7OztXQU5BSjtRQVNEQSxzQkFBSUEsc0NBQU1BO2lCQUFWQTtnQkFDSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDeEJBLENBQUNBO2lCQUVETCxVQUFXQSxLQUFhQTtnQkFDcEJLLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7OztXQU5BTDtRQVNEQSxzQkFBSUEsd0NBQVFBO2lCQUFaQTtnQkFDSU0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDMUJBLENBQUNBO2lCQUVETixVQUFhQSxLQUFhQTtnQkFDdEJNLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7WUFDdEJBLENBQUNBOzs7V0FMQU47UUFRREEsc0JBQUlBLHdDQUFRQTtpQkFBWkE7Z0JBQ0lPLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1lBQzFCQSxDQUFDQTtpQkFFRFAsVUFBYUEsS0FBYUE7Z0JBQ3RCTyxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQ3BCQSxDQUFDQTs7O1dBTEFQO1FBV0RBLHVDQUFVQSxHQUFWQTtZQUNJUSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDWEEsTUFBTUEsQ0FBQ0E7WUFFWEEsSUFBSUEsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLElBQUlBLEdBQUdBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzlCQSxJQUFJQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUU5QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ1JBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1lBRVpBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUNSQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVaQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNwQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1RBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLCtCQUErQkE7WUFFNUNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ3pDQSxDQUFDQTtRQUVEUixxQ0FBUUEsR0FBUkE7WUFDSVMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBO1lBRVhBLElBQUlBLEdBQUdBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzlCQSxJQUFJQSxHQUFHQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUM5QkEsSUFBSUEsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsR0FBR0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO2dCQUNUQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSwrQkFBK0JBO1lBRTVDQSxJQUFJQSxLQUFLQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUU5QkEsSUFBSUEsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDZkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0EsRUFBRUEsS0FBS0EsSUFBSUEsR0FBR0EsRUFBRUEsS0FBS0EsSUFBSUEsS0FBS0EsRUFBRUEsQ0FBQ0E7Z0JBQ2pEQSxJQUFJQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtnQkFDN0JBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNaQSxLQUFLQSxHQUFHQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDakNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBO29CQUNmQSxLQUFLQSxHQUFHQSxDQUFDQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDcENBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBO29CQUNsQkEsS0FBS0EsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBR0EsVUFBVUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3ZDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFFREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDdkJBLENBQUNBO1FBQ0xULHlCQUFDQTtJQUFEQSxDQUFDQSxBQS9HREQsSUErR0NBO0lBRURBO1FBQUFXO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsMEJBQTBCQSxDQUFDQTtZQUN6Q0EsZUFBVUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUNoQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsTUFBTUEsRUFBRUEsR0FBR0E7Z0JBQ1hBLE1BQU1BLEVBQUVBLEdBQUdBO2dCQUNYQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsUUFBUUEsRUFBRUEsSUFBSUE7YUFDakJBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELHdCQUFDQTtJQUFEQSxDQUFDQSxBQWJEWCxJQWFDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQW5JTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBbUl0QjtBQ25JRCxJQUFPLGdCQUFnQixDQXlCdEI7QUF6QkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUFBYTtRQU1BQyxDQUFDQTtRQUhHRCxzQkFBSUEsNkNBQVdBO2lCQUFmQTtnQkFDSUUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7WUFDdkVBLENBQUNBOzs7V0FBQUY7UUFDTEEsMkJBQUNBO0lBQURBLENBQUNBLEFBTkRiLElBTUNBO0lBRURBO1FBQUFnQjtZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLDRCQUE0QkEsQ0FBQ0E7WUFDM0NBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLElBQUlBLEVBQUVBLEdBQUdBO2dCQUNUQSxLQUFLQSxFQUFFQSxHQUFHQTtnQkFDVkEsUUFBUUEsRUFBRUEsR0FBR0E7YUFDaEJBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELDBCQUFDQTtJQUFEQSxDQUFDQSxBQVpEaEIsSUFZQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsRUFBRUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtBQUNoRkEsQ0FBQ0EsRUF6Qk0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQXlCdEI7QUN6QkQsSUFBTyxnQkFBZ0IsQ0FtQnRCO0FBbkJELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQUVyQkE7UUFBQWtCO1FBQ0FDLENBQUNBO1FBQURELDJCQUFDQTtJQUFEQSxDQUFDQSxBQUREbEIsSUFDQ0E7SUFFREE7UUFBQW9CO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsOEJBQThCQSxDQUFDQTtZQUM3Q0EsZUFBVUEsR0FBR0Esb0JBQW9CQSxDQUFDQTtZQUNsQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFYRHBCLElBV0NBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLENBQUNBLEVBbkJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFtQnRCO0FDbkJELElBQU8sZ0JBQWdCLENBK1F0QjtBQS9RRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQ0lzQjtZQXVCQUMsZ0JBQVdBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BO1lBQ3hCQSxpQkFBWUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDbEJBLGtCQUFhQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtZQXhCaEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUVERCxtQ0FBTUEsR0FBTkEsVUFBT0EsUUFBUUEsRUFBRUEsV0FBV0EsRUFBRUEsV0FBV0EsRUFBRUEsU0FBU0EsRUFBRUEsT0FBT0E7WUFDekRFLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxXQUFXQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsV0FBV0EsQ0FBQ0E7WUFDL0JBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDdENBLENBQUNBO1FBbUJERixzQkFBSUEscUNBQUtBO2lCQUFUQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDdkJBLENBQUNBO2lCQUNESCxVQUFVQSxNQUF1QkE7Z0JBQzdCRyxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO2dCQUNyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDdkNBLENBQUNBO1lBQ0xBLENBQUNBOzs7V0FQQUg7UUFRTEEseUJBQUNBO0lBQURBLENBQUNBLEFBekNEdEIsSUF5Q0NBO0lBRURBO1FBR0kwQiwyQkFBb0JBLFNBQVNBO1lBSGpDQyxpQkErTkNBO1lBNU51QkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBQUE7WUFJN0JBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0Esd0JBQXdCQSxDQUFDQTtZQUN2Q0EsZUFBVUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtZQUNoQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxVQUFVQSxFQUFFQSxHQUFHQTtnQkFDZkEsZUFBZUEsRUFBRUEsR0FBR0E7YUFDdkJBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBO2dCQUVsQ0EsSUFBSUEsV0FBV0EsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaEZBLElBQUlBLFdBQVdBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hGQSxJQUFJQSxTQUFTQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUU1RUEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsV0FBV0EsRUFBRUEsV0FBV0EsRUFBRUEsU0FBU0EsRUFBRUEsVUFBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUE7b0JBQ3hFQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDekNBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDakNBLElBQUlBLE9BQU9BLEdBQUdBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUVwQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7b0JBQ1ZBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNsQ0EsQ0FBQ0EsRUFBRUEsVUFBQUEsT0FBT0E7b0JBQ05BLCtCQUErQkE7b0JBQy9CQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxJQUFJQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQTt3QkFDM0JBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBO29CQUNuQkEsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFBQTtRQXZDREEsQ0FBQ0E7UUF5Q09ELG1DQUFPQSxHQUFmQSxVQUFnQkEsS0FBeUJBO1lBQ3JDRSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUM1REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURGLHFDQUFTQSxHQUFUQSxVQUFVQSxLQUFLQTtZQUFmRyxpQkFXQ0E7WUFWR0EsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO2dCQUN6QkEsSUFBSUEsSUFBSUEsR0FBR0EsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxJQUFJQSxPQUFPQSxHQUFHQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUVaQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQTtvQkFDUkEsS0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1JBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1FBQ25CQSxDQUFDQTtRQUVESCw0Q0FBZ0JBLEdBQWhCQSxVQUFpQkEsT0FBZUE7WUFDNUJJLElBQUlBLE9BQU9BLEdBQUdBLE9BQU9BLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2xEQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFREoscUNBQVNBLEdBQVRBLFVBQVVBLEtBQXlCQSxFQUFFQSxPQUFZQSxFQUFFQSxFQUFVQSxFQUFFQSxFQUFVQSxFQUFFQSxNQUFjQSxFQUFFQSxJQUFZQSxFQUFFQSxFQUFVQSxFQUFFQSxLQUFhQTtZQUM5SEssSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUNwRUEsSUFBSUEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUVoRUEsaUJBQWlCQTtZQUNqQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDZkEsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDcEJBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3ZCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLFNBQVNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO1lBQzFGQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNwQkEsT0FBT0EsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDMUJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2ZBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUVETCxxQ0FBU0EsR0FBVEEsVUFBVUEsS0FBeUJBLEVBQUVBLE9BQVlBLEVBQUVBLEVBQVVBLEVBQUVBLEVBQVVBLEVBQUVBLE1BQWNBLEVBQUVBLEtBQWFBO1lBQ3BHTSxtQ0FBbUNBO1lBQ25DQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUNwQkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzFCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxNQUFNQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxHQUFHQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUMvRUEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRUROLG1DQUFPQSxHQUFQQSxVQUFRQSxLQUF5QkEsRUFBRUEsT0FBWUE7WUFDM0NPLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQzlDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtRQUNwREEsQ0FBQ0E7UUFFRFAsZ0NBQUlBLEdBQUpBLFVBQUtBLEtBQXlCQSxFQUFFQSxJQUFZQSxFQUFFQSxFQUFVQSxFQUFFQSxTQUFTQTtZQUMvRFEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFFOUJBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNwQ0EsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFFcENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1FBQ2xGQSxDQUFDQTtRQUVEUixnQ0FBSUEsR0FBSkEsVUFBS0EsT0FBWUE7WUFDYlMsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1FBQ2RBLENBQUNBO1FBRURULGdDQUFJQSxHQUFKQSxVQUFLQSxPQUFZQTtZQUNiVSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMvQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDZEEsQ0FBQ0E7UUFFRFYscUNBQVNBLEdBQVRBLFVBQVVBLENBQVNBLEVBQUVBLENBQVNBO1lBQzFCVyxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDbEJBLENBQUNBO1FBRU9YLDJDQUFlQSxHQUF2QkEsVUFBd0JBLFNBQVNBLEVBQUVBLEtBQUtBO1lBQ3BDWSxJQUFJQSxLQUFLQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNwQ0EsSUFBSUEsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0Esa0JBQWVBLFNBQVNBLGNBQVVBLENBQUNBLENBQUNBO1lBQ25FQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN2QkEsSUFBSUEsS0FBS0EsR0FBR0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQ2xCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNqQkEsQ0FBQ0E7UUFFRFosaUNBQUtBLEdBQUxBLFVBQU1BLE9BQVlBO1lBQ2RhLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3pFQSxDQUFDQTtRQUVEYixnQ0FBSUEsR0FBSkEsVUFBS0EsS0FBeUJBLEVBQUVBLElBQXFCQSxFQUFFQSxFQUFtQkE7WUFDdEVjLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUVyQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQzNDQSxDQUFDQTtRQUVEZCxrQ0FBTUEsR0FBTkEsVUFBT0EsS0FBeUJBLEVBQUVBLElBQXFCQSxFQUFFQSxFQUFtQkE7WUFDeEVlLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUVyQ0EsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZUFBZUEsSUFBSUEsc0JBQXNCQSxFQUFFQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBRTNHQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNwQ0EsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1lBRXBDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUMvRUEsQ0FBQ0E7UUFFRGYsb0NBQVFBLEdBQVJBLFVBQVNBLEtBQXlCQTtZQUM5QmdCLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQzlCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUV2Q0EsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUVwQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQzlFQSxDQUFDQTtRQUVEaEIsc0NBQVVBLEdBQVZBLFVBQVdBLEtBQXlCQTtZQUNoQ2lCLElBQUlBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDckRBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLGtCQUFrQkEsQ0FBQ0E7Z0JBQzlCQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRURqQixtQ0FBT0EsR0FBUEEsVUFBUUEsS0FBeUJBLEVBQUVBLElBQXFCQSxFQUFFQSxFQUFtQkE7WUFDekVrQixJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxJQUFJQSxxQkFBcUJBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFFcEdBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBO2dCQUNaQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUU1QkEsSUFBSUEsS0FBS0EsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLEdBQUdBLEdBQUdBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBRXJCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDWkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDeERBLElBQUlBO2dCQUNBQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUM5REEsQ0FBQ0E7UUFFRGxCLHFDQUFTQSxHQUFUQSxVQUFVQSxLQUF5QkEsRUFBRUEsSUFBWUEsRUFBRUEsRUFBVUEsRUFBRUEsU0FBU0E7WUFBeEVtQixpQkFZQ0E7WUFYR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUVwQ0EsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDakJBLEtBQUtBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQ3BDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDYkEsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDcENBLE1BQU1BLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFDREEsS0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUNaQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFRG5CLHVDQUFXQSxHQUFYQSxVQUFZQSxLQUF5QkEsRUFBRUEsSUFBWUEsRUFBRUEsRUFBVUEsRUFBRUEsU0FBU0E7WUFBMUVvQixpQkFZQ0E7WUFYR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUVwQ0EsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDakJBLEtBQUtBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQ3BDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDYkEsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDcENBLE1BQU1BLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFDREEsS0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUNaQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFRHBCLGtDQUFNQSxHQUFOQSxVQUFPQSxPQUFPQTtZQUNWcUIsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ1JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQTtRQTdOTXJCLHlCQUFPQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQThObkNBLHdCQUFDQTtJQUFEQSxDQUFDQSxBQS9ORDFCLElBK05DQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO0FBQzVFQSxDQUFDQSxFQS9RTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBK1F0QjtBQy9RRCxJQUFPLGdCQUFnQixDQXlFdEI7QUF6RUQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUdJZ0QsZ0NBQW9CQSxNQUFNQSxFQUFVQSxTQUFTQTtZQUF6QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBQUE7WUFBVUEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBQUE7UUFFN0NBLENBQUNBO1FBRURELHNCQUFJQSwyQ0FBT0E7aUJBQVhBO2dCQUNJRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMvREEsQ0FBQ0E7OztXQUFBRjtRQUVEQSxzQkFBSUEsNkNBQVNBO2lCQUFiQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FBQUg7UUFFREEsc0JBQUlBLHdDQUFJQTtpQkFBUkE7Z0JBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQzVCQSxDQUFDQTs7O1dBQUFKO1FBSURBLHNCQUFJQSw4Q0FBVUE7aUJBQWRBO2dCQUNJSyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDakNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO29CQUNuREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQTtvQkFDdEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO2dCQUNqQkEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQUEsQ0FBQ0EsSUFBSUEsT0FBQUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBckJBLENBQXFCQSxDQUFDQSxDQUFDQTtnQkFDOURBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1lBQzdCQSxDQUFDQTs7O1dBQUFMO1FBRURBLHlDQUFRQSxHQUFSQTtZQUNJTSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7UUFoQ01OLDhCQUFPQSxHQUFHQSxDQUFDQSxRQUFRQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtRQWlDN0NBLDZCQUFDQTtJQUFEQSxDQUFDQSxBQWxDRGhELElBa0NDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSx3QkFBd0JBLEVBQUVBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7SUFFNUZBO1FBR0l1RCwrQkFBb0JBLFFBQVFBO1lBSGhDQyxpQkE4QkNBO1lBM0J1QkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBQUE7WUFJNUJBLGFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ2pCQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLG9DQUFvQ0EsQ0FBQ0E7WUFDbkRBLGVBQVVBLEdBQUdBLHNCQUFzQkEsQ0FBQ0E7WUFDcENBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtZQUVGQSxTQUFJQSxHQUFHQSxVQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQTtnQkFDNUJBLElBQUlBLElBQUlBLEdBQTJCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUN4REEsVUFBVUEsR0FBR0EsV0FBU0EsTUFBTUEsQ0FBQ0EsR0FBS0EsQ0FBQ0E7Z0JBRXZDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBO29CQUM5QkEsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsMEJBQTBCQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDdEVBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQTtvQkFDcEJBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO29CQUNoQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxDQUFDQTtRQXhCRkEsQ0FBQ0E7UUFKTUQsNkJBQU9BLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBNkJsQ0EsNEJBQUNBO0lBQURBLENBQUNBLEFBOUJEdkQsSUE4QkNBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLEVBQUVBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0E7QUFDcEZBLENBQUNBLEVBekVNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUF5RXRCO0FDekVELElBQU8sZ0JBQWdCLENBcUJ0QjtBQXJCRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUF5RDtRQUVBQyxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFGRHpELElBRUNBO0lBRUpBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLHFCQUFxQkEsRUFBRUEsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUVuRkE7UUFBQTJEO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGdCQUFXQSxHQUFHQSw0QkFBNEJBLENBQUNBO1lBQzNDQSxlQUFVQSxHQUFHQSxtQkFBbUJBLENBQUNBO1lBQ2pDQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEJBLFVBQUtBLEdBQUdBO2dCQUNKQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsS0FBS0EsRUFBRUEsR0FBR0E7YUFDYkEsQ0FBQUE7UUFDTEEsQ0FBQ0E7UUFBREQseUJBQUNBO0lBQURBLENBQUNBLEFBVkQzRCxJQVVDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxrQkFBa0JBLENBQUNBLENBQUNBO0FBQzlFQSxDQUFDQSxFQXJCTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBcUJ0QjtBQ3JCRCxJQUFPLGdCQUFnQixDQXVEdEI7QUF2REQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUdJNkQsMkJBQW9CQSxNQUFNQTtZQUFOQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFBQTtRQUUxQkEsQ0FBQ0E7UUFFREQsa0NBQU1BLEdBQU5BLFVBQU9BLFdBQVdBO1lBQ2RFLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBO1FBQ25DQSxDQUFDQTtRQUlERixzQkFBSUEsd0NBQVNBO2lCQUFiQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FBQUg7UUFHREEsc0JBQUlBLHlDQUFVQTtpQkFBZEE7Z0JBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1lBQzVCQSxDQUFDQTtpQkFDREosVUFBZUEsS0FBY0E7Z0JBQ3pCSSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQTs7O1dBSkFKO1FBTURBLHVDQUFXQSxHQUFYQSxVQUFZQSxLQUF3QkEsSUFBSUssQ0FBQ0E7O1FBekJsQ0wseUJBQU9BLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBMEJoQ0Esd0JBQUNBO0lBQURBLENBQUNBLEFBM0JEN0QsSUEyQkNBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGVBQWVBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFFOUVBO1FBQUFtRTtZQUFBQyxpQkFtQkNBO1lBbEJHQSxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLHdCQUF3QkEsQ0FBQ0E7WUFDdkNBLGVBQVVBLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7WUFDL0JBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFYkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsS0FBd0JBO2dCQUN0REEsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUE7b0JBQ2pCQSxLQUFLQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDekNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNIQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNuQ0EsQ0FBQ0EsQ0FBQUE7UUFLTEEsQ0FBQ0E7UUFIR0Qsc0NBQVdBLEdBQVhBLFVBQVlBLEtBQXdCQTtZQUNoQ0UsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsV0FBV0EsRUFBRUEsS0FBS0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDdkVBLENBQUNBOztRQUNMRix1QkFBQ0E7SUFBREEsQ0FBQ0EsQUFuQkRuRSxJQW1CQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsRUFBRUEsZ0JBQWdCQSxDQUFDQSxDQUFDQTtBQUMxRUEsQ0FBQ0EsRUF2RE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQXVEdEI7QUN2REQsSUFBTyxnQkFBZ0IsQ0E2Q3RCO0FBN0NELFdBQU8sZ0JBQWdCLEVBQUMsQ0FBQztJQU1yQkE7UUFFSXNFO1lBQ0lDLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUVERCwrQkFBTUEsR0FBTkEsVUFBT0EsUUFBUUE7WUFDWEUsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURGLG1DQUFVQSxHQUFWQSxVQUFXQSxPQUFZQTtZQUNuQkcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDNUJBLE1BQU1BLENBQUNBO1lBQ1hBLENBQUNBO1lBRURBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQ2xDQSxDQUFDQTtRQUlMSCxxQkFBQ0E7SUFBREEsQ0FBQ0EsQUFyQkR0RSxJQXFCQ0E7SUFFREE7UUFBQTBFO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLGNBQWNBLENBQUNBO1lBRTVCQSxTQUFJQSxHQUFHQSxVQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxFQUFFQSxLQUFxQkE7Z0JBQ25EQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFBQSxDQUFDQTtvQkFDcEJBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLEtBQUtBLENBQUNBLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUVwQkEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLENBQUNBLENBQUFBO1FBQ0xBLENBQUNBO1FBQURELG9CQUFDQTtJQUFEQSxDQUFDQSxBQWJEMUUsSUFhQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsRUFBRUEsYUFBYUEsQ0FBQ0EsQ0FBQ0E7QUFDcEVBLENBQUNBLEVBN0NNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUE2Q3RCO0FDN0NELElBQU8sZ0JBQWdCLENBK0Z0QjtBQS9GRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBR0k0RSxzQ0FBb0JBLFNBQVNBO1lBQVRDLGNBQVNBLEdBQVRBLFNBQVNBLENBQUFBO1lBcUQ3QkEsaUJBQVlBLEdBQUdBLFVBQUNBLEtBQW1DQSxJQUFPQSxDQUFDQSxDQUFBQTtRQW5EM0RBLENBQUNBO1FBRURELDZDQUFNQSxHQUFOQSxVQUFPQSxRQUFRQSxFQUFFQSxTQUFTQTtZQUN0QkUsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQTtZQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBU0RGLHNCQUFJQSw4Q0FBSUE7aUJBQVJBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7aUJBRURILFVBQVNBLEtBQWFBO2dCQUNsQkcsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7OztXQUxBSDtRQU9EQSxzQkFBSUEsa0RBQVFBO2lCQUFaQTtnQkFDSUksRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0E7b0JBQ2xCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDMUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQy9EQSxDQUFDQTs7O1dBQUFKO1FBRURBLDZDQUFNQSxHQUFOQTtZQUNJSyxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFREwsb0RBQWFBLEdBQWJBLFVBQWNBLFlBQVlBO1lBQ3RCTSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBRU9OLG1EQUFZQSxHQUFwQkE7WUFDSU8sRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ1hBLE1BQU1BLENBQUNBO1lBRVhBLElBQUlBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2hCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxNQUFNQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFOUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzVCQSxDQUFDQTtRQXJETVAsb0NBQU9BLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBd0RuQ0EsbUNBQUNBO0lBQURBLENBQUNBLEFBekRENUUsSUF5RENBO0lBRURBO1FBQUFvRjtZQUFBQyxpQkErQkNBO1lBOUJHQSxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLGVBQVVBLEdBQUdBLDRCQUE0QkEsQ0FBQ0E7WUFDMUNBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsSUFBSUEsRUFBRUEsR0FBR0E7YUFDWkEsQ0FBQ0E7WUFFRkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBbUNBO2dCQUNoRUEsSUFBSUEsVUFBVUEsR0FBR0EsV0FBU0EsTUFBTUEsQ0FBQ0EsR0FBS0EsQ0FBQ0E7Z0JBRXZDQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQTtvQkFDcEJBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO29CQUNmQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxLQUFLQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtnQkFDdkNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBO2dCQUU5Q0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsRUFBRUEsVUFBU0EsR0FBR0EsRUFBRUEsT0FBT0E7b0JBQzVDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBO1FBS05BLENBQUNBO1FBSEdELGtEQUFZQSxHQUFaQSxVQUFhQSxLQUFtQ0E7WUFDNUNFLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLCtCQUErQkEsRUFBRUEsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDaEZBLENBQUNBO1FBQ0xGLGtDQUFDQTtJQUFEQSxDQUFDQSxBQS9CRHBGLElBK0JDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxvQkFBb0JBLEVBQUVBLDJCQUEyQkEsQ0FBQ0EsQ0FBQ0E7QUFDaEdBLENBQUNBLEVBL0ZNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUErRnRCO0FDL0ZELElBQU8sZ0JBQWdCLENBb0J0QjtBQXBCRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUF1RjtRQUNBQyxDQUFDQTtRQUFERCwyQkFBQ0E7SUFBREEsQ0FBQ0EsQUFERHZGLElBQ0NBO0lBRURBO1FBQUF5RjtZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLDhCQUE4QkEsQ0FBQ0E7WUFDN0NBLGVBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7WUFDbENBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLEtBQUtBLEVBQUVBLEdBQUdBO2dCQUNWQSxRQUFRQSxFQUFFQSxHQUFHQTtnQkFDYkEsS0FBS0EsRUFBRUEsR0FBR0E7YUFDYkEsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsMEJBQUNBO0lBQURBLENBQUNBLEFBWkR6RixJQVlDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxFQUFFQSxtQkFBbUJBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQXBCTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBb0J0QjtBQ3BCRCxJQUFPLGdCQUFnQixDQTJFdEI7QUEzRUQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBTXJCQTtRQUFBMkY7UUFxQkFDLENBQUNBO1FBbEJHRCxzQkFBSUEseUNBQU9BO2lCQUFYQTtnQkFDSUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDekJBLENBQUNBO2lCQUVERixVQUFZQSxLQUFLQTtnQkFDYkUsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3RCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO29CQUN0QkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUNoQ0EsQ0FBQ0E7OztXQU5BRjtRQVlEQSxvQ0FBS0EsR0FBTEE7WUFDSUcsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ25CQSxDQUFDQTtRQUNMSCwyQkFBQ0E7SUFBREEsQ0FBQ0EsQUFyQkQzRixJQXFCQ0E7SUFFREE7UUFBQStGO1lBQUFDLGlCQTJDQ0E7WUExQ0dBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLFlBQU9BLEdBQUdBLE9BQU9BLENBQUNBO1lBQ2xCQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZUFBVUEsR0FBR0Esb0JBQW9CQSxDQUFDQTtZQUNsQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsT0FBT0EsRUFBRUEsR0FBR0E7Z0JBQ1pBLE9BQU9BLEVBQUVBLEdBQUdBO2FBQ2ZBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLEtBQXVDQSxFQUFFQSxXQUFXQTtnQkFDbEZBLElBQUlBLEtBQUtBLEdBQXlCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUN2REEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBRXZCQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDM0JBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBO29CQUNuQkEsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFSEEsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxHQUFHQTtvQkFDckJBLElBQUlBLFNBQVNBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBO29CQUVoQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUE7eUJBQ1hBLFdBQVdBLENBQUNBLFlBQVlBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO29CQUUxQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2RBLFdBQVdBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO3dCQUN2QkEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBQ3ZCQSxDQUFDQTtvQkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7d0JBQ1hBLE1BQU1BLENBQUNBO29CQUVYQSxXQUFXQSxDQUFDQSxVQUFDQSxLQUFLQSxFQUFFQSxLQUFLQTt3QkFDckJBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO3dCQUN2QkEsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDUEEsQ0FBQ0EsQ0FBQ0E7Z0JBRUZBLEtBQUtBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7WUFDN0JBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELDBCQUFDQTtJQUFEQSxDQUFDQSxBQTNDRC9GLElBMkNDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxFQUFFQSxtQkFBbUJBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQTNFTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBMkV0QjtBQzNFRCxJQUFPLGdCQUFnQixDQW1CdEI7QUFuQkQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUFBaUc7WUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsWUFBT0EsR0FBR0EsYUFBYUEsQ0FBQ0E7WUFDeEJBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQTZCQTtnQkFDM0RBLElBQUlBLFVBQVVBLEdBQUdBLFdBQVNBLE1BQU1BLENBQUNBLEdBQUtBLENBQUNBO2dCQUV2Q0EsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBQ0E7b0JBQ25CQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDbENBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFDQTtvQkFDbEJBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUM3QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsZ0NBQUNBO0lBQURBLENBQUNBLEFBZERqRyxJQWNDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxrQkFBa0JBLEVBQUVBLHlCQUF5QkEsQ0FBQ0EsQ0FBQ0E7QUFDNUZBLENBQUNBLEVBbkJNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFtQnRCO0FDbkJELElBQU8sZ0JBQWdCLENBV3RCO0FBWEQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCQTtRQUFBbUc7WUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFZkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUE7Z0JBQ3BCQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBQzFEQSxDQUFDQSxDQUFDQTtRQUNOQSxDQUFDQTtRQUFERCwwQkFBQ0E7SUFBREEsQ0FBQ0EsQUFORG5HLElBTUNBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLENBQUNBLEVBWE0sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQVd0QjtBQ1hELElBQU8sZ0JBQWdCLENBb0N0QjtBQXBDRCxXQUFPLGdCQUFnQixFQUFDLENBQUM7SUFFckJBO1FBQUFxRztRQVNBQyxDQUFDQTtRQUxHRCxvQ0FBS0EsR0FBTEE7WUFDSUUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3hCQSxNQUFNQSxDQUFDQTtZQUNYQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7UUFDTEYsMkJBQUNBO0lBQURBLENBQUNBLEFBVERyRyxJQVNDQTtJQUVEQTtRQUFBd0c7WUFBQUMsaUJBb0JDQTtZQW5CR0EsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsWUFBT0EsR0FBR0EsY0FBY0EsQ0FBQ0E7WUFDekJBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsOEJBQThCQSxDQUFDQTtZQUM3Q0EsZUFBVUEsR0FBR0Esb0JBQW9CQSxDQUFDQTtZQUNsQ0EsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsS0FBS0EsRUFBRUEsR0FBR0E7Z0JBQ1ZBLFFBQVFBLEVBQUVBLEdBQUdBO2FBQ2hCQSxDQUFDQTtZQUVGQSxTQUFJQSxHQUFHQSxVQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxFQUFFQSxVQUFpQ0E7Z0JBQy9EQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFFN0JBLElBQUlBLElBQUlBLEdBQXlCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtnQkFDM0RBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFVBQVVBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDOUNBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELDBCQUFDQTtJQUFEQSxDQUFDQSxBQXBCRHhHLElBb0JDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxFQUFFQSxtQkFBbUJBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQXBDTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBb0N0QjtBQ3BDRCxJQUFPLGdCQUFnQixDQWtDdEI7QUFsQ0QsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBT3JCQTtRQUFBMEc7UUFHQUMsQ0FBQ0E7UUFBREQsb0JBQUNBO0lBQURBLENBQUNBLEFBSEQxRyxJQUdDQTtJQUVEQTtRQUFBNEc7WUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZkEsWUFBT0EsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLHFCQUFxQkE7WUFDckJBLGdDQUFnQ0E7WUFDaENBLGVBQVVBLEdBQUdBLGFBQWFBLENBQUNBO1lBQzNCQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEJBLFVBQUtBLEdBQUdBO2dCQUNKQSxLQUFLQSxFQUFFQSxHQUFHQTtnQkFDVkEsSUFBSUEsRUFBRUEsR0FBR0E7YUFDWkEsQ0FBQ0E7WUFFRkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsTUFBYUE7Z0JBQzNDQSxJQUFJQSxLQUFLQSxHQUFvQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxJQUFJQSxLQUFLQSxHQUFtQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsbUJBQUNBO0lBQURBLENBQUNBLEFBbkJENUcsSUFtQkNBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO0FBQ2xFQSxDQUFDQSxFQWxDTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBa0N0QjtBQ2xDRCxJQUFPLGdCQUFnQixDQWtHdEI7QUFsR0QsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBVXJCQTtRQUNJOEc7WUFDSUMsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBS0RELCtCQUFNQSxHQUFOQTtZQUNJRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDeEJBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQzlDQSxDQUFDQTtRQUdERixzQkFBSUEscUNBQVNBO2lCQUFiQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDakNBLENBQUNBO2lCQUVESCxVQUFjQSxJQUFZQTtnQkFDdEJHLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0E7b0JBQ2xCQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuQ0EsQ0FBQ0E7OztXQU5BSDtRQVFEQSxzQkFBSUEsaUNBQUtBO2lCQUFUQTtnQkFDSUksTUFBTUEsQ0FBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsTUFBR0EsQ0FBQ0E7WUFDeENBLENBQUNBOzs7V0FBQUo7UUFFREEsc0JBQUlBLHVDQUFXQTtpQkFBZkE7Z0JBQ0lLLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO2dCQUM5Q0EsTUFBTUEsQ0FBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsTUFBR0EsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FBQUw7UUFFREEsK0JBQU1BLEdBQU5BLFVBQU9BLEdBQW1CQTtZQUN0Qk0sSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLENBQUNBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDL0JBLENBQUNBO1FBRUROLGtDQUFTQSxHQUFUQSxVQUFVQSxHQUFtQkE7WUFDekJPLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEdBQUdBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVEUCx3Q0FBZUEsR0FBZkEsVUFBZ0JBLElBQVlBO1lBQ3hCUSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFBQSxDQUFDQSxJQUFJQSxPQUFBQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxFQUFkQSxDQUFjQSxDQUFDQSxDQUFDQTtZQUNsREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQ0EsQ0FBQ0E7UUFFRFIseUNBQWdCQSxHQUFoQkEsVUFBaUJBLEdBQVdBO1lBQ3hCUyxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDbENBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQTtRQUVEVCxzQ0FBYUEsR0FBYkE7WUFDSVUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBRURWLDBDQUFpQkEsR0FBakJBO1lBQ0lXLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQzlDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ25DQSxDQUFDQTtRQUlMWCxxQkFBQ0E7SUFBREEsQ0FBQ0EsQUFsRUQ5RyxJQWtFQ0E7SUFFREE7UUFBQTBIO1lBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2xCQSxnQkFBV0EsR0FBR0EsZ0JBQWdCQSxDQUFDQTtZQUMvQkEsZUFBVUEsR0FBR0EsY0FBY0EsQ0FBQ0E7WUFDNUJBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN4QkEsVUFBS0EsR0FBR0E7Z0JBQ0pBLE9BQU9BLEVBQUVBLEdBQUdBO2dCQUNaQSxTQUFTQSxFQUFFQSxHQUFHQTthQUNqQkEsQ0FBQ0E7WUFFRkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsS0FBS0E7Z0JBQ25DQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtvQkFDZkEsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQzFCQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNuQkEsQ0FBQ0EsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFBREQsb0JBQUNBO0lBQURBLENBQUNBLEFBakJEMUgsSUFpQkNBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO0FBQ3BFQSxDQUFDQSxFQWxHTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBa0d0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlL2Rpc3QvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS5kLnRzXCIvPlxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIiwgW10pOyIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhclN0ZXBzID0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wZXJjZW50fSVgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0Z1bGwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWluOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1pbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWF4OiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1heCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyVmFsdWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyU3RlcHModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICAgICAgcGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgeCA9IE51bWJlcih0aGlzLmJhclZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICAgICAgeCA9IG1pbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh4ID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqICh4IC0gbWluKSAvIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IE51bWJlcih0aGlzLmJhclN0ZXBzID09IG51bGwgPyAxMCA6IHRoaXMuYmFyU3RlcHMpO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSBtaW47IGluZGV4IDw9IG1heDsgaW5kZXggKz0gc3RlcHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwKSArIFwiS1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMCkgKyBcIk1cIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aWNrcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmFyR3JhcGhDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGJhck1pbjogJ0AnLFxyXG4gICAgICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICAgICAgYmFyVmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgYmFyU3RlcHM6ICdAPydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmFyR3JhcGgnLCBCYXJHcmFwaERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnN1YnRpdGxlID09IG51bGwgfHwgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmxhbmtzbGF0ZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgaWNvbjogJ0AnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JsYW5rc2xhdGUnLCBCbGFua3NsYXRlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYm9keS1oZWFkZXIvYm9keS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJvZHlIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIERvdWdobnV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRIb2xlID0gY29udGV4dEhvbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEZpbGwgPSBjb250ZXh0RmlsbDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCAwLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnRleHRIb2xlOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgICAgICBjb250ZXh0Qmc6IGFueTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgICAgIHBlcmNlbnRPZmZzZXQgPSAtMjU7XHJcbiAgICAgICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYW5pbWF0ZTogKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgICAgIF92YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCBvbGRWYWwsIG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW50ZXJ2YWwpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdkb3VnaG51dC9kb3VnaG51dC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gRG91Z2hudXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdAJyxcclxuICAgICAgICAgICAgZW1wdHlDb2xvckNsYXNzOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRleHRIb2xlID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1ob2xlXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0RmlsbCA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEJnID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1iZ1wiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgKCRjdHJsLCBmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZGlkIGJhY2tncm91bmQgY29sb3IgY2hhbmdlP1xyXG4gICAgICAgICAgICAgICAgaWYgKGJnY29sb3IgIT0gJGN0cmwuaG9sZUNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCkgKyAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaFNpemUoJGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gc2l6ZSAhPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyhmcm9tICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcbiAgICAgICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHdlZGdlXHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cywgdGhpcy5jb252ZXJ0VG9SYWRpYW5zKCRjdHJsLnBlcmNlbnRPZmZzZXQpLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMgKiAoJGN0cmwuaW5uZXJSYWRpdXMgLyAxMDApLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNYID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYWRpdXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoY2xhc3NOYW1lLCBzdHlsZSkge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGVsZW1lbnQuY3NzKHN0eWxlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0KGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJnKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEJnKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEJnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbXB0eUNvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuZW1wdHlDb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZW1wdHktY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0QmcsIGNYLCBjWSwgcmFkaXVzLCAwLCAxMDAsIGVtcHR5Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEhvbGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRIb2xlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuaG9sZUNvbG9yID0gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RG9udXQoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlLCBjWCwgY1ksIHJhZGl1cywgJGN0cmwuaG9sZUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEJnQ29sb3IoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgYmdjb2xvciA9ICRjdHJsLiRlbGVtZW50LmNzcyhcImJhY2tncm91bmQtY29sb3JcIik7XHJcbiAgICAgICAgICAgIGlmIChiZ2NvbG9yID09IFwicmdiYSgwLCAwLCAwLCAwKVwiKVxyXG4gICAgICAgICAgICAgICAgYmdjb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGJnY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZmlsbENvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuY29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWZpbGwtY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgbkZyb20gPSBOdW1iZXIoZnJvbSk7XHJcbiAgICAgICAgICAgIHZhciBuVG8gPSBOdW1iZXIodG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVVwKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVVcCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIHRvLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLS07XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwocHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXZpZ2F0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aCh0aGlzLmhyZWYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0FFQyc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsIGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5uYXZpZ2F0ZSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2R3JvdXBJdGVtJywgTmF2R3JvdXBJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHRcclxuXHRBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZIZWFkZXJDb250cm9sbGVyJywgTmF2SGVhZGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtaGVhZGVyL25hdi1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGV4dDogJ0AnLFxyXG4gICAgICAgICAgICBzbWFsbDogJ0AnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2SGVhZGVyJywgTmF2SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZNZW51Q29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycyddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycykge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCh0b2dnbGVTaG93bikge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNob3duID0gdG9nZ2xlU2hvd247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzTmF2U2hvd246IGJvb2xlYW47XHJcbiAgICAgICAgZ2V0IGlzTmF2U2hvd24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc05hdlNob3duO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgaXNOYXZTaG93bih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc05hdlNob3duID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU2hvd24odGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVTaG93bigkY3RybDogTmF2TWVudUNvbnRyb2xsZXIpIHsgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZDb250cm9sbGVyJywgTmF2TWVudUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdk1lbnVEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1tZW51L25hdi1tZW51Lmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZNZW51Q29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBOYXZNZW51Q29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc05hdlNob3duID0gISRjdHJsLmlzTmF2U2hvd247IFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KHRoaXMudG9nZ2xlU2hvd24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlU2hvd24oJGN0cmw6IE5hdk1lbnVDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLnRvZ2dsZUNsYXNzKCduYXYtLXNob3cnLCAkY3RybC5pc05hdlNob3duKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2TWVudScsIE5hdk1lbnVEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZUNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENvbnRyb2woY29udHJvbDogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaChjb250cm9sKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY29udHJvbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250cm9sczogYW55W107XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdDJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogUGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkY3RybC5jb250cm9scyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlJywgUGFnZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRsb2NhdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5pc0RlZmF1bHQgPSBpc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuICAgICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgICAgICBwYXJhbTogc3RyaW5nO1xyXG4gICAgICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYXJlYTogc3RyaW5nO1xyXG4gICAgICAgIGdldCBhcmVhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFyZWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMub25BcmVhQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNBY3RpdmUoKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2FyZWEgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVmYXVsdDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC50b0xvd2VyQ2FzZSgpID09IHRoaXMuX2FyZWEudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5wYXRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Sb3V0ZUNoYW5nZSgkcm91dGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9ICRyb3V0ZVBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ107XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkFyZWFDaGFuZ2UoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICBwYXJhbXNbdGhpcy5wYXJhbSB8fCAnYXJlYSddID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKHBhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24oZXZ0LCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5vblJvdXRlQ2hhbmdlKGN1cnJlbnQucGFyYW1zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICRjdHJsLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYWdlLWNvbnRlbnQtbmF2LWl0ZW0tLWFjdGl2ZScsICRjdHJsLmlzQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlQ29udGVudE5hdkl0ZW0nLCBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIGNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgX3NsaWRlSWY7XHJcblxyXG4gICAgICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlSWYgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlVmlzaWJpbGl0eSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25DbG9zZTtcclxuICAgICAgICB0b2dnbGVWaXNpYmlsaXR5O1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkcGFnZS5hZGRDb250cm9sKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWaXNpYmxlID0gISEkY3RybC5zbGlkZUlmO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJpcy12aXNpYmxlXCIsIGlzVmlzaWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXJDYW5jZWwnLCBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lRm9vdGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudChcIi5wYW5lXCIpLmFkZENsYXNzKFwicGFuZS0td2l0aEZvb3RlclwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICAgICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZVNsaWRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICc/XnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwidGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFuZUhlYWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgICAgICBjdHJsLnBhZ2VTbGlkZXIgPSBwYWdlU2xpZGVyO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dDbG9zZSA9ICRhdHRycy5zaG93Q2xvc2UgIT0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gWydedGFicycsICd0YWInXTtcclxuICAgICAgICAvLyB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0ZW1wbGF0ZVVybCA9ICd0YWIvdGFiLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IElUYWJDb250cm9sbGVyID0gJGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgJHRhYnMuYWRkVGFiKCRjdHJsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFiJywgVGFiRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKTtcclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGFiczogSVRhYkNvbnRyb2xsZXJbXTtcclxuXHJcbiAgICAgICAgb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZSh0aGlzLl9hY3RpdmVUYWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFjdGl2ZVRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYi5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFjdGl2ZVRhYihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYkxpbms6IElUYWJzQ29udHJvbGxlclxyXG4gICAgICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICd0YWJzL3RhYnMuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICAgICAgYWN0aXZlVGFiOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xyXG59Il19
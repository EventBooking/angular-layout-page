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
                name: '@',
                icon: '@'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbIkxheW91dFBhZ2VNb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaENvbnRyb2xsZXIuc3R5bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5pc0Z1bGwiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJNaW4iLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJNYXgiLCJMYXlvdXRQYWdlTW9kdWxlLkJhckdyYXBoQ29udHJvbGxlci5iYXJWYWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLmJhclN0ZXBzIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaENvbnRyb2xsZXIuc2V0UGVyY2VudCIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhDb250cm9sbGVyLnNldFRpY2tzIiwiTGF5b3V0UGFnZU1vZHVsZS5CYXJHcmFwaERpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQmFyR3JhcGhEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5CbGFua3NsYXRlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQmxhbmtzbGF0ZUNvbnRyb2xsZXIuaGFzU3VidGl0bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXRDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci52YWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS53YXRjaFNpemUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnZlcnRUb1JhZGlhbnMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmRyYXdXZWRnZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuZHJhd0RvbnV0IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5zZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5kcmF3IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRYIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRZIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRSYWRpdXMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEVsZW1lbnRTdHlsZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUucmVzZXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXRCZyIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuaW5pdEhvbGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEJnQ29sb3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGVVcCIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuYW5pbWF0ZURvd24iLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNhbmNlbCIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5oYXNJY29uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5ocmVmIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmlzU2VsZWN0ZWQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIubmF2aWdhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZNZW51Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIuaXNOYXZTaG93biIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRyb2xsZXIub25Jbml0IiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udHJvbGxlci5hZGRDb250cm9sIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uSW5pdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5hcmVhIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmlzQWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLnNlbGVjdCIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlci5vblJvdXRlQ2hhbmdlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uQXJlYUNoYW5nZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZS50b2dnbGVBY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5zbGlkZUlmIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUZvb3RlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlci5jbG9zZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFiRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIub25Jbml0IiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5hY3RpdmVUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLndpZHRoIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci50YWJQb3NpdGlvbiIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuYWRkVGFiIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5zZWxlY3RUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLnNlbGVjdFRhYkJ5TmFtZSIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0VGFiQnlJbmRleCIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0TmV4dFRhYiIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0UHJldmlvdXNUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNEaXJlY3RpdmUiLCJM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RURBO1FBQUEwSDtZQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNmQSxlQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNsQkEsZ0JBQVdBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7WUFDL0JBLGVBQVVBLEdBQUdBLGNBQWNBLENBQUNBO1lBQzVCQSxpQkFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEJBLFVBQUtBLEdBQUdBO2dCQUNKQSxPQUFPQSxFQUFFQSxHQUFHQTtnQkFDWkEsU0FBU0EsRUFBRUEsR0FBR0E7YUFDakJBLENBQUNBO1lBRUZBLFNBQUlBLEdBQUdBLFVBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLEtBQUtBO2dCQUNuQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBQ2ZBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO2dCQUMxQkEsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDbkJBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELG9CQUFDQTtJQUFEQSxDQUFDQSxBQWpCRDFILElBaUJDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQTtBQUNwRUEsQ0FBQ0EsRUFsR00sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWtHdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS9kaXN0L2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUuZC50c1wiLz5cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIsIFtdKTsiLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmFyR3JhcGhDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJTdGVwcyA9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHN0eWxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGVyY2VudH0lYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNGdWxsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wZXJjZW50ID09IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2Jhck1pbjogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJNaW4oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1pbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJNaW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJNaW4gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2Jhck1heDogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJNYXgoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1heDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJNYXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJNYXggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2JhclZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhclZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhclZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclN0ZXBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclN0ZXBzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyU3RlcHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGlja3M6IG51bWJlcltdO1xyXG4gICAgICAgIHBlcmNlbnQ6IG51bWJlcjtcclxuICAgICAgICBpbml0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBzZXRQZXJjZW50KCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIHggPSBOdW1iZXIodGhpcy5iYXJWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoeCA8IG1pbilcclxuICAgICAgICAgICAgICAgIHggPSBtaW47XHJcblxyXG4gICAgICAgICAgICBpZiAoeCA+IG1heClcclxuICAgICAgICAgICAgICAgIHggPSBtYXg7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2ID0gbWF4IC0gbWluO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSAxMDAgKiAoeCAtIG1pbikgLyBkaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaWNrcygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBOdW1iZXIodGhpcy5iYXJTdGVwcyA9PSBudWxsID8gMTAgOiB0aGlzLmJhclN0ZXBzKTtcclxuICAgICAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGVwcyA9IChtYXggLSBtaW4pIC8gZGl2O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gbWluOyBpbmRleCA8PSBtYXg7IGluZGV4ICs9IHN0ZXBzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMCkgKyBcIktcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDApICsgXCJNXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwMDAwKSArIFwiQlwiO1xyXG4gICAgICAgICAgICAgICAgdGlja3MucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGlja3MgPSB0aWNrcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQmFyR3JhcGhEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2Jhci1ncmFwaC9iYXItZ3JhcGguaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJhckdyYXBoQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBiYXJNaW46ICdAJyxcclxuICAgICAgICAgICAgYmFyTWF4OiAnQCcsXHJcbiAgICAgICAgICAgIGJhclZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGJhclN0ZXBzOiAnQD8nXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JhckdyYXBoJywgQmFyR3JhcGhEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgICAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGljb246ICdAJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdibGFua3NsYXRlJywgQmxhbmtzbGF0ZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JvZHlIZWFkZXInLCBCb2R5SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCBhbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0SG9sZSA9IGNvbnRleHRIb2xlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRGaWxsID0gY29udGV4dEZpbGw7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEJnID0gY29udGV4dEJnO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgMCwgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG5cclxuICAgICAgICBjb250ZXh0SG9sZTogYW55O1xyXG4gICAgICAgIGNvbnRleHRGaWxsOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEJnOiBhbnk7XHJcblxyXG4gICAgICAgIGFuaW1hdGlvblByb21pc2U6IGFueTtcclxuICAgICAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBpbm5lclJhZGl1cyA9IDY1OyAvLyA3NSVcclxuICAgICAgICBhbmltYXRlU3BlZWQgPSAxMDtcclxuICAgICAgICBwZXJjZW50T2Zmc2V0ID0gLTI1O1xyXG4gICAgICAgIGhvbGVDb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGFuaW1hdGU6ICgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpID0+IHt9O1xyXG5cclxuICAgICAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgdmFsdWUobmV3VmFsOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgb2xkVmFsLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGludGVydmFsJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGludGVydmFsKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnZG91Z2hudXQvZG91Z2hudXQuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IERvdWdobnV0Q29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnQCcsXHJcbiAgICAgICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmwpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0SG9sZSA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtaG9sZVwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEZpbGwgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWZpbGxcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRCZyA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtYmdcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLndhdGNoU2l6ZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB9LCBiZ2NvbG9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGRpZCBiYWNrZ3JvdW5kIGNvbG9yIGNoYW5nZT9cclxuICAgICAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSAkY3RybC4kZWxlbWVudC53aWR0aCgpICsgJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2hTaXplKCRjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnZlcnRUb1JhZGlhbnMocGVyY2VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gcGVyY2VudCAvIDEwMCAqIDM2MCAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd1dlZGdlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICB2YXIgdG9SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKHRvICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHRoZSB3ZWRnZVxyXG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9ICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwsIGNYLCBjWSwgcmFkaXVzLCBmcm9tLCB0bywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFgoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WShjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbih4LCB5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudFN0eWxlKGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICRib2R5LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRlbGVtZW50LmNzcyhzdHlsZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRIb2xlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLmhvbGVDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRCZ0NvbG9yKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIilcclxuICAgICAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIGZyb20sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCB0bywgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnZG91Z2hudXQnLCBEb3VnaG51dERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmljb25DbGFzcyAhPSBudWxsICYmIHRoaXMuaWNvbkNsYXNzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcy4kbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKHggPT4gcGF0aC5pbmRleE9mKHgpID09PSAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgodGhpcy5ocmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCBjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwubmF2aWdhdGUoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0QW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2TWVudUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQodG9nZ2xlU2hvd24pIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTaG93biA9IHRvZ2dsZVNob3duO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc05hdlNob3duOiBib29sZWFuO1xyXG4gICAgICAgIGdldCBpc05hdlNob3duKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNOYXZTaG93bjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGlzTmF2U2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNOYXZTaG93biA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNob3duKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlU2hvd24oJGN0cmw6IE5hdk1lbnVDb250cm9sbGVyKSB7IH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIE5hdk1lbnVDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZNZW51RGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtbWVudS9uYXYtbWVudS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2TWVudUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTmF2TWVudUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNOYXZTaG93biA9ICEkY3RybC5pc05hdlNob3duOyBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCh0aGlzLnRvZ2dsZVNob3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZVNob3duKCRjdHJsOiBOYXZNZW51Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgJGN0cmwuaXNOYXZTaG93bik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdk1lbnUnLCBOYXZNZW51RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VDb250cm9sbGVyIHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udHJvbHM6IGFueVtdO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRyb2xzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICAgICAgcGFyYW06IHN0cmluZztcclxuICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgICAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9hcmVhID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgudG9Mb3dlckNhc2UoKSA9PSB0aGlzLl9hcmVhLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IHRoaXMucGF0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUm91dGVDaGFuZ2UoJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSAkcm91dGVQYXJhbXNbdGhpcy5wYXJhbSB8fCAnYXJlYSddO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25BcmVhQ2hhbmdlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICAgICAgcGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXSA9IHRoaXMuX2FyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVBY3RpdmUgPSAoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHsgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgbXVsdGlFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBwYXJhbTogJ0AnLFxyXG4gICAgICAgICAgICBwYXRoOiAnQCcsXHJcbiAgICAgICAgICAgIGFyZWE6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudG9nZ2xlQWN0aXZlID0gdGhpcy50b2dnbGVBY3RpdmU7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgJGF0dHIuZGVmYXVsdCAhPSBudWxsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZVVwZGF0ZScsIGZ1bmN0aW9uKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBjbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgICAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ2xvc2U7XHJcbiAgICAgICAgdG9nZ2xlVmlzaWJpbGl0eTtcclxuICAgICAgICB3aXRoRm9vdGVyOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUlmID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzbGlkZUlmOiAnPScsXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcGFnZTogTGF5b3V0UGFnZU1vZHVsZS5JUGFnZUNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogUGFnZVNsaWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHBhZ2UuYWRkQ29udHJvbCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9ICEhJGN0cmwuc2xpZGVJZjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwiaXMtdmlzaWJsZVwiLCBpc1Zpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXJTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkdHJhbnNjbHVkZSgoY2xvbmUsIHNjb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVGb290ZXInLCBQYW5lRm9vdGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc2hvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgICAgIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFuZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcInRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICAgICAgY3RybC5zaG93Q2xvc2UgPSAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gWydedGFicycsICd0YWInXTtcclxuICAgICAgICAvLyB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0ZW1wbGF0ZVVybCA9ICd0YWIvdGFiLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdAJyxcclxuICAgICAgICAgICAgaWNvbjogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICR0YWJzOiBJVGFic0NvbnRyb2xsZXIgPSAkY3RybHNbMF07XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAkdGFicy5hZGRUYWIoJGN0cmwpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZyk7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcik7XHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBJVGFiQ29udHJvbGxlcjtcclxuICAgICAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgICAgICBvbkluaXQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYWIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKHRoaXMuX2FjdGl2ZVRhYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcclxuICAgICAgICBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYWN0aXZlVGFiKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZShuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB3aWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy50YWJzLmxlbmd0aCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0YWJQb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtpZHggKiAtMTAwfSVgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnRhYnMuZmlsdGVyKHggPT4geC5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKGZvdW5kWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDAgJiYgdGhpcy50YWJzLmxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFic1tpZHhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0UHJldmlvdXNUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFiTGluazogSVRhYnNDb250cm9sbGVyXHJcbiAgICAgICAgdGFiRGVmYXVsdDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3RhYnMvdGFicy5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFic0NvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGFiTGluazogJz0nLFxyXG4gICAgICAgICAgICBhY3RpdmVUYWI6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJGF0dHJzLnRhYkxpbmspXHJcbiAgICAgICAgICAgICAgICAkY3RybC50YWJMaW5rID0gJGN0cmw7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWJzJywgVGFic0RpcmVjdGl2ZSk7XHJcbn0iXX0=
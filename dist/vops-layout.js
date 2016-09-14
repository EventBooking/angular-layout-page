/// <reference path="../typings/browser.d.ts"/>
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
    }());
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
    }());
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
    }());
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
    }());
    Angular.module("ngLayoutPage").directive('blankslate', BlankslateDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var BodyHeaderController = (function () {
        function BodyHeaderController() {
        }
        return BodyHeaderController;
    }());
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
    }());
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
    }());
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
            if (bgcolor == "rgba(0, 0, 0, 0)" || bgcolor == "transparent")
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
    }());
    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
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
        NavGroupItemController.$inject = ['$attrs', '$location', '$window'];
        return NavGroupItemController;
    }());
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
                // ToDo: this is probably done incorrectly and should be controlled by the nav-group instead
                $scope.$on('$routeChangeSuccess', function () {
                    $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
                });
                $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
                $element.on(clickEvent, function (e) {
                    ctrl.navigate(e.ctrlKey || (e.which == 2));
                    $scope.$apply();
                });
            };
        }
        NavGroupItemDirective.$inject = ['$compile'];
        return NavGroupItemDirective;
    }());
    Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavHeaderController = (function () {
        function NavHeaderController() {
        }
        return NavHeaderController;
    }());
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
    }());
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
    }());
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
    }());
    Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
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
    }());
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
        PageContentNavItemController.$inject = ['$location'];
        return PageContentNavItemController;
    }());
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
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageHeaderController = (function () {
        function PageHeaderController() {
        }
        return PageHeaderController;
    }());
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
    }());
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
        Object.defineProperty(PageSliderController.prototype, "isVisible", {
            get: function () {
                return this._slideIf;
            },
            enumerable: true,
            configurable: true
        });
        PageSliderController.prototype.close = function () {
            this.slideIf = null;
            this.onClose();
        };
        return PageSliderController;
    }());
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
                $ctrl.withOverlay = $attrs.showOverlay != null;
                $page.addControl($element);
                $scope.$on("$destroy", function () {
                    $element.remove();
                });
                $ctrl.toggleVisibility = function () {
                    var isVisible = !!$ctrl.slideIf;
                    $element.empty()
                        .toggleClass("is-visible", isVisible);
                    if ($ctrl.withOverlay) {
                        if (isVisible)
                            $page.showOverlay($ctrl);
                        else
                            $page.hideOverlay($ctrl);
                    }
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
    }());
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
    }());
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
    }());
    Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PaneHeaderController = (function () {
        function PaneHeaderController() {
        }
        PaneHeaderController.prototype.onInit = function (pageSlider, showClose) {
            this.pageSlider = pageSlider;
            this.showClose = showClose;
            this.setWithSubtitle(this.hasSubtitle);
        };
        PaneHeaderController.prototype.close = function () {
            if (this.pageSlider == null)
                return;
            this.pageSlider.close();
        };
        Object.defineProperty(PaneHeaderController.prototype, "hasSubtitle", {
            get: function () {
                return this.subtitle != null && this.subtitle.trim().length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaneHeaderController.prototype, "subtitle", {
            get: function () {
                return this._subtitle;
            },
            set: function (value) {
                this._subtitle = value;
                if (this.setWithSubtitle != null)
                    this.setWithSubtitle(this.hasSubtitle);
            },
            enumerable: true,
            configurable: true
        });
        return PaneHeaderController;
    }());
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
                ctrl.setWithSubtitle = function (hasSubtitle) {
                    $element.toggleClass('pane-header--withSubtitle', hasSubtitle);
                };
                ctrl.onInit(pageSlider, $attrs.showClose != null);
            };
        }
        return PaneHeaderDirective;
    }());
    Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var TabController = (function () {
        function TabController() {
        }
        return TabController;
    }());
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
                angular.element($element).removeAttr('title');
            };
        }
        return TabDirective;
    }());
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
    }());
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
    }());
    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtDQUErQztBQUUvQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0ZuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCO1FBQ0k7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFD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QyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQWpCRCxJQWlCQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNwRSxDQUFDLEVBbEdNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFrR3RCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIiwgW10pOyIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhclN0ZXBzID0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wZXJjZW50fSVgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0Z1bGwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWluOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1pbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWF4OiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1heCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyVmFsdWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyU3RlcHModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICAgICAgcGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgeCA9IE51bWJlcih0aGlzLmJhclZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICAgICAgeCA9IG1pbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh4ID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqICh4IC0gbWluKSAvIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IE51bWJlcih0aGlzLmJhclN0ZXBzID09IG51bGwgPyAxMCA6IHRoaXMuYmFyU3RlcHMpO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSBtaW47IGluZGV4IDw9IG1heDsgaW5kZXggKz0gc3RlcHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwKSArIFwiS1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMCkgKyBcIk1cIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aWNrcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmFyR3JhcGhDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGJhck1pbjogJ0AnLFxyXG4gICAgICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICAgICAgYmFyVmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgYmFyU3RlcHM6ICdAPydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmFyR3JhcGgnLCBCYXJHcmFwaERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnN1YnRpdGxlID09IG51bGwgfHwgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmxhbmtzbGF0ZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgaWNvbjogJ0AnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JsYW5rc2xhdGUnLCBCbGFua3NsYXRlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYm9keS1oZWFkZXIvYm9keS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJvZHlIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIERvdWdobnV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRIb2xlID0gY29udGV4dEhvbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEZpbGwgPSBjb250ZXh0RmlsbDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCAwLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnRleHRIb2xlOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgICAgICBjb250ZXh0Qmc6IGFueTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgICAgIHBlcmNlbnRPZmZzZXQgPSAtMjU7XHJcbiAgICAgICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYW5pbWF0ZTogKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgICAgIF92YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCBvbGRWYWwsIG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW50ZXJ2YWwpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdkb3VnaG51dC9kb3VnaG51dC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gRG91Z2hudXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdAJyxcclxuICAgICAgICAgICAgZW1wdHlDb2xvckNsYXNzOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRleHRIb2xlID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1ob2xlXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0RmlsbCA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEJnID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1iZ1wiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgKCRjdHJsLCBmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZGlkIGJhY2tncm91bmQgY29sb3IgY2hhbmdlP1xyXG4gICAgICAgICAgICAgICAgaWYgKGJnY29sb3IgIT0gJGN0cmwuaG9sZUNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCkgKyAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaFNpemUoJGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gc2l6ZSAhPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyhmcm9tICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcbiAgICAgICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHdlZGdlXHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cywgdGhpcy5jb252ZXJ0VG9SYWRpYW5zKCRjdHJsLnBlcmNlbnRPZmZzZXQpLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMgKiAoJGN0cmwuaW5uZXJSYWRpdXMgLyAxMDApLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNYID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYWRpdXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoY2xhc3NOYW1lLCBzdHlsZSkge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGVsZW1lbnQuY3NzKHN0eWxlKTtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0KGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJnKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEJnKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEJnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbXB0eUNvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuZW1wdHlDb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZW1wdHktY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0QmcsIGNYLCBjWSwgcmFkaXVzLCAwLCAxMDAsIGVtcHR5Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEhvbGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRIb2xlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuaG9sZUNvbG9yID0gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RG9udXQoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlLCBjWCwgY1ksIHJhZGl1cywgJGN0cmwuaG9sZUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEJnQ29sb3IoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgYmdjb2xvciA9ICRjdHJsLiRlbGVtZW50LmNzcyhcImJhY2tncm91bmQtY29sb3JcIik7XHJcbiAgICAgICAgICAgIGlmIChiZ2NvbG9yID09IFwicmdiYSgwLCAwLCAwLCAwKVwiIHx8IGJnY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKVxyXG4gICAgICAgICAgICAgICAgYmdjb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGJnY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZmlsbENvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuY29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWZpbGwtY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgbkZyb20gPSBOdW1iZXIoZnJvbSk7XHJcbiAgICAgICAgICAgIHZhciBuVG8gPSBOdW1iZXIodG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVVwKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVVcCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIHRvLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLS07XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwocHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbicsICckd2luZG93J107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbjogYW5ndWxhci5JTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXZpZ2F0ZShuZXdUYWI6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAobmV3VGFiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR3aW5kb3cub3Blbih0aGlzLmhyZWYsICdfYmxhbmsnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKHRoaXMuaHJlZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkdyb3VwSXRlbUNvbnRyb2xsZXInLCBOYXZHcm91cEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQUVDJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2R3JvdXBJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpID0+IHtcclxuICAgICAgICAgICAgdmFyIGN0cmw6IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICAgICAgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvRG86IHRoaXMgaXMgcHJvYmFibHkgZG9uZSBpbmNvcnJlY3RseSBhbmQgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgdGhlIG5hdi1ncm91cCBpbnN0ZWFkXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgY3RybC5pc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCBjdHJsLmlzU2VsZWN0ZWQpO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm5hdmlnYXRlKGUuY3RybEtleSB8fCAoZS53aGljaCA9PSAyKSk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZHcm91cEl0ZW0nLCBOYXZHcm91cEl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cdFxyXG5cdEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkhlYWRlckNvbnRyb2xsZXInLCBOYXZIZWFkZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiAnQCcsXHJcbiAgICAgICAgICAgIHNtYWxsOiAnQCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZIZWFkZXInLCBOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdk1lbnVDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KHRvZ2dsZVNob3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU2hvd24gPSB0b2dnbGVTaG93bjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaXNOYXZTaG93bjogYm9vbGVhbjtcclxuICAgICAgICBnZXQgaXNOYXZTaG93bigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzTmF2U2hvd247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBpc05hdlNob3duKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTmF2U2hvd24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTaG93bih0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZVNob3duKCRjdHJsOiBOYXZNZW51Q29udHJvbGxlcikgeyB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkNvbnRyb2xsZXInLCBOYXZNZW51Q29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2TWVudURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LW1lbnUvbmF2LW1lbnUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdk1lbnVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB0cnVlO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IE5hdk1lbnVDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzTmF2U2hvd24gPSAhJGN0cmwuaXNOYXZTaG93bjsgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQodGhpcy50b2dnbGVTaG93bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVTaG93bigkY3RybDogTmF2TWVudUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCdib2R5JykudG9nZ2xlQ2xhc3MoJ25hdi0tc2hvdycsICRjdHJsLmlzTmF2U2hvd24pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZNZW51JywgTmF2TWVudURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZU92ZXJsYXkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpO1xyXG4gICAgICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICAgICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChvdmVybGF5KTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA8IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvdmVybGF5czogSVBhZ2VPdmVybGF5W107XHJcbiAgICAgICAgY29udHJvbHM6IGFueVtdO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRyb2xzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICAgICAgcGFyYW06IHN0cmluZztcclxuICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgICAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW0gfHwgJ2FyZWEnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKG5hbWUsIHRoaXMuX2FyZWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBpc1Zpc2libGU7XHJcbiAgICAgICAgd2l0aE92ZXJsYXk7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciwgSVBhZ2VPdmVybGF5IHtcclxuICAgICAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgICAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25DbG9zZTtcclxuICAgICAgICB0b2dnbGVWaXNpYmlsaXR5O1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkY3RybC53aXRoT3ZlcmxheSA9ICRhdHRycy5zaG93T3ZlcmxheSAhPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHBhZ2UuYWRkQ29udHJvbCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc1Zpc2libGUgPSAhISRjdHJsLnNsaWRlSWY7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImlzLXZpc2libGVcIiwgaXNWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGN0cmwud2l0aE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFnZS5zaG93T3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFnZS5oaWRlT3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXJDYW5jZWwnLCBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lRm9vdGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudChcIi5wYW5lXCIpLmFkZENsYXNzKFwicGFuZS0td2l0aEZvb3RlclwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICAgICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBvbkluaXQocGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBzaG93Q2xvc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2UgPSBzaG93Q2xvc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnRpdGxlICE9IG51bGwgJiYgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3N1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJ0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0V2l0aFN1YnRpdGxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFdpdGhTdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwuc2V0V2l0aFN1YnRpdGxlID0gKGhhc1N1YnRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFuZS1oZWFkZXItLXdpdGhTdWJ0aXRsZScsIGhhc1N1YnRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHJsLm9uSW5pdChwYWdlU2xpZGVyLCAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGwpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lSGVhZGVyJywgUGFuZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnXnRhYnMnLCAndGFiJ107XHJcbiAgICAgICAgLy8gdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGVtcGxhdGVVcmwgPSAndGFiL3RhYi5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFiQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgIGljb246ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IElUYWJDb250cm9sbGVyID0gJGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgJHRhYnMuYWRkVGFiKCRjdHJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudCkucmVtb3ZlQXR0cigndGl0bGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFiJywgVGFiRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKTtcclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGFiczogSVRhYkNvbnRyb2xsZXJbXTtcclxuXHJcbiAgICAgICAgb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZSh0aGlzLl9hY3RpdmVUYWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFjdGl2ZVRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYi5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFjdGl2ZVRhYihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYkxpbms6IElUYWJzQ29udHJvbGxlclxyXG4gICAgICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICd0YWJzL3RhYnMuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICAgICAgYWN0aXZlVGFiOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xyXG59Il19
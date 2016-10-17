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
            this.onClose();
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
                subtitle: '@',
                onClose: '&'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtDQUErQztBQUUvQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0ZuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCO1FBQ0k7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFD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LEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ2YsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQUFDLEFBakJELElBaUJDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsRUFsR00sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWtHdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9icm93c2VyLmQudHNcIi8+XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoQ29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyU3RlcHMgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzdHlsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBlcmNlbnR9JWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzRnVsbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudCA9PSAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNaW46IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWluKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWluKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWluID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNYXg6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWF4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWF4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJWYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2JhclN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhclN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJTdGVwcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJTdGVwcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhclN0ZXBzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpY2tzOiBudW1iZXJbXTtcclxuICAgICAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgc2V0UGVyY2VudCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gTnVtYmVyKHRoaXMuYmFyVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPCBtaW4pXHJcbiAgICAgICAgICAgICAgICB4ID0gbWluO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPiBtYXgpXHJcbiAgICAgICAgICAgICAgICB4ID0gbWF4O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG5cclxuICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKHggLSBtaW4pIC8gZGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGlja3MoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gTnVtYmVyKHRoaXMuYmFyU3RlcHMgPT0gbnVsbCA/IDEwIDogdGhpcy5iYXJTdGVwcyk7XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RlcHMgPSAobWF4IC0gbWluKSAvIGRpdjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWNrcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IG1pbjsgaW5kZXggPD0gbWF4OyBpbmRleCArPSBzdGVwcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDApICsgXCJLXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwKSArIFwiTVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMDAwMCkgKyBcIkJcIjtcclxuICAgICAgICAgICAgICAgIHRpY2tzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdiYXItZ3JhcGgvYmFyLWdyYXBoLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCYXJHcmFwaENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgYmFyTWluOiAnQCcsXHJcbiAgICAgICAgICAgIGJhck1heDogJ0AnLFxyXG4gICAgICAgICAgICBiYXJWYWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBiYXJTdGVwczogJ0A/J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdiYXJHcmFwaCcsIEJhckdyYXBoRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBcclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMuc3VidGl0bGUgPT0gbnVsbCB8fCB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCbGFua3NsYXRlQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBpY29uOiAnQCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdib2R5LWhlYWRlci9ib2R5LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQm9keUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXRDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgYW5pbWF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEhvbGUgPSBjb250ZXh0SG9sZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0RmlsbCA9IGNvbnRleHRGaWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRCZyA9IGNvbnRleHRCZztcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIDAsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgY29udGV4dEhvbGU6IGFueTtcclxuICAgICAgICBjb250ZXh0RmlsbDogYW55O1xyXG4gICAgICAgIGNvbnRleHRCZzogYW55O1xyXG5cclxuICAgICAgICBhbmltYXRpb25Qcm9taXNlOiBhbnk7XHJcbiAgICAgICAgY29sb3I6IHN0cmluZztcclxuICAgICAgICBjb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgZW1wdHlDb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgaW5uZXJSYWRpdXMgPSA2NTsgLy8gNzUlXHJcbiAgICAgICAgYW5pbWF0ZVNwZWVkID0gMTA7XHJcbiAgICAgICAgcGVyY2VudE9mZnNldCA9IC0yNTtcclxuICAgICAgICBob2xlQ29sb3I6IHN0cmluZztcclxuICAgICAgICBhbmltYXRlOiAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSA9PiB7fTtcclxuXHJcbiAgICAgICAgX3ZhbHVlOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHZhbHVlKCk6IG51bWJlciB8IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHZhbHVlKG5ld1ZhbDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIG9sZFZhbCwgbmV3VmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbnRlcnZhbCddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbnRlcnZhbCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2RvdWdobnV0L2RvdWdobnV0Lmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEb3VnaG51dENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgY29sb3I6ICdAJyxcclxuICAgICAgICAgICAgY29sb3JDbGFzczogJ0AnLFxyXG4gICAgICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGV4dEhvbGUgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWhvbGVcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRGaWxsID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1maWxsXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0QmcgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWJnXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCAoJGN0cmwsIGZyb20sIHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy53YXRjaFNpemUoJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICAgICAgfSwgYmdjb2xvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBkaWQgYmFja2dyb3VuZCBjb2xvciBjaGFuZ2U/XHJcbiAgICAgICAgICAgICAgICBpZiAoYmdjb2xvciAhPSAkY3RybC5ob2xlQ29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKSArICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdhdGNoU2l6ZSgkY3RybCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBzaXplICE9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gdGVtcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb252ZXJ0VG9SYWRpYW5zKHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgcmFkaWFucyA9IHBlcmNlbnQgLyAxMDAgKiAzNjAgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaWFucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdXZWRnZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZyb21SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKGZyb20gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuICAgICAgICAgICAgdmFyIHRvUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyh0byArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyB0aGUgd2VkZ2VcclxuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzLCB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoJGN0cmwucGVyY2VudE9mZnNldCksIHRvUmFkaWFucywgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3RG9udXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvLyBjdXQgb3V0IGFuIGlubmVyLWNpcmNsZSA9PSBkb251dFxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cyAqICgkY3RybC5pbm5lclJhZGl1cyAvIDEwMCksIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSAkY3RybC4kZWxlbWVudC53aWR0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsLCBjWCwgY1ksIHJhZGl1cywgZnJvbSwgdG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRYKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1ggPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLndpZHRoIC8gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBjWDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFkoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBjWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFJhZGl1cyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gTWF0aC5taW4oeCwgeSk7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEVsZW1lbnRTdHlsZShjbGFzc05hbWUsIHN0eWxlKSB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAkYm9keS5hcHBlbmQoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkZWxlbWVudC5jc3Moc3R5bGUpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzZXQoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNvbnRleHQuY2FudmFzLndpZHRoLCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0QmcoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0QmcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0QmcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVtcHR5Q29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC5lbXB0eUNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1lbXB0eS1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRCZywgY1gsIGNZLCByYWRpdXMsIDAsIDEwMCwgZW1wdHlDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0SG9sZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEhvbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5ob2xlQ29sb3IgPSB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdEb251dCgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUsIGNYLCBjWSwgcmFkaXVzLCAkY3RybC5ob2xlQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0QmdDb2xvcigkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBiZ2NvbG9yID0gJGN0cmwuJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgICAgaWYgKGJnY29sb3IgPT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIgfHwgYmdjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpXHJcbiAgICAgICAgICAgICAgICBiZ2NvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gYmdjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWxsQ29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC5jb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZmlsbC1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwuY29sb3IpXHJcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3IgPSAkY3RybC5jb2xvcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuRnJvbSA9IE51bWJlcihmcm9tKTtcclxuICAgICAgICAgICAgdmFyIG5UbyA9IE51bWJlcih0byk7XHJcblxyXG4gICAgICAgICAgICBpZiAobkZyb20gPCBuVG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlVXAoJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVEb3duKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVVwKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCBmcm9tLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKys7XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlRG93bigkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgdG8sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUtLTtcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbmNlbChwcm9taXNlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2RvdWdobnV0JywgRG91Z2hudXREaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnJGxvY2F0aW9uJywgJyR3aW5kb3cnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uOiBhbmd1bGFyLklMb2NhdGlvblNlcnZpY2UsIHByaXZhdGUgJHdpbmRvdzogYW5ndWxhci5JV2luZG93U2VydmljZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNJY29uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmljb25DbGFzcy5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaHJlZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmhyZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZDogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHJlZiAhPSBudWxsICYmIHBhdGguaW5kZXhPZih0aGlzLmhyZWYpID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcih4ID0+IHBhdGguaW5kZXhPZih4KSA9PT0gMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlKG5ld1RhYjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChuZXdUYWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwodGhpcy5ocmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgLy8gVG9EbzogdGhpcyBpcyBwcm9iYWJseSBkb25lIGluY29ycmVjdGx5IGFuZCBzaG91bGQgYmUgY29udHJvbGxlZCBieSB0aGUgbmF2LWdyb3VwIGluc3RlYWRcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCBjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsIGN0cmwuaXNTZWxlY3RlZCk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwubmF2aWdhdGUoZS5jdHJsS2V5IHx8IChlLndoaWNoID09IDIpKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0QW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2TWVudUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQodG9nZ2xlU2hvd24pIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTaG93biA9IHRvZ2dsZVNob3duO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc05hdlNob3duOiBib29sZWFuO1xyXG4gICAgICAgIGdldCBpc05hdlNob3duKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNOYXZTaG93bjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGlzTmF2U2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNOYXZTaG93biA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNob3duKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlU2hvd24oJGN0cmw6IE5hdk1lbnVDb250cm9sbGVyKSB7IH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIE5hdk1lbnVDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZNZW51RGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtbWVudS9uYXYtbWVudS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2TWVudUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTmF2TWVudUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNOYXZTaG93biA9ICEkY3RybC5pc05hdlNob3duOyBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCh0aGlzLnRvZ2dsZVNob3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZVNob3duKCRjdHJsOiBOYXZNZW51Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgJGN0cmwuaXNOYXZTaG93bik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdk1lbnUnLCBOYXZNZW51RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlT3ZlcmxheSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSk7XHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgICAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VDb250cm9sbGVyIHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENvbnRyb2woY29udHJvbDogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaChjb250cm9sKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY29udHJvbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cy5wdXNoKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKFwicGFnZS0tb3ZlcmxheVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4IDwgMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlzLnNwbGljZShpZHgsIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheXMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwicGFnZS0tb3ZlcmxheVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG92ZXJsYXlzOiBJUGFnZU92ZXJsYXlbXTtcclxuICAgICAgICBjb250cm9sczogYW55W107XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdDJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogUGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5jb250cm9scyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlJywgUGFnZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRsb2NhdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5pc0RlZmF1bHQgPSBpc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuICAgICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgICAgICBwYXJhbTogc3RyaW5nO1xyXG4gICAgICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYXJlYTogc3RyaW5nO1xyXG4gICAgICAgIGdldCBhcmVhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFyZWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMub25BcmVhQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNBY3RpdmUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVhID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgudG9Mb3dlckNhc2UoKSA9PSB0aGlzLl9hcmVhLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IHRoaXMucGF0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUm91dGVDaGFuZ2UoJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSAkcm91dGVQYXJhbXNbdGhpcy5wYXJhbSB8fCAnYXJlYSddO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25BcmVhQ2hhbmdlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJhbSB8fCAnYXJlYSc7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSB0aGlzLl9hcmVhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gobmFtZSwgdGhpcy5fYXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlID0gKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7IH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgcGFyYW06ICdAJyxcclxuICAgICAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgICAgICBhcmVhOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsICRhdHRyLmRlZmF1bHQgIT0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVVcGRhdGUnLCBmdW5jdGlvbiAoZXZ0LCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5vblJvdXRlQ2hhbmdlKGN1cnJlbnQucGFyYW1zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICRjdHJsLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYWdlLWNvbnRlbnQtbmF2LWl0ZW0tLWFjdGl2ZScsICRjdHJsLmlzQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlQ29udGVudE5hdkl0ZW0nLCBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIGlzVmlzaWJsZTtcclxuICAgICAgICB3aXRoT3ZlcmxheTtcclxuICAgICAgICBjbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBJUGFnZU92ZXJsYXkge1xyXG4gICAgICAgIHByaXZhdGUgX3NsaWRlSWY7XHJcblxyXG4gICAgICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlSWYgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlVmlzaWJpbGl0eSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNsb3NlO1xyXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHk7XHJcbiAgICAgICAgd2l0aEZvb3RlcjogYm9vbGVhbjtcclxuICAgICAgICB3aXRoT3ZlcmxheTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJZiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHBhZ2U6IExheW91dFBhZ2VNb2R1bGUuSVBhZ2VDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IFBhZ2VTbGlkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLndpdGhPdmVybGF5ID0gJGF0dHJzLnNob3dPdmVybGF5ICE9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkcGFnZS5hZGRDb250cm9sKCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9ICEhJGN0cmwuc2xpZGVJZjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwiaXMtdmlzaWJsZVwiLCBpc1Zpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkY3RybC53aXRoT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYWdlLnNob3dPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYWdlLmhpZGVPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoKGNsb25lLCBzY29wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBzY29wZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyJywgUGFnZVNsaWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZVNsaWRlcic7XHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KHNsaWRlci5jbG9zZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICAgICAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgb25DbG9zZTogYW55O1xyXG5cclxuICAgICAgICBvbkluaXQocGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBzaG93Q2xvc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2UgPSBzaG93Q2xvc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlci5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJ0aXRsZSAhPSBudWxsICYmIHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9zdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3VidGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFdpdGhTdWJ0aXRsZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRXaXRoU3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICc/XnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwuc2V0V2l0aFN1YnRpdGxlID0gKGhhc1N1YnRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFuZS1oZWFkZXItLXdpdGhTdWJ0aXRsZScsIGhhc1N1YnRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHJsLm9uSW5pdChwYWdlU2xpZGVyLCAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGwpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lSGVhZGVyJywgUGFuZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnXnRhYnMnLCAndGFiJ107XHJcbiAgICAgICAgLy8gdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGVtcGxhdGVVcmwgPSAndGFiL3RhYi5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFiQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgIGljb246ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IElUYWJDb250cm9sbGVyID0gJGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgJHRhYnMuYWRkVGFiKCRjdHJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudCkucmVtb3ZlQXR0cigndGl0bGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFiJywgVGFiRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKTtcclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGFiczogSVRhYkNvbnRyb2xsZXJbXTtcclxuXHJcbiAgICAgICAgb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZSh0aGlzLl9hY3RpdmVUYWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFjdGl2ZVRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYi5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFjdGl2ZVRhYihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYkxpbms6IElUYWJzQ29udHJvbGxlclxyXG4gICAgICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICd0YWJzL3RhYnMuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICAgICAgYWN0aXZlVGFiOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xyXG59Il19
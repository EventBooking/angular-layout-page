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
    var LayoutPageController = (function () {
        function LayoutPageController() {
        }
        LayoutPageController.prototype.onInit = function (update) {
            this._update = update;
            this._isNavVisible = false;
        };
        LayoutPageController.prototype.showNav = function () {
            this._isNavVisible = true;
            this._update(this._isNavVisible);
        };
        LayoutPageController.prototype.hideNav = function () {
            this._isNavVisible = false;
            this._update(this._isNavVisible);
        };
        LayoutPageController.prototype.toggleNav = function () {
            this._isNavVisible = !this._isNavVisible;
            this._update(this._isNavVisible);
        };
        return LayoutPageController;
    }());
    Angular.module("ngLayoutPage").controller('lyoutPageController', LayoutPageController);
    var LayoutPageDirective = (function () {
        function LayoutPageDirective() {
            this.restrict = 'EAC';
            this.controller = LayoutPageController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.link = function ($scope, $element, $attrs, $ctrl) {
                var update = function (isVisible) {
                    $element.toggleClass('nav--show', isVisible);
                };
                $ctrl.onInit(update);
            };
        }
        return LayoutPageDirective;
    }());
    Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);
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
            this.$compile = $compile;
            this.restrict = 'AEC';
            this.require = ['navGroupItem', '^layoutPage'];
            this.transclude = true;
            this.templateUrl = 'nav-group-item/nav-group-item.html';
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
        Object.defineProperty(NavMenuController.prototype, "iconClass", {
            get: function () {
                return this.$attrs.icon;
            },
            enumerable: true,
            configurable: true
        });
        NavMenuController.$inject = ['$attrs'];
        return NavMenuController;
    }());
    Angular.module("ngLayoutPage").controller('navController', NavMenuController);
    var NavMenuDirective = (function () {
        function NavMenuDirective() {
            this.restrict = 'E';
            this.require = '^layoutPage';
            this.transclude = true;
            this.templateUrl = 'nav-menu/nav-menu.html';
            this.controller = NavMenuController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = true;
            this.link = function ($scope, $element, $attrs, $layoutPage) {
                $element.on('click', function () {
                    $layoutPage.toggleNav();
                });
            };
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtDQUErQztBQUUvQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0ZuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0IsRUFBQyxDQUFDO0lBRXJCO1FBQ0k7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJ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RUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDZixLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQztRQUNOLENBQUM7UUFBRCxvQkFBQztJQUFELENBQUMsQUFqQkQsSUFpQkM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEUsQ0FBQyxFQWxHTSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBa0d0QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIsIFtdKTsiLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmFyR3JhcGhDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJTdGVwcyA9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHN0eWxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGVyY2VudH0lYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNGdWxsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wZXJjZW50ID09IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2Jhck1pbjogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJNaW4oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1pbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJNaW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJNaW4gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2Jhck1heDogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJNYXgoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1heDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJNYXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJNYXggPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2JhclZhbHVlOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhclZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhclZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyU3RlcHM6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclN0ZXBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclN0ZXBzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyU3RlcHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGlja3M6IG51bWJlcltdO1xyXG4gICAgICAgIHBlcmNlbnQ6IG51bWJlcjtcclxuICAgICAgICBpbml0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBzZXRQZXJjZW50KCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIHggPSBOdW1iZXIodGhpcy5iYXJWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoeCA8IG1pbilcclxuICAgICAgICAgICAgICAgIHggPSBtaW47XHJcblxyXG4gICAgICAgICAgICBpZiAoeCA+IG1heClcclxuICAgICAgICAgICAgICAgIHggPSBtYXg7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2ID0gbWF4IC0gbWluO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSAxMDAgKiAoeCAtIG1pbikgLyBkaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaWNrcygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBOdW1iZXIodGhpcy5iYXJTdGVwcyA9PSBudWxsID8gMTAgOiB0aGlzLmJhclN0ZXBzKTtcclxuICAgICAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzdGVwcyA9IChtYXggLSBtaW4pIC8gZGl2O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpY2tzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gbWluOyBpbmRleCA8PSBtYXg7IGluZGV4ICs9IHN0ZXBzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMCkgKyBcIktcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDApICsgXCJNXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwMDAwKSArIFwiQlwiO1xyXG4gICAgICAgICAgICAgICAgdGlja3MucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGlja3MgPSB0aWNrcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQmFyR3JhcGhEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2Jhci1ncmFwaC9iYXItZ3JhcGguaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJhckdyYXBoQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBiYXJNaW46ICdAJyxcclxuICAgICAgICAgICAgYmFyTWF4OiAnQCcsXHJcbiAgICAgICAgICAgIGJhclZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGJhclN0ZXBzOiAnQD8nXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JhckdyYXBoJywgQmFyR3JhcGhEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgICAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGljb246ICdAJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdibGFua3NsYXRlJywgQmxhbmtzbGF0ZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JvZHlIZWFkZXInLCBCb2R5SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCBhbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0SG9sZSA9IGNvbnRleHRIb2xlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRGaWxsID0gY29udGV4dEZpbGw7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEJnID0gY29udGV4dEJnO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgMCwgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG5cclxuICAgICAgICBjb250ZXh0SG9sZTogYW55O1xyXG4gICAgICAgIGNvbnRleHRGaWxsOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEJnOiBhbnk7XHJcblxyXG4gICAgICAgIGFuaW1hdGlvblByb21pc2U6IGFueTtcclxuICAgICAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBpbm5lclJhZGl1cyA9IDY1OyAvLyA3NSVcclxuICAgICAgICBhbmltYXRlU3BlZWQgPSAxMDtcclxuICAgICAgICBwZXJjZW50T2Zmc2V0ID0gLTI1O1xyXG4gICAgICAgIGhvbGVDb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGFuaW1hdGU6ICgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpID0+IHt9O1xyXG5cclxuICAgICAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgdmFsdWUobmV3VmFsOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgb2xkVmFsLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGludGVydmFsJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGludGVydmFsKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnZG91Z2hudXQvZG91Z2hudXQuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IERvdWdobnV0Q29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnQCcsXHJcbiAgICAgICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmwpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0SG9sZSA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtaG9sZVwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEZpbGwgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWZpbGxcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRCZyA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtYmdcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLndhdGNoU2l6ZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB9LCBiZ2NvbG9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGRpZCBiYWNrZ3JvdW5kIGNvbG9yIGNoYW5nZT9cclxuICAgICAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSAkY3RybC4kZWxlbWVudC53aWR0aCgpICsgJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2hTaXplKCRjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnZlcnRUb1JhZGlhbnMocGVyY2VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gcGVyY2VudCAvIDEwMCAqIDM2MCAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd1dlZGdlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICB2YXIgdG9SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKHRvICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHRoZSB3ZWRnZVxyXG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9ICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwsIGNYLCBjWSwgcmFkaXVzLCBmcm9tLCB0bywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFgoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WShjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbih4LCB5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudFN0eWxlKGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICRib2R5LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRlbGVtZW50LmNzcyhzdHlsZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRIb2xlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLmhvbGVDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRCZ0NvbG9yKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIiB8fCBiZ2NvbG9yID09IFwidHJhbnNwYXJlbnRcIilcclxuICAgICAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIGZyb20sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCB0bywgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnZG91Z2hudXQnLCBEb3VnaG51dERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHNob3dOYXYoKTtcclxuICAgICAgICBoaWRlTmF2KCk7XHJcbiAgICAgICAgdG9nZ2xlTmF2KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTGF5b3V0UGFnZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIG9uSW5pdCh1cGRhdGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlID0gdXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzTmF2VmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgc2hvd05hdigpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKHRoaXMuX2lzTmF2VmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlTmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKHRoaXMuX2lzTmF2VmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9ICF0aGlzLl9pc05hdlZpc2libGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3VwZGF0ZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCdseW91dFBhZ2VDb250cm9sbGVyJywgTGF5b3V0UGFnZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIExheW91dFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0VBQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IExheW91dFBhZ2VDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTGF5b3V0UGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtLXNob3cnLCBpc1Zpc2libGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KHVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbGF5b3V0UGFnZScsIExheW91dFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnJGxvY2F0aW9uJywgJyR3aW5kb3cnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uOiBhbmd1bGFyLklMb2NhdGlvblNlcnZpY2UsIHByaXZhdGUgJHdpbmRvdzogYW5ndWxhci5JV2luZG93U2VydmljZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNJY29uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmljb25DbGFzcy5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaHJlZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmhyZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZDogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHJlZiAhPSBudWxsICYmIHBhdGguaW5kZXhPZih0aGlzLmhyZWYpID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcih4ID0+IHBhdGguaW5kZXhPZih4KSA9PT0gMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlKG5ld1RhYjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdUYWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwodGhpcy5ocmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ25hdkdyb3VwSXRlbScsICdebGF5b3V0UGFnZSddO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlciA9IGN0cmxzWzFdLFxyXG4gICAgICAgICAgICAgICAgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvRG86IHRoaXMgaXMgcHJvYmFibHkgZG9uZSBpbmNvcnJlY3RseSBhbmQgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgdGhlIG5hdi1ncm91cCBpbnN0ZWFkXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZS5oaWRlTmF2KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgoJGN0cmwuaHJlZiB8fCBcIlwiKS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwubmF2aWdhdGUoZS5jdHJsS2V5IHx8IChlLndoaWNoID09IDIpKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0QW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2TWVudUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIE5hdk1lbnVDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZNZW51RGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJ15sYXlvdXRQYWdlJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtbWVudS9uYXYtbWVudS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2TWVudUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlLnRvZ2dsZU5hdigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZNZW51JywgTmF2TWVudURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZU92ZXJsYXkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpO1xyXG4gICAgICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICAgICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNvbnRyb2wpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChvdmVybGF5KTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA8IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvdmVybGF5czogSVBhZ2VPdmVybGF5W107XHJcbiAgICAgICAgY29udHJvbHM6IGFueVtdO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRyb2xzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICAgICAgcGFyYW06IHN0cmluZztcclxuICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgICAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW0gfHwgJ2FyZWEnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKG5hbWUsIHRoaXMuX2FyZWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBpc1Zpc2libGU7XHJcbiAgICAgICAgd2l0aE92ZXJsYXk7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciwgSVBhZ2VPdmVybGF5IHtcclxuICAgICAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgICAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25DbG9zZTtcclxuICAgICAgICB0b2dnbGVWaXNpYmlsaXR5O1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkY3RybC53aXRoT3ZlcmxheSA9ICRhdHRycy5zaG93T3ZlcmxheSAhPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHBhZ2UuYWRkQ29udHJvbCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBpc1Zpc2libGUgPSAhISRjdHJsLnNsaWRlSWY7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImlzLXZpc2libGVcIiwgaXNWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGN0cmwud2l0aE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFnZS5zaG93T3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFnZS5oaWRlT3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXJDYW5jZWwnLCBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lRm9vdGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudChcIi5wYW5lXCIpLmFkZENsYXNzKFwicGFuZS0td2l0aEZvb3RlclwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICAgICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIG9uQ2xvc2U6IGFueTtcclxuXHJcbiAgICAgICAgb25Jbml0KHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlciwgc2hvd0Nsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlciA9IHBhZ2VTbGlkZXI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Nsb3NlID0gc2hvd0Nsb3NlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZVNsaWRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3VidGl0bGUgIT0gbnVsbCAmJiB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXRXaXRoU3VidGl0bGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0V2l0aFN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFuZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwidGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFuZUhlYWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgICAgICBjdHJsLnNldFdpdGhTdWJ0aXRsZSA9IChoYXNTdWJ0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhbmUtaGVhZGVyLS13aXRoU3VidGl0bGUnLCBoYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3RybC5vbkluaXQocGFnZVNsaWRlciwgJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGljb246IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGljb246IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ150YWJzJywgJ3RhYiddO1xyXG4gICAgICAgIC8vIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRlbXBsYXRlVXJsID0gJ3RhYi90YWIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbmFtZTogJ0AnLFxyXG4gICAgICAgICAgICBpY29uOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJHRhYnM6IElUYWJzQ29udHJvbGxlciA9ICRjdHJsc1swXTtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBJVGFiQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgICR0YWJzLmFkZFRhYigkY3RybCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnQpLnJlbW92ZUF0dHIoJ3RpdGxlJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYicsIFRhYkRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKTtcclxuICAgICAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKTtcclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKTtcclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCk7XHJcbiAgICAgICAgc2VsZWN0UHJldmlvdXNUYWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IElUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIHRhYnM6IElUYWJDb250cm9sbGVyW107XHJcblxyXG4gICAgICAgIG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhYiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUodGhpcy5fYWN0aXZlVGFiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xyXG4gICAgICAgIGdldCBhY3RpdmVUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhY3RpdmVUYWIobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnRhYnMubGVuZ3RoICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRhYlBvc2l0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2lkeCAqIC0xMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IHRoaXMudGFicy5maWx0ZXIoeCA9PiB4Lm5hbWUgPT0gbmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIoZm91bmRbMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMCAmJiB0aGlzLnRhYnMubGVuZ3RoID4gaWR4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4IC0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YWJMaW5rOiBJVGFic0NvbnRyb2xsZXJcclxuICAgICAgICB0YWJEZWZhdWx0OiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0RpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAndGFicy90YWJzLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJzQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJMaW5rOiAnPScsXHJcbiAgICAgICAgICAgIGFjdGl2ZVRhYjogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkYXR0cnMudGFiTGluaylcclxuICAgICAgICAgICAgICAgICRjdHJsLnRhYkxpbmsgPSAkY3RybDtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYnMnLCBUYWJzRGlyZWN0aXZlKTtcclxufSJdfQ==
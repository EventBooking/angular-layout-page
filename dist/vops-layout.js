Angular.module("ngLayoutPage", []);
var LayoutPageModule;
(function (LayoutPageModule) {
    var BarGraphController = /** @class */ (function () {
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
    var BarGraphDirective = /** @class */ (function () {
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
    var BlankslateController = /** @class */ (function () {
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
    var BlankslateDirective = /** @class */ (function () {
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
    var BodyHeaderController = /** @class */ (function () {
        function BodyHeaderController() {
        }
        return BodyHeaderController;
    }());
    var BodyHeaderDirective = /** @class */ (function () {
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
    var DoughnutController = /** @class */ (function () {
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
    var DoughnutDirective = /** @class */ (function () {
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
                var get2dContext = function (selector) {
                    var element = $element.find(selector).get(0);
                    return element.getContext("2d");
                };
                var contextHole = get2dContext("canvas.doughnut-hole");
                var contextFill = get2dContext("canvas.doughnut-fill");
                var contextBg = get2dContext("canvas.doughnut-bg");
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
        DoughnutDirective.prototype.getElementStyle = function ($element, className, style) {
            var $temp = angular.element("<div class=\"" + className + "\"></div>");
            $temp.insertAfter($element);
            var value = $temp.css(style);
            $temp.remove();
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
            var emptyColor = this.getElementStyle($ctrl.$element, $ctrl.emptyColorClass || "doughnut-empty-color", "background-color");
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
            var fillColor = this.getElementStyle($ctrl.$element, $ctrl.colorClass || "doughnut-fill-color", "background-color");
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
    var LayoutPageController = /** @class */ (function () {
        function LayoutPageController($element, $timeout) {
            this.$element = $element;
            this.$timeout = $timeout;
            this.isNavVisible = false;
            this.overlays = [];
            this.transitionTime = 250;
        }
        Object.defineProperty(LayoutPageController.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            enumerable: true,
            configurable: true
        });
        LayoutPageController.prototype.setCurrentPage = function (page) {
            this._currentPage = page;
        };
        LayoutPageController.prototype.clearCurrentPage = function (page) {
            if (page !== this._currentPage)
                return;
            this._currentPage = null;
        };
        LayoutPageController.prototype.showNav = function () {
            this.setNavVis(true);
        };
        LayoutPageController.prototype.hideNav = function () {
            this.setNavVis(false);
        };
        LayoutPageController.prototype.toggleNav = function () {
            this.setNavVis(!this.isNavVisible);
        };
        LayoutPageController.prototype.showOverlay = function (overlay) {
            var idx = this.overlays.indexOf(overlay);
            if (idx > -1)
                return;
            this.overlays.push(overlay);
            if (this.timer)
                this.$timeout.cancel(this.timer);
            this.forceHide();
            this.$element.addClass("layout-page--overlay");
        };
        LayoutPageController.prototype.forceHide = function () {
            this.$element.removeClass("layout-page--overlay layout-page--hiding");
        };
        LayoutPageController.prototype.hideOverlay = function (overlay) {
            var _this = this;
            var idx = this.overlays.indexOf(overlay);
            if (idx < 0)
                return;
            this.overlays.splice(idx, 1);
            if (this.overlays.length > 0)
                return;
            this.$element.addClass('layout-page--hiding');
            this.timer = this.$timeout(function () {
                _this.forceHide();
            }, this.transitionTime);
        };
        LayoutPageController.prototype.setNavVis = function (isVisible) {
            this.isNavVisible = isVisible;
            this.$element.toggleClass('nav--show', isVisible);
        };
        LayoutPageController.$inject = ['$element', '$timeout'];
        return LayoutPageController;
    }());
    Angular.module("ngLayoutPage").controller('layoutPageController', LayoutPageController);
    var LayoutPageDirective = /** @class */ (function () {
        function LayoutPageDirective() {
            this.restrict = 'EAC';
            this.controller = LayoutPageController;
            this.controllerAs = 'vm';
            this.bindToController = true;
        }
        return LayoutPageDirective;
    }());
    Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavGroupItemController = /** @class */ (function () {
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
        NavGroupItemController.$inject = ['$attrs', '$location', '$window'];
        return NavGroupItemController;
    }());
    Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
    var NavGroupItemDirective = /** @class */ (function () {
        function NavGroupItemDirective($compile) {
            this.$compile = $compile;
            this.restrict = 'A';
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
                var $ctrl = ctrls[0], $layoutPage = ctrls[1];
                // ToDo: this is probably done incorrectly and should be controlled by the nav-group instead
                $scope.$on('$routeChangeSuccess', function () {
                    $element.toggleClass('nav-group-item--selected', $ctrl.isSelected);
                    $layoutPage.hideNav();
                });
                $element.toggleClass('nav-group-item--selected', $ctrl.isSelected);
            };
        }
        NavGroupItemDirective.$inject = ['$compile'];
        return NavGroupItemDirective;
    }());
    Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavHeaderController = /** @class */ (function () {
        function NavHeaderController() {
        }
        return NavHeaderController;
    }());
    Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
    var NavHeaderDirective = /** @class */ (function () {
        function NavHeaderDirective() {
            this.restrict = 'E';
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
    var PageController = /** @class */ (function () {
        function PageController($rootScope, $scope, $element) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$element = $element;
            this.controls = [];
        }
        PageController.prototype.$onInit = function () {
            var _this = this;
            this.controls.forEach(function (x) { return _this.$element.append(x); });
            this.controls = [];
            this.layoutPage.setCurrentPage(this);
            this.$rootScope.$emit('$page.$create', this.$element, this);
        };
        PageController.prototype.$onDestroy = function () {
            this.$rootScope.$emit('$page.$destroy', this.$element, this);
            this.layoutPage.clearCurrentPage(this);
        };
        PageController.prototype.addControl = function ($element) {
            if (this.$element == null) {
                this.controls.push($element);
                return;
            }
            this.$element.append($element);
        };
        PageController.prototype.ensureOnTop = function ($element) {
            this.$element.append($element);
        };
        PageController.$inject = ["$rootScope", "$scope", "$element"];
        return PageController;
    }());
    var PageDirective = /** @class */ (function () {
        function PageDirective() {
            this.restrict = 'C';
            this.require = {
                layoutPage: "^layoutPage"
            };
            this.bindToController = true;
            this.controller = PageController;
        }
        return PageDirective;
    }());
    Angular.module("ngLayoutPage").directive('page', PageDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageContentNavItemController = /** @class */ (function () {
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
    var PageContentNavItemDirective = /** @class */ (function () {
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
    var PageDropDownController = /** @class */ (function () {
        function PageDropDownController() {
        }
        PageDropDownController.prototype.$onInit = function () {
        };
        PageDropDownController.$inject = [];
        return PageDropDownController;
    }());
    var PageDropDownDirective = /** @class */ (function () {
        function PageDropDownDirective() {
            this.restrict = 'E';
            this.templateUrl = 'page-dropdown/page-dropdown.html';
            this.transclude = true;
            this.controller = PageDropDownController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                showIf: '='
            };
        }
        return PageDropDownDirective;
    }());
    Angular.module("ngLayoutPage").directive('pageDropdown', PageDropDownDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageHeaderController = /** @class */ (function () {
        function PageHeaderController() {
        }
        PageHeaderController.prototype.onInit = function ($layoutPage, transcludeContent) {
            this.$layoutPage = $layoutPage;
            this.transcludeContent = transcludeContent;
        };
        PageHeaderController.prototype.toggleNav = function () {
            this.$layoutPage.toggleNav();
        };
        return PageHeaderController;
    }());
    var PageHeaderDirective = /** @class */ (function () {
        function PageHeaderDirective() {
            this.restrict = 'E';
            this.require = ['pageHeader', '^layoutPage'];
            this.transclude = {
                'title': '?pageHeaderTitle',
                'actions': '?pageHeaderActions'
            };
            this.templateUrl = 'page-header/page-header.html';
            this.controller = PageHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@',
                label: '@'
            };
            this.link = function ($scope, $element, $attrs, $ctrls, $transclude) {
                var $ctrl = $ctrls[0], $layoutPage = $ctrls[1], transcludeTitle = $transclude.isSlotFilled('title'), transcludeActions = $transclude.isSlotFilled('actions');
                var transcludeContent = !(transcludeTitle || transcludeActions);
                $ctrl.onInit($layoutPage, transcludeContent);
            };
        }
        return PageHeaderDirective;
    }());
    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderController = /** @class */ (function () {
        function PageSliderController($rootScope, $scope, $timeout, $element, $transclude, $attrs) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$element = $element;
            this.$transclude = $transclude;
            this.$attrs = $attrs;
            this._destroyPage = function () { };
            this.onPageCreate = function (e, $pageElement, _$page) {
                if (!_this.isOutsideOfPage)
                    return;
                if (_this.isVisible)
                    _this.show();
            };
            this.onPageDestroy = function () {
                if (!_this.isOutsideOfPage)
                    return;
                _this.close();
                _this.$element.detach();
            };
            this.$timer = null;
            this.sliderScope = null;
        }
        PageSliderController.prototype.$onInit = function () {
            this.withOverlay = this.$attrs.showOverlay != null;
            this.isOutsideOfPage = !this.page;
            if (this.isOutsideOfPage) {
                var unbind$Page$Create_1 = this.$rootScope.$on("$page.$create", this.onPageCreate);
                var unbind$Page$Destroy_1 = this.$rootScope.$on("$page.$destroy", this.onPageDestroy);
                this._destroyPage = function () {
                    unbind$Page$Create_1();
                    unbind$Page$Destroy_1();
                };
            }
            this.$element.detach();
            this.destroyScope();
        };
        PageSliderController.prototype.$onDestroy = function () {
            this.$element.remove();
            this._destroyPage();
        };
        PageSliderController.prototype.$postLink = function () {
            if (this.isVisible)
                this.show();
            this.isInitialized = true;
        };
        PageSliderController.prototype.showOverlay = function () {
            if (!this.withOverlay)
                return;
            this.$layoutPage.showOverlay(this);
        };
        ;
        PageSliderController.prototype.hideOverlay = function () {
            if (!this.withOverlay)
                return;
            this.$layoutPage.hideOverlay(this);
        };
        ;
        PageSliderController.prototype.emitEvent = function (eventName) {
            this.$rootScope.$emit(eventName, this.$element);
        };
        ;
        PageSliderController.prototype.fixBrowserReflowBatchingIssue = function () {
            this.$element.css("opacity");
        };
        ;
        PageSliderController.prototype.destroyScope = function () {
            if (!this.sliderScope)
                return;
            this.sliderScope.$destroy();
            this.sliderScope = null;
        };
        ;
        PageSliderController.prototype.transclude = function () {
            var _this = this;
            this.destroyScope();
            this.$transclude(function (clone, scope) {
                _this.$element.append(clone);
                _this.sliderScope = scope;
            });
        };
        ;
        PageSliderController.prototype.cancelTimer = function () {
            if (!this.$timer)
                return;
            this.$timeout.cancel(this.$timer);
        };
        ;
        PageSliderController.prototype.showElement = function () {
            this.cancelTimer();
            this.$page.ensureOnTop(this.$element);
            this.fixBrowserReflowBatchingIssue();
            this.$element.empty().addClass("is-visible");
            this.transclude();
        };
        ;
        PageSliderController.prototype.hideElement = function () {
            var _this = this;
            this.cancelTimer();
            if (!this.$element.is(".is-visible"))
                return;
            this.destroyScope();
            this.$element.addClass('is-hiding');
            this.$timer = this.$timeout(function () {
                _this.$element.removeClass("is-visible is-hiding")
                    .detach()
                    .empty();
            }, 250);
        };
        ;
        PageSliderController.prototype.hideNavigation = function () {
            this.$layoutPage.hideNav();
        };
        ;
        PageSliderController.prototype.show = function () {
            if (!this.$page)
                return;
            this.emitEvent('$pageSlider.$show');
            this.showElement();
            this.showOverlay();
        };
        ;
        PageSliderController.prototype.hide = function () {
            this.emitEvent('$pageSlider.$hide');
            this.hideElement();
            this.hideOverlay();
            this.hideNavigation();
        };
        ;
        Object.defineProperty(PageSliderController.prototype, "slideIf", {
            get: function () {
                return this._slideIf;
            },
            set: function (value) {
                var visibilityChanged = value !== this._slideIf;
                this._slideIf = value;
                if (!this.isInitialized)
                    return;
                if (this._slideIf) {
                    this.show();
                    return;
                }
                this.hide();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageSliderController.prototype, "isVisible", {
            get: function () {
                return !!this._slideIf;
            },
            enumerable: true,
            configurable: true
        });
        PageSliderController.prototype.close = function () {
            this.slideIf = null;
            this.onClose();
        };
        Object.defineProperty(PageSliderController.prototype, "$page", {
            get: function () {
                return this.$layoutPage.currentPage;
            },
            enumerable: true,
            configurable: true
        });
        PageSliderController.$inject = ['$rootScope', '$scope', '$timeout', '$element', '$transclude', '$attrs'];
        return PageSliderController;
    }());
    var PageSliderDirective = /** @class */ (function () {
        function PageSliderDirective() {
            this.restrict = 'E';
            this.require = {
                $layoutPage: '^layoutPage',
                page: '?^page'
            };
            this.transclude = true;
            this.controller = PageSliderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                slideIf: '=',
                onClose: '&'
            };
        }
        return PageSliderDirective;
    }());
    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderCancelDirective = /** @class */ (function () {
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
    var PaneFooterDirective = /** @class */ (function () {
        function PaneFooterDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.template = '<div class="pane-footer-content" ng-transclude></div>';
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
    var PaneHeaderController = /** @class */ (function () {
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
    var PaneHeaderDirective = /** @class */ (function () {
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
    var TabController = /** @class */ (function () {
        function TabController() {
        }
        return TabController;
    }());
    var TabDirective = /** @class */ (function () {
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
    var TabsController = /** @class */ (function () {
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
    var TabsDirective = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24udHMiLCIuLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIi4uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsIi4uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsIi4uL3NyYy90YWIvdGFiLnRzIiwiLi4vc3JjL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0FuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0I7SUFFbkI7UUFDSTtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEVB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Q0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ2YsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQUFDLEFBakJELElBaUJDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsRUFsR00sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWtHdEIiLCJzb3VyY2VzQ29udGVudCI6WyJBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoQ29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyU3RlcHMgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzdHlsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBlcmNlbnR9JWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzRnVsbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudCA9PSAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNaW46IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWluKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWluKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWluID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNYXg6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWF4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWF4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJWYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2JhclN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhclN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJTdGVwcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJTdGVwcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhclN0ZXBzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpY2tzOiBudW1iZXJbXTtcclxuICAgICAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgc2V0UGVyY2VudCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gTnVtYmVyKHRoaXMuYmFyVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPCBtaW4pXHJcbiAgICAgICAgICAgICAgICB4ID0gbWluO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPiBtYXgpXHJcbiAgICAgICAgICAgICAgICB4ID0gbWF4O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG5cclxuICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKHggLSBtaW4pIC8gZGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGlja3MoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gTnVtYmVyKHRoaXMuYmFyU3RlcHMgPT0gbnVsbCA/IDEwIDogdGhpcy5iYXJTdGVwcyk7XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RlcHMgPSAobWF4IC0gbWluKSAvIGRpdjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWNrcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IG1pbjsgaW5kZXggPD0gbWF4OyBpbmRleCArPSBzdGVwcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDApICsgXCJLXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwKSArIFwiTVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMDAwMCkgKyBcIkJcIjtcclxuICAgICAgICAgICAgICAgIHRpY2tzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdiYXItZ3JhcGgvYmFyLWdyYXBoLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCYXJHcmFwaENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgYmFyTWluOiAnQCcsXHJcbiAgICAgICAgICAgIGJhck1heDogJ0AnLFxyXG4gICAgICAgICAgICBiYXJWYWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBiYXJTdGVwczogJ0A/J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdiYXJHcmFwaCcsIEJhckdyYXBoRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBcclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMuc3VidGl0bGUgPT0gbnVsbCB8fCB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCbGFua3NsYXRlQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBpY29uOiAnQCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdib2R5LWhlYWRlci9ib2R5LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQm9keUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXRDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgYW5pbWF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEhvbGUgPSBjb250ZXh0SG9sZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0RmlsbCA9IGNvbnRleHRGaWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRCZyA9IGNvbnRleHRCZztcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIDAsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgY29udGV4dEhvbGU6IGFueTtcclxuICAgICAgICBjb250ZXh0RmlsbDogYW55O1xyXG4gICAgICAgIGNvbnRleHRCZzogYW55O1xyXG5cclxuICAgICAgICBhbmltYXRpb25Qcm9taXNlOiBhbnk7XHJcbiAgICAgICAgY29sb3I6IHN0cmluZztcclxuICAgICAgICBjb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgZW1wdHlDb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgaW5uZXJSYWRpdXMgPSA2NTsgLy8gNzUlXHJcbiAgICAgICAgYW5pbWF0ZVNwZWVkID0gMTA7XHJcbiAgICAgICAgcGVyY2VudE9mZnNldCA9IC0yNTtcclxuICAgICAgICBob2xlQ29sb3I6IHN0cmluZztcclxuICAgICAgICBhbmltYXRlOiAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSA9PiB7fTtcclxuXHJcbiAgICAgICAgX3ZhbHVlOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHZhbHVlKCk6IG51bWJlciB8IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHZhbHVlKG5ld1ZhbDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIG9sZFZhbCwgbmV3VmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbnRlcnZhbCddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbnRlcnZhbCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2RvdWdobnV0L2RvdWdobnV0Lmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEb3VnaG51dENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgY29sb3I6ICdAJyxcclxuICAgICAgICAgICAgY29sb3JDbGFzczogJ0AnLFxyXG4gICAgICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHI6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldDJkQ29udGV4dCA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gJGVsZW1lbnQuZmluZChzZWxlY3RvcikuZ2V0KDApIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRleHRIb2xlID0gZ2V0MmRDb250ZXh0KFwiY2FudmFzLmRvdWdobnV0LWhvbGVcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0RmlsbCA9IGdldDJkQ29udGV4dChcImNhbnZhcy5kb3VnaG51dC1maWxsXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEJnID0gZ2V0MmRDb250ZXh0KFwiY2FudmFzLmRvdWdobnV0LWJnXCIpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgKCRjdHJsLCBmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZGlkIGJhY2tncm91bmQgY29sb3IgY2hhbmdlP1xyXG4gICAgICAgICAgICAgICAgaWYgKGJnY29sb3IgIT0gJGN0cmwuaG9sZUNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCkgKyAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaFNpemUoJGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gc2l6ZSAhPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyhmcm9tICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcbiAgICAgICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHdlZGdlXHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cywgdGhpcy5jb252ZXJ0VG9SYWRpYW5zKCRjdHJsLnBlcmNlbnRPZmZzZXQpLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMgKiAoJGN0cmwuaW5uZXJSYWRpdXMgLyAxMDApLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNYID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYWRpdXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgY2xhc3NOYW1lOiBzdHJpbmcsIHN0eWxlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgJHRlbXAgPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgJHRlbXAuaW5zZXJ0QWZ0ZXIoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJHRlbXAuY3NzKHN0eWxlKTtcclxuICAgICAgICAgICAgJHRlbXAucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5lbXB0eUNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1lbXB0eS1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRCZywgY1gsIGNZLCByYWRpdXMsIDAsIDEwMCwgZW1wdHlDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0SG9sZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEhvbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5ob2xlQ29sb3IgPSB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdEb251dCgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUsIGNYLCBjWSwgcmFkaXVzLCAkY3RybC5ob2xlQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0QmdDb2xvcigkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBiZ2NvbG9yID0gJGN0cmwuJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgICAgaWYgKGJnY29sb3IgPT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIgfHwgYmdjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpXHJcbiAgICAgICAgICAgICAgICBiZ2NvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gYmdjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWxsQ29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC4kZWxlbWVudCwgJGN0cmwuY29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWZpbGwtY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgbkZyb20gPSBOdW1iZXIoZnJvbSk7XHJcbiAgICAgICAgICAgIHZhciBuVG8gPSBOdW1iZXIodG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVVwKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVVcCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIHRvLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLS07XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwocHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlT3ZlcmxheSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxheW91dFBhZ2VDb250cm9sbGVyIGV4dGVuZHMgSVBhZ2VPdmVybGF5IHtcclxuICAgICAgICBzaG93TmF2KCk7XHJcbiAgICAgICAgaGlkZU5hdigpO1xyXG4gICAgICAgIHRvZ2dsZU5hdigpO1xyXG4gICAgICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICAgICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlOiBJUGFnZUNvbnRyb2xsZXIpO1xyXG4gICAgICAgIGNsZWFyQ3VycmVudFBhZ2UocGFnZTogSVBhZ2VDb250cm9sbGVyKTtcclxuICAgICAgICBjdXJyZW50UGFnZTogSVBhZ2VDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIExheW91dFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSUxheW91dFBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2N1cnJlbnRQYWdlOiBJUGFnZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgZ2V0IGN1cnJlbnRQYWdlKCk6IElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2U6IElQYWdlQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGVhckN1cnJlbnRQYWdlKHBhZ2U6IElQYWdlQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBpZihwYWdlICE9PSB0aGlzLl9jdXJyZW50UGFnZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd05hdigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROYXZWaXModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlTmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5hdlZpcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmF2VmlzKCF0aGlzLmlzTmF2VmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cy5wdXNoKG92ZXJsYXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5mb3JjZUhpZGUoKTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcImxheW91dC1wYWdlLS1vdmVybGF5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JjZUhpZGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJsYXlvdXQtcGFnZS0tb3ZlcmxheSBsYXlvdXQtcGFnZS0taGlkaW5nXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPCAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5cy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdsYXlvdXQtcGFnZS0taGlkaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VIaWRlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMudHJhbnNpdGlvblRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXROYXZWaXMoaXNWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNOYXZWaXNpYmxlID0gaXNWaXNpYmxlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtLXNob3cnLCBpc1Zpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpc05hdlZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIG92ZXJsYXlzOiBJUGFnZU92ZXJsYXlbXSA9IFtdO1xyXG4gICAgICAgIHByaXZhdGUgdGltZXI7XHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2l0aW9uVGltZSA9IDI1MDtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCdsYXlvdXRQYWdlQ29udHJvbGxlcicsIExheW91dFBhZ2VDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBMYXlvdXRQYWdlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFQUMnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBMYXlvdXRQYWdlQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbGF5b3V0UGFnZScsIExheW91dFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnJGxvY2F0aW9uJywgJyR3aW5kb3cnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uOiBhbmd1bGFyLklMb2NhdGlvblNlcnZpY2UsIHByaXZhdGUgJHdpbmRvdzogYW5ndWxhci5JV2luZG93U2VydmljZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNJY29uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmljb25DbGFzcy5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaHJlZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmhyZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZDogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaHJlZiAhPSBudWxsICYmIHBhdGguaW5kZXhPZih0aGlzLmhyZWYpID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcih4ID0+IHBhdGguaW5kZXhPZih4KSA9PT0gMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gWyduYXZHcm91cEl0ZW0nLCAnXmxheW91dFBhZ2UnXTtcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2R3JvdXBJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIgPSBjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgPSBjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvRG86IHRoaXMgaXMgcHJvYmFibHkgZG9uZSBpbmNvcnJlY3RseSBhbmQgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgdGhlIG5hdi1ncm91cCBpbnN0ZWFkXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZS5oaWRlTmF2KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0QW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGV4dDogJ0AnLFxyXG4gICAgICAgICAgICBzbWFsbDogJ0AnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2SGVhZGVyJywgTmF2SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkQ29udHJvbCgkZWxlbWVudDogYW55KTtcclxuICAgICAgICBlbnN1cmVPblRvcCgkZWxlbWVudDogYW55KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXCIkcm9vdFNjb3BlXCIsIFwiJHNjb3BlXCIsIFwiJGVsZW1lbnRcIl07XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goeCA9PiB0aGlzLiRlbGVtZW50LmFwcGVuZCh4KSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYWdlLnNldEN1cnJlbnRQYWdlKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlLiRjcmVhdGUnLCB0aGlzLiRlbGVtZW50LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGRlc3Ryb3knLCB0aGlzLiRlbGVtZW50LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYWdlLmNsZWFyQ3VycmVudFBhZ2UodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVuc3VyZU9uVG9wKCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udHJvbHM6IGFueVtdID0gW107XHJcbiAgICAgICAgbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0MnO1xyXG4gICAgICAgIHJlcXVpcmUgPSB7XHJcbiAgICAgICAgICAgIGxheW91dFBhZ2U6IFwiXmxheW91dFBhZ2VcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICAgICAgcGFyYW06IHN0cmluZztcclxuICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgICAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW0gfHwgJ2FyZWEnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKG5hbWUsIHRoaXMuX2FyZWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlRHJvcERvd25Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRvbkluaXQoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93SWY6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURyb3BEb3duRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24uaHRtbCc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VEcm9wRG93bkNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2hvd0lmOiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZURyb3Bkb3duJywgUGFnZURyb3BEb3duRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgb25Jbml0KCRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIsIHRyYW5zY2x1ZGVDb250ZW50OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2UgPSAkbGF5b3V0UGFnZTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2NsdWRlQ29udGVudCA9IHRyYW5zY2x1ZGVDb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlTmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLiRsYXlvdXRQYWdlLnRvZ2dsZU5hdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlclxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNjbHVkZUNvbnRlbnQ6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsncGFnZUhlYWRlcicsICdebGF5b3V0UGFnZSddO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB7XHJcbiAgICAgICAgICAgICd0aXRsZSc6ICc/cGFnZUhlYWRlclRpdGxlJyxcclxuICAgICAgICAgICAgJ2FjdGlvbnMnOiAnP3BhZ2VIZWFkZXJBY3Rpb25zJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnMsICRjdHJsczogYW55W10sICR0cmFuc2NsdWRlOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGN0cmw6IFBhZ2VIZWFkZXJDb250cm9sbGVyID0gJGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlciA9ICRjdHJsc1sxXSxcclxuICAgICAgICAgICAgICAgIHRyYW5zY2x1ZGVUaXRsZSA9ICR0cmFuc2NsdWRlLmlzU2xvdEZpbGxlZCgndGl0bGUnKSxcclxuICAgICAgICAgICAgICAgIHRyYW5zY2x1ZGVBY3Rpb25zID0gJHRyYW5zY2x1ZGUuaXNTbG90RmlsbGVkKCdhY3Rpb25zJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2NsdWRlQ29udGVudCA9ICEodHJhbnNjbHVkZVRpdGxlIHx8IHRyYW5zY2x1ZGVBY3Rpb25zKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkbGF5b3V0UGFnZSwgdHJhbnNjbHVkZUNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VIZWFkZXInLCBQYWdlSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlU2xpZGVyQ29udHJvbGxlciBleHRlbmRzIElQYWdlT3ZlcmxheSB7XHJcbiAgICAgICAgaXNWaXNpYmxlO1xyXG4gICAgICAgIHdpdGhPdmVybGF5O1xyXG4gICAgICAgIGNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRzY29wZScsICckdGltZW91dCcsICckZWxlbWVudCcsICckdHJhbnNjbHVkZScsICckYXR0cnMnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICBwcml2YXRlICR0cmFuc2NsdWRlOiBhbmd1bGFyLklUcmFuc2NsdWRlRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLndpdGhPdmVybGF5ID0gdGhpcy4kYXR0cnMuc2hvd092ZXJsYXkgIT0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pc091dHNpZGVPZlBhZ2UgPSAhdGhpcy5wYWdlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRzaWRlT2ZQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSRDcmVhdGUgPSB0aGlzLiRyb290U2NvcGUuJG9uKFwiJHBhZ2UuJGNyZWF0ZVwiLCB0aGlzLm9uUGFnZUNyZWF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSREZXN0cm95ID0gdGhpcy4kcm9vdFNjb3BlLiRvbihcIiRwYWdlLiRkZXN0cm95XCIsIHRoaXMub25QYWdlRGVzdHJveSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVBhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5iaW5kJFBhZ2UkQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5iaW5kJFBhZ2UkRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2NvcGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2Rlc3Ryb3lQYWdlID0gKCkgPT4geyB9O1xyXG4gICAgICAgICRvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lQYWdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblBhZ2VDcmVhdGUgPSAoZTogYW5ndWxhci5JQW5ndWxhckV2ZW50LCAkcGFnZUVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgXyRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPdXRzaWRlT2ZQYWdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblBhZ2VEZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPdXRzaWRlT2ZQYWdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd092ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy53aXRoT3ZlcmxheSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2Uuc2hvd092ZXJsYXkodGhpcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoaWRlT3ZlcmxheSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLndpdGhPdmVybGF5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kbGF5b3V0UGFnZS5oaWRlT3ZlcmxheSh0aGlzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGVtaXRFdmVudChldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoZXZlbnROYW1lLCB0aGlzLiRlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpeEJyb3dzZXJSZWZsb3dCYXRjaGluZ0lzc3VlKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmNzcyhcIm9wYWNpdHlcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZXN0cm95U2NvcGUoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zbGlkZXJTY29wZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2NsdWRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTY29wZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kdHJhbnNjbHVkZSgoY2xvbmUsIHNjb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVyID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIGNhbmNlbFRpbWVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJHRpbWVyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwodGhpcy4kdGltZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd0VsZW1lbnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsVGltZXIoKTtcclxuICAgICAgICAgICAgdGhpcy4kcGFnZS5lbnN1cmVPblRvcCh0aGlzLiRlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5maXhCcm93c2VyUmVmbG93QmF0Y2hpbmdJc3N1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmVtcHR5KCkuYWRkQ2xhc3MoXCJpcy12aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zY2x1ZGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGhpZGVFbGVtZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaXMoXCIuaXMtdmlzaWJsZVwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNjb3BlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWhpZGluZycpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcImlzLXZpc2libGUgaXMtaGlkaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRldGFjaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoaWRlTmF2aWdhdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGF5b3V0UGFnZS5oaWRlTmF2KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93KCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJHBhZ2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudCgnJHBhZ2VTbGlkZXIuJHNob3cnKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoaWRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudCgnJHBhZ2VTbGlkZXIuJGhpZGUnKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZU5hdmlnYXRpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgICAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHZhbHVlICE9PSB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zbGlkZUlmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJZiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0ICRwYWdlKCk6IElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRsYXlvdXRQYWdlLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNJbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcbiAgICAgICAgc2xpZGVyU2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gbnVsbDtcclxuICAgICAgICBpc091dHNpZGVPZlBhZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgcGFnZTogSVBhZ2VDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSB7XHJcbiAgICAgICAgICAgICRsYXlvdXRQYWdlOiAnXmxheW91dFBhZ2UnLFxyXG4gICAgICAgICAgICBwYWdlOiAnP15wYWdlJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cInBhbmUtZm9vdGVyLWNvbnRlbnRcIiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVGb290ZXInLCBQYW5lRm9vdGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc2hvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgICAgIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBvbkNsb3NlOiBhbnk7XHJcblxyXG4gICAgICAgIG9uSW5pdChwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIsIHNob3dDbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIgPSBwYWdlU2xpZGVyO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDbG9zZSA9IHNob3dDbG9zZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnRpdGxlICE9IG51bGwgJiYgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3N1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJ0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0V2l0aFN1YnRpdGxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFdpdGhTdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcInRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5zZXRXaXRoU3VidGl0bGUgPSAoaGFzU3VidGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYW5lLWhlYWRlci0td2l0aFN1YnRpdGxlJywgaGFzU3VidGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0cmwub25Jbml0KHBhZ2VTbGlkZXIsICRhdHRycy5zaG93Q2xvc2UgIT0gbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gWydedGFicycsICd0YWInXTtcclxuICAgICAgICAvLyB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0ZW1wbGF0ZVVybCA9ICd0YWIvdGFiLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdAJyxcclxuICAgICAgICAgICAgaWNvbjogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICR0YWJzOiBJVGFic0NvbnRyb2xsZXIgPSAkY3RybHNbMF07XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAkdGFicy5hZGRUYWIoJGN0cmwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50KS5yZW1vdmVBdHRyKCd0aXRsZScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZyk7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcik7XHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBJVGFiQ29udHJvbGxlcjtcclxuICAgICAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgICAgICBvbkluaXQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYWIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKHRoaXMuX2FjdGl2ZVRhYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcclxuICAgICAgICBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYWN0aXZlVGFiKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZShuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB3aWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy50YWJzLmxlbmd0aCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0YWJQb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtpZHggKiAtMTAwfSVgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnRhYnMuZmlsdGVyKHggPT4geC5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKGZvdW5kWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDAgJiYgdGhpcy50YWJzLmxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFic1tpZHhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0UHJldmlvdXNUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFiTGluazogSVRhYnNDb250cm9sbGVyXHJcbiAgICAgICAgdGFiRGVmYXVsdDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3RhYnMvdGFicy5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFic0NvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGFiTGluazogJz0nLFxyXG4gICAgICAgICAgICBhY3RpdmVUYWI6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJGF0dHJzLnRhYkxpbmspXHJcbiAgICAgICAgICAgICAgICAkY3RybC50YWJMaW5rID0gJGN0cmw7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWJzJywgVGFic0RpcmVjdGl2ZSk7XHJcbn0iXX0=
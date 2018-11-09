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
            this.isInitialized = false;
        }
        PageController.prototype.$onInit = function () {
            var _this = this;
            this.controls.forEach(function (x) { return _this.$element.append(x); });
            this.controls = [];
            this.layoutPage.setCurrentPage(this);
            this.isInitialized = true;
        };
        PageController.prototype.$postLink = function () {
            this.$rootScope.$emit('$page.$create', this.$element, this);
        };
        PageController.prototype.$onDestroy = function () {
            this.$rootScope.$emit('$page.$destroy', this.$element, this);
            this.layoutPage.clearCurrentPage(this);
        };
        PageController.prototype.addControl = function ($element) {
            if (!this.isInitialized) {
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
        function PageHeaderController($transclude) {
            this.$transclude = $transclude;
        }
        PageHeaderController.prototype.$onInit = function () {
            var transcludeTitle = this.$transclude.isSlotFilled('title'), transcludeActions = this.$transclude.isSlotFilled('actions');
            this.transcludeContent = !(transcludeTitle || transcludeActions);
        };
        PageHeaderController.prototype.toggleNav = function () {
            this.$layoutPage.toggleNav();
        };
        PageHeaderController.$inject = ['$transclude'];
        return PageHeaderController;
    }());
    var PageHeaderDirective = /** @class */ (function () {
        function PageHeaderDirective() {
            this.restrict = 'E';
            this.require = {
                $layoutPage: '^layoutPage'
            };
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
            try {
                if (this.layoutPage == null) {
                    var layoutPageElement = angular.element('.layout-page');
                    if (!layoutPageElement.length)
                        throw "layout-page not found";
                    this.layoutPage = layoutPageElement.controller('layoutPage');
                    layoutPageElement.append(this.$element);
                }
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
                if (this.isVisible)
                    this.show();
                this.isInitialized = true;
            }
            catch (ex) {
                console.error(ex);
            }
        };
        PageSliderController.prototype.$onDestroy = function () {
            this.$element.remove();
            this._destroyPage();
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
        Object.defineProperty(PageSliderController.prototype, "$layoutPage", {
            get: function () {
                return this.layoutPage;
            },
            enumerable: true,
            configurable: true
        });
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
                layoutPage: '?^layoutPage',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24udHMiLCIuLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIi4uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsIi4uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsIi4uL3NyYy90YWIvdGFiLnRzIiwiLi4vc3JjL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0FuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0I7SUFFbkI7UUFDSTtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEVB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QUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLO2dCQUNuQyxJQUFJLE1BQU0sQ0FBQyxPQUFPO29CQUNkLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQWpCRCxJQWlCQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNwRSxDQUFDLEVBbEdNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFrR3RCIiwic291cmNlc0NvbnRlbnQiOlsiQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIiwgW10pOyIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhclN0ZXBzID0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wZXJjZW50fSVgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0Z1bGwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWluOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1pbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWF4OiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1heCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyVmFsdWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyU3RlcHModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICAgICAgcGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgeCA9IE51bWJlcih0aGlzLmJhclZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICAgICAgeCA9IG1pbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh4ID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqICh4IC0gbWluKSAvIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IE51bWJlcih0aGlzLmJhclN0ZXBzID09IG51bGwgPyAxMCA6IHRoaXMuYmFyU3RlcHMpO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSBtaW47IGluZGV4IDw9IG1heDsgaW5kZXggKz0gc3RlcHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwKSArIFwiS1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMCkgKyBcIk1cIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aWNrcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmFyR3JhcGhDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGJhck1pbjogJ0AnLFxyXG4gICAgICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICAgICAgYmFyVmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgYmFyU3RlcHM6ICdAPydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmFyR3JhcGgnLCBCYXJHcmFwaERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnN1YnRpdGxlID09IG51bGwgfHwgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmxhbmtzbGF0ZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgaWNvbjogJ0AnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JsYW5rc2xhdGUnLCBCbGFua3NsYXRlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYm9keS1oZWFkZXIvYm9keS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJvZHlIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIERvdWdobnV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRIb2xlID0gY29udGV4dEhvbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEZpbGwgPSBjb250ZXh0RmlsbDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCAwLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnRleHRIb2xlOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgICAgICBjb250ZXh0Qmc6IGFueTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgICAgIHBlcmNlbnRPZmZzZXQgPSAtMjU7XHJcbiAgICAgICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYW5pbWF0ZTogKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgICAgIF92YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCBvbGRWYWwsIG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW50ZXJ2YWwpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdkb3VnaG51dC9kb3VnaG51dC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gRG91Z2hudXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdAJyxcclxuICAgICAgICAgICAgZW1wdHlDb2xvckNsYXNzOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXQyZENvbnRleHQgPSAoc2VsZWN0b3I6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9ICRlbGVtZW50LmZpbmQoc2VsZWN0b3IpLmdldCgwKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0SG9sZSA9IGdldDJkQ29udGV4dChcImNhbnZhcy5kb3VnaG51dC1ob2xlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEZpbGwgPSBnZXQyZENvbnRleHQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRCZyA9IGdldDJkQ29udGV4dChcImNhbnZhcy5kb3VnaG51dC1iZ1wiKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLndhdGNoU2l6ZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB9LCBiZ2NvbG9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGRpZCBiYWNrZ3JvdW5kIGNvbG9yIGNoYW5nZT9cclxuICAgICAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSAkY3RybC4kZWxlbWVudC53aWR0aCgpICsgJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2hTaXplKCRjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnZlcnRUb1JhZGlhbnMocGVyY2VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gcGVyY2VudCAvIDEwMCAqIDM2MCAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd1dlZGdlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICB2YXIgdG9SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKHRvICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHRoZSB3ZWRnZVxyXG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9ICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwsIGNYLCBjWSwgcmFkaXVzLCBmcm9tLCB0bywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFgoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WShjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbih4LCB5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudFN0eWxlKCRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIGNsYXNzTmFtZTogc3RyaW5nLCBzdHlsZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyICR0ZW1wID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICR0ZW1wLmluc2VydEFmdGVyKCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICR0ZW1wLmNzcyhzdHlsZSk7XHJcbiAgICAgICAgICAgICR0ZW1wLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzZXQoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNvbnRleHQuY2FudmFzLndpZHRoLCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0QmcoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0QmcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0QmcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVtcHR5Q29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC4kZWxlbWVudCwgJGN0cmwuZW1wdHlDb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZW1wdHktY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0QmcsIGNYLCBjWSwgcmFkaXVzLCAwLCAxMDAsIGVtcHR5Q29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEhvbGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRIb2xlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuaG9sZUNvbG9yID0gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RG9udXQoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlLCBjWCwgY1ksIHJhZGl1cywgJGN0cmwuaG9sZUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEJnQ29sb3IoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgYmdjb2xvciA9ICRjdHJsLiRlbGVtZW50LmNzcyhcImJhY2tncm91bmQtY29sb3JcIik7XHJcbiAgICAgICAgICAgIGlmIChiZ2NvbG9yID09IFwicmdiYSgwLCAwLCAwLCAwKVwiIHx8IGJnY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKVxyXG4gICAgICAgICAgICAgICAgYmdjb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGJnY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZmlsbENvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuJGVsZW1lbnQsICRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIGZyb20sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCB0bywgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnZG91Z2hudXQnLCBEb3VnaG51dERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZU92ZXJsYXkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElMYXlvdXRQYWdlQ29udHJvbGxlciBleHRlbmRzIElQYWdlT3ZlcmxheSB7XHJcbiAgICAgICAgc2hvd05hdigpO1xyXG4gICAgICAgIGhpZGVOYXYoKTtcclxuICAgICAgICB0b2dnbGVOYXYoKTtcclxuICAgICAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpO1xyXG4gICAgICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZTogSVBhZ2VDb250cm9sbGVyKTtcclxuICAgICAgICBjbGVhckN1cnJlbnRQYWdlKHBhZ2U6IElQYWdlQ29udHJvbGxlcik7XHJcbiAgICAgICAgY3VycmVudFBhZ2U6IElQYWdlQ29udHJvbGxlcjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBMYXlvdXRQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElMYXlvdXRQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRlbGVtZW50JywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jdXJyZW50UGFnZTogSVBhZ2VDb250cm9sbGVyO1xyXG4gICAgICAgIGdldCBjdXJyZW50UGFnZSgpOiBJUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlOiBJUGFnZUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJDdXJyZW50UGFnZShwYWdlOiBJUGFnZUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgaWYocGFnZSAhPT0gdGhpcy5fY3VycmVudFBhZ2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmF2VmlzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGlkZU5hdigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROYXZWaXMoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlTmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5hdlZpcyghdGhpcy5pc05hdlZpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChvdmVybGF5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VIaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoXCJsYXlvdXQtcGFnZS0tb3ZlcmxheVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9yY2VIaWRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwibGF5b3V0LXBhZ2UtLW92ZXJsYXkgbGF5b3V0LXBhZ2UtLWhpZGluZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4IDwgMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMuc3BsaWNlKGlkeCwgMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5cy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnbGF5b3V0LXBhZ2UtLWhpZGluZycpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlSGlkZSgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLnRyYW5zaXRpb25UaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0TmF2VmlzKGlzVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmlzTmF2VmlzaWJsZSA9IGlzVmlzaWJsZTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgaXNWaXNpYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaXNOYXZWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5czogSVBhZ2VPdmVybGF5W10gPSBbXTtcclxuICAgICAgICBwcml2YXRlIHRpbWVyO1xyXG4gICAgICAgIHByaXZhdGUgdHJhbnNpdGlvblRpbWUgPSAyNTA7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbGF5b3V0UGFnZUNvbnRyb2xsZXInLCBMYXlvdXRQYWdlQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTGF5b3V0UGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRUFDJztcclxuICAgICAgICBjb250cm9sbGVyID0gTGF5b3V0UGFnZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2xheW91dFBhZ2UnLCBMYXlvdXRQYWdlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbicsICckd2luZG93J107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbjogYW5ndWxhci5JTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkdyb3VwSXRlbUNvbnRyb2xsZXInLCBOYXZHcm91cEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnbmF2R3JvdXBJdGVtJywgJ15sYXlvdXRQYWdlJ107XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyID0gY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAvLyBUb0RvOiB0aGlzIGlzIHByb2JhYmx5IGRvbmUgaW5jb3JyZWN0bHkgYW5kIHNob3VsZCBiZSBjb250cm9sbGVkIGJ5IHRoZSBuYXYtZ3JvdXAgaW5zdGVhZFxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2UuaGlkZU5hdigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZHcm91cEl0ZW0nLCBOYXZHcm91cEl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cdFxyXG5cdEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkhlYWRlckNvbnRyb2xsZXInLCBOYXZIZWFkZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIGFkZENvbnRyb2woJGVsZW1lbnQ6IGFueSk7XHJcbiAgICAgICAgZW5zdXJlT25Ub3AoJGVsZW1lbnQ6IGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcIiRzY29wZVwiLCBcIiRlbGVtZW50XCJdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICRzY29wZTogYW5ndWxhci5JU2NvcGUsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeVxyXG4gICAgICAgICkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKHggPT4gdGhpcy4kZWxlbWVudC5hcHBlbmQoeCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UGFnZS5zZXRDdXJyZW50UGFnZSh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRwb3N0TGluaygpIHtcclxuXHRcdFx0dGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kY3JlYXRlJywgdGhpcy4kZWxlbWVudCwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG4gICAgICAgICRvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGRlc3Ryb3knLCB0aGlzLiRlbGVtZW50LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYWdlLmNsZWFyQ3VycmVudFBhZ2UodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKCRlbGVtZW50KSB7XHJcblx0XHRcdGlmICghdGhpcy5pc0luaXRpYWxpemVkKSB7XHJcblx0XHRcdFx0dGhpcy5jb250cm9scy5wdXNoKCRlbGVtZW50KTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuJGVsZW1lbnQuYXBwZW5kKCRlbGVtZW50KTtcclxuXHRcdH1cclxuXHJcbiAgICAgICAgZW5zdXJlT25Ub3AoJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoJGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb250cm9sczogYW55W10gPSBbXTtcclxuICAgICAgICBsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0MnO1xyXG4gICAgICAgIHJlcXVpcmUgPSB7XHJcbiAgICAgICAgICAgIGxheW91dFBhZ2U6IFwiXmxheW91dFBhZ2VcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICAgICAgcGFyYW06IHN0cmluZztcclxuICAgICAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgICAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW0gfHwgJ2FyZWEnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKG5hbWUsIHRoaXMuX2FyZWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICAgICAgYXJlYTogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlRHJvcERvd25Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRvbkluaXQoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93SWY6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURyb3BEb3duRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24uaHRtbCc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VEcm9wRG93bkNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2hvd0lmOiAnPSdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZURyb3Bkb3duJywgUGFnZURyb3BEb3duRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyR0cmFuc2NsdWRlJ107XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkdHJhbnNjbHVkZTogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjbHVkZVRpdGxlID0gdGhpcy4kdHJhbnNjbHVkZS5pc1Nsb3RGaWxsZWQoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICB0cmFuc2NsdWRlQWN0aW9ucyA9IHRoaXMuJHRyYW5zY2x1ZGUuaXNTbG90RmlsbGVkKCdhY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNjbHVkZUNvbnRlbnQgPSAhKHRyYW5zY2x1ZGVUaXRsZSB8fCB0cmFuc2NsdWRlQWN0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2UudG9nZ2xlTmF2KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyXHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2NsdWRlQ29udGVudDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0ge1xyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZTogJ15sYXlvdXRQYWdlJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHtcclxuICAgICAgICAgICAgJ3RpdGxlJzogJz9wYWdlSGVhZGVyVGl0bGUnLFxyXG4gICAgICAgICAgICAnYWN0aW9ucyc6ICc/cGFnZUhlYWRlckFjdGlvbnMnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIgZXh0ZW5kcyBJUGFnZU92ZXJsYXkge1xyXG4gICAgICAgIGlzVmlzaWJsZTtcclxuICAgICAgICB3aXRoT3ZlcmxheTtcclxuICAgICAgICBjbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnJHRpbWVvdXQnLCAnJGVsZW1lbnQnLCAnJHRyYW5zY2x1ZGUnLCAnJGF0dHJzJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbmd1bGFyLklTY29wZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdHJhbnNjbHVkZTogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBwcml2YXRlICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dFBhZ2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxheW91dFBhZ2VFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCcubGF5b3V0LXBhZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxheW91dFBhZ2VFbGVtZW50Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJsYXlvdXQtcGFnZSBub3QgZm91bmRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFBhZ2UgPSBsYXlvdXRQYWdlRWxlbWVudC5jb250cm9sbGVyKCdsYXlvdXRQYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0UGFnZUVsZW1lbnQuYXBwZW5kKHRoaXMuJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMud2l0aE92ZXJsYXkgPSB0aGlzLiRhdHRycy5zaG93T3ZlcmxheSAhPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc091dHNpZGVPZlBhZ2UgPSAhdGhpcy5wYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0c2lkZU9mUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuYmluZCRQYWdlJENyZWF0ZSA9IHRoaXMuJHJvb3RTY29wZS4kb24oXCIkcGFnZS4kY3JlYXRlXCIsIHRoaXMub25QYWdlQ3JlYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSREZXN0cm95ID0gdGhpcy4kcm9vdFNjb3BlLiRvbihcIiRwYWdlLiRkZXN0cm95XCIsIHRoaXMub25QYWdlRGVzdHJveSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lQYWdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmJpbmQkUGFnZSRDcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5iaW5kJFBhZ2UkRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNjb3BlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZGVzdHJveVBhZ2UgPSAoKSA9PiB7IH07XHJcbiAgICAgICAgJG9uRGVzdHJveSgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveVBhZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25QYWdlQ3JlYXRlID0gKGU6IGFuZ3VsYXIuSUFuZ3VsYXJFdmVudCwgJHBhZ2VFbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIF8kcGFnZTogTGF5b3V0UGFnZU1vZHVsZS5JUGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3V0c2lkZU9mUGFnZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25QYWdlRGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3V0c2lkZU9mUGFnZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dPdmVybGF5KCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMud2l0aE92ZXJsYXkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRsYXlvdXRQYWdlLnNob3dPdmVybGF5KHRoaXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGlkZU92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy53aXRoT3ZlcmxheSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2UuaGlkZU92ZXJsYXkodGhpcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbWl0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGV2ZW50TmFtZSwgdGhpcy4kZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaXhCcm93c2VyUmVmbG93QmF0Y2hpbmdJc3N1ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5jc3MoXCJvcGFjaXR5XCIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVzdHJveVNjb3BlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2xpZGVyU2NvcGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlclNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNjbHVkZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2NvcGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRyYW5zY2x1ZGUoKGNsb25lLCBzY29wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlICR0aW1lciA9IG51bGw7XHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jZWxUaW1lcigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiR0aW1lcilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKHRoaXMuJHRpbWVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dFbGVtZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFRpbWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhZ2UuZW5zdXJlT25Ub3AodGhpcy4kZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZml4QnJvd3NlclJlZmxvd0JhdGNoaW5nSXNzdWUoKTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5lbXB0eSgpLmFkZENsYXNzKFwiaXMtdmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2NsdWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoaWRlRWxlbWVudCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxUaW1lcigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRlbGVtZW50LmlzKFwiLmlzLXZpc2libGVcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTY29wZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1oaWRpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJpcy12aXNpYmxlIGlzLWhpZGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZXRhY2goKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbXB0eSgpO1xyXG4gICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGlkZU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2UuaGlkZU5hdigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvdygpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRwYWdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoJyRwYWdlU2xpZGVyLiRzaG93Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGlkZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoJyRwYWdlU2xpZGVyLiRoaWRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVOYXZpZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfc2xpZGVJZjtcclxuXHJcbiAgICAgICAgZ2V0IHNsaWRlSWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHNsaWRlSWYodmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2xpZGVJZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCAkbGF5b3V0UGFnZSgpOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXRQYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0ICRwYWdlKCk6IElQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRsYXlvdXRQYWdlLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNJbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcbiAgICAgICAgc2xpZGVyU2NvcGU6IGFuZ3VsYXIuSVNjb3BlID0gbnVsbDtcclxuICAgICAgICBpc091dHNpZGVPZlBhZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlcjtcclxuICAgICAgICBwYWdlOiBJUGFnZUNvbnRyb2xsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IHtcclxuICAgICAgICAgICAgbGF5b3V0UGFnZTogJz9ebGF5b3V0UGFnZScsXHJcbiAgICAgICAgICAgIHBhZ2U6ICc/XnBhZ2UnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXJDYW5jZWwnLCBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lRm9vdGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwicGFuZS1mb290ZXItY29udGVudFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JztcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudChcIi5wYW5lXCIpLmFkZENsYXNzKFwicGFuZS0td2l0aEZvb3RlclwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICAgICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIG9uQ2xvc2U6IGFueTtcclxuXHJcbiAgICAgICAgb25Jbml0KHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlciwgc2hvd0Nsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlciA9IHBhZ2VTbGlkZXI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Nsb3NlID0gc2hvd0Nsb3NlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZVNsaWRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3VidGl0bGUgIT0gbnVsbCAmJiB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXRXaXRoU3VidGl0bGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0V2l0aFN1YnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhbmVIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFuZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwidGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3RybDogUGFuZUhlYWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgICAgICBjdHJsLnNldFdpdGhTdWJ0aXRsZSA9IChoYXNTdWJ0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhbmUtaGVhZGVyLS13aXRoU3VidGl0bGUnLCBoYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3RybC5vbkluaXQocGFnZVNsaWRlciwgJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGljb246IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGljb246IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ150YWJzJywgJ3RhYiddO1xyXG4gICAgICAgIC8vIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRlbXBsYXRlVXJsID0gJ3RhYi90YWIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbmFtZTogJ0AnLFxyXG4gICAgICAgICAgICBpY29uOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJHRhYnM6IElUYWJzQ29udHJvbGxlciA9ICRjdHJsc1swXTtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBJVGFiQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgICR0YWJzLmFkZFRhYigkY3RybCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnQpLnJlbW92ZUF0dHIoJ3RpdGxlJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYicsIFRhYkRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKTtcclxuICAgICAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKTtcclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKTtcclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCk7XHJcbiAgICAgICAgc2VsZWN0UHJldmlvdXNUYWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWRUYWI6IElUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIHRhYnM6IElUYWJDb250cm9sbGVyW107XHJcblxyXG4gICAgICAgIG9uSW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhYiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUodGhpcy5fYWN0aXZlVGFiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xyXG4gICAgICAgIGdldCBhY3RpdmVUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhY3RpdmVUYWIobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnRhYnMubGVuZ3RoICogMTAwfSVgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHRhYlBvc2l0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGAke2lkeCAqIC0xMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IHRoaXMudGFicy5maWx0ZXIoeCA9PiB4Lm5hbWUgPT0gbmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIoZm91bmRbMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMCAmJiB0aGlzLnRhYnMubGVuZ3RoID4gaWR4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4ICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4IC0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YWJMaW5rOiBJVGFic0NvbnRyb2xsZXJcclxuICAgICAgICB0YWJEZWZhdWx0OiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0RpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAndGFicy90YWJzLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJzQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJMaW5rOiAnPScsXHJcbiAgICAgICAgICAgIGFjdGl2ZVRhYjogJz0nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkYXR0cnMudGFiTGluaylcclxuICAgICAgICAgICAgICAgICRjdHJsLnRhYkxpbmsgPSAkY3RybDtcclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYnMnLCBUYWJzRGlyZWN0aXZlKTtcclxufSJdfQ==
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
        DoughnutDirective.prototype.getElementStyle = function ($element, className, style) {
            //var $body = angular.element("body");
            var $temp = angular.element("<div class=\"" + className + "\"></div>");
            $temp.insertAfter($element);
            //$body.append($temp);
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
        function PageController() {
            this.controls = [];
        }
        PageController.prototype.onInit = function ($element) {
            this.$element = $element;
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
        return PageController;
    }());
    var PageDirective = /** @class */ (function () {
        function PageDirective($rootScope) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.restrict = 'C';
            this.controller = PageController;
            this.link = function ($scope, $element, $attrs, $ctrl) {
                $ctrl.controls.forEach(function (x) {
                    $element.append(x);
                });
                $ctrl.controls = [];
                $ctrl.onInit($element);
                _this.$rootScope.$emit('$page.$create', $element, $ctrl);
                $scope.$on("$destroy", function () {
                    _this.$rootScope.$emit('$page.$destroy', $element, $ctrl);
                });
            };
        }
        PageDirective.$inject = ['$rootScope'];
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
        function PageSliderController() {
        }
        PageSliderController.prototype.$postLink = function () {
            if (this.isVisible)
                this.show();
            this.isInitialized = true;
        };
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
        return PageSliderController;
    }());
    var PageSliderDirective = /** @class */ (function () {
        function PageSliderDirective($rootScope, $timeout) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.restrict = 'E';
            this.require = ['pageSlider', '^layoutPage', '?^page'];
            this.transclude = true;
            this.controller = PageSliderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                slideIf: '=',
                onClose: '&'
            };
            this.link = function ($scope, $element, $attrs, $ctrls, $transclude) {
                var $page = $ctrls[2], sliderScope = null;
                var $ctrl = $ctrls[0], $layoutPage = $ctrls[1], withOverlay = $attrs.showOverlay != null, isOutsideOfPage = !$page;
                var onPageCreate = function (e, $pageElement, _$page) {
                    $page = _$page;
                    if (!isOutsideOfPage)
                        return;
                    if ($ctrl.isVisible)
                        $ctrl.show();
                };
                var onPageDestroy = function () {
                    if (!isOutsideOfPage)
                        return;
                    $ctrl.close();
                    $element.detach();
                };
                var showOverlay = function () {
                    if (!$ctrl.withOverlay)
                        return;
                    $layoutPage.showOverlay($ctrl);
                };
                var hideOverlay = function () {
                    if (!$ctrl.withOverlay)
                        return;
                    $layoutPage.hideOverlay($ctrl);
                };
                var emitEvent = function (eventName) {
                    _this.$rootScope.$emit(eventName, $element);
                };
                var fixBrowserReflowBatchingIssue = function () {
                    $element.css("opacity");
                };
                var destroyScope = function () {
                    if (!sliderScope)
                        return;
                    sliderScope.$destroy();
                    sliderScope = null;
                };
                var transclude = function () {
                    destroyScope();
                    $transclude(function (clone, scope) {
                        $element.append(clone);
                        sliderScope = scope;
                    });
                };
                var $timer = null;
                var cancelTimer = function () {
                    if (!$timer)
                        return;
                    _this.$timeout.cancel($timer);
                };
                var showElement = function () {
                    cancelTimer();
                    $page.ensureOnTop($element);
                    fixBrowserReflowBatchingIssue();
                    $element.empty().addClass("is-visible");
                    transclude();
                };
                var hideElement = function () {
                    cancelTimer();
                    if (!$element.is(".is-visible"))
                        return;
                    destroyScope();
                    $element.addClass('is-hiding');
                    $timer = _this.$timeout(function () {
                        $element.removeClass("is-visible is-hiding")
                            .detach()
                            .empty();
                    }, 250);
                };
                var hideNavigation = function () {
                    $layoutPage.hideNav();
                };
                var show = function () {
                    if (!$page)
                        return;
                    emitEvent('$pageSlider.$show');
                    showElement();
                    showOverlay();
                };
                var hide = function () {
                    emitEvent('$pageSlider.$hide');
                    hideElement();
                    hideOverlay();
                    hideNavigation();
                };
                var initProperties = function () {
                    $ctrl.show = show;
                    $ctrl.hide = hide;
                    $ctrl.withOverlay = withOverlay;
                };
                var initPage = function () {
                    if (isOutsideOfPage) {
                        var unbind$Page$Create_1 = _this.$rootScope.$on("$page.$create", onPageCreate);
                        var unbind$Page$Destroy_1 = _this.$rootScope.$on("$page.$destroy", onPageDestroy);
                        var unbind$Page = function () {
                            unbind$Page$Create_1();
                            unbind$Page$Destroy_1();
                        };
                        return unbind$Page;
                    }
                    else {
                        var noop = function () { };
                        return noop;
                    }
                };
                var initSlider = function () {
                    initProperties();
                    var destroyPage = initPage();
                    $element.detach();
                    destroyScope();
                    return destroyPage;
                };
                var destroySlider = initSlider();
                $scope.$on("$destroy", function () {
                    $element.remove();
                    destroySlider();
                });
            };
        }
        PageSliderDirective.$inject = ['$rootScope', '$timeout'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24udHMiLCIuLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIi4uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsIi4uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsIi4uL3NyYy90YWIvdGFiLnRzIiwiLi4vc3JjL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0FuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0I7SUFFbkI7UUFDSTtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEVB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QixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBSUwscUJBQUM7SUFBRCxDQUFDLEFBbEVELElBa0VDO0lBRUQ7UUFBQTtZQUNJLGFBQVEsR0FBRyxHQUFHLENBQUM7WUFDZixlQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7WUFDL0IsZUFBVSxHQUFHLGNBQWMsQ0FBQztZQUM1QixpQkFBWSxHQUFHLElBQUksQ0FBQztZQUNwQixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsVUFBSyxHQUFHO2dCQUNKLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFNBQVMsRUFBRSxHQUFHO2FBQ2pCLENBQUM7WUFFRixTQUFJLEdBQUcsVUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLO2dCQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNmLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FBQyxBQWpCRCxJQWlCQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNwRSxDQUFDLEVBbEdNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFrR3RCIiwic291cmNlc0NvbnRlbnQiOlsiQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIiwgW10pOyIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhclN0ZXBzID0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wZXJjZW50fSVgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0Z1bGwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWluOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWluO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1pbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyTWF4OiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWF4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhck1heCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYmFyVmFsdWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhclZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJTdGVwczogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyU3RlcHModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICAgICAgcGVyY2VudDogbnVtYmVyO1xyXG4gICAgICAgIGluaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgeCA9IE51bWJlcih0aGlzLmJhclZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICAgICAgeCA9IG1pbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh4ID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqICh4IC0gbWluKSAvIGRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IE51bWJlcih0aGlzLmJhclN0ZXBzID09IG51bGwgPyAxMCA6IHRoaXMuYmFyU3RlcHMpO1xyXG4gICAgICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlja3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSBtaW47IGluZGV4IDw9IG1heDsgaW5kZXggKz0gc3RlcHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwKSArIFwiS1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMCkgKyBcIk1cIjtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OTk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aWNrcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmFyR3JhcGhDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGJhck1pbjogJ0AnLFxyXG4gICAgICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICAgICAgYmFyVmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgYmFyU3RlcHM6ICdAPydcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmFyR3JhcGgnLCBCYXJHcmFwaERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISh0aGlzLnN1YnRpdGxlID09IG51bGwgfHwgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQmxhbmtzbGF0ZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgaWNvbjogJ0AnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JsYW5rc2xhdGUnLCBCbGFua3NsYXRlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYm9keS1oZWFkZXIvYm9keS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJvZHlIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIERvdWdobnV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRIb2xlID0gY29udGV4dEhvbGU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEZpbGwgPSBjb250ZXh0RmlsbDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCAwLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnRleHRIb2xlOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgICAgICBjb250ZXh0Qmc6IGFueTtcclxuXHJcbiAgICAgICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgICAgIHBlcmNlbnRPZmZzZXQgPSAtMjU7XHJcbiAgICAgICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgYW5pbWF0ZTogKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgICAgIF92YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCBvbGRWYWwsIG5ld1ZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW50ZXJ2YWwpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdkb3VnaG51dC9kb3VnaG51dC5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gRG91Z2hudXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdAJyxcclxuICAgICAgICAgICAgZW1wdHlDb2xvckNsYXNzOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRleHRIb2xlID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1ob2xlXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0RmlsbCA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEJnID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1iZ1wiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgKCRjdHJsLCBmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZGlkIGJhY2tncm91bmQgY29sb3IgY2hhbmdlP1xyXG4gICAgICAgICAgICAgICAgaWYgKGJnY29sb3IgIT0gJGN0cmwuaG9sZUNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCkgKyAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3YXRjaFNpemUoJGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gc2l6ZSAhPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyhmcm9tICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcbiAgICAgICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgdGhlIHdlZGdlXHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cywgdGhpcy5jb252ZXJ0VG9SYWRpYW5zKCRjdHJsLnBlcmNlbnRPZmZzZXQpLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMgKiAoJGN0cmwuaW5uZXJSYWRpdXMgLyAxMDApLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNYID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRZKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY1k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSYWRpdXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoJGVsZW1lbnQsIGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAgICAgLy92YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgICAgICB2YXIgJHRlbXAgPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgJHRlbXAuaW5zZXJ0QWZ0ZXIoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvLyRib2R5LmFwcGVuZCgkdGVtcCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICR0ZW1wLmNzcyhzdHlsZSk7XHJcbiAgICAgICAgICAgICR0ZW1wLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5lbXB0eUNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1lbXB0eS1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRCZywgY1gsIGNZLCByYWRpdXMsIDAsIDEwMCwgZW1wdHlDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0SG9sZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEhvbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5ob2xlQ29sb3IgPSB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdEb251dCgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUsIGNYLCBjWSwgcmFkaXVzLCAkY3RybC5ob2xlQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0QmdDb2xvcigkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBiZ2NvbG9yID0gJGN0cmwuJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgICAgaWYgKGJnY29sb3IgPT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIgfHwgYmdjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpXHJcbiAgICAgICAgICAgICAgICBiZ2NvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gYmdjb2xvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWxsQ29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC4kZWxlbWVudCwgJGN0cmwuY29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWZpbGwtY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgbkZyb20gPSBOdW1iZXIoZnJvbSk7XHJcbiAgICAgICAgICAgIHZhciBuVG8gPSBOdW1iZXIodG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVVwKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVVcCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIHRvLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLS07XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWwocHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlT3ZlcmxheSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUxheW91dFBhZ2VDb250cm9sbGVyIGV4dGVuZHMgSVBhZ2VPdmVybGF5IHtcclxuICAgICAgICBzaG93TmF2KCk7XHJcbiAgICAgICAgaGlkZU5hdigpO1xyXG4gICAgICAgIHRvZ2dsZU5hdigpO1xyXG4gICAgICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICAgICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBMYXlvdXRQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElMYXlvdXRQYWdlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRlbGVtZW50JywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93TmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5hdlZpcyh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpZGVOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmF2VmlzKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZU5hdigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROYXZWaXMoIXRoaXMuaXNOYXZWaXNpYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlzLnB1c2gob3ZlcmxheSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lcilcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlSGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKFwibGF5b3V0LXBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZvcmNlSGlkZSgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcImxheW91dC1wYWdlLS1vdmVybGF5IGxheW91dC1wYWdlLS1oaWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA8IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlzLnNwbGljZShpZHgsIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2xheW91dC1wYWdlLS1oaWRpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JjZUhpZGUoKTtcclxuICAgICAgICAgICAgfSwgdGhpcy50cmFuc2l0aW9uVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldE5hdlZpcyhpc1Zpc2libGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5pc05hdlZpc2libGUgPSBpc1Zpc2libGU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi0tc2hvdycsIGlzVmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGlzTmF2VmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheXM6IElQYWdlT3ZlcmxheVtdID0gW107XHJcbiAgICAgICAgcHJpdmF0ZSB0aW1lcjtcclxuICAgICAgICBwcml2YXRlIHRyYW5zaXRpb25UaW1lID0gMjUwO1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ2xheW91dFBhZ2VDb250cm9sbGVyJywgTGF5b3V0UGFnZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIExheW91dFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0VBQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IExheW91dFBhZ2VDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdsYXlvdXRQYWdlJywgTGF5b3V0UGFnZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nLCAnJHdpbmRvdyddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSAkbG9jYXRpb246IGFuZ3VsYXIuSUxvY2F0aW9uU2VydmljZSwgcHJpdmF0ZSAkd2luZG93OiBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmljb25DbGFzcyAhPSBudWxsICYmIHRoaXMuaWNvbkNsYXNzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcy4kbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKHggPT4gcGF0aC5pbmRleE9mKHgpID09PSAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ25hdkdyb3VwSXRlbScsICdebGF5b3V0UGFnZSddO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlciA9IGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgLy8gVG9EbzogdGhpcyBpcyBwcm9iYWJseSBkb25lIGluY29ycmVjdGx5IGFuZCBzaG91bGQgYmUgY29udHJvbGxlZCBieSB0aGUgbmF2LWdyb3VwIGluc3RlYWRcclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCAkY3RybC5pc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlLmhpZGVOYXYoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCAkY3RybC5pc1NlbGVjdGVkKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2R3JvdXBJdGVtJywgTmF2R3JvdXBJdGVtRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHRcclxuXHRBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZIZWFkZXJDb250cm9sbGVyJywgTmF2SGVhZGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiAnQCcsXHJcbiAgICAgICAgICAgIHNtYWxsOiAnQCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZIZWFkZXInLCBOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRDb250cm9sKCRlbGVtZW50OiBhbnkpO1xyXG4gICAgICAgIGVuc3VyZU9uVG9wKCRlbGVtZW50OiBhbnkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkQ29udHJvbCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2goJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnN1cmVPblRvcCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRyb2xzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQyc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRyb2xzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkY3RybC5jb250cm9scyA9IFtdO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kY3JlYXRlJywgJGVsZW1lbnQsICRjdHJsKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGRlc3Ryb3knLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlJywgUGFnZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRsb2NhdGlvbiddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRsb2NhdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCwgaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5pc0RlZmF1bHQgPSBpc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuICAgICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgICAgICBwYXJhbTogc3RyaW5nO1xyXG4gICAgICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYXJlYTogc3RyaW5nO1xyXG4gICAgICAgIGdldCBhcmVhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmVhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFyZWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMub25BcmVhQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaXNBY3RpdmUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVhID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlZmF1bHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgudG9Mb3dlckNhc2UoKSA9PSB0aGlzLl9hcmVhLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IHRoaXMucGF0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUm91dGVDaGFuZ2UoJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSAkcm91dGVQYXJhbXNbdGhpcy5wYXJhbSB8fCAnYXJlYSddO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25BcmVhQ2hhbmdlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJhbSB8fCAnYXJlYSc7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSB0aGlzLl9hcmVhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gobmFtZSwgdGhpcy5fYXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlID0gKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7IH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgcGFyYW06ICdAJyxcclxuICAgICAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgICAgICBhcmVhOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsICRhdHRyLmRlZmF1bHQgIT0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVVcGRhdGUnLCBmdW5jdGlvbiAoZXZ0LCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5vblJvdXRlQ2hhbmdlKGN1cnJlbnQucGFyYW1zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICRjdHJsLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYWdlLWNvbnRlbnQtbmF2LWl0ZW0tLWFjdGl2ZScsICRjdHJsLmlzQWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlQ29udGVudE5hdkl0ZW0nLCBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VEcm9wRG93bkNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG9uSW5pdCgpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dJZjogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlRHJvcERvd25EaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhZ2UtZHJvcGRvd24vcGFnZS1kcm9wZG93bi5odG1sJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZURyb3BEb3duQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBzaG93SWY6ICc9J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlRHJvcGRvd24nLCBQYWdlRHJvcERvd25EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgICAgICBvbkluaXQoJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlciwgdHJhbnNjbHVkZUNvbnRlbnQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy4kbGF5b3V0UGFnZSA9ICRsYXlvdXRQYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zY2x1ZGVDb250ZW50ID0gdHJhbnNjbHVkZUNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxheW91dFBhZ2UudG9nZ2xlTmF2KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyXHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2NsdWRlQ29udGVudDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gWydwYWdlSGVhZGVyJywgJ15sYXlvdXRQYWdlJ107XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHtcclxuICAgICAgICAgICAgJ3RpdGxlJzogJz9wYWdlSGVhZGVyVGl0bGUnLFxyXG4gICAgICAgICAgICAnYWN0aW9ucyc6ICc/cGFnZUhlYWRlckFjdGlvbnMnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdwYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRycywgJGN0cmxzOiBhbnlbXSwgJHRyYW5zY2x1ZGU6IGFuZ3VsYXIuSVRyYW5zY2x1ZGVGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkY3RybDogUGFnZUhlYWRlckNvbnRyb2xsZXIgPSAkY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyID0gJGN0cmxzWzFdLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNjbHVkZVRpdGxlID0gJHRyYW5zY2x1ZGUuaXNTbG90RmlsbGVkKCd0aXRsZScpLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNjbHVkZUFjdGlvbnMgPSAkdHJhbnNjbHVkZS5pc1Nsb3RGaWxsZWQoJ2FjdGlvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zY2x1ZGVDb250ZW50ID0gISh0cmFuc2NsdWRlVGl0bGUgfHwgdHJhbnNjbHVkZUFjdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KCRsYXlvdXRQYWdlLCB0cmFuc2NsdWRlQ29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIGV4dGVuZHMgSVBhZ2VPdmVybGF5IHtcclxuICAgICAgICBpc1Zpc2libGU7XHJcbiAgICAgICAgd2l0aE92ZXJsYXk7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgJHBvc3RMaW5rKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3NsaWRlSWY7XHJcblxyXG4gICAgICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlDaGFuZ2VkID0gdmFsdWUgIT09IHRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlSWYgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NsaWRlSWYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuX3NsaWRlSWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUlmID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0luaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgc2hvdzogKCkgPT4gdm9pZDtcclxuICAgICAgICBoaWRlOiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICAgICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlLCBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3BhZ2VTbGlkZXInLCAnXmxheW91dFBhZ2UnLCAnP15wYWdlJ107XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRycywgJGN0cmxzOiBhbnlbXSwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICAgICAgbGV0ICRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlciA9ICRjdHJsc1syXSxcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklMYXlvdXRQYWdlQ29udHJvbGxlciA9ICRjdHJsc1sxXSxcclxuICAgICAgICAgICAgICAgIHdpdGhPdmVybGF5ID0gJGF0dHJzLnNob3dPdmVybGF5ICE9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpc091dHNpZGVPZlBhZ2UgPSAhJHBhZ2U7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblBhZ2VDcmVhdGUgPSAoZTogYW5ndWxhci5JQW5ndWxhckV2ZW50LCAkcGFnZUVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgXyRwYWdlOiBMYXlvdXRQYWdlTW9kdWxlLklQYWdlQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHBhZ2UgPSBfJHBhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc091dHNpZGVPZlBhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2hvdygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25QYWdlRGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNPdXRzaWRlT2ZQYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaG93T3ZlcmxheSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwud2l0aE92ZXJsYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlLnNob3dPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVPdmVybGF5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3RybC53aXRoT3ZlcmxheSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2UuaGlkZU92ZXJsYXkoJGN0cmwpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1pdEV2ZW50ID0gKGV2ZW50TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoZXZlbnROYW1lLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmaXhCcm93c2VyUmVmbG93QmF0Y2hpbmdJc3N1ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNzcyhcIm9wYWNpdHlcIik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZXN0cm95U2NvcGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNsaWRlclNjb3BlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjbHVkZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3lTY29wZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkdGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxUaW1lciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJHRpbWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbCgkdGltZXIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2hvd0VsZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgJHBhZ2UuZW5zdXJlT25Ub3AoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgZml4QnJvd3NlclJlZmxvd0JhdGNoaW5nSXNzdWUoKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KCkuYWRkQ2xhc3MoXCJpcy12aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNjbHVkZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaGlkZUVsZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUaW1lcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJGVsZW1lbnQuaXMoXCIuaXMtdmlzaWJsZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgZGVzdHJveVNjb3BlKCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnaXMtaGlkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAkdGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcyhcImlzLXZpc2libGUgaXMtaGlkaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXRhY2goKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoaWRlTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlLmhpZGVOYXYoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRwYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBlbWl0RXZlbnQoJyRwYWdlU2xpZGVyLiRzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93RWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd092ZXJsYXkoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbWl0RXZlbnQoJyRwYWdlU2xpZGVyLiRoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgaGlkZU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgIGhpZGVOYXZpZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbml0UHJvcGVydGllcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNob3cgPSBzaG93O1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaGlkZSA9IGhpZGU7XHJcbiAgICAgICAgICAgICAgICAkY3RybC53aXRoT3ZlcmxheSA9IHdpdGhPdmVybGF5O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW5pdFBhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPdXRzaWRlT2ZQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5iaW5kJFBhZ2UkQ3JlYXRlID0gdGhpcy4kcm9vdFNjb3BlLiRvbihcIiRwYWdlLiRjcmVhdGVcIiwgb25QYWdlQ3JlYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSREZXN0cm95ID0gdGhpcy4kcm9vdFNjb3BlLiRvbihcIiRwYWdlLiRkZXN0cm95XCIsIG9uUGFnZURlc3Ryb3kpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5iaW5kJFBhZ2UkQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuYmluZCRQYWdlJERlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmJpbmQkUGFnZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vb3AgPSAoKSA9PiB7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRTbGlkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbml0UHJvcGVydGllcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdHJveVBhZ2UgPSBpbml0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95U2NvcGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZXN0cm95UGFnZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lTbGlkZXIgPSBpbml0U2xpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95U2xpZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyJywgUGFnZVNsaWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZVNsaWRlcic7XHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KHNsaWRlci5jbG9zZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICAgICAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgb25DbG9zZTogYW55O1xyXG5cclxuICAgICAgICBvbkluaXQocGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBzaG93Q2xvc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2UgPSBzaG93Q2xvc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlci5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc1N1YnRpdGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJ0aXRsZSAhPSBudWxsICYmIHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9zdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3VidGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFdpdGhTdWJ0aXRsZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRXaXRoU3VidGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICc/XnBhZ2VTbGlkZXInO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwuc2V0V2l0aFN1YnRpdGxlID0gKGhhc1N1YnRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFuZS1oZWFkZXItLXdpdGhTdWJ0aXRsZScsIGhhc1N1YnRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHJsLm9uSW5pdChwYWdlU2xpZGVyLCAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGwpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lSGVhZGVyJywgUGFuZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgaWNvbjogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYkRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnXnRhYnMnLCAndGFiJ107XHJcbiAgICAgICAgLy8gdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGVtcGxhdGVVcmwgPSAndGFiL3RhYi5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFiQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgIGljb246ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IElUYWJDb250cm9sbGVyID0gJGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAgICAgJHRhYnMuYWRkVGFiKCRjdHJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudCkucmVtb3ZlQXR0cigndGl0bGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFiJywgVGFiRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpO1xyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKTtcclxuICAgICAgICBzZWxlY3RQcmV2aW91c1RhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGFiczogSVRhYkNvbnRyb2xsZXJbXTtcclxuXHJcbiAgICAgICAgb25Jbml0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZSh0aGlzLl9hY3RpdmVUYWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFjdGl2ZVRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYi5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGFjdGl2ZVRhYihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYkxpbms6IElUYWJzQ29udHJvbGxlclxyXG4gICAgICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJzRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICd0YWJzL3RhYnMuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICAgICAgYWN0aXZlVGFiOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xyXG59Il19
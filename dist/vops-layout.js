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
        return DoughnutDirective;
    }());
    DoughnutDirective.$inject = ['$interval'];
    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var LayoutPageController = (function () {
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
        return LayoutPageController;
    }());
    LayoutPageController.$inject = ['$element', '$timeout'];
    Angular.module("ngLayoutPage").controller('layoutPageController', LayoutPageController);
    var LayoutPageDirective = (function () {
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
        return NavGroupItemController;
    }());
    NavGroupItemController.$inject = ['$attrs', '$location', '$window'];
    Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
    var NavGroupItemDirective = (function () {
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
        return NavGroupItemDirective;
    }());
    NavGroupItemDirective.$inject = ['$compile'];
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
    var PageController = (function () {
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
    var PageDirective = (function () {
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
        return PageDirective;
    }());
    PageDirective.$inject = ['$rootScope'];
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
        return PageContentNavItemController;
    }());
    PageContentNavItemController.$inject = ['$location'];
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
    var PageDropDownController = (function () {
        function PageDropDownController() {
        }
        PageDropDownController.prototype.$onInit = function () {
        };
        return PageDropDownController;
    }());
    PageDropDownController.$inject = [];
    var PageDropDownDirective = (function () {
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
    var PageHeaderController = (function () {
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
    var PageHeaderDirective = (function () {
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
    var PageSliderController = (function () {
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
    var PageSliderDirective = (function () {
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
        return PageSliderDirective;
    }());
    PageSliderDirective.$inject = ['$rootScope', '$timeout'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCIuLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiLi4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiLi4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiLi4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiLi4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiLi4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsIi4uL3NyYy9wYWdlL3BhZ2UudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWRyb3Bkb3duL3BhZ2UtZHJvcGRvd24udHMiLCIuLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIi4uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsIi4uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsIi4uL3NyYy90YWIvdGFiLnRzIiwiLi4vc3JjL3RhYnMvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0FuQyxJQUFPLGdCQUFnQixDQW1JdEI7QUFuSUQsV0FBTyxnQkFBZ0I7SUFFbkI7UUFDSTtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEVB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QUFDO1FBQ25DLENBQUM7UUFJTCxxQkFBQztJQUFELENBQUMsQUFsRUQsSUFrRUM7SUFFRDtRQUFBO1lBQ0ksYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNmLGVBQVUsR0FBRyxJQUFJLENBQUM7WUFDbEIsZ0JBQVcsR0FBRyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFVLEdBQUcsY0FBYyxDQUFDO1lBQzVCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLHFCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixVQUFLLEdBQUc7Z0JBQ0osT0FBTyxFQUFFLEdBQUc7Z0JBQ1osU0FBUyxFQUFFLEdBQUc7YUFDakIsQ0FBQztZQUVGLFNBQUksR0FBRyxVQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUs7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ2YsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQUFDLEFBakJELElBaUJDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsRUFsR00sZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWtHdEIiLCJzb3VyY2VzQ29udGVudCI6WyJBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoQ29udHJvbGxlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyU3RlcHMgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzdHlsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBlcmNlbnR9JWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzRnVsbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudCA9PSAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNaW46IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWluKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWluKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWluID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJNYXg6IG51bWJlcjtcclxuICAgICAgICBnZXQgYmFyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJNYXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyTWF4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFyTWF4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9iYXJWYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGdldCBiYXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFyVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYmFyVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9iYXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2JhclN0ZXBzOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IGJhclN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXJTdGVwcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBiYXJTdGVwcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhclN0ZXBzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpY2tzOiBudW1iZXJbXTtcclxuICAgICAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgICAgICAgaW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgc2V0UGVyY2VudCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gTnVtYmVyKHRoaXMuYmFyVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPCBtaW4pXHJcbiAgICAgICAgICAgICAgICB4ID0gbWluO1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPiBtYXgpXHJcbiAgICAgICAgICAgICAgICB4ID0gbWF4O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG5cclxuICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKHggLSBtaW4pIC8gZGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGlja3MoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgICAgICB2YXIgZGl2ID0gTnVtYmVyKHRoaXMuYmFyU3RlcHMgPT0gbnVsbCA/IDEwIDogdGhpcy5iYXJTdGVwcyk7XHJcbiAgICAgICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RlcHMgPSAobWF4IC0gbWluKSAvIGRpdjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWNrcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IG1pbjsgaW5kZXggPD0gbWF4OyBpbmRleCArPSBzdGVwcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OSlcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDApICsgXCJLXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwKSArIFwiTVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMDAwMCkgKyBcIkJcIjtcclxuICAgICAgICAgICAgICAgIHRpY2tzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJhckdyYXBoRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdiYXItZ3JhcGgvYmFyLWdyYXBoLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCYXJHcmFwaENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgYmFyTWluOiAnQCcsXHJcbiAgICAgICAgICAgIGJhck1heDogJ0AnLFxyXG4gICAgICAgICAgICBiYXJWYWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBiYXJTdGVwczogJ0A/J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdiYXJHcmFwaCcsIEJhckdyYXBoRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgICAgICBcclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHRoaXMuc3VidGl0bGUgPT0gbnVsbCB8fCB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQmxhbmtzbGF0ZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCbGFua3NsYXRlQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBpY29uOiAnQCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCb2R5SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdib2R5LWhlYWRlci9ib2R5LWhlYWRlci5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gQm9keUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgRG91Z2hudXRDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgYW5pbWF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEhvbGUgPSBjb250ZXh0SG9sZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0RmlsbCA9IGNvbnRleHRGaWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRCZyA9IGNvbnRleHRCZztcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIDAsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgY29udGV4dEhvbGU6IGFueTtcclxuICAgICAgICBjb250ZXh0RmlsbDogYW55O1xyXG4gICAgICAgIGNvbnRleHRCZzogYW55O1xyXG5cclxuICAgICAgICBhbmltYXRpb25Qcm9taXNlOiBhbnk7XHJcbiAgICAgICAgY29sb3I6IHN0cmluZztcclxuICAgICAgICBjb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgZW1wdHlDb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgaW5uZXJSYWRpdXMgPSA2NTsgLy8gNzUlXHJcbiAgICAgICAgYW5pbWF0ZVNwZWVkID0gMTA7XHJcbiAgICAgICAgcGVyY2VudE9mZnNldCA9IC0yNTtcclxuICAgICAgICBob2xlQ29sb3I6IHN0cmluZztcclxuICAgICAgICBhbmltYXRlOiAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSA9PiB7fTtcclxuXHJcbiAgICAgICAgX3ZhbHVlOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHZhbHVlKCk6IG51bWJlciB8IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHZhbHVlKG5ld1ZhbDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIG9sZFZhbCwgbmV3VmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRpbnRlcnZhbCddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbnRlcnZhbCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2RvdWdobnV0L2RvdWdobnV0Lmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBEb3VnaG51dENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICdAJyxcclxuICAgICAgICAgICAgY29sb3I6ICdAJyxcclxuICAgICAgICAgICAgY29sb3JDbGFzczogJ0AnLFxyXG4gICAgICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGV4dEhvbGUgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWhvbGVcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRGaWxsID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1maWxsXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0QmcgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWJnXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCAoJGN0cmwsIGZyb20sIHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy53YXRjaFNpemUoJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICAgICAgfSwgYmdjb2xvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBkaWQgYmFja2dyb3VuZCBjb2xvciBjaGFuZ2U/XHJcbiAgICAgICAgICAgICAgICBpZiAoYmdjb2xvciAhPSAkY3RybC5ob2xlQ29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKSArICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdhdGNoU2l6ZSgkY3RybCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBzaXplICE9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gdGVtcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb252ZXJ0VG9SYWRpYW5zKHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgcmFkaWFucyA9IHBlcmNlbnQgLyAxMDAgKiAzNjAgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgICAgICByZXR1cm4gcmFkaWFucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdXZWRnZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZyb21SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKGZyb20gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuICAgICAgICAgICAgdmFyIHRvUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyh0byArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyB0aGUgd2VkZ2VcclxuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzLCB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoJGN0cmwucGVyY2VudE9mZnNldCksIHRvUmFkaWFucywgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3RG9udXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvLyBjdXQgb3V0IGFuIGlubmVyLWNpcmNsZSA9PSBkb251dFxyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cyAqICgkY3RybC5pbm5lclJhZGl1cyAvIDEwMCksIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSAkY3RybC4kZWxlbWVudC53aWR0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsLCBjWCwgY1ksIHJhZGl1cywgZnJvbSwgdG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRYKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY1ggPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLndpZHRoIC8gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBjWDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFkoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBjWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFJhZGl1cyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gTWF0aC5taW4oeCwgeSk7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEVsZW1lbnRTdHlsZSgkZWxlbWVudCwgY2xhc3NOYW1lLCBzdHlsZSkge1xyXG4gICAgICAgICAgICAvL3ZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgICAgIHZhciAkdGVtcCA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAkdGVtcC5pbnNlcnRBZnRlcigkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vJGJvZHkuYXBwZW5kKCR0ZW1wKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJHRlbXAuY3NzKHN0eWxlKTtcclxuICAgICAgICAgICAgJHRlbXAucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0KGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEJnKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdEJnKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEJnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbXB0eUNvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuJGVsZW1lbnQsICRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRIb2xlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLmhvbGVDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRCZ0NvbG9yKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIiB8fCBiZ2NvbG9yID09IFwidHJhbnNwYXJlbnRcIilcclxuICAgICAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5jb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZmlsbC1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwuY29sb3IpXHJcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3IgPSAkY3RybC5jb2xvcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuRnJvbSA9IE51bWJlcihmcm9tKTtcclxuICAgICAgICAgICAgdmFyIG5UbyA9IE51bWJlcih0byk7XHJcblxyXG4gICAgICAgICAgICBpZiAobkZyb20gPCBuVG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlVXAoJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVEb3duKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVVwKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCBmcm9tLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKys7XHJcbiAgICAgICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlRG93bigkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCB0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgdG8sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUtLTtcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbmNlbChwcm9taXNlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2RvdWdobnV0JywgRG91Z2hudXREaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VPdmVybGF5IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgZXh0ZW5kcyBJUGFnZU92ZXJsYXkge1xyXG4gICAgICAgIHNob3dOYXYoKTtcclxuICAgICAgICBoaWRlTmF2KCk7XHJcbiAgICAgICAgdG9nZ2xlTmF2KCk7XHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgICAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIExheW91dFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSUxheW91dFBhZ2VDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3dOYXYoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmF2VmlzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGlkZU5hdigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROYXZWaXMoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlTmF2KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5hdlZpcyghdGhpcy5pc05hdlZpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChvdmVybGF5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VIaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoXCJsYXlvdXQtcGFnZS0tb3ZlcmxheVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZm9yY2VIaWRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwibGF5b3V0LXBhZ2UtLW92ZXJsYXkgbGF5b3V0LXBhZ2UtLWhpZGluZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4IDwgMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheXMuc3BsaWNlKGlkeCwgMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5cy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnbGF5b3V0LXBhZ2UtLWhpZGluZycpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlSGlkZSgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLnRyYW5zaXRpb25UaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0TmF2VmlzKGlzVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmlzTmF2VmlzaWJsZSA9IGlzVmlzaWJsZTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgaXNWaXNpYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaXNOYXZWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5czogSVBhZ2VPdmVybGF5W10gPSBbXTtcclxuICAgICAgICBwcml2YXRlIHRpbWVyO1xyXG4gICAgICAgIHByaXZhdGUgdHJhbnNpdGlvblRpbWUgPSAyNTA7XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbGF5b3V0UGFnZUNvbnRyb2xsZXInLCBMYXlvdXRQYWdlQ29udHJvbGxlcik7XHJcblxyXG4gICAgY2xhc3MgTGF5b3V0UGFnZURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRUFDJztcclxuICAgICAgICBjb250cm9sbGVyID0gTGF5b3V0UGFnZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2xheW91dFBhZ2UnLCBMYXlvdXRQYWdlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbicsICckd2luZG93J107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbjogYW5ndWxhci5JTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkdyb3VwSXRlbUNvbnRyb2xsZXInLCBOYXZHcm91cEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsnbmF2R3JvdXBJdGVtJywgJ15sYXlvdXRQYWdlJ107XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyID0gY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAvLyBUb0RvOiB0aGlzIGlzIHByb2JhYmx5IGRvbmUgaW5jb3JyZWN0bHkgYW5kIHNob3VsZCBiZSBjb250cm9sbGVkIGJ5IHRoZSBuYXYtZ3JvdXAgaW5zdGVhZFxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2UuaGlkZU5hdigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZHcm91cEl0ZW0nLCBOYXZHcm91cEl0ZW1EaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cdFxyXG5cdEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkhlYWRlckNvbnRyb2xsZXInLCBOYXZIZWFkZXJDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIGFkZENvbnRyb2woJGVsZW1lbnQ6IGFueSk7XHJcbiAgICAgICAgZW5zdXJlT25Ub3AoJGVsZW1lbnQ6IGFueSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDb250cm9sKCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVuc3VyZU9uVG9wKCRlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udHJvbHM6IGFueVtdID0gW107XHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdDJztcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogUGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGN0cmwuY29udHJvbHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRjdHJsLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlLiRjcmVhdGUnLCAkZWxlbWVudCwgJGN0cmwpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kZGVzdHJveScsICRlbGVtZW50LCAkY3RybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2UnLCBQYWdlRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBpc0RlZmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmlzRGVmYXVsdCA9IGlzRGVmYXVsdDtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0OiBib29sZWFuO1xyXG4gICAgICAgIHBhdGg6IHN0cmluZztcclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG4gICAgICAgIHBhcmFtOiBzdHJpbmc7XHJcbiAgICAgICAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9hcmVhOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFyZWEoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYXJlYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkFyZWFDaGFuZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0FjdGl2ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FyZWEgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVmYXVsdDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF0aC50b0xvd2VyQ2FzZSgpID09IHRoaXMuX2FyZWEudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5wYXRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Sb3V0ZUNoYW5nZSgkcm91dGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJlYSA9ICRyb3V0ZVBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ107XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkFyZWFDaGFuZ2UoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcmFtIHx8ICdhcmVhJztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IHRoaXMuX2FyZWE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gocGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChuYW1lLCB0aGlzLl9hcmVhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVBY3RpdmUgPSAoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHsgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgbXVsdGlFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBwYXJhbTogJ0AnLFxyXG4gICAgICAgICAgICBwYXRoOiAnQCcsXHJcbiAgICAgICAgICAgIGFyZWE6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudG9nZ2xlQWN0aXZlID0gdGhpcy50b2dnbGVBY3RpdmU7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgJGF0dHIuZGVmYXVsdCAhPSBudWxsKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRyb3V0ZVVwZGF0ZScsIGZ1bmN0aW9uIChldnQsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICRjdHJsLm9uUm91dGVDaGFuZ2UoY3VycmVudC5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0b2dnbGVBY3RpdmUoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgJGN0cmwuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhZ2UtY29udGVudC1uYXYtaXRlbS0tYWN0aXZlJywgJGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZURyb3BEb3duQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkb25Jbml0KCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0lmOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VEcm9wRG93bkRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFnZS1kcm9wZG93bi9wYWdlLWRyb3Bkb3duLmh0bWwnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlRHJvcERvd25Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dJZjogJz0nXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VEcm9wZG93bicsIFBhZ2VEcm9wRG93bkRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIG9uSW5pdCgkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyLCB0cmFuc2NsdWRlQ29udGVudDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLiRsYXlvdXRQYWdlID0gJGxheW91dFBhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNjbHVkZUNvbnRlbnQgPSB0cmFuc2NsdWRlQ29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZU5hdigpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGF5b3V0UGFnZS50b2dnbGVOYXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXJcclxuICAgICAgICBwcml2YXRlIHRyYW5zY2x1ZGVDb250ZW50OiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3BhZ2VIZWFkZXInLCAnXmxheW91dFBhZ2UnXTtcclxuICAgICAgICB0cmFuc2NsdWRlID0ge1xyXG4gICAgICAgICAgICAndGl0bGUnOiAnP3BhZ2VIZWFkZXJUaXRsZScsXHJcbiAgICAgICAgICAgICdhY3Rpb25zJzogJz9wYWdlSGVhZGVyQWN0aW9ucydcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzLCAkY3RybHM6IGFueVtdLCAkdHJhbnNjbHVkZTogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRjdHJsOiBQYWdlSGVhZGVyQ29udHJvbGxlciA9ICRjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgPSAkY3RybHNbMV0sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2NsdWRlVGl0bGUgPSAkdHJhbnNjbHVkZS5pc1Nsb3RGaWxsZWQoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICB0cmFuc2NsdWRlQWN0aW9ucyA9ICR0cmFuc2NsdWRlLmlzU2xvdEZpbGxlZCgnYWN0aW9ucycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjbHVkZUNvbnRlbnQgPSAhKHRyYW5zY2x1ZGVUaXRsZSB8fCB0cmFuc2NsdWRlQWN0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGxheW91dFBhZ2UsIHRyYW5zY2x1ZGVDb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIgZXh0ZW5kcyBJUGFnZU92ZXJsYXkge1xyXG4gICAgICAgIGlzVmlzaWJsZTtcclxuICAgICAgICB3aXRoT3ZlcmxheTtcclxuICAgICAgICBjbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgICAgICAkcG9zdExpbmsoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfc2xpZGVJZjtcclxuXHJcbiAgICAgICAgZ2V0IHNsaWRlSWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHNsaWRlSWYodmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2xpZGVJZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5fc2xpZGVJZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICAgICAgICBzaG93OiAoKSA9PiB2b2lkO1xyXG4gICAgICAgIGhpZGU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgd2l0aEZvb3RlcjogYm9vbGVhbjtcclxuICAgICAgICB3aXRoT3ZlcmxheTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckdGltZW91dCddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UsIHByaXZhdGUgJHRpbWVvdXQ6IGFuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsncGFnZVNsaWRlcicsICdebGF5b3V0UGFnZScsICc/XnBhZ2UnXTtcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzLCAkY3RybHM6IGFueVtdLCAkdHJhbnNjbHVkZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgJHBhZ2U6IExheW91dFBhZ2VNb2R1bGUuSVBhZ2VDb250cm9sbGVyID0gJGN0cmxzWzJdLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGN0cmw6IFBhZ2VTbGlkZXJDb250cm9sbGVyID0gJGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2U6IExheW91dFBhZ2VNb2R1bGUuSUxheW91dFBhZ2VDb250cm9sbGVyID0gJGN0cmxzWzFdLFxyXG4gICAgICAgICAgICAgICAgd2l0aE92ZXJsYXkgPSAkYXR0cnMuc2hvd092ZXJsYXkgIT0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGlzT3V0c2lkZU9mUGFnZSA9ICEkcGFnZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uUGFnZUNyZWF0ZSA9IChlOiBhbmd1bGFyLklBbmd1bGFyRXZlbnQsICRwYWdlRWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCBfJHBhZ2U6IExheW91dFBhZ2VNb2R1bGUuSVBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkcGFnZSA9IF8kcGFnZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzT3V0c2lkZU9mUGFnZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zaG93KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblBhZ2VEZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc091dHNpZGVPZlBhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5kZXRhY2goKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dPdmVybGF5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3RybC53aXRoT3ZlcmxheSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2Uuc2hvd092ZXJsYXkoJGN0cmwpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaGlkZU92ZXJsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdHJsLndpdGhPdmVybGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGF5b3V0UGFnZS5oaWRlT3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbWl0RXZlbnQgPSAoZXZlbnROYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChldmVudE5hbWUsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpeEJyb3dzZXJSZWZsb3dCYXRjaGluZ0lzc3VlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY3NzKFwib3BhY2l0eVwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lTY29wZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghc2xpZGVyU2NvcGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2NsdWRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVzdHJveVNjb3BlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoKGNsb25lLCBzY29wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBzY29wZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0ICR0aW1lciA9IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbFRpbWVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkdGltZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKCR0aW1lcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaG93RWxlbWVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAkcGFnZS5lbnN1cmVPblRvcCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBmaXhCcm93c2VyUmVmbG93QmF0Y2hpbmdJc3N1ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKS5hZGRDbGFzcyhcImlzLXZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2NsdWRlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoaWRlRWxlbWVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRpbWVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkZWxlbWVudC5pcyhcIi5pcy12aXNpYmxlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBkZXN0cm95U2NvcGUoKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdpcy1oaWRpbmcnKTtcclxuICAgICAgICAgICAgICAgICR0aW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKFwiaXMtdmlzaWJsZSBpcy1oaWRpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRldGFjaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZGVOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGxheW91dFBhZ2UuaGlkZU5hdigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2hvdyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJHBhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGVtaXRFdmVudCgnJHBhZ2VTbGlkZXIuJHNob3cnKTtcclxuICAgICAgICAgICAgICAgIHNob3dFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBzaG93T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaGlkZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVtaXRFdmVudCgnJHBhZ2VTbGlkZXIuJGhpZGUnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBoaWRlT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICAgICAgaGlkZU5hdmlnYXRpb24oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRQcm9wZXJ0aWVzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2hvdyA9IHNob3c7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5oaWRlID0gaGlkZTtcclxuICAgICAgICAgICAgICAgICRjdHJsLndpdGhPdmVybGF5ID0gd2l0aE92ZXJsYXk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbml0UGFnZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc091dHNpZGVPZlBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmJpbmQkUGFnZSRDcmVhdGUgPSB0aGlzLiRyb290U2NvcGUuJG9uKFwiJHBhZ2UuJGNyZWF0ZVwiLCBvblBhZ2VDcmVhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuYmluZCRQYWdlJERlc3Ryb3kgPSB0aGlzLiRyb290U2NvcGUuJG9uKFwiJHBhZ2UuJGRlc3Ryb3lcIiwgb25QYWdlRGVzdHJveSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuYmluZCRQYWdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmJpbmQkUGFnZSRDcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5iaW5kJFBhZ2UkRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuYmluZCRQYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9vcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaW5pdFNsaWRlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGluaXRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXN0cm95UGFnZSA9IGluaXRQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5kZXRhY2goKTtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3lTY29wZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc3Ryb3lQYWdlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVzdHJveVNsaWRlciA9IGluaXRTbGlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3lTbGlkZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVGb290ZXInLCBQYW5lRm9vdGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc2hvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgICAgIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBvbkNsb3NlOiBhbnk7XHJcblxyXG4gICAgICAgIG9uSW5pdChwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIsIHNob3dDbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTbGlkZXIgPSBwYWdlU2xpZGVyO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDbG9zZSA9IHNob3dDbG9zZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaGFzU3VidGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnRpdGxlICE9IG51bGwgJiYgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3N1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJ0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0V2l0aFN1YnRpdGxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFdpdGhTdWJ0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcInRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICAgICAgY3RybC5zZXRXaXRoU3VidGl0bGUgPSAoaGFzU3VidGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYW5lLWhlYWRlci0td2l0aFN1YnRpdGxlJywgaGFzU3VidGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0cmwub25Jbml0KHBhZ2VTbGlkZXIsICRhdHRycy5zaG93Q2xvc2UgIT0gbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBpY29uOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gWydedGFicycsICd0YWInXTtcclxuICAgICAgICAvLyB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0ZW1wbGF0ZVVybCA9ICd0YWIvdGFiLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdAJyxcclxuICAgICAgICAgICAgaWNvbjogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICR0YWJzOiBJVGFic0NvbnRyb2xsZXIgPSAkY3RybHNbMF07XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAkdGFicy5hZGRUYWIoJGN0cmwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50KS5yZW1vdmVBdHRyKCd0aXRsZScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZyk7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcik7XHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBJVGFiQ29udHJvbGxlcjtcclxuICAgICAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgICAgICBvbkluaXQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYWIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKHRoaXMuX2FjdGl2ZVRhYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcclxuICAgICAgICBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYWN0aXZlVGFiKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZShuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB3aWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy50YWJzLmxlbmd0aCAqIDEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0YWJQb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtpZHggKiAtMTAwfSVgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnRhYnMuZmlsdGVyKHggPT4geC5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKGZvdW5kWzBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDAgJiYgdGhpcy50YWJzLmxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFic1tpZHhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE5leHRUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0UHJldmlvdXNUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFiTGluazogSVRhYnNDb250cm9sbGVyXHJcbiAgICAgICAgdGFiRGVmYXVsdDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFRhYnNEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3RhYnMvdGFicy5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gVGFic0NvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGFiTGluazogJz0nLFxyXG4gICAgICAgICAgICBhY3RpdmVUYWI6ICc9J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJGF0dHJzLnRhYkxpbmspXHJcbiAgICAgICAgICAgICAgICAkY3RybC50YWJMaW5rID0gJGN0cmw7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWJzJywgVGFic0RpcmVjdGl2ZSk7XHJcbn0iXX0=
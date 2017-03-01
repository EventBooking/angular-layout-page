/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(18);
exports.default = Angular.module("ngLayoutPage", []).name;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bar_graph_html_1 = __webpack_require__(34);
__webpack_require__(19);
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
        this.template = bar_graph_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('barGraph', BarGraphDirective);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(0);
var blankslate_html_1 = __webpack_require__(35);
__webpack_require__(20);
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
        this.template = blankslate_html_1.default;
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
exports.default = Angular.module(app_1.default).directive('blankslate', BlankslateDirective);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var body_header_html_1 = __webpack_require__(36);
__webpack_require__(21);
var BodyHeaderController = (function () {
    function BodyHeaderController() {
    }
    return BodyHeaderController;
}());
var BodyHeaderDirective = (function () {
    function BodyHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = body_header_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var doughnut_html_1 = __webpack_require__(37);
__webpack_require__(22);
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
        this.template = doughnut_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(23);
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
Angular.module("ngLayoutPage").controller('layoutPageController', LayoutPageController);
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
exports.default = Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_group_item_html_1 = __webpack_require__(38);
__webpack_require__(24);
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
    return NavGroupItemController;
}());
NavGroupItemController.$inject = ['$attrs', '$location', '$window'];
Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
var NavGroupItemDirective = (function () {
    function NavGroupItemDirective($compile) {
        this.$compile = $compile;
        this.restrict = 'AEC';
        this.require = ['navGroupItem', '^layoutPage'];
        this.transclude = true;
        this.template = nav_group_item_html_1.default;
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
    return NavGroupItemDirective;
}());
NavGroupItemDirective.$inject = ['$compile'];
exports.default = Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_header_html_1 = __webpack_require__(39);
__webpack_require__(25);
var NavHeaderController = (function () {
    function NavHeaderController() {
    }
    return NavHeaderController;
}());
Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
var NavHeaderDirective = (function () {
    function NavHeaderDirective() {
        this.restrict = 'E';
        this.template = nav_header_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_menu_html_1 = __webpack_require__(40);
__webpack_require__(26);
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
    return NavMenuController;
}());
NavMenuController.$inject = ['$attrs'];
Angular.module("ngLayoutPage").controller('navController', NavMenuController);
var NavMenuDirective = (function () {
    function NavMenuDirective() {
        this.restrict = 'E';
        this.require = '^layoutPage';
        this.transclude = true;
        this.template = nav_menu_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(27);
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
exports.default = Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var page_header_html_1 = __webpack_require__(41);
__webpack_require__(28);
var PageHeaderController = (function () {
    function PageHeaderController() {
    }
    return PageHeaderController;
}());
var PageHeaderDirective = (function () {
    function PageHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = page_header_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Angular.module("ngLayoutPage").directive('pageSliderCancel', PageSliderCancelDirective);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(29);
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
    function PageSliderDirective($rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
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
                if (isVisible)
                    _this.$rootScope.$emit('$pageSlider.$show', $element);
                else
                    _this.$rootScope.$emit('$pageSlider.$hide', $element);
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
PageSliderDirective.$inject = ['$rootScope'];
exports.default = Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(30);
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
            _this.$rootScope.$emit('$page.$create', $element);
            $scope.$on("$destroy", function () {
                _this.$rootScope.$emit('$page.$destroy', $element);
            });
        };
    }
    return PageDirective;
}());
PageDirective.$inject = ['$rootScope'];
exports.default = Angular.module("ngLayoutPage").directive('page', PageDirective);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(31);
var PaneFooterDirective = (function () {
    function PaneFooterDirective() {
        this.restrict = 'E';
        this.link = function ($scope, $element) {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }
    return PaneFooterDirective;
}());
exports.default = Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pane_header_html_1 = __webpack_require__(42);
__webpack_require__(32);
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
        this.template = pane_header_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TabController = (function () {
    function TabController() {
    }
    return TabController;
}());
var TabDirective = (function () {
    function TabDirective() {
        this.restrict = 'E';
        this.require = ['^tabs', 'tab'];
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
exports.default = Angular.module("ngLayoutPage").directive('tab', TabDirective);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tabs_html_1 = __webpack_require__(43);
__webpack_require__(33);
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
        this.template = tabs_html_1.default;
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
exports.default = Angular.module("ngLayoutPage").directive('tabs', TabsDirective);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"bar-graph-bg\">\r\n    <div class=\"bar-graph-fill\" ng-class=\"{'bar-graph-fill--full': vm.isFull}\" ng-style=\"vm.style\" ng-transclude></div>\r\n</div>";

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i class=\"blankslate-icon {{vm.icon}}\"></i>\r\n<div class=\"blankslate-content\">\r\n    <div class=\"blankslate-content-title\">{{vm.title}}</div>\r\n    <div class=\"blankslate-content-subtitle\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>";

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"body-header-top\">\r\n    <div class=\"body-header-titles\">\r\n        <div class=\"body-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n        <div class=\"body-header-title\">{{vm.title}}</div>\r\n    </div>\r\n    <div class=\"body-header-actions\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>\r\n<!--<div class=\"body-header-bottom\">\r\n    <div class=\"body-header-subtitle\" ng-show=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n</div>-->";

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"doughnut-text\">\r\n    <div ng-transclude></div>\r\n</div>\r\n<canvas class=\"doughnut-hole\"></canvas>\r\n<canvas class=\"doughnut-fill\"></canvas>\r\n<canvas class=\"doughnut-bg\"></canvas>";

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i ng-if=\"vm.hasIcon\" class=\"nav-group-item-icon\" ng-class=\"vm.iconClass\"></i>\r\n<span class=\"nav-group-item-text\" ng-transclude></span>";

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<span class=\"nav-header-text\">{{vm.text}}</span>\r\n<span class=\"nav-header-small\">{{vm.small}}</span>";

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i ng-class=\"vm.iconClass\"></i>";

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"page-header-actions\" ng-transclude></div>\r\n<nav-menu class=\"page-header-navMenu\" icon=\"fa fa-navicon\"></nav-menu>\r\n<div class=\"page-header-titles\">\r\n    <div class=\"page-header-titles-item page-header-titles-item--title\">\r\n        <span class=\"page-header-title\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--subtitle\">\r\n        <span class=\"page-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--label\">\r\n        <span class=\"page-header-label\" ng-if=\"vm.label\">{{vm.label}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<a href=\"#\" class=\"pane-header-close\" ng-if=\"vm.showClose\" ng-click=\"vm.close()\">\r\n    <span class=\"pane-header-closeIcon fa fa-close\"></i>\r\n</a>\r\n<div class=\"pane-header-actions\" ng-transclude></div>\r\n<div class=\"pane-header-titles\">\r\n    <div class=\"pane-header-title\">\r\n        <span class=\"pane-header-titleText\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"pane-header-subtitle\">\r\n        <span class=\"pane-header-subtitleText\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"tab-titles\">\r\n    <div class=\"tab-titles-item\" \r\n        ng-class=\"{'tab-titles-item--selected': tab == vm.selectedTab }\"\r\n        ng-repeat=\"tab in vm.tabs\" \r\n        ng-click=\"vm.selectTab(tab)\">\r\n        <i class=\"tab-titles-item-icon {{tab.icon}}\" ng-if=\"tab.icon\"></i>\r\n        <div class=\"tab-titles-item-title\">{{tab.title}}</div>\r\n    </div>\r\n</div>\r\n<div class=\"tab-content\">\r\n    <div class=\"tab-content-window\" \r\n        ng-style=\"{'width': vm.width, 'left': vm.tabPosition}\"\r\n        ng-transclude>\r\n    </div>\r\n</div>";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(0);
exports.default = app_1.default;
__export(__webpack_require__(1));
__export(__webpack_require__(2));
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(7));
__export(__webpack_require__(8));
__export(__webpack_require__(13));
__export(__webpack_require__(9));
__export(__webpack_require__(10));
__export(__webpack_require__(12));
__export(__webpack_require__(11));
__export(__webpack_require__(14));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2E4NWNiMjcxYWEzMDVkOWJjMzU/MzhlZiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzPzAwODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHM/ZWQyYiIsIndlYnBhY2s6Ly8vLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzP2Q5NWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzPzczNWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzPzk1NzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzP2Y3ZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzP2QwMjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cz85NDE0Iiwid2VicGFjazovLy8uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cz9iOTAyIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLnRzP2Q4ODYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRzP2YxNDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2Utc2xpZGVyLWNhbmNlbC9wYWdlLXNsaWRlci1jYW5jZWwudHM/YTcxZiIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHM/ODM2NSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS9wYWdlLnRzPzU5ZGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzPzE0NWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzPzM3NTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYi90YWIudHM/YTgzMCIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLnRzPzYyYTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5sZXNzPzYyYjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgubGVzcz9kMDAwIiwid2VicGFjazovLy8uL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUubGVzcz8yNmYyIiwid2VicGFjazovLy8uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzPzQwYWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmxlc3M/YjE0YiIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UubGVzcz83MDcyIiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzPzAyMmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5sZXNzPzQ2NDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51Lmxlc3M/Njc2NSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzPzIwMGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmxlc3M/N2ZlMCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIubGVzcz9jMDI2Iiwid2VicGFjazovLy8uL3NyYy9wYWdlL3BhZ2UubGVzcz9hNzI3Iiwid2VicGFjazovLy8uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci5sZXNzPzY4YjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmxlc3M/ZTczYSIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLmxlc3M/YTMyZCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sPzkxZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sPzM2ODMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWw/YThjZSIsIndlYnBhY2s6Ly8vLi9zcmMvZG91Z2hudXQvZG91Z2hudXQuaHRtbD80MmQ4Iiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sPzYxYTciLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sP2E5NTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51Lmh0bWw/ZDc4OSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbD9iNmM3Iiwid2VicGFjazovLy8uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sPzU4NWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYnMvdGFicy5odG1sP2RhODUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzP2VhYzMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsd0JBQW9CO0FBRXBCLGtCQUFlLE9BQU8sQ0FBQyxNQUFN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QUM5RCxrQ0FBMEM7QUFDMUMsa0NBQTBDO0FBQzFDLGtDQUF3RDtBQUN4RCxrQ0FBMEM7QUFDMUMsa0NBQTBDO0FBQzFDLGtDQUEwQjtBQUMxQixrQ0FBNEIiLCJmaWxlIjoidm9wcy1sYXlvdXQuYnJvd3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYTg1Y2IyNzFhYTMwNWQ5YmMzNSIsImltcG9ydCBcIi4vYXBwLmxlc3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIsIFtdKS5uYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSBcIi4vYmFyLWdyYXBoLmh0bWxcIjtcclxuaW1wb3J0IFwiLi9iYXItZ3JhcGgubGVzc1wiO1xyXG5cclxuY2xhc3MgQmFyR3JhcGhDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYmFyU3RlcHMgPSAxMDtcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGVyY2VudH0lYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNGdWxsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Jhck1pbjogbnVtYmVyO1xyXG4gICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJNaW47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyTWluID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Jhck1heDogbnVtYmVyO1xyXG4gICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyTWF4ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JhclZhbHVlOiBudW1iZXI7XHJcbiAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JhclN0ZXBzOiBudW1iZXI7XHJcbiAgICBnZXQgYmFyU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhclN0ZXBzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgICBpbml0OiBib29sZWFuO1xyXG5cclxuICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgdmFyIHggPSBOdW1iZXIodGhpcy5iYXJWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICB4ID0gbWluO1xyXG5cclxuICAgICAgICBpZiAoeCA+IG1heClcclxuICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgdmFyIGRpdiA9IG1heCAtIG1pbjtcclxuICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKHggLSBtaW4pIC8gZGl2O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgIHZhciBkaXYgPSBOdW1iZXIodGhpcy5iYXJTdGVwcyA9PSBudWxsID8gMTAgOiB0aGlzLmJhclN0ZXBzKTtcclxuICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgIHZhciB0aWNrcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gbWluOyBpbmRleCA8PSBtYXg7IGluZGV4ICs9IHN0ZXBzKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OSlcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMCkgKyBcIktcIjtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwKSArIFwiTVwiO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgIHRpY2tzLnB1c2godmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCYXJHcmFwaENvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBiYXJNaW46ICdAJyxcclxuICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICBiYXJWYWx1ZTogJ0AnLFxyXG4gICAgICAgIGJhclN0ZXBzOiAnQD8nXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JhckdyYXBoJywgQmFyR3JhcGhEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLnRzIiwiaW1wb3J0IHZvcHNMYXlvdXQgZnJvbSBcIi4uL2FwcFwiO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSBcIi4vYmxhbmtzbGF0ZS5odG1sXCI7XHJcbmltcG9ydCBcIi4vYmxhbmtzbGF0ZS5sZXNzXCI7XHJcblxyXG5jbGFzcyBCbGFua3NsYXRlQ29udHJvbGxlciB7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLnN1YnRpdGxlID09IG51bGwgfHwgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID09IDApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJsYW5rc2xhdGVEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gQmxhbmtzbGF0ZUNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBpY29uOiAnQCcsXHJcbiAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZSh2b3BzTGF5b3V0KS5kaXJlY3RpdmUoJ2JsYW5rc2xhdGUnLCBCbGFua3NsYXRlRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2JvZHktaGVhZGVyLmh0bWwnO1xyXG5pbXBvcnQgXCIuL2JvZHktaGVhZGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIEJvZHlIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBCb2R5SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IEJvZHlIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JvZHlIZWFkZXInLCBCb2R5SGVhZGVyRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZG91Z2hudXQuaHRtbCc7XHJcbmltcG9ydCBcIi4vZG91Z2hudXQubGVzc1wiO1xyXG5cclxuY2xhc3MgRG91Z2hudXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCBhbmltYXRlKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY29udGV4dEhvbGUgPSBjb250ZXh0SG9sZTtcclxuICAgICAgICB0aGlzLmNvbnRleHRGaWxsID0gY29udGV4dEZpbGw7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgMCwgdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICBjb250ZXh0SG9sZTogYW55O1xyXG4gICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgIGNvbnRleHRCZzogYW55O1xyXG5cclxuICAgIGFuaW1hdGlvblByb21pc2U6IGFueTtcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICBlbXB0eUNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgYW5pbWF0ZVNwZWVkID0gMTA7XHJcbiAgICBwZXJjZW50T2Zmc2V0ID0gLTI1O1xyXG4gICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBhbmltYXRlOiAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSA9PiB7fTtcclxuXHJcbiAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIG9sZFZhbCwgbmV3VmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbnRlcnZhbCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBEb3VnaG51dENvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgY29sb3JDbGFzczogJ0AnLFxyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsKSA9PiB7XHJcblxyXG4gICAgICAgIHZhciBjb250ZXh0SG9sZSA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtaG9sZVwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHZhciBjb250ZXh0RmlsbCA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHZhciBjb250ZXh0QmcgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWJnXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAvLyBkaWQgYmFja2dyb3VuZCBjb2xvciBjaGFuZ2U/XHJcbiAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBzaXplID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKSArICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoU2l6ZSgkY3RybCkge1xyXG4gICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgcmFkaWFucyA9IHBlcmNlbnQgLyAxMDAgKiAzNjAgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdXZWRnZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgLy8gZHJhdyB0aGUgd2VkZ2VcclxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cyAqICgkY3RybC5pbm5lclJhZGl1cyAvIDEwMCksIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsLCBjWCwgY1ksIHJhZGl1cywgZnJvbSwgdG8sIGZpbGxDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICB2YXIgY1ggPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLndpZHRoIC8gMik7XHJcbiAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFkoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICByZXR1cm4gY1k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoJGVsZW1lbnQsIGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAvL3ZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgdmFyICR0ZW1wID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgJHRlbXAuaW5zZXJ0QWZ0ZXIoJGVsZW1lbnQpO1xyXG4gICAgICAgIC8vJGJvZHkuYXBwZW5kKCR0ZW1wKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSAkdGVtcC5jc3Moc3R5bGUpO1xyXG4gICAgICAgICR0ZW1wLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5pdEJnKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0QmcpO1xyXG5cclxuICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5lbXB0eUNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1lbXB0eS1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0SG9sZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSk7XHJcblxyXG4gICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAkY3RybC5ob2xlQ29sb3IgPSB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QmdDb2xvcigkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgIGlmIChiZ2NvbG9yID09IFwicmdiYSgwLCAwLCAwLCAwKVwiIHx8IGJnY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKVxyXG4gICAgICAgICAgICBiZ2NvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5jb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZmlsbC1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgIHZhciBuRnJvbSA9IE51bWJlcihmcm9tKTtcclxuICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlVXAoJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCBmcm9tLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgdG8sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2RvdWdobnV0JywgRG91Z2hudXREaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsImltcG9ydCBcIi4vbGF5b3V0LXBhZ2UubGVzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgc2hvd05hdigpO1xyXG4gICAgaGlkZU5hdigpO1xyXG4gICAgdG9nZ2xlTmF2KCk7XHJcbn1cclxuXHJcbmNsYXNzIExheW91dFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSUxheW91dFBhZ2VDb250cm9sbGVyIHtcclxuICAgIG9uSW5pdCh1cGRhdGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGUgPSB1cGRhdGU7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNOYXZWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIHNob3dOYXYoKSB7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGRhdGUodGhpcy5faXNOYXZWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlTmF2KCkge1xyXG4gICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZU5hdigpIHtcclxuICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSAhdGhpcy5faXNOYXZWaXNpYmxlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ2xheW91dFBhZ2VDb250cm9sbGVyJywgTGF5b3V0UGFnZUNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTGF5b3V0UGFnZURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFQUMnO1xyXG4gICAgY29udHJvbGxlciA9IExheW91dFBhZ2VDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTGF5b3V0UGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICB2YXIgdXBkYXRlID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgaXNWaXNpYmxlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkY3RybC5vbkluaXQodXBkYXRlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdsYXlvdXRQYWdlJywgTGF5b3V0UGFnZURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbmF2LWdyb3VwLWl0ZW0uaHRtbCc7XHJcbmltcG9ydCBcIi4vbmF2LWdyb3VwLWl0ZW0ubGVzc1wiO1xyXG5pbXBvcnQgeyBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgfSBmcm9tICcuLi9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZSc7XHJcblxyXG5jbGFzcyBOYXZHcm91cEl0ZW1Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnLCAnJGxvY2F0aW9uJywgJyR3aW5kb3cnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycywgcHJpdmF0ZSAkbG9jYXRpb246IGFuZ3VsYXIuSUxvY2F0aW9uU2VydmljZSwgcHJpdmF0ZSAkd2luZG93OiBhbmd1bGFyLklXaW5kb3dTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBoYXNJY29uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmljb25DbGFzcyAhPSBudWxsICYmIHRoaXMuaWNvbkNsYXNzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHJlZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaHJlZjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZDogc3RyaW5nW107XHJcblxyXG4gICAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLiRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaHJlZiAhPSBudWxsICYmIHBhdGguaW5kZXhPZih0aGlzLmhyZWYpID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKHggPT4gcGF0aC5pbmRleE9mKHgpID09PSAwKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGUobmV3VGFiOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAobmV3VGFiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRsb2NhdGlvbi51cmwodGhpcy5ocmVmKTtcclxuICAgIH1cclxufVxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTmF2R3JvdXBJdGVtRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3QgPSAnQUVDJztcclxuICAgIHJlcXVpcmUgPSBbJ25hdkdyb3VwSXRlbScsICdebGF5b3V0UGFnZSddO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBzZWxlY3RlZDogJz0nXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICB2YXIgJGN0cmw6IE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIgPSBjdHJsc1swXSxcclxuICAgICAgICAgICAgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlciA9IGN0cmxzWzFdLFxyXG4gICAgICAgICAgICBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAvLyBUb0RvOiB0aGlzIGlzIHByb2JhYmx5IGRvbmUgaW5jb3JyZWN0bHkgYW5kIHNob3VsZCBiZSBjb250cm9sbGVkIGJ5IHRoZSBuYXYtZ3JvdXAgaW5zdGVhZFxyXG4gICAgICAgICRzY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCAkY3RybC5pc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgJGxheW91dFBhZ2UuaGlkZU5hdigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCAkY3RybC5pc1NlbGVjdGVkKTtcclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgoJGN0cmwuaHJlZiB8fCBcIlwiKS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICRjdHJsLm5hdmlnYXRlKGUuY3RybEtleSB8fCAoZS53aGljaCA9PSAyKSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2R3JvdXBJdGVtJywgTmF2R3JvdXBJdGVtRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0udHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9uYXYtaGVhZGVyLmh0bWwnO1xyXG5pbXBvcnQgXCIuL25hdi1oZWFkZXIubGVzc1wiO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBzbWFsbDogc3RyaW5nO1xyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZIZWFkZXJDb250cm9sbGVyJywgTmF2SGVhZGVyQ29udHJvbGxlcik7XHJcblxyXG5jbGFzcyBOYXZIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IE5hdkhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0ZXh0OiAnQCcsXHJcbiAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9uYXYtbWVudS5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtbWVudS5sZXNzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRQYWdlQ29udHJvbGxlciB9IGZyb20gJy4uL2xheW91dC1wYWdlL2xheW91dC1wYWdlJztcclxuXHJcbmNsYXNzIE5hdk1lbnVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgfVxyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZDb250cm9sbGVyJywgTmF2TWVudUNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTmF2TWVudURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnXmxheW91dFBhZ2UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IE5hdk1lbnVDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB0cnVlO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZS50b2dnbGVOYXYoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZNZW51JywgTmF2TWVudURpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsImltcG9ydCBcIi4vcGFnZS1jb250ZW50LW5hdi1pdGVtLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRsb2NhdGlvbiddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgkZWxlbWVudCwgaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5pc0RlZmF1bHQgPSBpc0RlZmF1bHQ7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdDogYm9vbGVhbjtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICBwYXJhbTogc3RyaW5nO1xyXG4gICAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgIGdldCBhcmVhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FyZWE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFyZWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FyZWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0FjdGl2ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlZmF1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC50b0xvd2VyQ2FzZSgpID09IHRoaXMuX2FyZWEudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUm91dGVDaGFuZ2UoJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fYXJlYSA9ICRyb3V0ZVBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ107XHJcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFyZWFDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcmFtIHx8ICdhcmVhJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IHRoaXMuX2FyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChuYW1lLCB0aGlzLl9hcmVhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgIGFyZWE6ICc9J1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgJGF0dHIuZGVmYXVsdCAhPSBudWxsKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAkY3RybC5vblJvdXRlQ2hhbmdlKGN1cnJlbnQucGFyYW1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlQWN0aXZlKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSB7XHJcbiAgICAgICAgJGN0cmwuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhZ2UtY29udGVudC1uYXYtaXRlbS0tYWN0aXZlJywgJGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2UtY29udGVudC1uYXYtaXRlbS9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0udHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9wYWdlLWhlYWRlci5odG1sJztcclxuaW1wb3J0IFwiLi9wYWdlLWhlYWRlci5sZXNzXCI7XHJcblxyXG5jbGFzcyBQYWdlSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgbGFiZWw6ICdAJ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlSGVhZGVyJywgUGFnZUhlYWRlckRpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsImltcG9ydCB7IElQYWdlU2xpZGVyQ29udHJvbGxlciB9IGZyb20gXCIuLi9wYWdlLXNsaWRlci9wYWdlLXNsaWRlclwiO1xyXG5cclxuY2xhc3MgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdBJztcclxuICAgIHJlcXVpcmUgPSAnXnBhZ2VTbGlkZXInO1xyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShzbGlkZXIuY2xvc2UoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vZmYoY2xpY2tFdmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXJDYW5jZWwnLCBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2Utc2xpZGVyLWNhbmNlbC9wYWdlLXNsaWRlci1jYW5jZWwudHMiLCJpbXBvcnQgXCIuL3BhZ2Utc2xpZGVyLmxlc3NcIjtcclxuaW1wb3J0IHsgSVBhZ2VPdmVybGF5LCBJUGFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vcGFnZS9wYWdlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICBpc1Zpc2libGU7XHJcbiAgICB3aXRoT3ZlcmxheTtcclxuICAgIGNsb3NlKCk7XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VTbGlkZXJDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBJUGFnZU92ZXJsYXkge1xyXG4gICAgcHJpdmF0ZSBfc2xpZGVJZjtcclxuXHJcbiAgICBnZXQgc2xpZGVJZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2xpZGVJZih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NsaWRlSWYgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy50b2dnbGVWaXNpYmlsaXR5KVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2U7XHJcbiAgICB0b2dnbGVWaXNpYmlsaXR5O1xyXG4gICAgd2l0aEZvb3RlcjogYm9vbGVhbjtcclxuICAgIHdpdGhPdmVybGF5OiBib29sZWFuO1xyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVJZiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VTbGlkZXJEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICByZXF1aXJlID0gJ15wYWdlJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgY29udHJvbGxlciA9IFBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHBhZ2U6IElQYWdlQ29udHJvbGxlciwgJHRyYW5zY2x1ZGUpID0+IHtcclxuICAgICAgICB2YXIgJGN0cmw6IFBhZ2VTbGlkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXSxcclxuICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG5cclxuICAgICAgICAkY3RybC53aXRoT3ZlcmxheSA9ICRhdHRycy5zaG93T3ZlcmxheSAhPSBudWxsO1xyXG5cclxuICAgICAgICAkcGFnZS5hZGRDb250cm9sKCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBpc1Zpc2libGUgPSAhISRjdHJsLnNsaWRlSWY7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZVNsaWRlci4kc2hvdycsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlU2xpZGVyLiRoaWRlJywgJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKFwiaXMtdmlzaWJsZVwiLCBpc1Zpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLndpdGhPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgICRwYWdlLnNob3dPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAkcGFnZS5oaWRlT3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkdHJhbnNjbHVkZSgoY2xvbmUsIHNjb3BlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBzY29wZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyJywgUGFnZVNsaWRlckRpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLnRzIiwiaW1wb3J0IFwiLi9wYWdlLmxlc3NcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VPdmVybGF5IHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VDb250cm9sbGVyIHtcclxuICAgIGFkZENvbnRyb2woY29udHJvbDogYW55KTtcclxuICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbiAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpO1xyXG59XHJcblxyXG5jbGFzcyBQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlQ29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IFtdO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoJGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaChjb250cm9sKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY29udHJvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICBpZiAoaWR4ID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5vdmVybGF5cy5wdXNoKG92ZXJsYXkpO1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoXCJwYWdlLS1vdmVybGF5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgaWYgKGlkeCA8IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5vdmVybGF5cy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheXMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJwYWdlLS1vdmVybGF5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJsYXlzOiBJUGFnZU92ZXJsYXlbXTtcclxuICAgIGNvbnRyb2xzOiBhbnlbXTtcclxuICAgICRlbGVtZW50OiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3QgPSAnQyc7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBQYWdlQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICRjdHJsLmNvbnRyb2xzLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZCh4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkY3RybC5jb250cm9scyA9IFtdO1xyXG4gICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGNyZWF0ZScsICRlbGVtZW50KTtcclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlLiRkZXN0cm95JywgJGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2UnLCBQYWdlRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS9wYWdlLnRzIiwiaW1wb3J0IFwiLi9wYW5lLWZvb3Rlci5sZXNzXCI7XHJcblxyXG5jbGFzcyBQYW5lRm9vdGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnBhcmVudChcIi5wYW5lXCIpLmFkZENsYXNzKFwicGFuZS0td2l0aEZvb3RlclwiKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUZvb3RlcicsIFBhbmVGb290ZXJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiLi9wYW5lLWhlYWRlci5odG1sXCI7XHJcbmltcG9ydCBcIi4vcGFuZS1oZWFkZXIubGVzc1wiO1xyXG5pbXBvcnQgeyBJUGFnZVNsaWRlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXJcIjtcclxuXHJcbmNsYXNzIFBhbmVIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICAgIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgIG9uQ2xvc2U6IGFueTtcclxuXHJcbiAgICBvbkluaXQocGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyLCBzaG93Q2xvc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnBhZ2VTbGlkZXIgPSBwYWdlU2xpZGVyO1xyXG4gICAgICAgIHRoaXMuc2hvd0Nsb3NlID0gc2hvd0Nsb3NlO1xyXG4gICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VTbGlkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucGFnZVNsaWRlci5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoYXNTdWJ0aXRsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJ0aXRsZSAhPSBudWxsICYmIHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3VidGl0bGU6IHN0cmluZztcclxuICAgIGdldCBzdWJ0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJ0aXRsZTtcclxuICAgIH1cclxuICAgIHNldCBzdWJ0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc3VidGl0bGUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5zZXRXaXRoU3VidGl0bGUgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0V2l0aFN1YnRpdGxlO1xyXG59XHJcblxyXG5jbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcmVxdWlyZSA9ICc/XnBhZ2VTbGlkZXInO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgIG9uQ2xvc2U6ICcmJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcInRpdGxlXCIpO1xyXG5cclxuICAgICAgICB2YXIgY3RybDogUGFuZUhlYWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdO1xyXG4gICAgICAgIGN0cmwuc2V0V2l0aFN1YnRpdGxlID0gKGhhc1N1YnRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYW5lLWhlYWRlci0td2l0aFN1YnRpdGxlJywgaGFzU3VidGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHJsLm9uSW5pdChwYWdlU2xpZGVyLCAkYXR0cnMuc2hvd0Nsb3NlICE9IG51bGwpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lSGVhZGVyJywgUGFuZUhlYWRlckRpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiaW1wb3J0IHsgSVRhYnNDb250cm9sbGVyLCBJVGFiQ29udHJvbGxlciB9IGZyb20gXCIuLi90YWJzL3RhYnNcIjtcclxuXHJcbmNsYXNzIFRhYkNvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFiQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBUYWJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICByZXF1aXJlID0gWydedGFicycsICd0YWInXTtcclxuICAgIGNvbnRyb2xsZXIgPSBUYWJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICBuYW1lOiAnQCcsXHJcbiAgICAgICAgaWNvbjogJ0AnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgdmFyICR0YWJzOiBJVGFic0NvbnRyb2xsZXIgPSAkY3RybHNbMF07XHJcbiAgICAgICAgdmFyICRjdHJsOiBJVGFiQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgJHRhYnMuYWRkVGFiKCRjdHJsKTtcclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnQpLnJlbW92ZUF0dHIoJ3RpdGxlJyk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYicsIFRhYkRpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RhYi90YWIudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSBcIi4vdGFicy5odG1sXCI7XHJcbmltcG9ydCBcIi4vdGFicy5sZXNzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKTtcclxuICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBUYWJzQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKHRoaXMuX2FjdGl2ZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYWN0aXZlVGFiKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IG5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy50YWJzLmxlbmd0aCAqIDEwMH0lYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkeCAqIC0xMDB9JWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnRhYnMuZmlsdGVyKHggPT4geC5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgIGlmIChmb3VuZC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFic1tpZHhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoKSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJMaW5rOiBJVGFic0NvbnRyb2xsZXJcclxuICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVGFic0RpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBUYWJzQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICBhY3RpdmVUYWI6ICc9J1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICBpZiAoJGF0dHJzLnRhYkxpbmspXHJcbiAgICAgICAgICAgICRjdHJsLnRhYkxpbmsgPSAkY3RybDtcclxuICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWJzL3RhYnMudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZG91Z2hudXQvZG91Z2hudXQubGVzc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtbWVudS9uYXYtbWVudS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlL3BhZ2UubGVzc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFicy90YWJzLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJiYXItZ3JhcGgtYmdcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJiYXItZ3JhcGgtZmlsbFxcXCIgbmctY2xhc3M9XFxcInsnYmFyLWdyYXBoLWZpbGwtLWZ1bGwnOiB2bS5pc0Z1bGx9XFxcIiBuZy1zdHlsZT1cXFwidm0uc3R5bGVcXFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IFwiPGkgY2xhc3M9XFxcImJsYW5rc2xhdGUtaWNvbiB7e3ZtLmljb259fVxcXCI+PC9pPlxcclxcbjxkaXYgY2xhc3M9XFxcImJsYW5rc2xhdGUtY29udGVudFxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImJsYW5rc2xhdGUtY29udGVudC10aXRsZVxcXCI+e3t2bS50aXRsZX19PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImJsYW5rc2xhdGUtY29udGVudC1zdWJ0aXRsZVxcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdG9wXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVzXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImJvZHktaGVhZGVyLXN1YnRpdGxlXFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItYWN0aW9uc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjwhLS08ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1ib3R0b21cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1zdWJ0aXRsZVxcXCIgbmctc2hvdz1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbjwvZGl2Pi0tPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJkb3VnaG51dC10ZXh0XFxcIj5cXHJcXG4gICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWhvbGVcXFwiPjwvY2FudmFzPlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWZpbGxcXFwiPjwvY2FudmFzPlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWJnXFxcIj48L2NhbnZhcz5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kb3VnaG51dC9kb3VnaG51dC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IFwiPGkgbmctaWY9XFxcInZtLmhhc0ljb25cXFwiIGNsYXNzPVxcXCJuYXYtZ3JvdXAtaXRlbS1pY29uXFxcIiBuZy1jbGFzcz1cXFwidm0uaWNvbkNsYXNzXFxcIj48L2k+XFxyXFxuPHNwYW4gY2xhc3M9XFxcIm5hdi1ncm91cC1pdGVtLXRleHRcXFwiIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci10ZXh0XFxcIj57e3ZtLnRleHR9fTwvc3Bhbj5cXHJcXG48c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci1zbWFsbFxcXCI+e3t2bS5zbWFsbH19PC9zcGFuPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IFwiPGkgbmctY2xhc3M9XFxcInZtLmljb25DbGFzc1xcXCI+PC9pPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1tZW51L25hdi1tZW51Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci1hY3Rpb25zXFxcIiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbjxuYXYtbWVudSBjbGFzcz1cXFwicGFnZS1oZWFkZXItbmF2TWVudVxcXCIgaWNvbj1cXFwiZmEgZmEtbmF2aWNvblxcXCI+PC9uYXYtbWVudT5cXHJcXG48ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZXMtaXRlbSBwYWdlLWhlYWRlci10aXRsZXMtaXRlbS0tdGl0bGVcXFwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXRpdGxlXFxcIj57e3ZtLnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZXMtaXRlbSBwYWdlLWhlYWRlci10aXRsZXMtaXRlbS0tc3VidGl0bGVcXFwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXN1YnRpdGxlXFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtIHBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtLS1sYWJlbFxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFnZS1oZWFkZXItbGFiZWxcXFwiIG5nLWlmPVxcXCJ2bS5sYWJlbFxcXCI+e3t2bS5sYWJlbH19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInBhbmUtaGVhZGVyLWNsb3NlXFxcIiBuZy1pZj1cXFwidm0uc2hvd0Nsb3NlXFxcIiBuZy1jbGljaz1cXFwidm0uY2xvc2UoKVxcXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJwYW5lLWhlYWRlci1jbG9zZUljb24gZmEgZmEtY2xvc2VcXFwiPjwvaT5cXHJcXG48L2E+XFxyXFxuPGRpdiBjbGFzcz1cXFwicGFuZS1oZWFkZXItYWN0aW9uc1xcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItdGl0bGVUZXh0XFxcIj57e3ZtLnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci1zdWJ0aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItc3VidGl0bGVUZXh0XFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnQgZGVmYXVsdCBcIjxkaXYgY2xhc3M9XFxcInRhYi10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItdGl0bGVzLWl0ZW1cXFwiIFxcclxcbiAgICAgICAgbmctY2xhc3M9XFxcInsndGFiLXRpdGxlcy1pdGVtLS1zZWxlY3RlZCc6IHRhYiA9PSB2bS5zZWxlY3RlZFRhYiB9XFxcIlxcclxcbiAgICAgICAgbmctcmVwZWF0PVxcXCJ0YWIgaW4gdm0udGFic1xcXCIgXFxyXFxuICAgICAgICBuZy1jbGljaz1cXFwidm0uc2VsZWN0VGFiKHRhYilcXFwiPlxcclxcbiAgICAgICAgPGkgY2xhc3M9XFxcInRhYi10aXRsZXMtaXRlbS1pY29uIHt7dGFiLmljb259fVxcXCIgbmctaWY9XFxcInRhYi5pY29uXFxcIj48L2k+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItdGl0bGVzLWl0ZW0tdGl0bGVcXFwiPnt7dGFiLnRpdGxlfX08L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnRcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudC13aW5kb3dcXFwiIFxcclxcbiAgICAgICAgbmctc3R5bGU9XFxcInsnd2lkdGgnOiB2bS53aWR0aCwgJ2xlZnQnOiB2bS50YWJQb3NpdGlvbn1cXFwiXFxyXFxuICAgICAgICBuZy10cmFuc2NsdWRlPlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YWJzL3RhYnMuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgdm9wc0xheW91dCBmcm9tIFwiLi9hcHBcIlxyXG5leHBvcnQgZGVmYXVsdCB2b3BzTGF5b3V0O1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vYmFyLWdyYXBoL2Jhci1ncmFwaFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ibGFua3NsYXRlL2JsYW5rc2xhdGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vYm9keS1oZWFkZXIvYm9keS1oZWFkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZG91Z2hudXQvZG91Z2hudXRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW1cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbmF2LWhlYWRlci9uYXYtaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1tZW51L25hdi1tZW51XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhZ2UvcGFnZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhZ2Utc2xpZGVyLWNhbmNlbC9wYWdlLXNsaWRlci1jYW5jZWxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFuZS1mb290ZXIvcGFuZS1mb290ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdGFiL3RhYlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi90YWJzL3RhYnNcIjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9
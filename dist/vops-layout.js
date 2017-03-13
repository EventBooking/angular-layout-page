(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(31);
exports.default = Angular.module("ngLayoutPage", []).name;


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bar_graph_html_1 = __webpack_require__(47);
__webpack_require__(32);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(0);
var blankslate_html_1 = __webpack_require__(48);
__webpack_require__(33);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var body_header_html_1 = __webpack_require__(49);
__webpack_require__(34);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var doughnut_html_1 = __webpack_require__(50);
__webpack_require__(35);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(36);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_group_item_html_1 = __webpack_require__(51);
__webpack_require__(37);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_header_html_1 = __webpack_require__(52);
__webpack_require__(38);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_menu_html_1 = __webpack_require__(53);
__webpack_require__(39);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(40);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var page_header_html_1 = __webpack_require__(54);
__webpack_require__(41);
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(42);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(43);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(44);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pane_header_html_1 = __webpack_require__(55);
__webpack_require__(45);
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tabs_html_1 = __webpack_require__(56);
__webpack_require__(46);
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
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
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
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"bar-graph-bg\">\r\n    <div class=\"bar-graph-fill\" ng-class=\"{'bar-graph-fill--full': vm.isFull}\" ng-style=\"vm.style\" ng-transclude></div>\r\n</div>";

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i class=\"blankslate-icon {{vm.icon}}\"></i>\r\n<div class=\"blankslate-content\">\r\n    <div class=\"blankslate-content-title\">{{vm.title}}</div>\r\n    <div class=\"blankslate-content-subtitle\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>";

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"body-header-top\">\r\n    <div class=\"body-header-titles\">\r\n        <div class=\"body-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n        <div class=\"body-header-title\">{{vm.title}}</div>\r\n    </div>\r\n    <div class=\"body-header-actions\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>\r\n<!--<div class=\"body-header-bottom\">\r\n    <div class=\"body-header-subtitle\" ng-show=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n</div>-->";

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"doughnut-text\">\r\n    <div ng-transclude></div>\r\n</div>\r\n<canvas class=\"doughnut-hole\"></canvas>\r\n<canvas class=\"doughnut-fill\"></canvas>\r\n<canvas class=\"doughnut-bg\"></canvas>";

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i ng-if=\"vm.hasIcon\" class=\"nav-group-item-icon\" ng-class=\"vm.iconClass\"></i>\r\n<span class=\"nav-group-item-text\" ng-transclude></span>";

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<span class=\"nav-header-text\">{{vm.text}}</span>\r\n<span class=\"nav-header-small\">{{vm.small}}</span>";

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<i ng-class=\"vm.iconClass\"></i>";

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"page-header-actions\" ng-transclude></div>\r\n<nav-menu class=\"page-header-navMenu\" icon=\"fa fa-navicon\"></nav-menu>\r\n<div class=\"page-header-titles\">\r\n    <div class=\"page-header-titles-item page-header-titles-item--title\">\r\n        <span class=\"page-header-title\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--subtitle\">\r\n        <span class=\"page-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--label\">\r\n        <span class=\"page-header-label\" ng-if=\"vm.label\">{{vm.label}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<a href=\"#\" class=\"pane-header-close\" ng-if=\"vm.showClose\" ng-click=\"vm.close()\">\r\n    <span class=\"pane-header-closeIcon fa fa-close\"></i>\r\n</a>\r\n<div class=\"pane-header-actions\" ng-transclude></div>\r\n<div class=\"pane-header-titles\">\r\n    <div class=\"pane-header-title\">\r\n        <span class=\"pane-header-titleText\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"pane-header-subtitle\">\r\n        <span class=\"pane-header-subtitleText\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = "<div class=\"tab-titles\">\r\n    <div class=\"tab-titles-item\" \r\n        ng-class=\"{'tab-titles-item--selected': tab == vm.selectedTab }\"\r\n        ng-repeat=\"tab in vm.tabs\" \r\n        ng-click=\"vm.selectTab(tab)\">\r\n        <i class=\"tab-titles-item-icon {{tab.icon}}\" ng-if=\"tab.icon\"></i>\r\n        <div class=\"tab-titles-item-title\">{{tab.title}}</div>\r\n    </div>\r\n</div>\r\n<div class=\"tab-content\">\r\n    <div class=\"tab-content-window\" \r\n        ng-style=\"{'width': vm.width, 'left': vm.tabPosition}\"\r\n        ng-transclude>\r\n    </div>\r\n</div>";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(0);
exports.default = app_1.default;
__export(__webpack_require__(7));
__export(__webpack_require__(8));
__export(__webpack_require__(9));
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(13));
__export(__webpack_require__(14));
__export(__webpack_require__(19));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(18));
__export(__webpack_require__(17));
__export(__webpack_require__(20));
__export(__webpack_require__(21));
__export(__webpack_require__(22));
__export(__webpack_require__(23));


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzMDcxOTcwMzhlOGExMjRhZGEzNSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLnRzIiwid2VicGFjazovLy8uL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UvcGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1mb290ZXIvcGFuZS1mb290ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90YWIvdGFiLnRzIiwid2VicGFjazovLy8uL3NyYy90YWJzL3RhYnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9kb3VnaG51dC9kb3VnaG51dC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlL3BhZ2UubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1mb290ZXIvcGFuZS1mb290ZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGguaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9uYXYtbWVudS9uYXYtbWVudS5odG1sIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy90YWJzL3RhYnMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBLHdCQUFvQjtBQUVwQixrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGdkQsK0NBQXdDO0FBQ3hDLHdCQUEwQjtBQUUxQjtJQUNJO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFF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dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMwNzE5NzAzOGU4YTEyNGFkYTM1IiwiaW1wb3J0IFwiLi9hcHAubGVzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIiwgW10pLm5hbWU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiLi9iYXItZ3JhcGguaHRtbFwiO1xyXG5pbXBvcnQgXCIuL2Jhci1ncmFwaC5sZXNzXCI7XHJcblxyXG5jbGFzcyBCYXJHcmFwaENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5iYXJTdGVwcyA9IDEwO1xyXG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wZXJjZW50fSVgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0Z1bGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudCA9PSAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFyTWluOiBudW1iZXI7XHJcbiAgICBnZXQgYmFyTWluKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1pbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYmFyTWluKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJNaW4gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFyTWF4OiBudW1iZXI7XHJcbiAgICBnZXQgYmFyTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhck1heDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYmFyTWF4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJNYXggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFyVmFsdWU6IG51bWJlcjtcclxuICAgIGdldCBiYXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYmFyVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2JhclZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYmFyU3RlcHM6IG51bWJlcjtcclxuICAgIGdldCBiYXJTdGVwcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJTdGVwcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYmFyU3RlcHModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2JhclN0ZXBzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2tzOiBudW1iZXJbXTtcclxuICAgIHBlcmNlbnQ6IG51bWJlcjtcclxuICAgIGluaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgc2V0UGVyY2VudCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICB2YXIgeCA9IE51bWJlcih0aGlzLmJhclZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHggPCBtaW4pXHJcbiAgICAgICAgICAgIHggPSBtaW47XHJcblxyXG4gICAgICAgIGlmICh4ID4gbWF4KVxyXG4gICAgICAgICAgICB4ID0gbWF4O1xyXG5cclxuICAgICAgICB2YXIgZGl2ID0gbWF4IC0gbWluO1xyXG4gICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG5cclxuICAgICAgICB0aGlzLnBlcmNlbnQgPSAxMDAgKiAoeCAtIG1pbikgLyBkaXY7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGlja3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgdmFyIGRpdiA9IE51bWJlcih0aGlzLmJhclN0ZXBzID09IG51bGwgPyAxMCA6IHRoaXMuYmFyU3RlcHMpO1xyXG4gICAgICAgIGlmIChkaXYgPD0gMClcclxuICAgICAgICAgICAgZGl2ID0gMTsgLy8gcHJldmVudCBkaXZpZGUgYnkgemVybyBlcnJvclxyXG5cclxuICAgICAgICB2YXIgc3RlcHMgPSAobWF4IC0gbWluKSAvIGRpdjtcclxuXHJcbiAgICAgICAgdmFyIHRpY2tzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSBtaW47IGluZGV4IDw9IG1heDsgaW5kZXggKz0gc3RlcHMpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5KVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwKSArIFwiS1wiO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDApICsgXCJNXCI7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OTk5OSlcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMDAwMCkgKyBcIkJcIjtcclxuICAgICAgICAgICAgdGlja3MucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJhckdyYXBoRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IEJhckdyYXBoQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGJhck1pbjogJ0AnLFxyXG4gICAgICAgIGJhck1heDogJ0AnLFxyXG4gICAgICAgIGJhclZhbHVlOiAnQCcsXHJcbiAgICAgICAgYmFyU3RlcHM6ICdAPydcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYmFyR3JhcGgnLCBCYXJHcmFwaERpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHMiLCJpbXBvcnQgdm9wc0xheW91dCBmcm9tIFwiLi4vYXBwXCI7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiLi9ibGFua3NsYXRlLmh0bWxcIjtcclxuaW1wb3J0IFwiLi9ibGFua3NsYXRlLmxlc3NcIjtcclxuXHJcbmNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuc3VidGl0bGUgPT0gbnVsbCB8fCB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmxhbmtzbGF0ZURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCbGFua3NsYXRlQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGljb246ICdAJyxcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKHZvcHNMYXlvdXQpLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vYm9keS1oZWFkZXIuaHRtbCc7XHJcbmltcG9ydCBcIi4vYm9keS1oZWFkZXIubGVzc1wiO1xyXG5cclxuY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gQm9keUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnYm9keUhlYWRlcicsIEJvZHlIZWFkZXJEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYm9keS1oZWFkZXIvYm9keS1oZWFkZXIudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9kb3VnaG51dC5odG1sJztcclxuaW1wb3J0IFwiLi9kb3VnaG51dC5sZXNzXCI7XHJcblxyXG5jbGFzcyBEb3VnaG51dENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsIGFuaW1hdGUpIHtcclxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0SG9sZSA9IGNvbnRleHRIb2xlO1xyXG4gICAgICAgIHRoaXMuY29udGV4dEZpbGwgPSBjb250ZXh0RmlsbDtcclxuICAgICAgICB0aGlzLmNvbnRleHRCZyA9IGNvbnRleHRCZztcclxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCAwLCB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbWVudDogYW55O1xyXG5cclxuICAgIGNvbnRleHRIb2xlOiBhbnk7XHJcbiAgICBjb250ZXh0RmlsbDogYW55O1xyXG4gICAgY29udGV4dEJnOiBhbnk7XHJcblxyXG4gICAgYW5pbWF0aW9uUHJvbWlzZTogYW55O1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgIGVtcHR5Q29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgaW5uZXJSYWRpdXMgPSA2NTsgLy8gNzUlXHJcbiAgICBhbmltYXRlU3BlZWQgPSAxMDtcclxuICAgIHBlcmNlbnRPZmZzZXQgPSAtMjU7XHJcbiAgICBob2xlQ29sb3I6IHN0cmluZztcclxuICAgIGFuaW1hdGU6ICgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpID0+IHt9O1xyXG5cclxuICAgIF92YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB8IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKG5ld1ZhbDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsO1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgb2xkVmFsLCBuZXdWYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRG91Z2hudXREaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRpbnRlcnZhbCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGludGVydmFsKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IERvdWdobnV0Q29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHZhbHVlOiAnQCcsXHJcbiAgICAgICAgY29sb3I6ICdAJyxcclxuICAgICAgICBjb2xvckNsYXNzOiAnQCcsXHJcbiAgICAgICAgZW1wdHlDb2xvckNsYXNzOiAnQCdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmwpID0+IHtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRleHRIb2xlID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1ob2xlXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdmFyIGNvbnRleHRGaWxsID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1maWxsXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdmFyIGNvbnRleHRCZyA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtYmdcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgKCRjdHJsLCBmcm9tLCB0bykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy53YXRjaFNpemUoJGN0cmwpO1xyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgfSwgYmdjb2xvciA9PiB7XHJcbiAgICAgICAgICAgIC8vIGRpZCBiYWNrZ3JvdW5kIGNvbG9yIGNoYW5nZT9cclxuICAgICAgICAgICAgaWYgKGJnY29sb3IgIT0gJGN0cmwuaG9sZUNvbG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIHNpemUgPSAkY3RybC4kZWxlbWVudC53aWR0aCgpICsgJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgcmV0dXJuIHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2hTaXplKCRjdHJsKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gc2l6ZSAhPSB0ZW1wO1xyXG4gICAgICAgICAgICBzaXplID0gdGVtcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0VG9SYWRpYW5zKHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciByYWRpYW5zID0gcGVyY2VudCAvIDEwMCAqIDM2MCAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlhbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1dlZGdlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBmcm9tUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyhmcm9tICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcbiAgICAgICAgdmFyIHRvUmFkaWFucyA9IHRoaXMuY29udmVydFRvUmFkaWFucyh0byArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG5cclxuICAgICAgICAvLyBkcmF3IHRoZSB3ZWRnZVxyXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cywgdGhpcy5jb252ZXJ0VG9SYWRpYW5zKCRjdHJsLnBlcmNlbnRPZmZzZXQpLCB0b1JhZGlhbnMsIGZhbHNlKTtcclxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0RvbnV0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBjdXQgb3V0IGFuIGlubmVyLWNpcmNsZSA9PSBkb251dFxyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKTtcclxuICAgICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcblxyXG4gICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwsIGNYLCBjWSwgcmFkaXVzLCBmcm9tLCB0bywgZmlsbENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICByZXR1cm4gY1g7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WShjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICB2YXIgY1kgPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgIHJldHVybiBjWTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSYWRpdXMoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgcmFkaXVzID0gTWF0aC5taW4oeCwgeSk7XHJcbiAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEVsZW1lbnRTdHlsZSgkZWxlbWVudCwgY2xhc3NOYW1lLCBzdHlsZSkge1xyXG4gICAgICAgIC8vdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICB2YXIgJHRlbXAgPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAkdGVtcC5pbnNlcnRBZnRlcigkZWxlbWVudCk7XHJcbiAgICAgICAgLy8kYm9keS5hcHBlbmQoJHRlbXApO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICR0ZW1wLmNzcyhzdHlsZSk7XHJcbiAgICAgICAgJHRlbXAucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNvbnRleHQuY2FudmFzLndpZHRoLCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QmcoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJnKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgIHZhciBlbXB0eUNvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuJGVsZW1lbnQsICRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0QmcsIGNYLCBjWSwgcmFkaXVzLCAwLCAxMDAsIGVtcHR5Q29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRIb2xlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRIb2xlKTtcclxuICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlKTtcclxuXHJcbiAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICRjdHJsLmhvbGVDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgdGhpcy5kcmF3RG9udXQoJGN0cmwsICRjdHJsLmNvbnRleHRIb2xlLCBjWCwgY1ksIHJhZGl1cywgJGN0cmwuaG9sZUNvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCZ0NvbG9yKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICB2YXIgYmdjb2xvciA9ICRjdHJsLiRlbGVtZW50LmNzcyhcImJhY2tncm91bmQtY29sb3JcIik7XHJcbiAgICAgICAgaWYgKGJnY29sb3IgPT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIgfHwgYmdjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpXHJcbiAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgcmV0dXJuIGJnY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZmlsbENvbG9yID0gdGhpcy5nZXRFbGVtZW50U3R5bGUoJGN0cmwuJGVsZW1lbnQsICRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgaWYgKCRjdHJsLmNvbG9yKVxyXG4gICAgICAgICAgICBmaWxsQ29sb3IgPSAkY3RybC5jb2xvcjtcclxuXHJcbiAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgIHZhciBuVG8gPSBOdW1iZXIodG8pO1xyXG5cclxuICAgICAgICBpZiAobkZyb20gPCBuVG8pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVEb3duKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVVcCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIGZyb20sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICB2YWx1ZSsrO1xyXG4gICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvd24oJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPCB0bykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCB0bywgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIHZhbHVlLS07XHJcbiAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWwocHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwcm9taXNlKVxyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnZG91Z2hudXQnLCBEb3VnaG51dERpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzIiwiaW1wb3J0IFwiLi9sYXlvdXQtcGFnZS5sZXNzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMYXlvdXRQYWdlQ29udHJvbGxlciB7XHJcbiAgICBzaG93TmF2KCk7XHJcbiAgICBoaWRlTmF2KCk7XHJcbiAgICB0b2dnbGVOYXYoKTtcclxufVxyXG5cclxuY2xhc3MgTGF5b3V0UGFnZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgb25Jbml0KHVwZGF0ZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSA9IHVwZGF0ZTtcclxuICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc05hdlZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgc2hvd05hdigpIHtcclxuICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVOYXYoKSB7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKHRoaXMuX2lzTmF2VmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlTmF2KCkge1xyXG4gICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9ICF0aGlzLl9pc05hdlZpc2libGU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKHRoaXMuX2lzTmF2VmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbGF5b3V0UGFnZUNvbnRyb2xsZXInLCBMYXlvdXRQYWdlQ29udHJvbGxlcik7XHJcblxyXG5jbGFzcyBMYXlvdXRQYWdlRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0VBQyc7XHJcbiAgICBjb250cm9sbGVyID0gTGF5b3V0UGFnZUNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsOiBMYXlvdXRQYWdlQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgIHZhciB1cGRhdGUgPSAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtLXNob3cnLCBpc1Zpc2libGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRjdHJsLm9uSW5pdCh1cGRhdGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2xheW91dFBhZ2UnLCBMYXlvdXRQYWdlRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9uYXYtZ3JvdXAtaXRlbS5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtZ3JvdXAtaXRlbS5sZXNzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRQYWdlQ29udHJvbGxlciB9IGZyb20gJy4uL2xheW91dC1wYWdlL2xheW91dC1wYWdlJztcclxuXHJcbmNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nLCAnJHdpbmRvdyddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbjogYW5ndWxhci5JTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZShuZXdUYWI6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChuZXdUYWIpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCh0aGlzLmhyZWYpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG5jbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgcmVxdWlyZSA9IFsnbmF2R3JvdXBJdGVtJywgJ15sYXlvdXRQYWdlJ107XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gTmF2R3JvdXBJdGVtQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHZhciAkY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyID0gY3RybHNbMV0sXHJcbiAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgIC8vIFRvRG86IHRoaXMgaXMgcHJvYmFibHkgZG9uZSBpbmNvcnJlY3RseSBhbmQgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgdGhlIG5hdi1ncm91cCBpbnN0ZWFkXHJcbiAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZS5oaWRlTmF2KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG5cclxuICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKCgkY3RybC5ocmVmIHx8IFwiXCIpLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgJGN0cmwubmF2aWdhdGUoZS5jdHJsS2V5IHx8IChlLndoaWNoID09IDIpKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZHcm91cEl0ZW0nLCBOYXZHcm91cEl0ZW1EaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25hdi1oZWFkZXIuaHRtbCc7XHJcbmltcG9ydCBcIi4vbmF2LWhlYWRlci5sZXNzXCI7XHJcblxyXG5jbGFzcyBOYXZIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIHNtYWxsOiBzdHJpbmc7XHJcbn1cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkhlYWRlckNvbnRyb2xsZXInLCBOYXZIZWFkZXJDb250cm9sbGVyKTtcclxuXHJcbmNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gTmF2SGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICBzbWFsbDogJ0AnXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2SGVhZGVyJywgTmF2SGVhZGVyRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25hdi1tZW51Lmh0bWwnO1xyXG5pbXBvcnQgXCIuL25hdi1tZW51Lmxlc3NcIjtcclxuaW1wb3J0IHsgSUxheW91dFBhZ2VDb250cm9sbGVyIH0gZnJvbSAnLi4vbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UnO1xyXG5cclxuY2xhc3MgTmF2TWVudUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycyddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICB9XHJcbn1cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkNvbnRyb2xsZXInLCBOYXZNZW51Q29udHJvbGxlcik7XHJcblxyXG5jbGFzcyBOYXZNZW51RGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcmVxdWlyZSA9ICdebGF5b3V0UGFnZSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gTmF2TWVudUNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHRydWU7XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRsYXlvdXRQYWdlLnRvZ2dsZU5hdigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdk1lbnUnLCBOYXZNZW51RGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25hdi1tZW51L25hdi1tZW51LnRzIiwiaW1wb3J0IFwiLi9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0ubGVzc1wiO1xyXG5cclxuY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbG9jYXRpb24pIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0KCRlbGVtZW50LCBpc0RlZmF1bHQpIHtcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICB0aGlzLmlzRGVmYXVsdCA9IGlzRGVmYXVsdDtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0OiBib29sZWFuO1xyXG4gICAgcGF0aDogc3RyaW5nO1xyXG4gICAgJGVsZW1lbnQ6IGFueTtcclxuICAgIHBhcmFtOiBzdHJpbmc7XHJcbiAgICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfYXJlYTogc3RyaW5nO1xyXG4gICAgZ2V0IGFyZWEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYXJlYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYXJlYSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25BcmVhQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcmVhID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVmYXVsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdCgpIHtcclxuICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgb25Sb3V0ZUNoYW5nZSgkcm91dGVQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMucGFyYW0gfHwgJ2FyZWEnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wYXJhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gdGhpcy5fYXJlYTtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKHBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uc2VhcmNoKG5hbWUsIHRoaXMuX2FyZWEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlQWN0aXZlID0gKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7IH1cclxufVxyXG5cclxuY2xhc3MgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgbXVsdGlFbGVtZW50ID0gdHJ1ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgcGFyYW06ICdAJyxcclxuICAgICAgICBwYXRoOiAnQCcsXHJcbiAgICAgICAgYXJlYTogJz0nXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgdmFyIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgJGN0cmwuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGN0cmwudG9nZ2xlQWN0aXZlID0gdGhpcy50b2dnbGVBY3RpdmU7XHJcbiAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50LCAkYXR0ci5kZWZhdWx0ICE9IG51bGwpO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVVcGRhdGUnLCBmdW5jdGlvbiAoZXZ0LCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICRjdHJsLm9uUm91dGVDaGFuZ2UoY3VycmVudC5wYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0b2dnbGVBY3RpdmUoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAkY3RybC4kZWxlbWVudC50b2dnbGVDbGFzcygncGFnZS1jb250ZW50LW5hdi1pdGVtLS1hY3RpdmUnLCAkY3RybC5pc0FjdGl2ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUNvbnRlbnROYXZJdGVtJywgUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG5pbXBvcnQgXCIuL3BhZ2UtaGVhZGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlSGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICBsYWJlbDogJ0AnXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VIZWFkZXInLCBQYWdlSGVhZGVyRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRzIiwiaW1wb3J0IHsgSVBhZ2VTbGlkZXJDb250cm9sbGVyIH0gZnJvbSBcIi4uL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyXCI7XHJcblxyXG5jbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgcmVxdWlyZSA9ICdecGFnZVNsaWRlcic7XHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KHNsaWRlci5jbG9zZSgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsImltcG9ydCBcIi4vcGFnZS1zbGlkZXIubGVzc1wiO1xyXG5pbXBvcnQgeyBJUGFnZU92ZXJsYXksIElQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuLi9wYWdlL3BhZ2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgIGlzVmlzaWJsZTtcclxuICAgIHdpdGhPdmVybGF5O1xyXG4gICAgY2xvc2UoKTtcclxufVxyXG5cclxuY2xhc3MgUGFnZVNsaWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZVNsaWRlckNvbnRyb2xsZXIsIElQYWdlT3ZlcmxheSB7XHJcbiAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZTtcclxuICAgIHRvZ2dsZVZpc2liaWxpdHk7XHJcbiAgICB3aXRoRm9vdGVyOiBib29sZWFuO1xyXG4gICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUlmID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnXnBhZ2UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBzbGlkZUlmOiAnPScsXHJcbiAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcGFnZTogSVBhZ2VDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkgPT4ge1xyXG4gICAgICAgIHZhciAkY3RybDogUGFnZVNsaWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICRjdHJsLndpdGhPdmVybGF5ID0gJGF0dHJzLnNob3dPdmVybGF5ICE9IG51bGw7XHJcblxyXG4gICAgICAgICRwYWdlLmFkZENvbnRyb2woJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9ICEhJGN0cmwuc2xpZGVJZjtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlU2xpZGVyLiRzaG93JywgJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2VTbGlkZXIuJGhpZGUnLCAkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJpcy12aXNpYmxlXCIsIGlzVmlzaWJsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwud2l0aE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhZ2Uuc2hvd092ZXJsYXkoJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICRwYWdlLmhpZGVPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCJpbXBvcnQgXCIuL3BhZ2UubGVzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFnZU92ZXJsYXkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpO1xyXG4gICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VDb250cm9sbGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgdGhpcy5vdmVybGF5cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scy5wdXNoKGNvbnRyb2wpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjb250cm9sKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlzLnB1c2gob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICBpZiAoaWR4IDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlzLnNwbGljZShpZHgsIDEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5cy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcmxheXM6IElQYWdlT3ZlcmxheVtdO1xyXG4gICAgY29udHJvbHM6IGFueVtdO1xyXG4gICAgJGVsZW1lbnQ6IGFueTtcclxufVxyXG5cclxuY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdDJztcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udHJvbGxlcjtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgJGN0cmwuY29udHJvbHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKHgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRjdHJsLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kY3JlYXRlJywgJGVsZW1lbnQpO1xyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGRlc3Ryb3knLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlL3BhZ2UudHMiLCJpbXBvcnQgXCIuL3BhbmUtZm9vdGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gXCIuL3BhbmUtaGVhZGVyLmh0bWxcIjtcclxuaW1wb3J0IFwiLi9wYW5lLWhlYWRlci5sZXNzXCI7XHJcbmltcG9ydCB7IElQYWdlU2xpZGVyQ29udHJvbGxlciB9IGZyb20gXCIuLi9wYWdlLXNsaWRlci9wYWdlLXNsaWRlclwiO1xyXG5cclxuY2xhc3MgUGFuZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgc2hvd0Nsb3NlOiBib29sZWFuO1xyXG4gICAgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyO1xyXG4gICAgb25DbG9zZTogYW55O1xyXG5cclxuICAgIG9uSW5pdChwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIsIHNob3dDbG9zZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucGFnZVNsaWRlciA9IHBhZ2VTbGlkZXI7XHJcbiAgICAgICAgdGhpcy5zaG93Q2xvc2UgPSBzaG93Q2xvc2U7XHJcbiAgICAgICAgdGhpcy5zZXRXaXRoU3VidGl0bGUodGhpcy5oYXNTdWJ0aXRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZVNsaWRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wYWdlU2xpZGVyLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhhc1N1YnRpdGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnRpdGxlICE9IG51bGwgJiYgdGhpcy5zdWJ0aXRsZS50cmltKCkubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgZ2V0IHN1YnRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnRpdGxlO1xyXG4gICAgfVxyXG4gICAgc2V0IHN1YnRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zdWJ0aXRsZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNldFdpdGhTdWJ0aXRsZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRXaXRoU3VidGl0bGU7XHJcbn1cclxuXHJcbmNsYXNzIFBhbmVIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gUGFuZUhlYWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnQCcsXHJcbiAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwidGl0bGVcIik7XHJcblxyXG4gICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgY3RybC5zZXRXaXRoU3VidGl0bGUgPSAoaGFzU3VidGl0bGUpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhbmUtaGVhZGVyLS13aXRoU3VidGl0bGUnLCBoYXNTdWJ0aXRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0cmwub25Jbml0KHBhZ2VTbGlkZXIsICRhdHRycy5zaG93Q2xvc2UgIT0gbnVsbCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVIZWFkZXInLCBQYW5lSGVhZGVyRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIudHMiLCJpbXBvcnQgeyBJVGFic0NvbnRyb2xsZXIsIElUYWJDb250cm9sbGVyIH0gZnJvbSBcIi4uL3RhYnMvdGFic1wiO1xyXG5cclxuY2xhc3MgVGFiQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJDb250cm9sbGVyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFRhYkRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSBbJ150YWJzJywgJ3RhYiddO1xyXG4gICAgY29udHJvbGxlciA9IFRhYkNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIG5hbWU6ICdAJyxcclxuICAgICAgICBpY29uOiAnQCdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICB2YXIgJHRhYnM6IElUYWJzQ29udHJvbGxlciA9ICRjdHJsc1swXTtcclxuICAgICAgICB2YXIgJGN0cmw6IElUYWJDb250cm9sbGVyID0gJGN0cmxzWzFdO1xyXG5cclxuICAgICAgICAkdGFicy5hZGRUYWIoJGN0cmwpO1xyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudCkucmVtb3ZlQXR0cigndGl0bGUnKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFiJywgVGFiRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGFiL3RhYi50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiLi90YWJzLmh0bWxcIjtcclxuaW1wb3J0IFwiLi90YWJzLmxlc3NcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRhYnNDb250cm9sbGVyIHtcclxuICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKTtcclxuICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpO1xyXG4gICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcik7XHJcbiAgICBzZWxlY3ROZXh0VGFiKCk7XHJcbiAgICBzZWxlY3RQcmV2aW91c1RhYigpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUYWJDb250cm9sbGVyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFRhYnNDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYnNDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGFicyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkVGFiOiBJVGFiQ29udHJvbGxlcjtcclxuICAgIHRhYnM6IElUYWJDb250cm9sbGVyW107XHJcblxyXG4gICAgb25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYWIgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUodGhpcy5fYWN0aXZlVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcclxuICAgIGdldCBhY3RpdmVUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYi5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhY3RpdmVUYWIobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gbmFtZTtcclxuICAgICAgICBpZiAodGhpcy50YWJzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLnRhYnMubGVuZ3RoICogMTAwfSVgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0YWJQb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RUYWIodGFiOiBJVGFiQ29udHJvbGxlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBmb3VuZCA9IHRoaXMudGFicy5maWx0ZXIoeCA9PiB4Lm5hbWUgPT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKGZvdW5kWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkeCA+IDAgJiYgdGhpcy50YWJzLmxlbmd0aCA+IGlkeClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzW2lkeF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdE5leHRUYWIoKSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RQcmV2aW91c1RhYigpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYkxpbms6IElUYWJzQ29udHJvbGxlclxyXG4gICAgdGFiRGVmYXVsdDogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBUYWJzRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGFiTGluazogJz0nLFxyXG4gICAgICAgIGFjdGl2ZVRhYjogJz0nXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCkgPT4ge1xyXG4gICAgICAgIGlmICgkYXR0cnMudGFiTGluaylcclxuICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgICRjdHJsLm9uSW5pdCgpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWJzJywgVGFic0RpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RhYnMvdGFicy50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZG91Z2hudXQvZG91Z2hudXQubGVzc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUubGVzc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhZ2UvcGFnZS5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YWJzL3RhYnMubGVzc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJiYXItZ3JhcGgtYmdcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJiYXItZ3JhcGgtZmlsbFxcXCIgbmctY2xhc3M9XFxcInsnYmFyLWdyYXBoLWZpbGwtLWZ1bGwnOiB2bS5pc0Z1bGx9XFxcIiBuZy1zdHlsZT1cXFwidm0uc3R5bGVcXFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxpIGNsYXNzPVxcXCJibGFua3NsYXRlLWljb24ge3t2bS5pY29ufX1cXFwiPjwvaT5cXHJcXG48ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnRcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnQtdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnQtc3VidGl0bGVcXFwiPlxcclxcbiAgICAgICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci10b3BcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci10aXRsZXNcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItc3VidGl0bGVcXFwiIG5nLWlmPVxcXCJ2bS5zdWJ0aXRsZVxcXCI+e3t2bS5zdWJ0aXRsZX19PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci10aXRsZVxcXCI+e3t2bS50aXRsZX19PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1hY3Rpb25zXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPCEtLTxkaXYgY2xhc3M9XFxcImJvZHktaGVhZGVyLWJvdHRvbVxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImJvZHktaGVhZGVyLXN1YnRpdGxlXFxcIiBuZy1zaG93PVxcXCJ2bS5zdWJ0aXRsZVxcXCI+e3t2bS5zdWJ0aXRsZX19PC9kaXY+XFxyXFxuPC9kaXY+LS0+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYm9keS1oZWFkZXIvYm9keS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJkb3VnaG51dC10ZXh0XFxcIj5cXHJcXG4gICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWhvbGVcXFwiPjwvY2FudmFzPlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWZpbGxcXFwiPjwvY2FudmFzPlxcclxcbjxjYW52YXMgY2xhc3M9XFxcImRvdWdobnV0LWJnXFxcIj48L2NhbnZhcz5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kb3VnaG51dC9kb3VnaG51dC5odG1sXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxpIG5nLWlmPVxcXCJ2bS5oYXNJY29uXFxcIiBjbGFzcz1cXFwibmF2LWdyb3VwLWl0ZW0taWNvblxcXCIgbmctY2xhc3M9XFxcInZtLmljb25DbGFzc1xcXCI+PC9pPlxcclxcbjxzcGFuIGNsYXNzPVxcXCJuYXYtZ3JvdXAtaXRlbS10ZXh0XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxzcGFuIGNsYXNzPVxcXCJuYXYtaGVhZGVyLXRleHRcXFwiPnt7dm0udGV4dH19PC9zcGFuPlxcclxcbjxzcGFuIGNsYXNzPVxcXCJuYXYtaGVhZGVyLXNtYWxsXFxcIj57e3ZtLnNtYWxsfX08L3NwYW4+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGkgbmctY2xhc3M9XFxcInZtLmljb25DbGFzc1xcXCI+PC9pPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1tZW51L25hdi1tZW51Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItYWN0aW9uc1xcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48bmF2LW1lbnUgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLW5hdk1lbnVcXFwiIGljb249XFxcImZhIGZhLW5hdmljb25cXFwiPjwvbmF2LW1lbnU+XFxyXFxuPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0gcGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0tLXRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZVxcXCI+e3t2bS50aXRsZX19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0gcGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0tLXN1YnRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYWdlLWhlYWRlci1zdWJ0aXRsZVxcXCIgbmctaWY9XFxcInZtLnN1YnRpdGxlXFxcIj57e3ZtLnN1YnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZXMtaXRlbSBwYWdlLWhlYWRlci10aXRsZXMtaXRlbS0tbGFiZWxcXFwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInBhZ2UtaGVhZGVyLWxhYmVsXFxcIiBuZy1pZj1cXFwidm0ubGFiZWxcXFwiPnt7dm0ubGFiZWx9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwicGFuZS1oZWFkZXItY2xvc2VcXFwiIG5nLWlmPVxcXCJ2bS5zaG93Q2xvc2VcXFwiIG5nLWNsaWNrPVxcXCJ2bS5jbG9zZSgpXFxcIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XFxcInBhbmUtaGVhZGVyLWNsb3NlSWNvbiBmYSBmYS1jbG9zZVxcXCI+PC9pPlxcclxcbjwvYT5cXHJcXG48ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci1hY3Rpb25zXFxcIiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcInBhbmUtaGVhZGVyLXRpdGxlc1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmUtaGVhZGVyLXRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZVRleHRcXFwiPnt7dm0udGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmUtaGVhZGVyLXN1YnRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYW5lLWhlYWRlci1zdWJ0aXRsZVRleHRcXFwiIG5nLWlmPVxcXCJ2bS5zdWJ0aXRsZVxcXCI+e3t2bS5zdWJ0aXRsZX19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxkaXYgY2xhc3M9XFxcInRhYi10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItdGl0bGVzLWl0ZW1cXFwiIFxcclxcbiAgICAgICAgbmctY2xhc3M9XFxcInsndGFiLXRpdGxlcy1pdGVtLS1zZWxlY3RlZCc6IHRhYiA9PSB2bS5zZWxlY3RlZFRhYiB9XFxcIlxcclxcbiAgICAgICAgbmctcmVwZWF0PVxcXCJ0YWIgaW4gdm0udGFic1xcXCIgXFxyXFxuICAgICAgICBuZy1jbGljaz1cXFwidm0uc2VsZWN0VGFiKHRhYilcXFwiPlxcclxcbiAgICAgICAgPGkgY2xhc3M9XFxcInRhYi10aXRsZXMtaXRlbS1pY29uIHt7dGFiLmljb259fVxcXCIgbmctaWY9XFxcInRhYi5pY29uXFxcIj48L2k+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItdGl0bGVzLWl0ZW0tdGl0bGVcXFwiPnt7dGFiLnRpdGxlfX08L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnRcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudC13aW5kb3dcXFwiIFxcclxcbiAgICAgICAgbmctc3R5bGU9XFxcInsnd2lkdGgnOiB2bS53aWR0aCwgJ2xlZnQnOiB2bS50YWJQb3NpdGlvbn1cXFwiXFxyXFxuICAgICAgICBuZy10cmFuc2NsdWRlPlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90YWJzL3RhYnMuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHZvcHNMYXlvdXQgZnJvbSBcIi4vYXBwXCJcclxuZXhwb3J0IGRlZmF1bHQgdm9wc0xheW91dDtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2Jhci1ncmFwaC9iYXItZ3JhcGhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vYmxhbmtzbGF0ZS9ibGFua3NsYXRlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2RvdWdobnV0L2RvdWdobnV0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xheW91dC1wYWdlL2xheW91dC1wYWdlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1oZWFkZXIvbmF2LWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9uYXYtbWVudS9uYXYtbWVudVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlL3BhZ2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLWhlYWRlci9wYWdlLWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLXNsaWRlci9wYWdlLXNsaWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3RhYi90YWJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdGFicy90YWJzXCI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==
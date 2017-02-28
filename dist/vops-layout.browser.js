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
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(27);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage", []).name;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(43);
__webpack_require__(28);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('barGraph', BarGraphDirective);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var app_1 = __webpack_require__(9);
var template = __webpack_require__(44);
__webpack_require__(29);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module(app_1.default).directive('blankslate', BlankslateDirective);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(45);
__webpack_require__(30);
var BodyHeaderController = (function () {
    function BodyHeaderController() {
    }
    return BodyHeaderController;
}());
var BodyHeaderDirective = (function () {
    function BodyHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(46);
__webpack_require__(31);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(32);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(47);
__webpack_require__(33);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(48);
__webpack_require__(34);
var NavHeaderController = (function () {
    function NavHeaderController() {
    }
    return NavHeaderController;
}());
Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
var NavHeaderDirective = (function () {
    function NavHeaderDirective() {
        this.restrict = 'E';
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(49);
__webpack_require__(35);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(36);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(50);
__webpack_require__(37);
var PageHeaderController = (function () {
    function PageHeaderController() {
    }
    return PageHeaderController;
}());
var PageHeaderDirective = (function () {
    function PageHeaderDirective() {
        this.restrict = 'E';
        this.transclude = true;
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('pageSliderCancel', PageSliderCancelDirective);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(38);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(39);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('page', PageDirective);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(40);
var PaneFooterDirective = (function () {
    function PaneFooterDirective() {
        this.restrict = 'E';
        this.link = function ($scope, $element) {
            $element.parent(".pane").addClass("pane--withFooter");
        };
    }
    return PaneFooterDirective;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(51);
__webpack_require__(41);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('tab', TabDirective);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var template = __webpack_require__(52);
__webpack_require__(42);
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
        this.template = template;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Angular.module("ngLayoutPage").directive('tabs', TabsDirective);


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

module.exports = "<div class=\"bar-graph-bg\">\r\n    <div class=\"bar-graph-fill\" ng-class=\"{'bar-graph-fill--full': vm.isFull}\" ng-style=\"vm.style\" ng-transclude></div>\r\n</div>";

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<i class=\"blankslate-icon {{vm.icon}}\"></i>\r\n<div class=\"blankslate-content\">\r\n    <div class=\"blankslate-content-title\">{{vm.title}}</div>\r\n    <div class=\"blankslate-content-subtitle\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>";

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "<div class=\"body-header-top\">\r\n    <div class=\"body-header-titles\">\r\n        <div class=\"body-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n        <div class=\"body-header-title\">{{vm.title}}</div>\r\n    </div>\r\n    <div class=\"body-header-actions\">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>\r\n<!--<div class=\"body-header-bottom\">\r\n    <div class=\"body-header-subtitle\" ng-show=\"vm.subtitle\">{{vm.subtitle}}</div>\r\n</div>-->";

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<div class=\"doughnut-text\">\r\n    <div ng-transclude></div>\r\n</div>\r\n<canvas class=\"doughnut-hole\"></canvas>\r\n<canvas class=\"doughnut-fill\"></canvas>\r\n<canvas class=\"doughnut-bg\"></canvas>";

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<i ng-if=\"vm.hasIcon\" class=\"nav-group-item-icon\" ng-class=\"vm.iconClass\"></i>\r\n<span class=\"nav-group-item-text\" ng-transclude></span>";

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<span class=\"nav-header-text\">{{vm.text}}</span>\r\n<span class=\"nav-header-small\">{{vm.small}}</span>";

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "<i ng-class=\"vm.iconClass\"></i>";

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header-actions\" ng-transclude></div>\r\n<nav-menu class=\"page-header-navMenu\" icon=\"fa fa-navicon\"></nav-menu>\r\n<div class=\"page-header-titles\">\r\n    <div class=\"page-header-titles-item page-header-titles-item--title\">\r\n        <span class=\"page-header-title\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--subtitle\">\r\n        <span class=\"page-header-subtitle\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n    <div class=\"page-header-titles-item page-header-titles-item--label\">\r\n        <span class=\"page-header-label\" ng-if=\"vm.label\">{{vm.label}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "<a href=\"#\" class=\"pane-header-close\" ng-if=\"vm.showClose\" ng-click=\"vm.close()\">\r\n    <span class=\"pane-header-closeIcon fa fa-close\"></i>\r\n</a>\r\n<div class=\"pane-header-actions\" ng-transclude></div>\r\n<div class=\"pane-header-titles\">\r\n    <div class=\"pane-header-title\">\r\n        <span class=\"pane-header-titleText\">{{vm.title}}</span>\r\n    </div>\r\n    <div class=\"pane-header-subtitle\">\r\n        <span class=\"pane-header-subtitleText\" ng-if=\"vm.subtitle\">{{vm.subtitle}}</span>\r\n    </div>\r\n</div>";

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tab-titles\">\r\n    <div class=\"tab-titles-item\" \r\n        ng-class=\"{'tab-titles-item--selected': tab == vm.selectedTab }\"\r\n        ng-repeat=\"tab in vm.tabs\" \r\n        ng-click=\"vm.selectTab(tab)\">\r\n        <i class=\"tab-titles-item-icon {{tab.icon}}\" ng-if=\"tab.icon\"></i>\r\n        <div class=\"tab-titles-item-title\">{{tab.title}}</div>\r\n    </div>\r\n</div>\r\n<div class=\"tab-content\">\r\n    <div class=\"tab-content-window\" \r\n        ng-style=\"{'width': vm.width, 'left': vm.tabPosition}\"\r\n        ng-transclude>\r\n    </div>\r\n</div>";

/***/ }),
/* 53 */,
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var app_1 = __webpack_require__(9);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app_1.default;
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(13));
__export(__webpack_require__(14));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(22));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(21));
__export(__webpack_require__(20));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTJiMDZiNTg3ZDlkMTY0NDA0MzY/NTJmMyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzPzAwODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgudHM/ZWQyYiIsIndlYnBhY2s6Ly8vLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzP2Q5NWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzPzczNWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0LnRzPzk1NzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzP2Y3ZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzP2QwMjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci50cz85NDE0Iiwid2VicGFjazovLy8uL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cz9iOTAyIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLnRzP2Q4ODYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRzP2YxNDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2Utc2xpZGVyLWNhbmNlbC9wYWdlLXNsaWRlci1jYW5jZWwudHM/YTcxZiIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHM/ODM2NSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS9wYWdlLnRzPzU5ZGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzPzE0NWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzPzM3NTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYi90YWIudHM/YTgzMCIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLnRzPzYyYTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5sZXNzPzI0MWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgubGVzcz9lOWEyIiwid2VicGFjazovLy8uL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUubGVzcz85MWY1Iiwid2VicGFjazovLy8uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzP2FlMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmxlc3M/MGRmMyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UubGVzcz80NmU4Iiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzPzE1NTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5sZXNzP2VjNTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51Lmxlc3M/YjMxOSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzP2NhYzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmxlc3M/OWUyZSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIubGVzcz83OWM4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlL3BhZ2UubGVzcz8yMzcyIiwid2VicGFjazovLy8uL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci5sZXNzP2MxMDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmxlc3M/ZjZjNiIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLmxlc3M/NDM4YiIsIndlYnBhY2s6Ly8vLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5odG1sPzkxZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5odG1sPzM2ODMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWw/YThjZSIsIndlYnBhY2s6Ly8vLi9zcmMvZG91Z2hudXQvZG91Z2hudXQuaHRtbD80MmQ4Iiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sPzYxYTciLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sP2E5NTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51Lmh0bWw/ZDc4OSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbD9iNmM3Iiwid2VicGFjazovLy8uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sPzU4NWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYnMvdGFicy5odG1sP2RhODUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzP2VhYzMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQSx3QkFBb0I7O0FBRXBCLGtCQUFlLE9BQU8s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QUEwQztBQUMxQyxrQ0FBd0Q7QUFDeEQsa0NBQTBDO0FBQzFDLGtDQUEwQztBQUMxQyxrQ0FBMEI7QUFDMUIsa0NBQTRCIiwiZmlsZSI6InZvcHMtbGF5b3V0LmJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1NCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTJiMDZiNTg3ZDlkMTY0NDA0MzYiLCJpbXBvcnQgXCIuL2FwcC5sZXNzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSkubmFtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSBcIi4vYmFyLWdyYXBoLmh0bWxcIjtcclxuaW1wb3J0IFwiLi9iYXItZ3JhcGgubGVzc1wiO1xyXG5cclxuY2xhc3MgQmFyR3JhcGhDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYmFyU3RlcHMgPSAxMDtcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGVyY2VudH0lYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNGdWxsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcmNlbnQgPT0gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Jhck1pbjogbnVtYmVyO1xyXG4gICAgZ2V0IGJhck1pbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJNaW47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhck1pbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyTWluID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Jhck1heDogbnVtYmVyO1xyXG4gICAgZ2V0IGJhck1heCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhck1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyTWF4ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaWNrcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JhclZhbHVlOiBudW1iZXI7XHJcbiAgICBnZXQgYmFyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0UGVyY2VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JhclN0ZXBzOiBudW1iZXI7XHJcbiAgICBnZXQgYmFyU3RlcHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyU3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJhclN0ZXBzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iYXJTdGVwcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrczogbnVtYmVyW107XHJcbiAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgICBpbml0OiBib29sZWFuO1xyXG5cclxuICAgIHNldFBlcmNlbnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG1pbiA9IE51bWJlcih0aGlzLmJhck1pbik7XHJcbiAgICAgICAgdmFyIG1heCA9IE51bWJlcih0aGlzLmJhck1heCk7XHJcbiAgICAgICAgdmFyIHggPSBOdW1iZXIodGhpcy5iYXJWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh4IDwgbWluKVxyXG4gICAgICAgICAgICB4ID0gbWluO1xyXG5cclxuICAgICAgICBpZiAoeCA+IG1heClcclxuICAgICAgICAgICAgeCA9IG1heDtcclxuXHJcbiAgICAgICAgdmFyIGRpdiA9IG1heCAtIG1pbjtcclxuICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKHggLSBtaW4pIC8gZGl2O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpY2tzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgIHZhciBkaXYgPSBOdW1iZXIodGhpcy5iYXJTdGVwcyA9PSBudWxsID8gMTAgOiB0aGlzLmJhclN0ZXBzKTtcclxuICAgICAgICBpZiAoZGl2IDw9IDApXHJcbiAgICAgICAgICAgIGRpdiA9IDE7IC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8gZXJyb3JcclxuXHJcbiAgICAgICAgdmFyIHN0ZXBzID0gKG1heCAtIG1pbikgLyBkaXY7XHJcblxyXG4gICAgICAgIHZhciB0aWNrcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gbWluOyBpbmRleCA8PSBtYXg7IGluZGV4ICs9IHN0ZXBzKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OSlcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMCkgKyBcIktcIjtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwKSArIFwiTVwiO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA5OTk5OTk5OTkpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDAwMDAwMDApICsgXCJCXCI7XHJcbiAgICAgICAgICAgIHRpY2tzLnB1c2godmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXJHcmFwaERpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCYXJHcmFwaENvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBiYXJNaW46ICdAJyxcclxuICAgICAgICBiYXJNYXg6ICdAJyxcclxuICAgICAgICBiYXJWYWx1ZTogJ0AnLFxyXG4gICAgICAgIGJhclN0ZXBzOiAnQD8nXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JhckdyYXBoJywgQmFyR3JhcGhEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLnRzIiwiaW1wb3J0IHZvcHNMYXlvdXQgZnJvbSBcIi4uL2FwcFwiO1xyXG5pbXBvcnQgKiBhcyB0ZW1wbGF0ZSBmcm9tIFwiLi9ibGFua3NsYXRlLmh0bWxcIjtcclxuaW1wb3J0IFwiLi9ibGFua3NsYXRlLmxlc3NcIjtcclxuXHJcbmNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgZ2V0IGhhc1N1YnRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuc3VidGl0bGUgPT0gbnVsbCB8fCB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPT0gMClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmxhbmtzbGF0ZURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCbGFua3NsYXRlQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGljb246ICdAJyxcclxuICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKHZvcHNMYXlvdXQpLmRpcmVjdGl2ZSgnYmxhbmtzbGF0ZScsIEJsYW5rc2xhdGVEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSAnLi9ib2R5LWhlYWRlci5odG1sJztcclxuaW1wb3J0IFwiLi9ib2R5LWhlYWRlci5sZXNzXCI7XHJcblxyXG5jbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci50cyIsImltcG9ydCAqIGFzIHRlbXBsYXRlIGZyb20gJy4vZG91Z2hudXQuaHRtbCc7XHJcbmltcG9ydCBcIi4vZG91Z2hudXQubGVzc1wiO1xyXG5cclxuY2xhc3MgRG91Z2hudXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCBhbmltYXRlKSB7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY29udGV4dEhvbGUgPSBjb250ZXh0SG9sZTtcclxuICAgICAgICB0aGlzLmNvbnRleHRGaWxsID0gY29udGV4dEZpbGw7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0QmcgPSBjb250ZXh0Qmc7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgMCwgdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICBjb250ZXh0SG9sZTogYW55O1xyXG4gICAgY29udGV4dEZpbGw6IGFueTtcclxuICAgIGNvbnRleHRCZzogYW55O1xyXG5cclxuICAgIGFuaW1hdGlvblByb21pc2U6IGFueTtcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBjb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICBlbXB0eUNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgIGlubmVyUmFkaXVzID0gNjU7IC8vIDc1JVxyXG4gICAgYW5pbWF0ZVNwZWVkID0gMTA7XHJcbiAgICBwZXJjZW50T2Zmc2V0ID0gLTI1O1xyXG4gICAgaG9sZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBhbmltYXRlOiAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSA9PiB7fTtcclxuXHJcbiAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCB2YWx1ZShuZXdWYWw6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIG9sZFZhbCwgbmV3VmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckaW50ZXJ2YWwnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRpbnRlcnZhbCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBEb3VnaG51dENvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgIGNvbG9yOiAnQCcsXHJcbiAgICAgICAgY29sb3JDbGFzczogJ0AnLFxyXG4gICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIsICRjdHJsKSA9PiB7XHJcblxyXG4gICAgICAgIHZhciBjb250ZXh0SG9sZSA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtaG9sZVwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHZhciBjb250ZXh0RmlsbCA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtZmlsbFwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHZhciBjb250ZXh0QmcgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWJnXCIpLmdldCgwKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMud2F0Y2hTaXplKCRjdHJsKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgIH0sIGJnY29sb3IgPT4ge1xyXG4gICAgICAgICAgICAvLyBkaWQgYmFja2dyb3VuZCBjb2xvciBjaGFuZ2U/XHJcbiAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBzaXplID0gJGN0cmwuJGVsZW1lbnQud2lkdGgoKSArICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoU2l6ZSgkY3RybCkge1xyXG4gICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldFNpemUoJGN0cmwpO1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgc2l6ZSA9IHRlbXA7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydFRvUmFkaWFucyhwZXJjZW50OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgcmFkaWFucyA9IHBlcmNlbnQgLyAxMDAgKiAzNjAgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdXZWRnZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgIHZhciB0b1JhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnModG8gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuXHJcbiAgICAgICAgLy8gZHJhdyB0aGUgd2VkZ2VcclxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gY3V0IG91dCBhbiBpbm5lci1jaXJjbGUgPT0gZG9udXRcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0LmFyYyhjWCwgY1ksIHJhZGl1cyAqICgkY3RybC5pbm5lclJhZGl1cyAvIDEwMCksIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG5cclxuICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsLCBjWCwgY1ksIHJhZGl1cywgZnJvbSwgdG8sIGZpbGxDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICB2YXIgY1ggPSBNYXRoLmZsb29yKGNvbnRleHQuY2FudmFzLndpZHRoIC8gMik7XHJcbiAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFkoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICByZXR1cm4gY1k7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKHgsIHkpO1xyXG4gICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbGVtZW50U3R5bGUoJGVsZW1lbnQsIGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAvL3ZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudChcImJvZHlcIik7XHJcbiAgICAgICAgdmFyICR0ZW1wID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgJHRlbXAuaW5zZXJ0QWZ0ZXIoJGVsZW1lbnQpO1xyXG4gICAgICAgIC8vJGJvZHkuYXBwZW5kKCR0ZW1wKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSAkdGVtcC5jc3Moc3R5bGUpO1xyXG4gICAgICAgICR0ZW1wLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5pdEJnKCRjdHJsLCBmcm9tLCB0byk7XHJcbiAgICAgICAgdGhpcy5pbml0SG9sZSgkY3RybCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0QmcpO1xyXG5cclxuICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5lbXB0eUNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1lbXB0eS1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0SG9sZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplKCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSk7XHJcblxyXG4gICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHZhciByYWRpdXMgPSB0aGlzLmdldFJhZGl1cyhjWCwgY1kpO1xyXG5cclxuICAgICAgICAkY3RybC5ob2xlQ29sb3IgPSB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QmdDb2xvcigkY3RybDogRG91Z2hudXRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgIGlmIChiZ2NvbG9yID09IFwicmdiYSgwLCAwLCAwLCAwKVwiIHx8IGJnY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKVxyXG4gICAgICAgICAgICBiZ2NvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLiRlbGVtZW50LCAkY3RybC5jb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZmlsbC1jb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIik7XHJcblxyXG4gICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgZmlsbENvbG9yID0gJGN0cmwuY29sb3I7XHJcblxyXG4gICAgICAgIHZhciBuRnJvbSA9IE51bWJlcihmcm9tKTtcclxuICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgaWYgKG5Gcm9tIDwgblRvKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlVXAoJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlRG93bigkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPiB0bykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCBmcm9tLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIDwgdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgdG8sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgIH0sICRjdHJsLmFuaW1hdGVTcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICBpZiAocHJvbWlzZSlcclxuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2RvdWdobnV0JywgRG91Z2hudXREaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsImltcG9ydCBcIi4vbGF5b3V0LXBhZ2UubGVzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGF5b3V0UGFnZUNvbnRyb2xsZXIge1xyXG4gICAgc2hvd05hdigpO1xyXG4gICAgaGlkZU5hdigpO1xyXG4gICAgdG9nZ2xlTmF2KCk7XHJcbn1cclxuXHJcbmNsYXNzIExheW91dFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSUxheW91dFBhZ2VDb250cm9sbGVyIHtcclxuICAgIG9uSW5pdCh1cGRhdGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGUgPSB1cGRhdGU7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNOYXZWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIHNob3dOYXYoKSB7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl91cGRhdGUodGhpcy5faXNOYXZWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlTmF2KCkge1xyXG4gICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZU5hdigpIHtcclxuICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSAhdGhpcy5faXNOYXZWaXNpYmxlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZSh0aGlzLl9pc05hdlZpc2libGUpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ2xheW91dFBhZ2VDb250cm9sbGVyJywgTGF5b3V0UGFnZUNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTGF5b3V0UGFnZURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFQUMnO1xyXG4gICAgY29udHJvbGxlciA9IExheW91dFBhZ2VDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTGF5b3V0UGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICB2YXIgdXBkYXRlID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgaXNWaXNpYmxlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkY3RybC5vbkluaXQodXBkYXRlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdsYXlvdXRQYWdlJywgTGF5b3V0UGFnZURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSAnLi9uYXYtZ3JvdXAtaXRlbS5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtZ3JvdXAtaXRlbS5sZXNzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRQYWdlQ29udHJvbGxlciB9IGZyb20gJy4uL2xheW91dC1wYWdlL2xheW91dC1wYWdlJztcclxuXHJcbmNsYXNzIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nLCAnJHdpbmRvdyddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGF0dHJzLCBwcml2YXRlICRsb2NhdGlvbjogYW5ndWxhci5JTG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlICR3aW5kb3c6IGFuZ3VsYXIuSVdpbmRvd1NlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzICE9IG51bGwgJiYgdGhpcy5pY29uQ2xhc3MubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5ocmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMuJGxvY2F0aW9uLnBhdGgoKTtcclxuICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zZWxlY3RlZC5maWx0ZXIoeCA9PiBwYXRoLmluZGV4T2YoeCkgPT09IDApO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZShuZXdUYWI6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChuZXdUYWIpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCh0aGlzLmhyZWYpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZHcm91cEl0ZW1Db250cm9sbGVyJywgTmF2R3JvdXBJdGVtQ29udHJvbGxlcik7XHJcblxyXG5jbGFzcyBOYXZHcm91cEl0ZW1EaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkY29tcGlsZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgcmVxdWlyZSA9IFsnbmF2R3JvdXBJdGVtJywgJ15sYXlvdXRQYWdlJ107XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gTmF2R3JvdXBJdGVtQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHZhciAkY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyID0gY3RybHNbMV0sXHJcbiAgICAgICAgICAgIGNsaWNrRXZlbnQgPSBgY2xpY2suJHskc2NvcGUuJGlkfWA7XHJcblxyXG4gICAgICAgIC8vIFRvRG86IHRoaXMgaXMgcHJvYmFibHkgZG9uZSBpbmNvcnJlY3RseSBhbmQgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgdGhlIG5hdi1ncm91cCBpbnN0ZWFkXHJcbiAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZS5oaWRlTmF2KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi1ncm91cC1pdGVtLS1zZWxlY3RlZCcsICRjdHJsLmlzU2VsZWN0ZWQpO1xyXG5cclxuICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKCgkY3RybC5ocmVmIHx8IFwiXCIpLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgJGN0cmwubmF2aWdhdGUoZS5jdHJsS2V5IHx8IChlLndoaWNoID09IDIpKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZHcm91cEl0ZW0nLCBOYXZHcm91cEl0ZW1EaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS50cyIsImltcG9ydCAqIGFzIHRlbXBsYXRlIGZyb20gJy4vbmF2LWhlYWRlci5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtaGVhZGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgc21hbGw6IHN0cmluZztcclxufVxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGV4dDogJ0AnLFxyXG4gICAgICAgIHNtYWxsOiAnQCdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZIZWFkZXInLCBOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSAnLi9uYXYtbWVudS5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtbWVudS5sZXNzXCI7XHJcbmltcG9ydCB7IElMYXlvdXRQYWdlQ29udHJvbGxlciB9IGZyb20gJy4uL2xheW91dC1wYWdlL2xheW91dC1wYWdlJztcclxuXHJcbmNsYXNzIE5hdk1lbnVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRhdHRycykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRycy5pY29uO1xyXG4gICAgfVxyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCduYXZDb250cm9sbGVyJywgTmF2TWVudUNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTmF2TWVudURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnXmxheW91dFBhZ2UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IE5hdk1lbnVDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB0cnVlO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkbGF5b3V0UGFnZTogSUxheW91dFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkbGF5b3V0UGFnZS50b2dnbGVOYXYoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZNZW51JywgTmF2TWVudURpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9uYXYtbWVudS9uYXYtbWVudS50cyIsImltcG9ydCBcIi4vcGFnZS1jb250ZW50LW5hdi1pdGVtLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRsb2NhdGlvbiddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgkZWxlbWVudCwgaXNEZWZhdWx0KSB7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5pc0RlZmF1bHQgPSBpc0RlZmF1bHQ7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdDogYm9vbGVhbjtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgICRlbGVtZW50OiBhbnk7XHJcbiAgICBwYXJhbTogc3RyaW5nO1xyXG4gICAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2FyZWE6IHN0cmluZztcclxuICAgIGdldCBhcmVhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FyZWE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFyZWEodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FyZWEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uQXJlYUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0FjdGl2ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlZmF1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC50b0xvd2VyQ2FzZSgpID09IHRoaXMuX2FyZWEudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUm91dGVDaGFuZ2UoJHJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fYXJlYSA9ICRyb3V0ZVBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ107XHJcbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFyZWFDaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcmFtIHx8ICdhcmVhJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IHRoaXMuX2FyZWE7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnNlYXJjaChuYW1lLCB0aGlzLl9hcmVhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUFjdGl2ZSA9ICgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4geyB9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHBhcmFtOiAnQCcsXHJcbiAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgIGFyZWE6ICc9J1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgJGF0dHIuZGVmYXVsdCAhPSBudWxsKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlVXBkYXRlJywgZnVuY3Rpb24gKGV2dCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAkY3RybC5vblJvdXRlQ2hhbmdlKGN1cnJlbnQucGFyYW1zKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlQWN0aXZlKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSB7XHJcbiAgICAgICAgJGN0cmwuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhZ2UtY29udGVudC1uYXYtaXRlbS0tYWN0aXZlJywgJGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2UtY29udGVudC1uYXYtaXRlbS9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0udHMiLCJpbXBvcnQgKiBhcyB0ZW1wbGF0ZSBmcm9tICcuL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG5pbXBvcnQgXCIuL3BhZ2UtaGVhZGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhZ2VIZWFkZXJDb250cm9sbGVyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgUGFnZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlSGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICBsYWJlbDogJ0AnXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VIZWFkZXInLCBQYWdlSGVhZGVyRGlyZWN0aXZlKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLnRzIiwiaW1wb3J0IHsgSVBhZ2VTbGlkZXJDb250cm9sbGVyIH0gZnJvbSBcIi4uL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyXCI7XHJcblxyXG5jbGFzcyBQYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgcmVxdWlyZSA9ICdecGFnZVNsaWRlcic7XHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgc2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KHNsaWRlci5jbG9zZSgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9mZihjbGlja0V2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsImltcG9ydCBcIi4vcGFnZS1zbGlkZXIubGVzc1wiO1xyXG5pbXBvcnQgeyBJUGFnZU92ZXJsYXksIElQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuLi9wYWdlL3BhZ2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VTbGlkZXJDb250cm9sbGVyIHtcclxuICAgIGlzVmlzaWJsZTtcclxuICAgIHdpdGhPdmVybGF5O1xyXG4gICAgY2xvc2UoKTtcclxufVxyXG5cclxuY2xhc3MgUGFnZVNsaWRlckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZVNsaWRlckNvbnRyb2xsZXIsIElQYWdlT3ZlcmxheSB7XHJcbiAgICBwcml2YXRlIF9zbGlkZUlmO1xyXG5cclxuICAgIGdldCBzbGlkZUlmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzbGlkZUlmKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZVZpc2liaWxpdHkpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZTtcclxuICAgIHRvZ2dsZVZpc2liaWxpdHk7XHJcbiAgICB3aXRoRm9vdGVyOiBib29sZWFuO1xyXG4gICAgd2l0aE92ZXJsYXk6IGJvb2xlYW47XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUlmID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGFnZVNsaWRlckRpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnXnBhZ2UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBzbGlkZUlmOiAnPScsXHJcbiAgICAgICAgb25DbG9zZTogJyYnXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkcGFnZTogSVBhZ2VDb250cm9sbGVyLCAkdHJhbnNjbHVkZSkgPT4ge1xyXG4gICAgICAgIHZhciAkY3RybDogUGFnZVNsaWRlckNvbnRyb2xsZXIgPSAkc2NvcGVbdGhpcy5jb250cm9sbGVyQXNdLFxyXG4gICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICRjdHJsLndpdGhPdmVybGF5ID0gJGF0dHJzLnNob3dPdmVybGF5ICE9IG51bGw7XHJcblxyXG4gICAgICAgICRwYWdlLmFkZENvbnRyb2woJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGN0cmwudG9nZ2xlVmlzaWJpbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9ICEhJGN0cmwuc2xpZGVJZjtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlU2xpZGVyLiRzaG93JywgJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2VTbGlkZXIuJGhpZGUnLCAkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJpcy12aXNpYmxlXCIsIGlzVmlzaWJsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwud2l0aE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhZ2Uuc2hvd092ZXJsYXkoJGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICRwYWdlLmhpZGVPdmVybGF5KCRjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNsaWRlclNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU2NvcGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICR0cmFuc2NsdWRlKChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VTbGlkZXInLCBQYWdlU2xpZGVyRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCJpbXBvcnQgXCIuL3BhZ2UubGVzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFnZU92ZXJsYXkge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgYWRkQ29udHJvbChjb250cm9sOiBhbnkpO1xyXG4gICAgc2hvd092ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxuICAgIGhpZGVPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSk7XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2VDb250cm9sbGVyIGltcGxlbWVudHMgSVBhZ2VDb250cm9sbGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgdGhpcy5vdmVybGF5cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgkZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scy5wdXNoKGNvbnRyb2wpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjb250cm9sKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgIGlmIChpZHggPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlzLnB1c2gob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMub3ZlcmxheXMuaW5kZXhPZihvdmVybGF5KTtcclxuICAgICAgICBpZiAoaWR4IDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlzLnNwbGljZShpZHgsIDEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5cy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcInBhZ2UtLW92ZXJsYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcmxheXM6IElQYWdlT3ZlcmxheVtdO1xyXG4gICAgY29udHJvbHM6IGFueVtdO1xyXG4gICAgJGVsZW1lbnQ6IGFueTtcclxufVxyXG5cclxuY2xhc3MgUGFnZURpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdCA9ICdDJztcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlQ29udHJvbGxlcjtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgJGN0cmwuY29udHJvbHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKHgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRjdHJsLmNvbnRyb2xzID0gW107XHJcbiAgICAgICAgJGN0cmwub25Jbml0KCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kY3JlYXRlJywgJGVsZW1lbnQpO1xyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2UuJGRlc3Ryb3knLCAkZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZScsIFBhZ2VEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlL3BhZ2UudHMiLCJpbXBvcnQgXCIuL3BhbmUtZm9vdGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSBcIi4vcGFuZS1oZWFkZXIuaHRtbFwiO1xyXG5pbXBvcnQgXCIuL3BhbmUtaGVhZGVyLmxlc3NcIjtcclxuaW1wb3J0IHsgSVBhZ2VTbGlkZXJDb250cm9sbGVyIH0gZnJvbSBcIi4uL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyXCI7XHJcblxyXG5jbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICBvbkNsb3NlOiBhbnk7XHJcblxyXG4gICAgb25Jbml0KHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlciwgc2hvd0Nsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICB0aGlzLnNob3dDbG9zZSA9IHNob3dDbG9zZTtcclxuICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGFzU3VidGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VidGl0bGUgIT0gbnVsbCAmJiB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3N1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VidGl0bGU7XHJcbiAgICB9XHJcbiAgICBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3N1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0V2l0aFN1YnRpdGxlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFdpdGhTdWJ0aXRsZTtcclxufVxyXG5cclxuY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICBjdHJsLnNldFdpdGhTdWJ0aXRsZSA9IChoYXNTdWJ0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFuZS1oZWFkZXItLXdpdGhTdWJ0aXRsZScsIGhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3RybC5vbkluaXQocGFnZVNsaWRlciwgJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsImltcG9ydCB7IElUYWJzQ29udHJvbGxlciwgSVRhYkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vdGFicy90YWJzXCI7XHJcblxyXG5jbGFzcyBUYWJDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcmVxdWlyZSA9IFsnXnRhYnMnLCAndGFiJ107XHJcbiAgICBjb250cm9sbGVyID0gVGFiQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgbmFtZTogJ0AnLFxyXG4gICAgICAgIGljb246ICdAJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICR0YWJzLmFkZFRhYigkY3RybCk7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50KS5yZW1vdmVBdHRyKCd0aXRsZScpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWIvdGFiLnRzIiwiaW1wb3J0ICogYXMgdGVtcGxhdGUgZnJvbSBcIi4vdGFicy5odG1sXCI7XHJcbmltcG9ydCBcIi4vdGFicy5sZXNzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKTtcclxuICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpO1xyXG4gICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBUYWJzQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJzQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZFRhYjogSVRhYkNvbnRyb2xsZXI7XHJcbiAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlVGFiICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlOYW1lKHRoaXMuX2FjdGl2ZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XHJcbiAgICBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYWN0aXZlVGFiKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IG5hbWU7XHJcbiAgICAgICAgaWYgKHRoaXMudGFicyAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy50YWJzLmxlbmd0aCAqIDEwMH0lYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkeCAqIC0xMDB9JWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnRhYnMuZmlsdGVyKHggPT4geC5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgIGlmIChmb3VuZC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFic1tpZHhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoKSB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJMaW5rOiBJVGFic0NvbnRyb2xsZXJcclxuICAgIHRhYkRlZmF1bHQ6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVGFic0RpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBUYWJzQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRhYkxpbms6ICc9JyxcclxuICAgICAgICBhY3RpdmVUYWI6ICc9J1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICBpZiAoJGF0dHJzLnRhYkxpbmspXHJcbiAgICAgICAgICAgICRjdHJsLnRhYkxpbmsgPSAkY3RybDtcclxuICAgICAgICAkY3RybC5vbkluaXQoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgndGFicycsIFRhYnNEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWJzL3RhYnMudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZG91Z2hudXQvZG91Z2hudXQubGVzc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xheW91dC1wYWdlL2xheW91dC1wYWdlLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtbWVudS9uYXYtbWVudS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlL3BhZ2UubGVzc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFicy90YWJzLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImJhci1ncmFwaC1iZ1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImJhci1ncmFwaC1maWxsXFxcIiBuZy1jbGFzcz1cXFwieydiYXItZ3JhcGgtZmlsbC0tZnVsbCc6IHZtLmlzRnVsbH1cXFwiIG5nLXN0eWxlPVxcXCJ2bS5zdHlsZVxcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxpIGNsYXNzPVxcXCJibGFua3NsYXRlLWljb24ge3t2bS5pY29ufX1cXFwiPjwvaT5cXHJcXG48ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnRcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnQtdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJibGFua3NsYXRlLWNvbnRlbnQtc3VidGl0bGVcXFwiPlxcclxcbiAgICAgICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdG9wXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVzXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImJvZHktaGVhZGVyLXN1YnRpdGxlXFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItYWN0aW9uc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjwhLS08ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1ib3R0b21cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1zdWJ0aXRsZVxcXCIgbmctc2hvdz1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbjwvZGl2Pi0tPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImRvdWdobnV0LXRleHRcXFwiPlxcclxcbiAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPGNhbnZhcyBjbGFzcz1cXFwiZG91Z2hudXQtaG9sZVxcXCI+PC9jYW52YXM+XFxyXFxuPGNhbnZhcyBjbGFzcz1cXFwiZG91Z2hudXQtZmlsbFxcXCI+PC9jYW52YXM+XFxyXFxuPGNhbnZhcyBjbGFzcz1cXFwiZG91Z2hudXQtYmdcXFwiPjwvY2FudmFzPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxpIG5nLWlmPVxcXCJ2bS5oYXNJY29uXFxcIiBjbGFzcz1cXFwibmF2LWdyb3VwLWl0ZW0taWNvblxcXCIgbmctY2xhc3M9XFxcInZtLmljb25DbGFzc1xcXCI+PC9pPlxcclxcbjxzcGFuIGNsYXNzPVxcXCJuYXYtZ3JvdXAtaXRlbS10ZXh0XFxcIiBuZy10cmFuc2NsdWRlPjwvc3Bhbj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5odG1sXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci10ZXh0XFxcIj57e3ZtLnRleHR9fTwvc3Bhbj5cXHJcXG48c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci1zbWFsbFxcXCI+e3t2bS5zbWFsbH19PC9zcGFuPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCI8aSBuZy1jbGFzcz1cXFwidm0uaWNvbkNsYXNzXFxcIj48L2k+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItYWN0aW9uc1xcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48bmF2LW1lbnUgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLW5hdk1lbnVcXFwiIGljb249XFxcImZhIGZhLW5hdmljb25cXFwiPjwvbmF2LW1lbnU+XFxyXFxuPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0gcGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0tLXRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZVxcXCI+e3t2bS50aXRsZX19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0gcGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0tLXN1YnRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYWdlLWhlYWRlci1zdWJ0aXRsZVxcXCIgbmctaWY9XFxcInZtLnN1YnRpdGxlXFxcIj57e3ZtLnN1YnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYWdlLWhlYWRlci10aXRsZXMtaXRlbSBwYWdlLWhlYWRlci10aXRsZXMtaXRlbS0tbGFiZWxcXFwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInBhZ2UtaGVhZGVyLWxhYmVsXFxcIiBuZy1pZj1cXFwidm0ubGFiZWxcXFwiPnt7dm0ubGFiZWx9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInBhbmUtaGVhZGVyLWNsb3NlXFxcIiBuZy1pZj1cXFwidm0uc2hvd0Nsb3NlXFxcIiBuZy1jbGljaz1cXFwidm0uY2xvc2UoKVxcXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJwYW5lLWhlYWRlci1jbG9zZUljb24gZmEgZmEtY2xvc2VcXFwiPjwvaT5cXHJcXG48L2E+XFxyXFxuPGRpdiBjbGFzcz1cXFwicGFuZS1oZWFkZXItYWN0aW9uc1xcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItdGl0bGVUZXh0XFxcIj57e3ZtLnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci1zdWJ0aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItc3VidGl0bGVUZXh0XFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwidGFiLXRpdGxlc1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi10aXRsZXMtaXRlbVxcXCIgXFxyXFxuICAgICAgICBuZy1jbGFzcz1cXFwieyd0YWItdGl0bGVzLWl0ZW0tLXNlbGVjdGVkJzogdGFiID09IHZtLnNlbGVjdGVkVGFiIH1cXFwiXFxyXFxuICAgICAgICBuZy1yZXBlYXQ9XFxcInRhYiBpbiB2bS50YWJzXFxcIiBcXHJcXG4gICAgICAgIG5nLWNsaWNrPVxcXCJ2bS5zZWxlY3RUYWIodGFiKVxcXCI+XFxyXFxuICAgICAgICA8aSBjbGFzcz1cXFwidGFiLXRpdGxlcy1pdGVtLWljb24ge3t0YWIuaWNvbn19XFxcIiBuZy1pZj1cXFwidGFiLmljb25cXFwiPjwvaT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRhYi10aXRsZXMtaXRlbS10aXRsZVxcXCI+e3t0YWIudGl0bGV9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50LXdpbmRvd1xcXCIgXFxyXFxuICAgICAgICBuZy1zdHlsZT1cXFwieyd3aWR0aCc6IHZtLndpZHRoLCAnbGVmdCc6IHZtLnRhYlBvc2l0aW9ufVxcXCJcXHJcXG4gICAgICAgIG5nLXRyYW5zY2x1ZGU+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RhYnMvdGFicy5odG1sXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB2b3BzTGF5b3V0IGZyb20gXCIuL2FwcFwiXHJcbmV4cG9ydCBkZWZhdWx0IHZvcHNMYXlvdXQ7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9iYXItZ3JhcGgvYmFyLWdyYXBoXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ib2R5LWhlYWRlci9ib2R5LWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9kb3VnaG51dC9kb3VnaG51dFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9uYXYtaGVhZGVyL25hdi1oZWFkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbmF2LW1lbnUvbmF2LW1lbnVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS9wYWdlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhZ2UtY29udGVudC1uYXYtaXRlbS9wYWdlLWNvbnRlbnQtbmF2LWl0ZW1cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYW5lLWZvb3Rlci9wYW5lLWZvb3RlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYW5lLWhlYWRlci9wYW5lLWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi90YWIvdGFiXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3RhYnMvdGFic1wiO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=
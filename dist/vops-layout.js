(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(31);
exports.default = Angular.module("ngLayoutPage", []).name;


/***/ }),
/* 1 */,
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jQuery = __webpack_require__(57);
window['$'] = window['jQuery'] = jQuery;
__webpack_require__(30);
__webpack_require__(25);
__webpack_require__(21);
__webpack_require__(23);
var angular_typescript_module_1 = __webpack_require__(28);
window['Angular'] = angular_typescript_module_1.default;


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
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
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(19);
var app_1 = __webpack_require__(0);
exports.default = app_1.default;
__export(__webpack_require__(2));
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(7));
__export(__webpack_require__(8));
__export(__webpack_require__(9));
__export(__webpack_require__(14));
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(13));
__export(__webpack_require__(12));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));


/***/ })
],[58])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLnRzIiwid2VicGFjazovLy8uL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1tZW51L25hdi1tZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXItY2FuY2VsL3BhZ2Utc2xpZGVyLWNhbmNlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2UvcGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1mb290ZXIvcGFuZS1mb290ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90YWIvdGFiLnRzIiwid2VicGFjazovLy8uL3NyYy90YWJzL3RhYnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlbmRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9iYXItZ3JhcGgvYmFyLWdyYXBoLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9kb3VnaG51dC9kb3VnaG51dC5sZXNzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci5sZXNzIiwid2VicGFjazovLy8uL3NyYy9wYWdlL3BhZ2UubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1mb290ZXIvcGFuZS1mb290ZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFicy90YWJzLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGguaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9uYXYtbWVudS9uYXYtbWVudS5odG1sIiwid2VicGFjazovLy8uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci5odG1sIiwid2VicGFjazovLy8uL3NyYy90YWJzL3RhYnMuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLHdCQUFvQjtBQUVwQixrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FDRnZELCtDQUF3QztBQUN4Qyx3QkFBMEI7QUFFMUI7SUFDSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHNCQUFJLHFDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUM7Z0JBQ0gsS0FBSyxFQUFLLElBQUksQ0FBQyxPQUFPLE1BQUc7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFNO2FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxzQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQVcsS0FBYTtZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFB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LHlEOzs7Ozs7OztBQ0FoSSw0RkFBNkMsU0FBUywrRkFBK0YsVUFBVSx3SDs7Ozs7Ozs7QUNBL0osZ05BQWlLLGFBQWEscURBQXFELFVBQVUsNE9BQTRPLGFBQWEscUI7Ozs7Ozs7O0FDQXRlLDhROzs7Ozs7OztBQ0FBLGtOOzs7Ozs7OztBQ0FBLGlHQUFrRCxTQUFTLDhDQUE4QyxVQUFVLFM7Ozs7Ozs7O0FDQW5ILGtHOzs7Ozs7OztBQ0FBLHdXQUF5VCxVQUFVLCtLQUErSyxhQUFhLHNLQUFzSyxVQUFVLGlDOzs7Ozs7OztBQ0EvcUIsNFpBQTZXLFVBQVUsOElBQThJLGFBQWEsaUM7Ozs7Ozs7O0FDQWxoQix3SkFBeUcsb0RBQW9ELG9JQUFvSSxVQUFVLDZFQUE2RSxXQUFXLCtIQUErSCwwQ0FBMEMsc0Q7Ozs7Ozs7Ozs7Ozs7QUNBNWlCLHdCQUFtQjtBQUNuQixtQ0FBOEI7QUFFOUIsa0JBQWUsYUFBVSxDQUFDO0FBRTFCLGlDQUFzQztBQUN0QyxpQ0FBd0M7QUFDeEMsaUNBQTBDO0FBQzFDLGlDQUFvQztBQUNwQyxpQ0FBMEM7QUFDMUMsaUNBQWdEO0FBQ2hELGlDQUF3QztBQUN4QyxpQ0FBb0M7QUFDcEMsa0NBQTRCO0FBQzVCLGtDQUE4RDtBQUM5RCxrQ0FBMEM7QUFDMUMsa0NBQTBDO0FBQzFDLGtDQUF3RDtBQUN4RCxrQ0FBMEM7QUFDMUMsa0NBQTBDO0FBQzFDLGtDQUEwQjtBQUMxQixrQ0FBNEIiLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL2FwcC5sZXNzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSkubmFtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gXCIuL2Jhci1ncmFwaC5odG1sXCI7XHJcbmltcG9ydCBcIi4vYmFyLWdyYXBoLmxlc3NcIjtcclxuXHJcbmNsYXNzIEJhckdyYXBoQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhclN0ZXBzID0gMTA7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQZXJjZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBlcmNlbnR9JWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzRnVsbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJjZW50ID09IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iYXJNaW46IG51bWJlcjtcclxuICAgIGdldCBiYXJNaW4oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWluO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBiYXJNaW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Jhck1pbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iYXJNYXg6IG51bWJlcjtcclxuICAgIGdldCBiYXJNYXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBiYXJNYXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Jhck1heCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0VGlja3MoKTtcclxuICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iYXJWYWx1ZTogbnVtYmVyO1xyXG4gICAgZ2V0IGJhclZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBiYXJWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFBlcmNlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9iYXJTdGVwczogbnVtYmVyO1xyXG4gICAgZ2V0IGJhclN0ZXBzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhclN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBiYXJTdGVwcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmFyU3RlcHMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGlja3M6IG51bWJlcltdO1xyXG4gICAgcGVyY2VudDogbnVtYmVyO1xyXG4gICAgaW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICBzZXRQZXJjZW50KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBtaW4gPSBOdW1iZXIodGhpcy5iYXJNaW4pO1xyXG4gICAgICAgIHZhciBtYXggPSBOdW1iZXIodGhpcy5iYXJNYXgpO1xyXG4gICAgICAgIHZhciB4ID0gTnVtYmVyKHRoaXMuYmFyVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoeCA8IG1pbilcclxuICAgICAgICAgICAgeCA9IG1pbjtcclxuXHJcbiAgICAgICAgaWYgKHggPiBtYXgpXHJcbiAgICAgICAgICAgIHggPSBtYXg7XHJcblxyXG4gICAgICAgIHZhciBkaXYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcblxyXG4gICAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqICh4IC0gbWluKSAvIGRpdjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaWNrcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgbWluID0gTnVtYmVyKHRoaXMuYmFyTWluKTtcclxuICAgICAgICB2YXIgbWF4ID0gTnVtYmVyKHRoaXMuYmFyTWF4KTtcclxuICAgICAgICB2YXIgZGl2ID0gTnVtYmVyKHRoaXMuYmFyU3RlcHMgPT0gbnVsbCA/IDEwIDogdGhpcy5iYXJTdGVwcyk7XHJcbiAgICAgICAgaWYgKGRpdiA8PSAwKVxyXG4gICAgICAgICAgICBkaXYgPSAxOyAvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvIGVycm9yXHJcblxyXG4gICAgICAgIHZhciBzdGVwcyA9IChtYXggLSBtaW4pIC8gZGl2O1xyXG5cclxuICAgICAgICB2YXIgdGlja3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IG1pbjsgaW5kZXggPD0gbWF4OyBpbmRleCArPSBzdGVwcykge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiA5OTkpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCAvIDEwMDApICsgXCJLXCI7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDk5OTk5OSlcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4IC8gMTAwMDAwMCkgKyBcIk1cIjtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gOTk5OTk5OTk5KVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoaW5kZXggLyAxMDAwMDAwMDAwKSArIFwiQlwiO1xyXG4gICAgICAgICAgICB0aWNrcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGlja3MgPSB0aWNrcztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmFyR3JhcGhEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gQmFyR3JhcGhDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgYmFyTWluOiAnQCcsXHJcbiAgICAgICAgYmFyTWF4OiAnQCcsXHJcbiAgICAgICAgYmFyVmFsdWU6ICdAJyxcclxuICAgICAgICBiYXJTdGVwczogJ0A/J1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdiYXJHcmFwaCcsIEJhckdyYXBoRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmFyLWdyYXBoL2Jhci1ncmFwaC50cyIsImltcG9ydCB2b3BzTGF5b3V0IGZyb20gXCIuLi9hcHBcIjtcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gXCIuL2JsYW5rc2xhdGUuaHRtbFwiO1xyXG5pbXBvcnQgXCIuL2JsYW5rc2xhdGUubGVzc1wiO1xyXG5cclxuY2xhc3MgQmxhbmtzbGF0ZUNvbnRyb2xsZXIge1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBnZXQgaGFzU3VidGl0bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgaWNvbjogJ0AnLFxyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUodm9wc0xheW91dCkuZGlyZWN0aXZlKCdibGFua3NsYXRlJywgQmxhbmtzbGF0ZURpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9ib2R5LWhlYWRlci5odG1sJztcclxuaW1wb3J0IFwiLi9ib2R5LWhlYWRlci5sZXNzXCI7XHJcblxyXG5jbGFzcyBCb2R5SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgc3VidGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgQm9keUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdib2R5SGVhZGVyJywgQm9keUhlYWRlckRpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2RvdWdobnV0Lmh0bWwnO1xyXG5pbXBvcnQgXCIuL2RvdWdobnV0Lmxlc3NcIjtcclxuXHJcbmNsYXNzIERvdWdobnV0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0KCRlbGVtZW50LCBjb250ZXh0SG9sZSwgY29udGV4dEZpbGwsIGNvbnRleHRCZywgYW5pbWF0ZSkge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICB0aGlzLmNvbnRleHRIb2xlID0gY29udGV4dEhvbGU7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0RmlsbCA9IGNvbnRleHRGaWxsO1xyXG4gICAgICAgIHRoaXMuY29udGV4dEJnID0gY29udGV4dEJnO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMsIDAsIHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgICRlbGVtZW50OiBhbnk7XHJcblxyXG4gICAgY29udGV4dEhvbGU6IGFueTtcclxuICAgIGNvbnRleHRGaWxsOiBhbnk7XHJcbiAgICBjb250ZXh0Qmc6IGFueTtcclxuXHJcbiAgICBhbmltYXRpb25Qcm9taXNlOiBhbnk7XHJcbiAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgY29sb3JDbGFzczogc3RyaW5nO1xyXG4gICAgZW1wdHlDb2xvckNsYXNzOiBzdHJpbmc7XHJcbiAgICBpbm5lclJhZGl1cyA9IDY1OyAvLyA3NSVcclxuICAgIGFuaW1hdGVTcGVlZCA9IDEwO1xyXG4gICAgcGVyY2VudE9mZnNldCA9IC0yNTtcclxuICAgIGhvbGVDb2xvcjogc3RyaW5nO1xyXG4gICAgYW5pbWF0ZTogKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgX3ZhbHVlOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUobmV3VmFsOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWw7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLCBvbGRWYWwsIG5ld1ZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEb3VnaG51dERpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJGludGVydmFsJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaW50ZXJ2YWwpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gRG91Z2hudXRDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdmFsdWU6ICdAJyxcclxuICAgICAgICBjb2xvcjogJ0AnLFxyXG4gICAgICAgIGNvbG9yQ2xhc3M6ICdAJyxcclxuICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6ICdAJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybCkgPT4ge1xyXG5cclxuICAgICAgICB2YXIgY29udGV4dEhvbGUgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWhvbGVcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB2YXIgY29udGV4dEZpbGwgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWZpbGxcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB2YXIgY29udGV4dEJnID0gJGVsZW1lbnQuZmluZChcImNhbnZhcy5kb3VnaG51dC1iZ1wiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCAoJGN0cmwsIGZyb20sIHRvKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCRjdHJsLCAwLCAkY3RybC52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLndhdGNoU2l6ZSgkY3RybCk7XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICB9LCBiZ2NvbG9yID0+IHtcclxuICAgICAgICAgICAgLy8gZGlkIGJhY2tncm91bmQgY29sb3IgY2hhbmdlP1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciAhPSAkY3RybC5ob2xlQ29sb3IpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgc2l6ZSA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCkgKyAkY3RybC4kZWxlbWVudC5oZWlnaHQoKTtcclxuICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICB3YXRjaFNpemUoJGN0cmwpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBzaXplICE9IHRlbXA7XHJcbiAgICAgICAgICAgIHNpemUgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYW5nZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnRUb1JhZGlhbnMocGVyY2VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHJhZGlhbnMgPSBwZXJjZW50IC8gMTAwICogMzYwICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICByZXR1cm4gcmFkaWFucztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3V2VkZ2UoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGZyb21SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKGZyb20gKyAkY3RybC5wZXJjZW50T2Zmc2V0KTtcclxuICAgICAgICB2YXIgdG9SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKHRvICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcblxyXG4gICAgICAgIC8vIGRyYXcgdGhlIHdlZGdlXHJcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzLCB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoJGN0cmwucGVyY2VudE9mZnNldCksIHRvUmFkaWFucywgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3RG9udXQoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55LCBjWDogbnVtYmVyLCBjWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyhjWCwgY1kpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMgKiAoJGN0cmwuaW5uZXJSYWRpdXMgLyAxMDApLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNpemUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSAkY3RybC4kZWxlbWVudC53aWR0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9ICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuXHJcbiAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIGNZID0gdGhpcy5nZXRZKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1dlZGdlKCRjdHJsLCAkY3RybC5jb250ZXh0RmlsbCwgY1gsIGNZLCByYWRpdXMsIGZyb20sIHRvLCBmaWxsQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFgoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgdmFyIGNYID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy53aWR0aCAvIDIpO1xyXG4gICAgICAgIHJldHVybiBjWDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZKGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgIHZhciBjWSA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgcmV0dXJuIGNZO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhZGl1cyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbih4LCB5KTtcclxuICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RWxlbWVudFN0eWxlKCRlbGVtZW50LCBjbGFzc05hbWUsIHN0eWxlKSB7XHJcbiAgICAgICAgLy92YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoXCJib2R5XCIpO1xyXG4gICAgICAgIHZhciAkdGVtcCA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPjwvZGl2PmApO1xyXG4gICAgICAgICR0ZW1wLmluc2VydEFmdGVyKCRlbGVtZW50KTtcclxuICAgICAgICAvLyRib2R5LmFwcGVuZCgkdGVtcCk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHRlbXAuY3NzKHN0eWxlKTtcclxuICAgICAgICAkdGVtcC5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgIHRoaXMuaW5pdEhvbGUoJGN0cmwpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QmcoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyIHwgc3RyaW5nLCB0bzogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEJnKTtcclxuXHJcbiAgICAgICAgdmFyIGVtcHR5Q29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC4kZWxlbWVudCwgJGN0cmwuZW1wdHlDb2xvckNsYXNzIHx8IFwiZG91Z2hudXQtZW1wdHktY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3V2VkZ2UoJGN0cmwsICRjdHJsLmNvbnRleHRCZywgY1gsIGNZLCByYWRpdXMsIDAsIDEwMCwgZW1wdHlDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEhvbGUoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEhvbGUpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUpO1xyXG5cclxuICAgICAgICB2YXIgY1ggPSB0aGlzLmdldFgoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgJGN0cmwuaG9sZUNvbG9yID0gdGhpcy5nZXRCZ0NvbG9yKCRjdHJsKTtcclxuICAgICAgICB0aGlzLmRyYXdEb251dCgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUsIGNYLCBjWSwgcmFkaXVzLCAkY3RybC5ob2xlQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJnQ29sb3IoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBiZ2NvbG9yID0gJGN0cmwuJGVsZW1lbnQuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIiB8fCBiZ2NvbG9yID09IFwidHJhbnNwYXJlbnRcIilcclxuICAgICAgICAgICAgYmdjb2xvciA9IFwid2hpdGVcIjtcclxuICAgICAgICByZXR1cm4gYmdjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgIHZhciBmaWxsQ29sb3IgPSB0aGlzLmdldEVsZW1lbnRTdHlsZSgkY3RybC4kZWxlbWVudCwgJGN0cmwuY29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWZpbGwtY29sb3JcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG5cclxuICAgICAgICBpZiAoJGN0cmwuY29sb3IpXHJcbiAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICB2YXIgbkZyb20gPSBOdW1iZXIoZnJvbSk7XHJcbiAgICAgICAgdmFyIG5UbyA9IE51bWJlcih0byk7XHJcblxyXG4gICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZVVwKCRjdHJsLCBuRnJvbSwgblRvLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVVwKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGZyb207XHJcbiAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID4gdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdygkY3RybCwgZnJvbSwgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgIHZhbHVlKys7XHJcbiAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRG93bigkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICRjdHJsLmFuaW1hdGlvblByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIHRvLCB2YWx1ZSwgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgdmFsdWUtLTtcclxuICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbChwcm9taXNlKSB7XHJcbiAgICAgICAgaWYgKHByb21pc2UpXHJcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbChwcm9taXNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdkb3VnaG51dCcsIERvdWdobnV0RGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZG91Z2hudXQvZG91Z2hudXQudHMiLCJpbXBvcnQgXCIuL2xheW91dC1wYWdlLmxlc3NcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxheW91dFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHNob3dOYXYoKTtcclxuICAgIGhpZGVOYXYoKTtcclxuICAgIHRvZ2dsZU5hdigpO1xyXG59XHJcblxyXG5jbGFzcyBMYXlvdXRQYWdlQ29udHJvbGxlciBpbXBsZW1lbnRzIElMYXlvdXRQYWdlQ29udHJvbGxlciB7XHJcbiAgICBvbkluaXQodXBkYXRlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlID0gdXBkYXRlO1xyXG4gICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzTmF2VmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBzaG93TmF2KCkge1xyXG4gICAgICAgIHRoaXMuX2lzTmF2VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlKHRoaXMuX2lzTmF2VmlzaWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU5hdigpIHtcclxuICAgICAgICB0aGlzLl9pc05hdlZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGRhdGUodGhpcy5faXNOYXZWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVOYXYoKSB7XHJcbiAgICAgICAgdGhpcy5faXNOYXZWaXNpYmxlID0gIXRoaXMuX2lzTmF2VmlzaWJsZTtcclxuICAgICAgICB0aGlzLl91cGRhdGUodGhpcy5faXNOYXZWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5jb250cm9sbGVyKCdsYXlvdXRQYWdlQ29udHJvbGxlcicsIExheW91dFBhZ2VDb250cm9sbGVyKTtcclxuXHJcbmNsYXNzIExheW91dFBhZ2VEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRUFDJztcclxuICAgIGNvbnRyb2xsZXIgPSBMYXlvdXRQYWdlQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IExheW91dFBhZ2VDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgdmFyIHVwZGF0ZSA9IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ25hdi0tc2hvdycsIGlzVmlzaWJsZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJGN0cmwub25Jbml0KHVwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbGF5b3V0UGFnZScsIExheW91dFBhZ2VEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZS50cyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG5pbXBvcnQgXCIuL25hdi1ncm91cC1pdGVtLmxlc3NcIjtcclxuaW1wb3J0IHsgSUxheW91dFBhZ2VDb250cm9sbGVyIH0gZnJvbSAnLi4vbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UnO1xyXG5cclxuY2xhc3MgTmF2R3JvdXBJdGVtQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJywgJyRsb2NhdGlvbicsICckd2luZG93J107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uOiBhbmd1bGFyLklMb2NhdGlvblNlcnZpY2UsIHByaXZhdGUgJHdpbmRvdzogYW5ndWxhci5JV2luZG93U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGFzSWNvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3MgIT0gbnVsbCAmJiB0aGlzLmljb25DbGFzcy5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpY29uQ2xhc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhyZWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmhyZWY7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZWQ6IHN0cmluZ1tdO1xyXG5cclxuICAgIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy4kbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmhyZWYgIT0gbnVsbCAmJiBwYXRoLmluZGV4T2YodGhpcy5ocmVmKSA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLmZpbHRlcih4ID0+IHBhdGguaW5kZXhPZih4KSA9PT0gMCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlKG5ld1RhYjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKG5ld1RhYikge1xyXG4gICAgICAgICAgICB0aGlzLiR3aW5kb3cub3Blbih0aGlzLmhyZWYsICdfYmxhbmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kbG9jYXRpb24udXJsKHRoaXMuaHJlZik7XHJcbiAgICB9XHJcbn1cclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmNvbnRyb2xsZXIoJ25hdkdyb3VwSXRlbUNvbnRyb2xsZXInLCBOYXZHcm91cEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbmNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRjb21waWxlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0ID0gJ0FFQyc7XHJcbiAgICByZXF1aXJlID0gWyduYXZHcm91cEl0ZW0nLCAnXmxheW91dFBhZ2UnXTtcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgdmFyICRjdHJsOiBOYXZHcm91cEl0ZW1Db250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICRsYXlvdXRQYWdlOiBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgPSBjdHJsc1sxXSxcclxuICAgICAgICAgICAgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgLy8gVG9EbzogdGhpcyBpcyBwcm9iYWJseSBkb25lIGluY29ycmVjdGx5IGFuZCBzaG91bGQgYmUgY29udHJvbGxlZCBieSB0aGUgbmF2LWdyb3VwIGluc3RlYWRcclxuICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICRsYXlvdXRQYWdlLmhpZGVOYXYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygnbmF2LWdyb3VwLWl0ZW0tLXNlbGVjdGVkJywgJGN0cmwuaXNTZWxlY3RlZCk7XHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKCRjdHJsLmhyZWYgfHwgXCJcIikubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAkY3RybC5uYXZpZ2F0ZShlLmN0cmxLZXkgfHwgKGUud2hpY2ggPT0gMikpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbmF2LWhlYWRlci5odG1sJztcclxuaW1wb3J0IFwiLi9uYXYtaGVhZGVyLmxlc3NcIjtcclxuXHJcbmNsYXNzIE5hdkhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgc21hbGw6IHN0cmluZztcclxufVxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGV4dDogJ0AnLFxyXG4gICAgICAgIHNtYWxsOiAnQCdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCduYXZIZWFkZXInLCBOYXZIZWFkZXJEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbmF2LWhlYWRlci9uYXYtaGVhZGVyLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbmF2LW1lbnUuaHRtbCc7XHJcbmltcG9ydCBcIi4vbmF2LW1lbnUubGVzc1wiO1xyXG5pbXBvcnQgeyBJTGF5b3V0UGFnZUNvbnRyb2xsZXIgfSBmcm9tICcuLi9sYXlvdXQtcGFnZS9sYXlvdXQtcGFnZSc7XHJcblxyXG5jbGFzcyBOYXZNZW51Q29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJGF0dHJzJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgIH1cclxufVxyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIE5hdk1lbnVDb250cm9sbGVyKTtcclxuXHJcbmNsYXNzIE5hdk1lbnVEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICByZXF1aXJlID0gJ15sYXlvdXRQYWdlJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBOYXZNZW51Q29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0gdHJ1ZTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGxheW91dFBhZ2U6IElMYXlvdXRQYWdlQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgJGxheW91dFBhZ2UudG9nZ2xlTmF2KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnbmF2TWVudScsIE5hdk1lbnVEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUudHMiLCJpbXBvcnQgXCIuL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzXCI7XHJcblxyXG5jbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckbG9jYXRpb24nXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRsb2NhdGlvbikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoJGVsZW1lbnQsIGlzRGVmYXVsdCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuaXNEZWZhdWx0ID0gaXNEZWZhdWx0O1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQ6IGJvb2xlYW47XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAkZWxlbWVudDogYW55O1xyXG4gICAgcGFyYW06IHN0cmluZztcclxuICAgIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9hcmVhOiBzdHJpbmc7XHJcbiAgICBnZXQgYXJlYSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhcmVhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hcmVhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkFyZWFDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNBY3RpdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FyZWEgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGgudG9Mb3dlckNhc2UoKSA9PSB0aGlzLl9hcmVhLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0KCkge1xyXG4gICAgICAgIHRoaXMuYXJlYSA9IHRoaXMucGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgIHRoaXMuX2FyZWEgPSAkcm91dGVQYXJhbXNbdGhpcy5wYXJhbSB8fCAnYXJlYSddO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BcmVhQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJhbSB8fCAnYXJlYSc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICBwYXJhbXNbbmFtZV0gPSB0aGlzLl9hcmVhO1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gocGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gobmFtZSwgdGhpcy5fYXJlYSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVBY3RpdmUgPSAoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHsgfVxyXG59XHJcblxyXG5jbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICBtdWx0aUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgY29udHJvbGxlciA9IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBwYXJhbTogJ0AnLFxyXG4gICAgICAgIHBhdGg6ICdAJyxcclxuICAgICAgICBhcmVhOiAnPSdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkY3RybC50b2dnbGVBY3RpdmUgPSB0aGlzLnRvZ2dsZUFjdGl2ZTtcclxuICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsICRhdHRyLmRlZmF1bHQgIT0gbnVsbCk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJyRyb3V0ZVVwZGF0ZScsIGZ1bmN0aW9uIChldnQsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgJGN0cmwub25Sb3V0ZUNoYW5nZShjdXJyZW50LnBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRvZ2dsZUFjdGl2ZSgkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikge1xyXG4gICAgICAgICRjdHJsLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdwYWdlLWNvbnRlbnQtbmF2LWl0ZW0tLWFjdGl2ZScsICRjdHJsLmlzQWN0aXZlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlQ29udGVudE5hdkl0ZW0nLCBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlLWNvbnRlbnQtbmF2LWl0ZW0vcGFnZS1jb250ZW50LW5hdi1pdGVtLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vcGFnZS1oZWFkZXIuaHRtbCc7XHJcbmltcG9ydCBcIi4vcGFnZS1oZWFkZXIubGVzc1wiO1xyXG5cclxuY2xhc3MgUGFnZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBQYWdlSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgY29udHJvbGxlciA9IFBhZ2VIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgIGxhYmVsOiAnQCdcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZUhlYWRlcicsIFBhZ2VIZWFkZXJEaXJlY3RpdmUpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIudHMiLCJpbXBvcnQgeyBJUGFnZVNsaWRlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXJcIjtcclxuXHJcbmNsYXNzIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICByZXF1aXJlID0gJ15wYWdlU2xpZGVyJztcclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBzbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAkZWxlbWVudC5vbihjbGlja0V2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoc2xpZGVyLmNsb3NlKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyQ2FuY2VsJywgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiaW1wb3J0IFwiLi9wYWdlLXNsaWRlci5sZXNzXCI7XHJcbmltcG9ydCB7IElQYWdlT3ZlcmxheSwgSVBhZ2VDb250cm9sbGVyIH0gZnJvbSBcIi4uL3BhZ2UvcGFnZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGFnZVNsaWRlckNvbnRyb2xsZXIge1xyXG4gICAgaXNWaXNpYmxlO1xyXG4gICAgd2l0aE92ZXJsYXk7XHJcbiAgICBjbG9zZSgpO1xyXG59XHJcblxyXG5jbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciwgSVBhZ2VPdmVybGF5IHtcclxuICAgIHByaXZhdGUgX3NsaWRlSWY7XHJcblxyXG4gICAgZ2V0IHNsaWRlSWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlSWY7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNsaWRlSWYodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zbGlkZUlmID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlVmlzaWJpbGl0eSlcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xpZGVJZjtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlO1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTtcclxuICAgIHdpdGhGb290ZXI6IGJvb2xlYW47XHJcbiAgICB3aXRoT3ZlcmxheTogYm9vbGVhbjtcclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSWYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQYWdlU2xpZGVyRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcmVxdWlyZSA9ICdecGFnZSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYWdlU2xpZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHNsaWRlSWY6ICc9JyxcclxuICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRwYWdlOiBJUGFnZUNvbnRyb2xsZXIsICR0cmFuc2NsdWRlKSA9PiB7XHJcbiAgICAgICAgdmFyICRjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuXHJcbiAgICAgICAgJGN0cmwud2l0aE92ZXJsYXkgPSAkYXR0cnMuc2hvd092ZXJsYXkgIT0gbnVsbDtcclxuXHJcbiAgICAgICAgJHBhZ2UuYWRkQ29udHJvbCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkY3RybC50b2dnbGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgaXNWaXNpYmxlID0gISEkY3RybC5zbGlkZUlmO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnJHBhZ2VTbGlkZXIuJHNob3cnLCAkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZVNsaWRlci4kaGlkZScsICRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmVtcHR5KClcclxuICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImlzLXZpc2libGVcIiwgaXNWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC53aXRoT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAkcGFnZS5zaG93T3ZlcmxheSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhZ2UuaGlkZU92ZXJsYXkoJGN0cmwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2xpZGVyU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJHRyYW5zY2x1ZGUoKGNsb25lLCBzY29wZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRjdHJsLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlcicsIFBhZ2VTbGlkZXJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsImltcG9ydCBcIi4vcGFnZS5sZXNzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlT3ZlcmxheSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlQ29udHJvbGxlciB7XHJcbiAgICBhZGRDb250cm9sKGNvbnRyb2w6IGFueSk7XHJcbiAgICBzaG93T3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpO1xyXG4gICAgaGlkZU92ZXJsYXkob3ZlcmxheTogSVBhZ2VPdmVybGF5KTtcclxufVxyXG5cclxuY2xhc3MgUGFnZUNvbnRyb2xsZXIgaW1wbGVtZW50cyBJUGFnZUNvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBbXTtcclxuICAgICAgICB0aGlzLm92ZXJsYXlzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0KCRlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbnRyb2woY29udHJvbDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNvbnRyb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dPdmVybGF5KG92ZXJsYXk6IElQYWdlT3ZlcmxheSkge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XHJcbiAgICAgICAgaWYgKGlkeCA+IC0xKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChvdmVybGF5KTtcclxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKFwicGFnZS0tb3ZlcmxheVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlT3ZlcmxheShvdmVybGF5OiBJUGFnZU92ZXJsYXkpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy5vdmVybGF5cy5pbmRleE9mKG92ZXJsYXkpO1xyXG4gICAgICAgIGlmIChpZHggPCAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMub3ZlcmxheXMuc3BsaWNlKGlkeCwgMSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwicGFnZS0tb3ZlcmxheVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVybGF5czogSVBhZ2VPdmVybGF5W107XHJcbiAgICBjb250cm9sczogYW55W107XHJcbiAgICAkZWxlbWVudDogYW55O1xyXG59XHJcblxyXG5jbGFzcyBQYWdlRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkcm9vdFNjb3BlOiBhbmd1bGFyLklSb290U2NvcGVTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0ID0gJ0MnO1xyXG4gICAgY29udHJvbGxlciA9IFBhZ2VDb250cm9sbGVyO1xyXG5cclxuICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogUGFnZUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAkY3RybC5jb250cm9scy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGN0cmwuY29udHJvbHMgPSBbXTtcclxuICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJyRwYWdlLiRjcmVhdGUnLCAkZWxlbWVudCk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCckcGFnZS4kZGVzdHJveScsICRlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlJywgUGFnZURpcmVjdGl2ZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhZ2UvcGFnZS50cyIsImltcG9ydCBcIi4vcGFuZS1mb290ZXIubGVzc1wiO1xyXG5cclxuY2xhc3MgUGFuZUZvb3RlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5wYXJlbnQoXCIucGFuZVwiKS5hZGRDbGFzcyhcInBhbmUtLXdpdGhGb290ZXJcIik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhbmVGb290ZXInLCBQYW5lRm9vdGVyRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGFuZS1mb290ZXIvcGFuZS1mb290ZXIudHMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSBcIi4vcGFuZS1oZWFkZXIuaHRtbFwiO1xyXG5pbXBvcnQgXCIuL3BhbmUtaGVhZGVyLmxlc3NcIjtcclxuaW1wb3J0IHsgSVBhZ2VTbGlkZXJDb250cm9sbGVyIH0gZnJvbSBcIi4uL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyXCI7XHJcblxyXG5jbGFzcyBQYW5lSGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICBvbkNsb3NlOiBhbnk7XHJcblxyXG4gICAgb25Jbml0KHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlciwgc2hvd0Nsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlU2xpZGVyID0gcGFnZVNsaWRlcjtcclxuICAgICAgICB0aGlzLnNob3dDbG9zZSA9IHNob3dDbG9zZTtcclxuICAgICAgICB0aGlzLnNldFdpdGhTdWJ0aXRsZSh0aGlzLmhhc1N1YnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnBhZ2VTbGlkZXIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGFzU3VidGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VidGl0bGUgIT0gbnVsbCAmJiB0aGlzLnN1YnRpdGxlLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3N1YnRpdGxlOiBzdHJpbmc7XHJcbiAgICBnZXQgc3VidGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VidGl0bGU7XHJcbiAgICB9XHJcbiAgICBzZXQgc3VidGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3N1YnRpdGxlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0V2l0aFN1YnRpdGxlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2l0aFN1YnRpdGxlKHRoaXMuaGFzU3VidGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFdpdGhTdWJ0aXRsZTtcclxufVxyXG5cclxuY2xhc3MgUGFuZUhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICByZXN0cmljdCA9ICdFJztcclxuICAgIHJlcXVpcmUgPSAnP15wYWdlU2xpZGVyJztcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIGNvbnRyb2xsZXIgPSBQYW5lSGVhZGVyQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgc3VidGl0bGU6ICdAJyxcclxuICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBhZ2VTbGlkZXI6IElQYWdlU2xpZGVyQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIGN0cmw6IFBhbmVIZWFkZXJDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuICAgICAgICBjdHJsLnNldFdpdGhTdWJ0aXRsZSA9IChoYXNTdWJ0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAkZWxlbWVudC50b2dnbGVDbGFzcygncGFuZS1oZWFkZXItLXdpdGhTdWJ0aXRsZScsIGhhc1N1YnRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3RybC5vbkluaXQocGFnZVNsaWRlciwgJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFuZUhlYWRlcicsIFBhbmVIZWFkZXJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYW5lLWhlYWRlci9wYW5lLWhlYWRlci50cyIsImltcG9ydCB7IElUYWJzQ29udHJvbGxlciwgSVRhYkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vdGFicy90YWJzXCI7XHJcblxyXG5jbGFzcyBUYWJDb250cm9sbGVyIGltcGxlbWVudHMgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVGFiRGlyZWN0aXZlIHtcclxuICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcmVxdWlyZSA9IFsnXnRhYnMnLCAndGFiJ107XHJcbiAgICBjb250cm9sbGVyID0gVGFiQ29udHJvbGxlcjtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgbmFtZTogJ0AnLFxyXG4gICAgICAgIGljb246ICdAJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHZhciAkdGFiczogSVRhYnNDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICR0YWJzLmFkZFRhYigkY3RybCk7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCRlbGVtZW50KS5yZW1vdmVBdHRyKCd0aXRsZScpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWIvdGFiLnRzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gXCIuL3RhYnMuaHRtbFwiO1xyXG5pbXBvcnQgXCIuL3RhYnMubGVzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgYWRkVGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpO1xyXG4gICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZyk7XHJcbiAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKTtcclxuICAgIHNlbGVjdE5leHRUYWIoKTtcclxuICAgIHNlbGVjdFByZXZpb3VzVGFiKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRhYkNvbnRyb2xsZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgVGFic0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZWRUYWI6IElUYWJDb250cm9sbGVyO1xyXG4gICAgdGFiczogSVRhYkNvbnRyb2xsZXJbXTtcclxuXHJcbiAgICBvbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhYiAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5TmFtZSh0aGlzLl9hY3RpdmVUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xyXG4gICAgZ2V0IGFjdGl2ZVRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFjdGl2ZVRhYihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVUYWIgPSBuYW1lO1xyXG4gICAgICAgIGlmICh0aGlzLnRhYnMgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWJCeU5hbWUobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRhYlBvc2l0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgIHJldHVybiBgJHtpZHggKiAtMTAwfSVgO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy50YWJzLnB1c2godGFiKTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RUYWJCeU5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICBpZiAoZm91bmQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIoZm91bmRbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFRhYkJ5SW5kZXgoaWR4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaWR4ID4gMCAmJiB0aGlzLnRhYnMubGVuZ3RoID4gaWR4KVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0TmV4dFRhYigpIHtcclxuICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWJCeUluZGV4KGlkeCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLnRhYnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFRhYkJ5SW5kZXgoaWR4IC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFiTGluazogSVRhYnNDb250cm9sbGVyXHJcbiAgICB0YWJEZWZhdWx0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFRhYnNEaXJlY3RpdmUge1xyXG4gICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBjb250cm9sbGVyID0gVGFic0NvbnRyb2xsZXI7XHJcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0YWJMaW5rOiAnPScsXHJcbiAgICAgICAgYWN0aXZlVGFiOiAnPSdcclxuICAgIH07XHJcblxyXG4gICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKSA9PiB7XHJcbiAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAkY3RybC50YWJMaW5rID0gJGN0cmw7XHJcbiAgICAgICAgJGN0cmwub25Jbml0KCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3RhYnMnLCBUYWJzRGlyZWN0aXZlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGFicy90YWJzLnRzIiwiaW1wb3J0ICogYXMgalF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcclxud2luZG93WyckJ10gPSB3aW5kb3dbJ2pRdWVyeSddID0galF1ZXJ5O1xyXG5cclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyLXJvdXRlXCI7XHJcbmltcG9ydCBcImFuZ3VsYXItYW5pbWF0ZVwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyLXJlc291cmNlXCI7XHJcblxyXG5pbXBvcnQgQW5ndWxhciBmcm9tIFwiYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZVwiO1xyXG53aW5kb3dbJ0FuZ3VsYXInXSA9IEFuZ3VsYXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZlbmRvcnMudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGgubGVzc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ibGFua3NsYXRlL2JsYW5rc2xhdGUubGVzc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RvdWdobnV0L2RvdWdobnV0Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGF5b3V0LXBhZ2UvbGF5b3V0LXBhZ2UubGVzc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1tZW51L25hdi1tZW51Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYWdlL3BhZ2UubGVzc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wYW5lLWZvb3Rlci9wYW5lLWZvb3Rlci5sZXNzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFicy90YWJzLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBjbGFzcz1cXFwiYmFyLWdyYXBoLWJnXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYmFyLWdyYXBoLWZpbGxcXFwiIG5nLWNsYXNzPVxcXCJ7J2Jhci1ncmFwaC1maWxsLS1mdWxsJzogdm0uaXNGdWxsfVxcXCIgbmctc3R5bGU9XFxcInZtLnN0eWxlXFxcIiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcclxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jhci1ncmFwaC9iYXItZ3JhcGguaHRtbFxuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8aSBjbGFzcz1cXFwiYmxhbmtzbGF0ZS1pY29uIHt7dm0uaWNvbn19XFxcIj48L2k+XFxyXFxuPGRpdiBjbGFzcz1cXFwiYmxhbmtzbGF0ZS1jb250ZW50XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYmxhbmtzbGF0ZS1jb250ZW50LXRpdGxlXFxcIj57e3ZtLnRpdGxlfX08L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYmxhbmtzbGF0ZS1jb250ZW50LXN1YnRpdGxlXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxhbmtzbGF0ZS9ibGFua3NsYXRlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdG9wXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVzXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImJvZHktaGVhZGVyLXN1YnRpdGxlXFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYm9keS1oZWFkZXItYWN0aW9uc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjwhLS08ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1ib3R0b21cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJib2R5LWhlYWRlci1zdWJ0aXRsZVxcXCIgbmctc2hvdz1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvZGl2PlxcclxcbjwvZGl2Pi0tPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGRpdiBjbGFzcz1cXFwiZG91Z2hudXQtdGV4dFxcXCI+XFxyXFxuICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48Y2FudmFzIGNsYXNzPVxcXCJkb3VnaG51dC1ob2xlXFxcIj48L2NhbnZhcz5cXHJcXG48Y2FudmFzIGNsYXNzPVxcXCJkb3VnaG51dC1maWxsXFxcIj48L2NhbnZhcz5cXHJcXG48Y2FudmFzIGNsYXNzPVxcXCJkb3VnaG51dC1iZ1xcXCI+PC9jYW52YXM+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZG91Z2hudXQvZG91Z2hudXQuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8aSBuZy1pZj1cXFwidm0uaGFzSWNvblxcXCIgY2xhc3M9XFxcIm5hdi1ncm91cC1pdGVtLWljb25cXFwiIG5nLWNsYXNzPVxcXCJ2bS5pY29uQ2xhc3NcXFwiPjwvaT5cXHJcXG48c3BhbiBjbGFzcz1cXFwibmF2LWdyb3VwLWl0ZW0tdGV4dFxcXCIgbmctdHJhbnNjbHVkZT48L3NwYW4+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbmF2LWdyb3VwLWl0ZW0vbmF2LWdyb3VwLWl0ZW0uaHRtbFxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci10ZXh0XFxcIj57e3ZtLnRleHR9fTwvc3Bhbj5cXHJcXG48c3BhbiBjbGFzcz1cXFwibmF2LWhlYWRlci1zbWFsbFxcXCI+e3t2bS5zbWFsbH19PC9zcGFuPlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL25hdi1oZWFkZXIvbmF2LWhlYWRlci5odG1sXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxpIG5nLWNsYXNzPVxcXCJ2bS5pY29uQ2xhc3NcXFwiPjwvaT5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9uYXYtbWVudS9uYXYtbWVudS5odG1sXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBcIjxkaXYgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLWFjdGlvbnNcXFwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxyXFxuPG5hdi1tZW51IGNsYXNzPVxcXCJwYWdlLWhlYWRlci1uYXZNZW51XFxcIiBpY29uPVxcXCJmYSBmYS1uYXZpY29uXFxcIj48L25hdi1tZW51PlxcclxcbjxkaXYgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXRpdGxlc1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtIHBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtLS10aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVcXFwiPnt7dm0udGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtIHBhZ2UtaGVhZGVyLXRpdGxlcy1pdGVtLS1zdWJ0aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFnZS1oZWFkZXItc3VidGl0bGVcXFwiIG5nLWlmPVxcXCJ2bS5zdWJ0aXRsZVxcXCI+e3t2bS5zdWJ0aXRsZX19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0gcGFnZS1oZWFkZXItdGl0bGVzLWl0ZW0tLWxhYmVsXFxcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJwYWdlLWhlYWRlci1sYWJlbFxcXCIgbmctaWY9XFxcInZtLmxhYmVsXFxcIj57e3ZtLmxhYmVsfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcInBhbmUtaGVhZGVyLWNsb3NlXFxcIiBuZy1pZj1cXFwidm0uc2hvd0Nsb3NlXFxcIiBuZy1jbGljaz1cXFwidm0uY2xvc2UoKVxcXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJwYW5lLWhlYWRlci1jbG9zZUljb24gZmEgZmEtY2xvc2VcXFwiPjwvaT5cXHJcXG48L2E+XFxyXFxuPGRpdiBjbGFzcz1cXFwicGFuZS1oZWFkZXItYWN0aW9uc1xcXCIgbmctdHJhbnNjbHVkZT48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZXNcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci10aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItdGl0bGVUZXh0XFxcIj57e3ZtLnRpdGxlfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lLWhlYWRlci1zdWJ0aXRsZVxcXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwicGFuZS1oZWFkZXItc3VidGl0bGVUZXh0XFxcIiBuZy1pZj1cXFwidm0uc3VidGl0bGVcXFwiPnt7dm0uc3VidGl0bGV9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgXCI8ZGl2IGNsYXNzPVxcXCJ0YWItdGl0bGVzXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidGFiLXRpdGxlcy1pdGVtXFxcIiBcXHJcXG4gICAgICAgIG5nLWNsYXNzPVxcXCJ7J3RhYi10aXRsZXMtaXRlbS0tc2VsZWN0ZWQnOiB0YWIgPT0gdm0uc2VsZWN0ZWRUYWIgfVxcXCJcXHJcXG4gICAgICAgIG5nLXJlcGVhdD1cXFwidGFiIGluIHZtLnRhYnNcXFwiIFxcclxcbiAgICAgICAgbmctY2xpY2s9XFxcInZtLnNlbGVjdFRhYih0YWIpXFxcIj5cXHJcXG4gICAgICAgIDxpIGNsYXNzPVxcXCJ0YWItdGl0bGVzLWl0ZW0taWNvbiB7e3RhYi5pY29ufX1cXFwiIG5nLWlmPVxcXCJ0YWIuaWNvblxcXCI+PC9pPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidGFiLXRpdGxlcy1pdGVtLXRpdGxlXFxcIj57e3RhYi50aXRsZX19PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnQtd2luZG93XFxcIiBcXHJcXG4gICAgICAgIG5nLXN0eWxlPVxcXCJ7J3dpZHRoJzogdm0ud2lkdGgsICdsZWZ0Jzogdm0udGFiUG9zaXRpb259XFxcIlxcclxcbiAgICAgICAgbmctdHJhbnNjbHVkZT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGFicy90YWJzLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBcIi4vdmVuZG9yc1wiO1xyXG5pbXBvcnQgdm9wc0xheW91dCBmcm9tIFwiLi9hcHBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdm9wc0xheW91dDtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2Jhci1ncmFwaC9iYXItZ3JhcGhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vYmxhbmtzbGF0ZS9ibGFua3NsYXRlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2JvZHktaGVhZGVyL2JvZHktaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2RvdWdobnV0L2RvdWdobnV0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xheW91dC1wYWdlL2xheW91dC1wYWdlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1oZWFkZXIvbmF2LWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9uYXYtbWVudS9uYXYtbWVudVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlL3BhZ2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLWhlYWRlci9wYWdlLWhlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLXNsaWRlci9wYWdlLXNsaWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3RhYi90YWJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdGFicy90YWJzXCI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==
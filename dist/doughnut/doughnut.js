import template from './doughnut.html';
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
Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);

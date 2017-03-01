import template from './doughnut.html';
import "./doughnut.less";

class DoughnutController {
    constructor() {
        this._value = 0;
    }

    onInit($element, contextHole, contextFill, contextBg, animate) {
        this.$element = $element;
        this.contextHole = contextHole;
        this.contextFill = contextFill;
        this.contextBg = contextBg;
        this.animate = animate;
        this.animate(this, 0, this.value);
    }

    $element: any;

    contextHole: any;
    contextFill: any;
    contextBg: any;

    animationPromise: any;
    color: string;
    colorClass: string;
    emptyColorClass: string;
    innerRadius = 65; // 75%
    animateSpeed = 10;
    percentOffset = -25;
    holeColor: string;
    animate: ($ctrl: DoughnutController, from: number | string, to: number | string) => {};

    _value: number | string;
    get value(): number | string {
        return this._value;
    }
    set value(newVal: number | string) {
        var oldVal = this._value;
        this._value = newVal;
        if (this.animate != null) {
            this.animate(this, oldVal, newVal);
        }
    }
}

class DoughnutDirective {
    static $inject = ['$interval'];

    constructor(private $interval) {

    }

    restrict = 'E';
    transclude = true;
    template = template;
    controller = DoughnutController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        value: '@',
        color: '@',
        colorClass: '@',
        emptyColorClass: '@'
    };

    link = ($scope, $element, $attr, $ctrl) => {

        var contextHole = $element.find("canvas.doughnut-hole").get(0).getContext("2d");
        var contextFill = $element.find("canvas.doughnut-fill").get(0).getContext("2d");
        var contextBg = $element.find("canvas.doughnut-bg").get(0).getContext("2d");

        $ctrl.onInit($element, contextHole, contextFill, contextBg, ($ctrl, from, to) => {
            return this.animate($ctrl, from, to);
        });

        this.init($ctrl, 0, $ctrl.value);
        var promise = this.watchSize($ctrl);

        $scope.$watch(() => {
            return this.getBgColor($ctrl);
        }, bgcolor => {
            // did background color change?
            if (bgcolor != $ctrl.holeColor)
                this.initHole($ctrl);
        });

        $scope.$on("$destroy", () => {
            this.$interval.cancel(promise);
        });
    }

    private getSize($ctrl: DoughnutController): number {
        var size = $ctrl.$element.width() + $ctrl.$element.height();
        return size;
    }

    watchSize($ctrl) {
        var size = this.getSize($ctrl);
        var promise = this.$interval(() => {
            var temp = this.getSize($ctrl);
            var changed = size != temp;
            size = temp;

            if (changed)
                this.init($ctrl, 0, $ctrl.value);
        }, 100);
        return promise;
    }

    convertToRadians(percent: number) {
        var radians = percent / 100 * 360 * Math.PI / 180;
        return radians;
    }

    drawWedge($ctrl: DoughnutController, context: any, cX: number, cY: number, radius: number, from: number, to: number, color: string) {
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
    }

    drawDonut($ctrl: DoughnutController, context: any, cX: number, cY: number, radius: number, color: string) {
        // cut out an inner-circle == donut
        context.beginPath();
        context.moveTo(cX, cY);
        context.fillStyle = color;
        context.arc(cX, cY, radius * ($ctrl.innerRadius / 100), 0, 2 * Math.PI, false);
        context.fill();
    }

    setSize($ctrl: DoughnutController, context: any) {
        context.canvas.width = $ctrl.$element.width();
        context.canvas.height = $ctrl.$element.height();
    }

    draw($ctrl: DoughnutController, from: number, to: number, fillColor) {
        this.reset($ctrl.contextFill);

        var cX = this.getX($ctrl.contextBg);
        var cY = this.getY($ctrl.contextBg);
        var radius = this.getRadius(cX, cY);

        this.drawWedge($ctrl, $ctrl.contextFill, cX, cY, radius, from, to, fillColor);
    }

    getX(context: any) {
        var cX = Math.floor(context.canvas.width / 2);
        return cX;
    }

    getY(context: any) {
        var cY = Math.floor(context.canvas.height / 2);
        return cY;
    }

    getRadius(x: number, y: number) {
        var radius = Math.min(x, y);
        return radius;
    }

    private getElementStyle($element, className, style) {
        //var $body = angular.element("body");
        var $temp = angular.element(`<div class="${className}"></div>`);
        $temp.insertAfter($element);
        //$body.append($temp);
        var value = $temp.css(style);
        $temp.remove();
        return value;
    }

    reset(context: any) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    init($ctrl: DoughnutController, from: number | string, to: number | string) {
        this.initBg($ctrl, from, to);
        this.initHole($ctrl);

        this.reset($ctrl.contextFill);
        this.setSize($ctrl, $ctrl.contextFill);
    }

    initBg($ctrl: DoughnutController, from: number | string, to: number | string) {
        this.reset($ctrl.contextBg);
        this.setSize($ctrl, $ctrl.contextBg);

        var emptyColor = this.getElementStyle($ctrl.$element, $ctrl.emptyColorClass || "doughnut-empty-color", "background-color");

        var cX = this.getX($ctrl.contextBg);
        var cY = this.getY($ctrl.contextBg);
        var radius = this.getRadius(cX, cY);

        this.drawWedge($ctrl, $ctrl.contextBg, cX, cY, radius, 0, 100, emptyColor);
    }

    initHole($ctrl: DoughnutController) {
        this.reset($ctrl.contextHole);
        this.setSize($ctrl, $ctrl.contextHole);

        var cX = this.getX($ctrl.contextBg);
        var cY = this.getY($ctrl.contextBg);
        var radius = this.getRadius(cX, cY);

        $ctrl.holeColor = this.getBgColor($ctrl);
        this.drawDonut($ctrl, $ctrl.contextHole, cX, cY, radius, $ctrl.holeColor);
    }

    getBgColor($ctrl: DoughnutController) {
        var bgcolor = $ctrl.$element.css("background-color");
        if (bgcolor == "rgba(0, 0, 0, 0)" || bgcolor == "transparent")
            bgcolor = "white";
        return bgcolor;
    }

    animate($ctrl: DoughnutController, from: number | string, to: number | string) {
        var fillColor = this.getElementStyle($ctrl.$element, $ctrl.colorClass || "doughnut-fill-color", "background-color");

        if ($ctrl.color)
            fillColor = $ctrl.color;

        var nFrom = Number(from);
        var nTo = Number(to);

        if (nFrom < nTo)
            return this.animateUp($ctrl, nFrom, nTo, fillColor);
        else
            return this.animateDown($ctrl, nFrom, nTo, fillColor);
    }

    animateUp($ctrl: DoughnutController, from: number, to: number, fillColor) {
        this.cancel($ctrl.animationPromise);

        var value = from;
        $ctrl.animationPromise = this.$interval(() => {
            if (value > to) {
                this.cancel($ctrl.animationPromise);
                return;
            }
            this.draw($ctrl, from, value, fillColor);
            value++;
        }, $ctrl.animateSpeed);
    }

    animateDown($ctrl: DoughnutController, from: number, to: number, fillColor) {
        this.cancel($ctrl.animationPromise);

        var value = from;
        $ctrl.animationPromise = this.$interval(() => {
            if (value < to) {
                this.cancel($ctrl.animationPromise);
                return;
            }
            this.draw($ctrl, to, value, fillColor);
            value--;
        }, $ctrl.animateSpeed);
    }

    cancel(promise) {
        if (promise)
            this.$interval.cancel(promise);
    }
}

export default Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
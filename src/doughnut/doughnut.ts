module LayoutPageModule {

    class DoughnutController {
        constructor() {
            this._value = 0;
        }

        onInit($element, context, animate) {
            this.$element = $element;
            this.context = context;
            this.animate = animate;
        }

        $element: any;
        context: any;
        color: string;
        colorClass: string;
        emptyColorClass: string;
        innerRadius = 65; // 75%
        animateSpeed = 10;
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
        templateUrl = 'doughnut/doughnut.html';
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

            var context = $element.find("canvas").get(0).getContext("2d");
            $ctrl.onInit($element, context, ($ctrl, from, to) => {
                return this.animate($ctrl, from, to);
            });

            // var promise = this.watchSize($ctrl);
            // $scope.$on("$destroy", () => {
            //     this.$interval.cancel(promise);
            // });
        }

        private getSize($ctrl: DoughnutController): number {
            var size = $ctrl.$element.width() + $ctrl.$element.height();
            return size;
        }

        watchSize($ctrl) {
            var size = 0;
            var promise = this.$interval(() => {
                var temp = this.getSize($ctrl);
                var changed = size != temp;
                size = temp;

                if (changed)
                    this.animate($ctrl, $ctrl.value, $ctrl.value);
            }, 100);
            return promise;
        }

        convertToRadians(percent: number) {
            var radians = percent / 100 * 360 * Math.PI / 180;
            return radians;
        }

        drawWedge($ctrl: DoughnutController, cX: number, cY: number, radius: number, from: number, to: number, color: string) {
            var fromRadians = this.convertToRadians(from);
            var toRadians = this.convertToRadians(to);

            // draw the wedge
            $ctrl.context.save();
            $ctrl.context.beginPath();
            $ctrl.context.moveTo(cX, cY);
            $ctrl.context.arc(cX, cY, radius, 0, toRadians, false);
            $ctrl.context.closePath();
            $ctrl.context.fillStyle = color;
            $ctrl.context.fill();
            $ctrl.context.restore();
        }

        drawDonut($ctrl: DoughnutController, cX: number, cY: number, radius: number, color: string) {
            // cut out an inner-circle == donut
            $ctrl.context.beginPath();
            $ctrl.context.moveTo(cX, cY);
            $ctrl.context.fillStyle = color;
            $ctrl.context.arc(cX, cY, radius * ($ctrl.innerRadius / 100), 0, 2 * Math.PI, false);
            $ctrl.context.fill();
        }

        draw($ctrl: DoughnutController, from: number, to: number, emptyColor, fillColor) {
            // define the donut
            $ctrl.context.canvas.width = $ctrl.$element.width();
            $ctrl.context.canvas.height = $ctrl.$element.height();

            var cX = this.getX($ctrl);
            var cY = this.getY($ctrl);
            var radius = this.getRadius(cX, cY);

            this.drawWedge($ctrl, cX, cY, radius, 0, 100, emptyColor);
            this.drawWedge($ctrl, cX, cY, radius, from, to, fillColor);

            var bgcolor = $ctrl.$element.css("background-color");
            if (bgcolor == "rgba(0, 0, 0, 0)")
                bgcolor = "white";
            this.drawDonut($ctrl, cX, cY, radius, bgcolor);
        }

        getX($ctrl) {
            var cX = Math.floor($ctrl.context.canvas.width / 2);
            return cX;
        }

        getY($ctrl) {
            var cY = Math.floor($ctrl.context.canvas.height / 2);
            return cY;
        }

        getRadius(x, y) {
            var radius = Math.min(x, y);
            return radius;
        }

        private getElementStyle(className, style) {
            var $body = angular.element("body");
            var $element = angular.element(`<div class="${className}"></div>`);
            $body.append($element);
            var value = $element.css(style);
            $element.remove();
            return value;
        }

        animate($ctrl: DoughnutController, from: number | string, to: number | string) {
            $ctrl.context.clearRect(0, 0, $ctrl.context.canvas.width, $ctrl.context.canvas.height);

            var emptyColor = this.getElementStyle($ctrl.emptyColorClass || "doughnut-empty-color", "background-color");
            var fillColor = this.getElementStyle($ctrl.colorClass || "doughnut-fill-color", "background-color");

            if ($ctrl.color)
                fillColor = $ctrl.color;

            var nFrom = Number(from);
            var nTo = Number(to);

            if (nFrom < nTo)
                this.animateUp($ctrl, nFrom, nTo, emptyColor, fillColor);
            else
                this.animateDown($ctrl, nFrom, nTo, emptyColor, fillColor);
        }

        animateUp($ctrl: DoughnutController, from: number, to: number, emptyColor, fillColor) {
            var value = from;
            var ticket = this.$interval(() => {
                if (value > to) {
                    this.$interval.cancel(ticket);
                    return;
                }
                this.draw($ctrl, from, value, emptyColor, fillColor);
                value++;
            }, $ctrl.animateSpeed);
        }

        animateDown($ctrl: DoughnutController, from: number, to: number, emptyColor, fillColor) {
            var value = from;
            var ticket = this.$interval(() => {
                if (value < to) {
                    this.$interval.cancel(ticket);
                    return;
                }
                this.draw($ctrl, to, value, emptyColor, fillColor);
                value--;
            }, $ctrl.animateSpeed);
        }
    }

    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
}
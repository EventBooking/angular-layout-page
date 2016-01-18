module LayoutPageModule {

    class DoughnutController {
        label: string;

        _value: number;
        get value(): number {
            return this._value;
        }
        set value(newVal: number) {
            this._value = newVal;
            if (this.animate != null)
                this.animate(this);
        }

        color: string;
        colorClass: string;
        emptyColorClass: string;
        innerRadius = 65; // 75%
        animateSpeed = 10;

        $element: any;
        context: any;
        animate: ($ctrl: DoughnutController) => {};
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
            label: '=',
            value: '=',
            color: '@',
            colorClass: '@',
            emptyColorClass: '@'
        };

        link = ($scope, $element, $attr, $ctrl) => {
            $ctrl.$element = $element;
            $ctrl.context = $element.find("canvas").get(0).getContext("2d");

            var size = 0;
            var promise = this.$interval(() => {
                var temp = this.getSize($ctrl);
                var changed = size != temp;
                size = temp;

                if (changed)
                    this.animate($ctrl);
            }, 100);

            $scope.$on("$destroy", () => {
                this.$interval.cancel(promise);
            });
        }

        private getSize($ctrl: DoughnutController): number {
            var size = $ctrl.$element.width() + $ctrl.$element.height();
            return size;
        }

        drawWedge($ctrl: DoughnutController, cX: number, cY: number, radius: number, percent: number, color: string) {
            // calc size of our wedge in radians
            var wedgeInRadians = percent / 100 * 360 * Math.PI / 180;
            // draw the wedge
            $ctrl.context.save();
            $ctrl.context.beginPath();
            $ctrl.context.moveTo(cX, cY);
            $ctrl.context.arc(cX, cY, radius, 0, wedgeInRadians, false);
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

        draw($ctrl: DoughnutController, value, emptyColor, fillColor) {
            // define the donut
            $ctrl.context.canvas.width = $ctrl.$element.width();
            $ctrl.context.canvas.height = $ctrl.$element.height();

            var cX = Math.floor($ctrl.context.canvas.width / 2);
            var cY = Math.floor($ctrl.context.canvas.height / 2);
            var radius = Math.min(cX, cY);

            this.drawWedge($ctrl, cX, cY, radius, 100, emptyColor);


            this.drawWedge($ctrl, cX, cY, radius, value, fillColor);

            var bgcolor = $ctrl.$element.css("background-color");
            if (bgcolor == "rgba(0, 0, 0, 0)")
                bgcolor = "white";
            this.drawDonut($ctrl, cX, cY, radius, bgcolor);
        }

        private getElementStyle(className, style) {
            var $body = angular.element("body");
            var $element = angular.element(`<div class="${className}"></div>`);
            $body.append($element);
            var value = $element.css(style);
            $element.remove();
            return value;
        }

        animate($ctrl: DoughnutController) {
            var emptyColor = this.getElementStyle($ctrl.emptyColorClass || "doughnut-empty-color", "background-color");

            var fillColor = this.getElementStyle($ctrl.colorClass || "doughnut-fill-color", "background-color");
            if ($ctrl.color)
                fillColor = $ctrl.color;

            var value = 0;
            var ticket = this.$interval(() => {
                if (value > $ctrl.value) {
                    this.$interval.cancel(ticket);
                    return;
                }

                this.draw($ctrl, value, emptyColor, fillColor);
                value++;

            }, $ctrl.animateSpeed);
        }
    }

    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
}
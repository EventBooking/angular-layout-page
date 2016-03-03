module LayoutPageModule {

    class BarGraphController {
        constructor() {
            this.barSteps = 10;
            this.init = true;
            this.setTicks();
            this.setPercent();
        }

        get style() {
            return {
                width: `${this.percent}%`
            }
        }

        get isFull() {
            return this.percent == 100;
        }

        private _barMin: number;
        get barMin(): number {
            return this._barMin;
        }

        set barMin(value: number) {
            this._barMin = value;
            this.setTicks();
            this.setPercent();
        }

        private _barMax: number;
        get barMax(): number {
            return this._barMax;
        }

        set barMax(value: number) {
            this._barMax = value;
            this.setTicks();
            this.setPercent();
        }

        private _barValue: number;
        get barValue(): number {
            return this._barValue;
        }

        set barValue(value: number) {
            this._barValue = value;
            this.setPercent();
        }

        private _barSteps: number;
        get barSteps(): number {
            return this._barSteps;
        }

        set barSteps(value: number) {
            this._barSteps = value;
            this.setTicks();
        }

        ticks: number[];
        percent: number;
        init: boolean;

        setPercent() {
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
        }

        setTicks() {
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
        }
    }

    class BarGraphDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'bar-graph/bar-graph.html';
        controller = BarGraphController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            barMin: '@',
            barMax: '@',
            barValue: '@',
            barSteps: '@?'
        };
    }

    Angular.module("ngLayoutPage").directive('barGraph', BarGraphDirective);
}
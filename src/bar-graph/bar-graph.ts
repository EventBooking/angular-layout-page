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
            console.log(value);
            this._barMin = value;
            this.setTicks();
            this.setPercent();
        }

        private _barMax: number;
        get barMax(): number {
            return this._barMax;
        }

        set barMax(value: number) {
            console.log(value);
            this._barMax = value;
            this.setTicks();
            this.setPercent();
        }

        private _barValue: number;
        get barValue(): number {
            return this._barValue;
        }

        set barValue(value: number) {
            console.log(value);
            this._barValue = value;
            this.setPercent();
        }

        private _barSteps: number;
        get barSteps(): number {
            return this._barSteps;
        }

        set barSteps(value: number) {
            console.log(value);
            this._barSteps = value;
            this.setTicks();
        }

        ticks: number[];
        percent: number;
        init: boolean;

        setPercent() {
            if (!this.init)
                return;

            var x = Number(this.barValue == null ? this.barMin : this.barValue);
            var min = Number(this.barMin);
            var max = Number(this.barMax);

            if (x < min)
                x = min;

            if (x > max)
                x = max;

            this.percent = 100 * (x - min) / (max - min);
        }

        setTicks() {
            if (!this.init)
                return;

            var min = Number(this.barMin);
            var max = Number(this.barMax);
            var steps = (max - min) / Number(this.barSteps);

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
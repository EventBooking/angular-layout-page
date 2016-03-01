module LayoutPageModule {

    class BarGraphController {
        get style() {
            return {
                width: `${this.percent || 0}%`
            }
        }
        
        get isFull() {
            return this.percent == 100;
        }

        percent: number;
    }

    class BarGraphDirective {
        restrict = 'E';
        transclude = true;
        templateUrl = 'bar-graph/bar-graph.html';
        controller = BarGraphController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            percent: '@'
        };
    }

    Angular.module("ngLayoutPage").directive('barGraph', BarGraphDirective);
}
module LayoutPageModule {

    export interface IPageController {
        addControl($element: any);
        ensureOnTop($element: any);
    }

    class PageController {
        static $inject = ["$rootScope", "$scope", "$element"];

        constructor(
            private $rootScope: angular.IRootScopeService,
            private $scope: angular.IScope,
            private $element: angular.IAugmentedJQuery
        ) {
        }

        $onInit() {
            this.controls.forEach(x => this.$element.append(x));
            this.controls = [];
            this.layoutPage.setCurrentPage(this);
            this.isInitialized = true;
        }

        $postLink() {
			this.$rootScope.$emit('$page.$create', this.$element, this);
		}

        $onDestroy() {
            this.$rootScope.$emit('$page.$destroy', this.$element, this);
            this.layoutPage.clearCurrentPage(this);
        }

        addControl($element) {
			if (!this.isInitialized) {
				this.controls.push($element);
				return;
			}

			this.$element.append($element);
		}

        ensureOnTop($element) {
            this.$element.append($element);
        }
        
        controls: any[] = [];
        layoutPage: ILayoutPageController;
        isInitialized: boolean = false;
    }

    class PageDirective {
        restrict = 'C';
        require = {
            layoutPage: "^layoutPage"
        };
        bindToController = true;
        controller = PageController;
    }

    Angular.module("ngLayoutPage").directive('page', PageDirective);
}
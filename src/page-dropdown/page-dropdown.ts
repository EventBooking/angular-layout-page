module LayoutPageModule {

    class PageDropDownController {
        static $inject = [];

        constructor() {
        }

        $onInit() {
        }

        showIf: boolean;
    }

    class PageDropDownDirective {
        restrict = 'E';
        templateUrl = 'page-dropdown/page-dropdown.html';
        transclude = true;
        controller = PageDropDownController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            showIf: '='
        };
    }

    Angular.module("ngLayoutPage").directive('pageDropdown', PageDropDownDirective);
}
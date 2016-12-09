module LayoutPageModule {

    export interface ILayoutPageController {
        showNav();
        hideNav();
        toggleNav();
    }

    class LayoutPageController implements ILayoutPageController {
        onInit(update: (isVisible: boolean) => void) {
            this._update = update;
            this._isNavVisible = false;
        }

        private _isNavVisible: boolean;

        showNav() {
            this._isNavVisible = true;
            this._update(this._isNavVisible);
        }

        hideNav() {
            this._isNavVisible = false;
            this._update(this._isNavVisible);
        }

        toggleNav() {
            this._isNavVisible = !this._isNavVisible;
            this._update(this._isNavVisible);
        }

        _update: (isVisible: boolean) => void;
    }

    Angular.module("ngLayoutPage").controller('layoutPageController', LayoutPageController);

    class LayoutPageDirective {
        restrict = 'EAC';
        controller = LayoutPageController;
        controllerAs = 'vm';
        bindToController = true;

        link = ($scope, $element, $attrs, $ctrl: LayoutPageController) => {
            var update = (isVisible: boolean) => {
                $element.toggleClass('nav--show', isVisible);
            };

            $ctrl.onInit(update);
        }
    }

    Angular.module("ngLayoutPage").directive('layoutPage', LayoutPageDirective);
}
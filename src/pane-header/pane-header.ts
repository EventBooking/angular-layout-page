module LayoutPageModule {

    class PaneHeaderController {
        showClose: boolean;
        pageSlider: IPageSliderController;

        onInit(pageSlider: IPageSliderController, showClose: boolean) {
            this.pageSlider = pageSlider;
            this.showClose = showClose;
            this.setWithSubtitle(this.hasSubtitle);
        }

        close() {
            if (this.pageSlider == null)
                return;
            this.pageSlider.close();
        }

        get hasSubtitle(): boolean {
            return this.subtitle != null && this.subtitle.trim().length > 0;
        }

        private _subtitle: string;
        get subtitle(): string {
            return this._subtitle;
        }
        set subtitle(value: string) {
            this._subtitle = value;
            if (this.setWithSubtitle != null)
                this.setWithSubtitle(this.hasSubtitle);
        }

        setWithSubtitle;
    }

    class PaneHeaderDirective {
        restrict = 'E';
        require = '?^pageSlider';
        transclude = true;
        templateUrl = 'pane-header/pane-header.html';
        controller = PaneHeaderController;
        controllerAs = 'vm';
        bindToController = true;
        scope = {
            title: '@',
            subtitle: '@'
        };

        link = ($scope, $element, $attrs, pageSlider: IPageSliderController) => {
            $element.removeAttr("title");

            var ctrl: PaneHeaderController = $scope[this.controllerAs];
            ctrl.setWithSubtitle = (hasSubtitle) => {
                $element.toggleClass('pane-header--withSubtitle', hasSubtitle);
            }
            ctrl.onInit(pageSlider, $attrs.showClose != null);
        };
    }

    Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);
}
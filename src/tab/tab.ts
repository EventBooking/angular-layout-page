import { ITabsController, ITabController } from "../tabs/tabs";

class TabController implements ITabController {
    title: string;
    name: string;
    icon: string;
}

class TabDirective {
    restrict = 'E';
    require = ['^tabs', 'tab'];
    controller = TabController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        title: '@',
        name: '@',
        icon: '@'
    };

    link = ($scope, $element, $attrs, $ctrls: any[]) => {
        var $tabs: ITabsController = $ctrls[0];
        var $ctrl: ITabController = $ctrls[1];

        $tabs.addTab($ctrl);
        angular.element($element).removeAttr('title');
    };
}

export default Angular.module("ngLayoutPage").directive('tab', TabDirective);
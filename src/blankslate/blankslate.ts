import vopsLayout from "../app";
import * as template from "./blankslate.html";
import "./blankslate.less";

class BlankslateController {
    subtitle: string;

    get hasSubtitle() {
        return !(this.subtitle == null || this.subtitle.trim().length == 0)
    }
}

class BlankslateDirective {
    restrict = 'E';
    transclude = true;
    template = template;
    controller = BlankslateController;
    controllerAs = 'vm';
    bindToController = true;
    scope = {
        icon: '@',
        title: '@',
        subtitle: '@'
    };
}

export default Angular.module(vopsLayout).directive('blankslate', BlankslateDirective);

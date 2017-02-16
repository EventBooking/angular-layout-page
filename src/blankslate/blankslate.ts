import template from "./blankslate.html";

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

Angular.module("ngLayoutPage").directive('blankslate', BlankslateDirective);

/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
Angular.module("ngLayoutPage", []);
var LayoutPageModule;
(function (LayoutPageModule) {
    var BlankslateController = (function () {
        function BlankslateController() {
        }
        Object.defineProperty(BlankslateController.prototype, "hasSubtitle", {
            get: function () {
                return !(this.subtitle == null || this.subtitle.trim().length == 0);
            },
            enumerable: true,
            configurable: true
        });
        return BlankslateController;
    })();
    var BlankslateDirective = (function () {
        function BlankslateDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'blankslate/blankslate.html';
            this.controller = BlankslateController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                icon: '@',
                title: '@',
                subtitle: '@'
            };
        }
        return BlankslateDirective;
    })();
    Angular.module("ngLayoutPage").directive('blankslate', BlankslateDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var BodyHeaderController = (function () {
        function BodyHeaderController() {
        }
        return BodyHeaderController;
    })();
    var BodyHeaderDirective = (function () {
        function BodyHeaderDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'body-header/body-header.html';
            this.controller = BodyHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@'
            };
        }
        return BodyHeaderDirective;
    })();
    Angular.module("ngLayoutPage").directive('bodyHeader', BodyHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var DoughnutController = (function () {
        function DoughnutController() {
            this.innerRadius = 65; // 75%
            this.animateSpeed = 10;
            this.percentOffset = -25;
            this._value = 0;
        }
        DoughnutController.prototype.onInit = function ($element, contextHole, contextFill, contextBg, animate) {
            this.$element = $element;
            this.contextHole = contextHole;
            this.contextFill = contextFill;
            this.contextBg = contextBg;
            this.animate = animate;
            this.animate(this, 0, this.value);
        };
        Object.defineProperty(DoughnutController.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (newVal) {
                var oldVal = this._value;
                this._value = newVal;
                if (this.animate != null) {
                    this.animate(this, oldVal, newVal);
                }
            },
            enumerable: true,
            configurable: true
        });
        return DoughnutController;
    })();
    var DoughnutDirective = (function () {
        function DoughnutDirective($interval) {
            var _this = this;
            this.$interval = $interval;
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'doughnut/doughnut.html';
            this.controller = DoughnutController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                value: '@',
                color: '@',
                colorClass: '@',
                emptyColorClass: '@'
            };
            this.link = function ($scope, $element, $attr, $ctrl) {
                var contextHole = $element.find("canvas.doughnut-hole").get(0).getContext("2d");
                var contextFill = $element.find("canvas.doughnut-fill").get(0).getContext("2d");
                var contextBg = $element.find("canvas.doughnut-bg").get(0).getContext("2d");
                $ctrl.onInit($element, contextHole, contextFill, contextBg, function ($ctrl, from, to) {
                    return _this.animate($ctrl, from, to);
                });
                _this.init($ctrl, 0, $ctrl.value);
                var promise = _this.watchSize($ctrl);
                $scope.$watch(function () {
                    return _this.getBgColor($ctrl);
                }, function (bgcolor) {
                    // did background color change?
                    if (bgcolor != $ctrl.holeColor)
                        _this.initHole($ctrl);
                });
                $scope.$on("$destroy", function () {
                    _this.$interval.cancel(promise);
                });
            };
        }
        DoughnutDirective.prototype.getSize = function ($ctrl) {
            var size = $ctrl.$element.width() + $ctrl.$element.height();
            return size;
        };
        DoughnutDirective.prototype.watchSize = function ($ctrl) {
            var _this = this;
            var size = this.getSize($ctrl);
            var promise = this.$interval(function () {
                var temp = _this.getSize($ctrl);
                var changed = size != temp;
                size = temp;
                if (changed)
                    _this.init($ctrl, 0, $ctrl.value);
            }, 100);
            return promise;
        };
        DoughnutDirective.prototype.convertToRadians = function (percent) {
            var radians = percent / 100 * 360 * Math.PI / 180;
            return radians;
        };
        DoughnutDirective.prototype.drawWedge = function ($ctrl, context, cX, cY, radius, from, to, color) {
            var fromRadians = this.convertToRadians(from + $ctrl.percentOffset);
            var toRadians = this.convertToRadians(to + $ctrl.percentOffset);
            // draw the wedge
            context.save();
            context.beginPath();
            context.moveTo(cX, cY);
            context.arc(cX, cY, radius, this.convertToRadians($ctrl.percentOffset), toRadians, false);
            context.closePath();
            context.fillStyle = color;
            context.fill();
            context.restore();
        };
        DoughnutDirective.prototype.drawDonut = function ($ctrl, context, cX, cY, radius, color) {
            // cut out an inner-circle == donut
            context.beginPath();
            context.moveTo(cX, cY);
            context.fillStyle = color;
            context.arc(cX, cY, radius * ($ctrl.innerRadius / 100), 0, 2 * Math.PI, false);
            context.fill();
        };
        DoughnutDirective.prototype.setSize = function ($ctrl, context) {
            context.canvas.width = $ctrl.$element.width();
            context.canvas.height = $ctrl.$element.height();
        };
        DoughnutDirective.prototype.draw = function ($ctrl, from, to, fillColor) {
            this.reset($ctrl.contextFill);
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            this.drawWedge($ctrl, $ctrl.contextFill, cX, cY, radius, from, to, fillColor);
        };
        DoughnutDirective.prototype.getX = function (context) {
            var cX = Math.floor(context.canvas.width / 2);
            return cX;
        };
        DoughnutDirective.prototype.getY = function (context) {
            var cY = Math.floor(context.canvas.height / 2);
            return cY;
        };
        DoughnutDirective.prototype.getRadius = function (x, y) {
            var radius = Math.min(x, y);
            return radius;
        };
        DoughnutDirective.prototype.getElementStyle = function (className, style) {
            var $body = angular.element("body");
            var $element = angular.element("<div class=\"" + className + "\"></div>");
            $body.append($element);
            var value = $element.css(style);
            $element.remove();
            return value;
        };
        DoughnutDirective.prototype.reset = function (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        };
        DoughnutDirective.prototype.init = function ($ctrl, from, to) {
            this.initBg($ctrl, from, to);
            this.initHole($ctrl);
            this.reset($ctrl.contextFill);
            this.setSize($ctrl, $ctrl.contextFill);
        };
        DoughnutDirective.prototype.initBg = function ($ctrl, from, to) {
            this.reset($ctrl.contextBg);
            this.setSize($ctrl, $ctrl.contextBg);
            var emptyColor = this.getElementStyle($ctrl.emptyColorClass || "doughnut-empty-color", "background-color");
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            this.drawWedge($ctrl, $ctrl.contextBg, cX, cY, radius, 0, 100, emptyColor);
        };
        DoughnutDirective.prototype.initHole = function ($ctrl) {
            this.reset($ctrl.contextHole);
            this.setSize($ctrl, $ctrl.contextHole);
            var cX = this.getX($ctrl.contextBg);
            var cY = this.getY($ctrl.contextBg);
            var radius = this.getRadius(cX, cY);
            $ctrl.holeColor = this.getBgColor($ctrl);
            this.drawDonut($ctrl, $ctrl.contextHole, cX, cY, radius, $ctrl.holeColor);
        };
        DoughnutDirective.prototype.getBgColor = function ($ctrl) {
            var bgcolor = $ctrl.$element.css("background-color");
            if (bgcolor == "rgba(0, 0, 0, 0)")
                bgcolor = "white";
            return bgcolor;
        };
        DoughnutDirective.prototype.animate = function ($ctrl, from, to) {
            var fillColor = this.getElementStyle($ctrl.colorClass || "doughnut-fill-color", "background-color");
            if ($ctrl.color)
                fillColor = $ctrl.color;
            var nFrom = Number(from);
            var nTo = Number(to);
            if (nFrom < nTo)
                return this.animateUp($ctrl, nFrom, nTo, fillColor);
            else
                return this.animateDown($ctrl, nFrom, nTo, fillColor);
        };
        DoughnutDirective.prototype.animateUp = function ($ctrl, from, to, fillColor) {
            var _this = this;
            this.cancel($ctrl.animationPromise);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value > to) {
                    _this.cancel($ctrl.animationPromise);
                    return;
                }
                _this.draw($ctrl, from, value, fillColor);
                value++;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.animateDown = function ($ctrl, from, to, fillColor) {
            var _this = this;
            this.cancel($ctrl.animationPromise);
            var value = from;
            $ctrl.animationPromise = this.$interval(function () {
                if (value < to) {
                    _this.cancel($ctrl.animationPromise);
                    return;
                }
                _this.draw($ctrl, to, value, fillColor);
                value--;
            }, $ctrl.animateSpeed);
        };
        DoughnutDirective.prototype.cancel = function (promise) {
            if (promise)
                this.$interval.cancel(promise);
        };
        DoughnutDirective.$inject = ['$interval'];
        return DoughnutDirective;
    })();
    Angular.module("ngLayoutPage").directive('doughnut', DoughnutDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavGroupItemController = (function () {
        function NavGroupItemController($attrs, $location) {
            this.$attrs = $attrs;
            this.$location = $location;
        }
        Object.defineProperty(NavGroupItemController.prototype, "hasIcon", {
            get: function () {
                return this.iconClass != null && this.iconClass.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGroupItemController.prototype, "iconClass", {
            get: function () {
                return this.$attrs.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGroupItemController.prototype, "href", {
            get: function () {
                return this.$attrs.href;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGroupItemController.prototype, "isSelected", {
            get: function () {
                var path = this.$location.path();
                if (this.href != null && path.indexOf(this.href) === 0)
                    return true;
                if (this.selected == null)
                    return false;
                var result = this.selected.filter(function (x) { return path.indexOf(x) === 0; });
                return result.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        NavGroupItemController.prototype.navigate = function () {
            this.$location.path(this.href);
        };
        NavGroupItemController.$inject = ['$attrs', '$location'];
        return NavGroupItemController;
    })();
    Angular.module("ngLayoutPage").controller('navGroupItemController', NavGroupItemController);
    var NavGroupItemDirective = (function () {
        function NavGroupItemDirective($compile) {
            var _this = this;
            this.$compile = $compile;
            this.restrict = 'AEC';
            this.transclude = true;
            this.templateUrl = 'nav-group-item/nav-group-item.html';
            this.controller = NavGroupItemController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                selected: '='
            };
            this.link = function ($scope, $element, $attrs) {
                var ctrl = $scope[_this.controllerAs], clickEvent = "click." + $scope.$id;
                $scope.$on('$routeChangeSuccess', function () {
                    $element.toggleClass('nav-group-item--selected', ctrl.isSelected);
                });
                $element.on(clickEvent, function () {
                    ctrl.navigate();
                    $scope.$apply();
                });
            };
        }
        NavGroupItemDirective.$inject = ['$compile'];
        return NavGroupItemDirective;
    })();
    Angular.module("ngLayoutPage").directive('navGroupItem', NavGroupItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavHeaderController = (function () {
        function NavHeaderController() {
        }
        return NavHeaderController;
    })();
    Angular.module("ngLayoutPage").controller('navHeaderController', NavHeaderController);
    var NavHeaderDirective = (function () {
        function NavHeaderDirective() {
            this.restrict = 'E';
            this.templateUrl = 'nav-header/nav-header.html';
            this.controller = NavHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                text: '@',
                small: '@'
            };
        }
        return NavHeaderDirective;
    })();
    Angular.module("ngLayoutPage").directive('navHeader', NavHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var NavMenuController = (function () {
        function NavMenuController($attrs) {
            this.$attrs = $attrs;
        }
        NavMenuController.prototype.onInit = function (toggleShown) {
            this.toggleShown = toggleShown;
        };
        Object.defineProperty(NavMenuController.prototype, "iconClass", {
            get: function () {
                return this.$attrs.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavMenuController.prototype, "isNavShown", {
            get: function () {
                return this._isNavShown;
            },
            set: function (value) {
                this._isNavShown = value;
                this.toggleShown(this);
            },
            enumerable: true,
            configurable: true
        });
        NavMenuController.prototype.toggleShown = function ($ctrl) { };
        ;
        NavMenuController.$inject = ['$attrs'];
        return NavMenuController;
    })();
    Angular.module("ngLayoutPage").controller('navController', NavMenuController);
    var NavMenuDirective = (function () {
        function NavMenuDirective() {
            var _this = this;
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'nav-menu/nav-menu.html';
            this.controller = NavMenuController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = true;
            this.link = function ($scope, $element, $attrs, $ctrl) {
                $element.on('click', function () {
                    $ctrl.isNavShown = !$ctrl.isNavShown;
                });
                $ctrl.onInit(_this.toggleShown);
            };
        }
        NavMenuDirective.prototype.toggleShown = function ($ctrl) {
            angular.element('body').toggleClass('nav--show', $ctrl.isNavShown);
        };
        ;
        return NavMenuDirective;
    })();
    Angular.module("ngLayoutPage").directive('navMenu', NavMenuDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageContentNavItemController = (function () {
        function PageContentNavItemController($location) {
            this.$location = $location;
            this.toggleActive = function ($ctrl) { };
        }
        PageContentNavItemController.prototype.onInit = function ($element, isDefault) {
            this.init = true;
            this.$element = $element;
            this.isDefault = isDefault;
            this.toggleActive(this);
        };
        Object.defineProperty(PageContentNavItemController.prototype, "area", {
            get: function () {
                return this._area;
            },
            set: function (value) {
                this._area = value;
                this.onAreaChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageContentNavItemController.prototype, "isActive", {
            get: function () {
                if (this._area == null)
                    return this.isDefault;
                return this.path.toLowerCase() == this._area.toLowerCase();
            },
            enumerable: true,
            configurable: true
        });
        PageContentNavItemController.prototype.select = function () {
            this.area = this.path;
        };
        PageContentNavItemController.prototype.onRouteChange = function ($routeParams) {
            this._area = $routeParams[this.param || 'area'];
            this.toggleActive(this);
        };
        PageContentNavItemController.prototype.onAreaChange = function () {
            if (!this.init)
                return;
            var params = {};
            params[this.param || 'area'] = this._area;
            this.$location.search(params);
            this.toggleActive(this);
        };
        PageContentNavItemController.$inject = ['$location'];
        return PageContentNavItemController;
    })();
    var PageContentNavItemDirective = (function () {
        function PageContentNavItemDirective() {
            var _this = this;
            this.restrict = 'E';
            this.multiElement = true;
            this.controller = PageContentNavItemController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                param: '@',
                path: '@',
                area: '='
            };
            this.link = function ($scope, $element, $attr, $ctrl) {
                var clickEvent = "click." + $scope.$id;
                $element.on(clickEvent, function () {
                    $ctrl.select();
                    $scope.$apply();
                });
                $ctrl.toggleActive = _this.toggleActive;
                $ctrl.onInit($element, $attr.default != null);
                $scope.$on('$routeUpdate', function (evt, current) {
                    $ctrl.onRouteChange(current.params);
                });
            };
        }
        PageContentNavItemDirective.prototype.toggleActive = function ($ctrl) {
            $ctrl.$element.toggleClass('page-content-nav-item--active', $ctrl.isActive);
        };
        return PageContentNavItemDirective;
    })();
    Angular.module("ngLayoutPage").directive('pageContentNavItem', PageContentNavItemDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageHeaderController = (function () {
        function PageHeaderController() {
        }
        return PageHeaderController;
    })();
    var PageHeaderDirective = (function () {
        function PageHeaderDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'page-header/page-header.html';
            this.controller = PageHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@',
                label: '@'
            };
        }
        return PageHeaderDirective;
    })();
    Angular.module("ngLayoutPage").directive('pageHeader', PageHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderController = (function () {
        function PageSliderController() {
        }
        Object.defineProperty(PageSliderController.prototype, "slideIf", {
            get: function () {
                return this._slideIf;
            },
            set: function (value) {
                this._slideIf = value;
                if (this.toggleVisibility)
                    this.toggleVisibility();
            },
            enumerable: true,
            configurable: true
        });
        PageSliderController.prototype.close = function () {
            this.slideIf = null;
            this.onClose();
        };
        return PageSliderController;
    })();
    var PageSliderDirective = (function () {
        function PageSliderDirective() {
            var _this = this;
            this.restrict = 'E';
            this.transclude = true;
            this.controller = PageSliderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                slideIf: '=',
                onClose: '&'
            };
            this.link = function ($scope, $element, $attrs, $ctrl, $transclude) {
                var ctrl = $scope[_this.controllerAs], sliderScope = null;
                ctrl.toggleVisibility = function () {
                    var isVisible = !!ctrl.slideIf;
                    $element.empty()
                        .toggleClass("is-visible", isVisible);
                    if (sliderScope) {
                        sliderScope.$destroy();
                        sliderScope = null;
                    }
                    if (!isVisible)
                        return;
                    $transclude(function (clone, scope) {
                        $element.append(clone);
                        sliderScope = scope;
                    });
                };
                ctrl.toggleVisibility();
            };
        }
        return PageSliderDirective;
    })();
    Angular.module("ngLayoutPage").directive('pageSlider', PageSliderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PageSliderCancelDirective = (function () {
        function PageSliderCancelDirective() {
            this.restrict = 'A';
            this.require = '^pageSlider';
            this.link = function ($scope, $element, $attrs, slider) {
                var clickEvent = "click." + $scope.$id;
                $element.on(clickEvent, function () {
                    $scope.$apply(slider.close());
                });
                $scope.$on('$destroy', function () {
                    $element.off(clickEvent);
                });
            };
        }
        return PageSliderCancelDirective;
    })();
    Angular.module("ngLayoutPage").directive('pageSliderCancel', PageSliderCancelDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PaneFooterDirective = (function () {
        function PaneFooterDirective() {
            this.restrict = 'E';
            this.link = function ($scope, $element) {
                $element.parent(".pane").addClass("pane--withFooter");
            };
        }
        return PaneFooterDirective;
    })();
    Angular.module("ngLayoutPage").directive('paneFooter', PaneFooterDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var PaneHeaderController = (function () {
        function PaneHeaderController() {
        }
        PaneHeaderController.prototype.close = function () {
            if (this.pageSlider == null)
                return;
            this.pageSlider.close();
        };
        return PaneHeaderController;
    })();
    var PaneHeaderDirective = (function () {
        function PaneHeaderDirective() {
            var _this = this;
            this.restrict = 'E';
            this.require = '?^pageSlider';
            this.transclude = true;
            this.templateUrl = 'pane-header/pane-header.html';
            this.controller = PaneHeaderController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                subtitle: '@'
            };
            this.link = function ($scope, $element, $attrs, pageSlider) {
                $element.removeAttr("title");
                var ctrl = $scope[_this.controllerAs];
                ctrl.pageSlider = pageSlider;
                ctrl.showClose = $attrs.showClose != null;
            };
        }
        return PaneHeaderDirective;
    })();
    Angular.module("ngLayoutPage").directive('paneHeader', PaneHeaderDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var TabController = (function () {
        function TabController() {
        }
        return TabController;
    })();
    var TabDirective = (function () {
        function TabDirective() {
            this.restrict = 'E';
            this.require = ['^tabs', 'tab'];
            // transclude = true;
            // templateUrl = 'tab/tab.html';
            this.controller = TabController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                title: '@',
                name: '@'
            };
            this.link = function ($scope, $element, $attrs, $ctrls) {
                var $tabs = $ctrls[0];
                var $ctrl = $ctrls[1];
                $tabs.addTab($ctrl);
            };
        }
        return TabDirective;
    })();
    Angular.module("ngLayoutPage").directive('tab', TabDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
var LayoutPageModule;
(function (LayoutPageModule) {
    var TabsController = (function () {
        function TabsController() {
            this.tabs = [];
        }
        Object.defineProperty(TabsController.prototype, "width", {
            get: function () {
                return this.tabs.length * 100 + "%";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabsController.prototype, "tabPosition", {
            get: function () {
                var idx = this.tabs.indexOf(this.selectedTab);
                return idx * -100 + "%";
            },
            enumerable: true,
            configurable: true
        });
        TabsController.prototype.addTab = function (tab) {
            this.tabs.push(tab);
            if (this.selectedTab == null)
                this.selectedTab = tab;
        };
        TabsController.prototype.selectTab = function (tab) {
            this.selectedTab = tab;
        };
        TabsController.prototype.selectTabByName = function (name) {
            var found = this.tabs.filter(function (x) { return x.name == name; });
            if (found.length > 0)
                this.selectTab(found[0]);
        };
        TabsController.prototype.selectTabByIndex = function (idx) {
            if (idx > 0 && this.tabs.length > idx)
                this.selectTab(this.tabs[idx]);
        };
        TabsController.prototype.selectNextTab = function () {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx + 1);
        };
        TabsController.prototype.selectPreviousTab = function () {
            var idx = this.tabs.indexOf(this.selectedTab);
            this.selectTabByIndex(idx - 1);
        };
        return TabsController;
    })();
    var TabsDirective = (function () {
        function TabsDirective() {
            this.restrict = 'E';
            this.transclude = true;
            this.templateUrl = 'tabs/tabs.html';
            this.controller = TabsController;
            this.controllerAs = 'vm';
            this.bindToController = true;
            this.scope = {
                tabLink: '='
            };
            this.link = function ($scope, $element, $attrs, $ctrl) {
                if ($attrs.tabLink)
                    $ctrl.tabLink = $ctrl;
            };
        }
        return TabsDirective;
    })();
    Angular.module("ngLayoutPage").directive('tabs', TabsDirective);
})(LayoutPageModule || (LayoutPageModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9wcy1sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL2JsYW5rc2xhdGUvYmxhbmtzbGF0ZS50cyIsIi4uL3NyYy9ib2R5LWhlYWRlci9ib2R5LWhlYWRlci50cyIsIi4uL3NyYy9kb3VnaG51dC9kb3VnaG51dC50cyIsIi4uL3NyYy9uYXYtZ3JvdXAtaXRlbS9uYXYtZ3JvdXAtaXRlbS50cyIsIi4uL3NyYy9uYXYtaGVhZGVyL25hdi1oZWFkZXIudHMiLCIuLi9zcmMvbmF2LW1lbnUvbmF2LW1lbnUudHMiLCIuLi9zcmMvcGFnZS1jb250ZW50LW5hdi1pdGVtL3BhZ2UtY29udGVudC1uYXYtaXRlbS50cyIsIi4uL3NyYy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyIsIi4uL3NyYy9wYWdlLXNsaWRlci1jYW5jZWwvcGFnZS1zbGlkZXItY2FuY2VsLnRzIiwiLi4vc3JjL3BhbmUtZm9vdGVyL3BhbmUtZm9vdGVyLnRzIiwiLi4vc3JjL3BhbmUtaGVhZGVyL3BhbmUtaGVhZGVyLnRzIiwiLi4vc3JjL3RhYi90YWIudHMiLCIuLi9zcmMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbIkxheW91dFBhZ2VNb2R1bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5CbGFua3NsYXRlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQmxhbmtzbGF0ZUNvbnRyb2xsZXIuaGFzU3VidGl0bGUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkJsYW5rc2xhdGVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkJvZHlIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Cb2R5SGVhZGVyQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuQm9keUhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXRDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0Q29udHJvbGxlci52YWx1ZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS53YXRjaFNpemUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNvbnZlcnRUb1JhZGlhbnMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmRyYXdXZWRnZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuZHJhd0RvbnV0IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5zZXRTaXplIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5kcmF3IiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRYIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRZIiwiTGF5b3V0UGFnZU1vZHVsZS5Eb3VnaG51dERpcmVjdGl2ZS5nZXRSYWRpdXMiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEVsZW1lbnRTdHlsZSIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUucmVzZXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmluaXRCZyIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuaW5pdEhvbGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmdldEJnQ29sb3IiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGUiLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmFuaW1hdGVVcCIsIkxheW91dFBhZ2VNb2R1bGUuRG91Z2hudXREaXJlY3RpdmUuYW5pbWF0ZURvd24iLCJMYXlvdXRQYWdlTW9kdWxlLkRvdWdobnV0RGlyZWN0aXZlLmNhbmNlbCIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5oYXNJY29uIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtQ29udHJvbGxlci5ocmVmIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZHcm91cEl0ZW1Db250cm9sbGVyLmlzU2VsZWN0ZWQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbUNvbnRyb2xsZXIubmF2aWdhdGUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkdyb3VwSXRlbURpcmVjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuTmF2R3JvdXBJdGVtRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZIZWFkZXJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdkhlYWRlckRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5OYXZNZW51Q29udHJvbGxlci5vbkluaXQiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVDb250cm9sbGVyLmljb25DbGFzcyIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIuaXNOYXZTaG93biIsIkxheW91dFBhZ2VNb2R1bGUuTmF2TWVudUNvbnRyb2xsZXIudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLk5hdk1lbnVEaXJlY3RpdmUudG9nZ2xlU2hvd24iLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIub25Jbml0IiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLmFyZWEiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIuaXNBY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIuc2VsZWN0IiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyLm9uUm91dGVDaGFuZ2UiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIub25BcmVhQ2hhbmdlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUNvbnRlbnROYXZJdGVtRGlyZWN0aXZlLnRvZ2dsZUFjdGl2ZSIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZUhlYWRlckNvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VIZWFkZXJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlSGVhZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFnZVNsaWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyLnNsaWRlSWYiLCJMYXlvdXRQYWdlTW9kdWxlLlBhZ2VTbGlkZXJDb250cm9sbGVyLmNsb3NlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYWdlU2xpZGVyQ2FuY2VsRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lRm9vdGVyRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lRm9vdGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyQ29udHJvbGxlciIsIkxheW91dFBhZ2VNb2R1bGUuUGFuZUhlYWRlckNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJMYXlvdXRQYWdlTW9kdWxlLlBhbmVIZWFkZXJDb250cm9sbGVyLmNsb3NlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5QYW5lSGVhZGVyRGlyZWN0aXZlLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJDb250cm9sbGVyIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJEaXJlY3RpdmUiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYkRpcmVjdGl2ZS5jb25zdHJ1Y3RvciIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci53aWR0aCIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIudGFiUG9zaXRpb24iLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLmFkZFRhYiIsIkxheW91dFBhZ2VNb2R1bGUuVGFic0NvbnRyb2xsZXIuc2VsZWN0VGFiIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzQ29udHJvbGxlci5zZWxlY3RUYWJCeU5hbWUiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLnNlbGVjdFRhYkJ5SW5kZXgiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLnNlbGVjdE5leHRUYWIiLCJMYXlvdXRQYWdlTW9kdWxlLlRhYnNDb250cm9sbGVyLnNlbGVjdFByZXZpb3VzVGFiIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzRGlyZWN0aXZlIiwiTGF5b3V0UGFnZU1vZHVsZS5UYWJzRGlyZWN0aXZlLmNv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LENBQUNBO1lBQ3hCQSxVQUFLQSxHQUFHQTtnQkFDSkEsT0FBT0EsRUFBRUEsR0FBR0E7YUFDZkEsQ0FBQ0E7WUFFRkEsU0FBSUEsR0FBR0EsVUFBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsS0FBS0E7Z0JBQ25DQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTtvQkFDZkEsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDOUJBLENBQUNBLENBQUNBO1FBQ05BLENBQUNBO1FBQURELG9CQUFDQTtJQUFEQSxDQUFDQSxBQWZEdEcsSUFlQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsRUFBRUEsYUFBYUEsQ0FBQ0EsQ0FBQ0E7QUFDcEVBLENBQUNBLEVBL0VNLGdCQUFnQixLQUFoQixnQkFBZ0IsUUErRXRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUvZGlzdC9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlLmQudHNcIi8+XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiLCBbXSk7IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIEJsYW5rc2xhdGVDb250cm9sbGVyIHtcclxuICAgICAgICBzdWJ0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldCBoYXNTdWJ0aXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEodGhpcy5zdWJ0aXRsZSA9PSBudWxsIHx8IHRoaXMuc3VidGl0bGUudHJpbSgpLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCbGFua3NsYXRlRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICdibGFua3NsYXRlL2JsYW5rc2xhdGUuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IEJsYW5rc2xhdGVDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIGljb246ICdAJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgc3VidGl0bGU6ICdAJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdibGFua3NsYXRlJywgQmxhbmtzbGF0ZURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgQm9keUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEJvZHlIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ2JvZHktaGVhZGVyL2JvZHktaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBCb2R5SGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ2JvZHlIZWFkZXInLCBCb2R5SGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBEb3VnaG51dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQoJGVsZW1lbnQsIGNvbnRleHRIb2xlLCBjb250ZXh0RmlsbCwgY29udGV4dEJnLCBhbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0SG9sZSA9IGNvbnRleHRIb2xlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRGaWxsID0gY29udGV4dEZpbGw7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dEJnID0gY29udGV4dEJnO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgMCwgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG5cclxuICAgICAgICBjb250ZXh0SG9sZTogYW55O1xyXG4gICAgICAgIGNvbnRleHRGaWxsOiBhbnk7XHJcbiAgICAgICAgY29udGV4dEJnOiBhbnk7XHJcblxyXG4gICAgICAgIGFuaW1hdGlvblByb21pc2U6IGFueTtcclxuICAgICAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBlbXB0eUNvbG9yQ2xhc3M6IHN0cmluZztcclxuICAgICAgICBpbm5lclJhZGl1cyA9IDY1OyAvLyA3NSVcclxuICAgICAgICBhbmltYXRlU3BlZWQgPSAxMDtcclxuICAgICAgICBwZXJjZW50T2Zmc2V0ID0gLTI1O1xyXG4gICAgICAgIGhvbGVDb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIGFuaW1hdGU6ICgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpID0+IHt9O1xyXG5cclxuICAgICAgICBfdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgICAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgdmFsdWUobmV3VmFsOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcywgb2xkVmFsLCBuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIERvdWdobnV0RGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGludGVydmFsJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGludGVydmFsKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnZG91Z2hudXQvZG91Z2hudXQuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IERvdWdobnV0Q29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ0AnLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnQCcsXHJcbiAgICAgICAgICAgIGVtcHR5Q29sb3JDbGFzczogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0ciwgJGN0cmwpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0SG9sZSA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtaG9sZVwiKS5nZXQoMCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEZpbGwgPSAkZWxlbWVudC5maW5kKFwiY2FudmFzLmRvdWdobnV0LWZpbGxcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRCZyA9ICRlbGVtZW50LmZpbmQoXCJjYW52YXMuZG91Z2hudXQtYmdcIikuZ2V0KDApLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCgkZWxlbWVudCwgY29udGV4dEhvbGUsIGNvbnRleHRGaWxsLCBjb250ZXh0QmcsICgkY3RybCwgZnJvbSwgdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJGN0cmwsIGZyb20sIHRvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQoJGN0cmwsIDAsICRjdHJsLnZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLndhdGNoU2l6ZSgkY3RybCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJnQ29sb3IoJGN0cmwpO1xyXG4gICAgICAgICAgICB9LCBiZ2NvbG9yID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGRpZCBiYWNrZ3JvdW5kIGNvbG9yIGNoYW5nZT9cclxuICAgICAgICAgICAgICAgIGlmIChiZ2NvbG9yICE9ICRjdHJsLmhvbGVDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW50ZXJ2YWwuY2FuY2VsKHByb21pc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0U2l6ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIHNpemUgPSAkY3RybC4kZWxlbWVudC53aWR0aCgpICsgJGN0cmwuJGVsZW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2F0Y2hTaXplKCRjdHJsKSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCRjdHJsKTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLiRpbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMuZ2V0U2l6ZSgkY3RybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHNpemUgIT0gdGVtcDtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgkY3RybCwgMCwgJGN0cmwudmFsdWUpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnZlcnRUb1JhZGlhbnMocGVyY2VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gcGVyY2VudCAvIDEwMCAqIDM2MCAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd1dlZGdlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSwgY1g6IG51bWJlciwgY1k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVJhZGlhbnMgPSB0aGlzLmNvbnZlcnRUb1JhZGlhbnMoZnJvbSArICRjdHJsLnBlcmNlbnRPZmZzZXQpO1xyXG4gICAgICAgICAgICB2YXIgdG9SYWRpYW5zID0gdGhpcy5jb252ZXJ0VG9SYWRpYW5zKHRvICsgJGN0cmwucGVyY2VudE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkcmF3IHRoZSB3ZWRnZVxyXG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY1gsIGNZKTtcclxuICAgICAgICAgICAgY29udGV4dC5hcmMoY1gsIGNZLCByYWRpdXMsIHRoaXMuY29udmVydFRvUmFkaWFucygkY3RybC5wZXJjZW50T2Zmc2V0KSwgdG9SYWRpYW5zLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdEb251dCgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBjb250ZXh0OiBhbnksIGNYOiBudW1iZXIsIGNZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGN1dCBvdXQgYW4gaW5uZXItY2lyY2xlID09IGRvbnV0XHJcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNYLCBjWSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNYLCBjWSwgcmFkaXVzICogKCRjdHJsLmlubmVyUmFkaXVzIC8gMTAwKSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTaXplKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGNvbnRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCA9ICRjdHJsLiRlbGVtZW50LndpZHRoKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9ICRjdHJsLiRlbGVtZW50LmhlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhdygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZpbGxDb2xvcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCRjdHJsLmNvbnRleHRGaWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEZpbGwsIGNYLCBjWSwgcmFkaXVzLCBmcm9tLCB0bywgZmlsbENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFgoY29udGV4dDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjWCA9IE1hdGguZmxvb3IoY29udGV4dC5jYW52YXMud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0WShjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNZID0gTWF0aC5mbG9vcihjb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0UmFkaXVzKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbih4LCB5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RWxlbWVudFN0eWxlKGNsYXNzTmFtZSwgc3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KFwiYm9keVwiKTtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICRib2R5LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRlbGVtZW50LmNzcyhzdHlsZSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldChjb250ZXh0OiBhbnkpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciB8IHN0cmluZywgdG86IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCZygkY3RybCwgZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRIb2xlKCRjdHJsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoJGN0cmwuY29udGV4dEZpbGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRGaWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRCZygkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNpemUoJGN0cmwsICRjdHJsLmNvbnRleHRCZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmVtcHR5Q29sb3JDbGFzcyB8fCBcImRvdWdobnV0LWVtcHR5LWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjWCA9IHRoaXMuZ2V0WCgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgY1kgPSB0aGlzLmdldFkoJGN0cmwuY29udGV4dEJnKTtcclxuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IHRoaXMuZ2V0UmFkaXVzKGNYLCBjWSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWRnZSgkY3RybCwgJGN0cmwuY29udGV4dEJnLCBjWCwgY1ksIHJhZGl1cywgMCwgMTAwLCBlbXB0eUNvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRIb2xlKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgkY3RybC5jb250ZXh0SG9sZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSgkY3RybCwgJGN0cmwuY29udGV4dEhvbGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNYID0gdGhpcy5nZXRYKCRjdHJsLmNvbnRleHRCZyk7XHJcbiAgICAgICAgICAgIHZhciBjWSA9IHRoaXMuZ2V0WSgkY3RybC5jb250ZXh0QmcpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoY1gsIGNZKTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLmhvbGVDb2xvciA9IHRoaXMuZ2V0QmdDb2xvcigkY3RybCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0RvbnV0KCRjdHJsLCAkY3RybC5jb250ZXh0SG9sZSwgY1gsIGNZLCByYWRpdXMsICRjdHJsLmhvbGVDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRCZ0NvbG9yKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGJnY29sb3IgPSAkY3RybC4kZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoYmdjb2xvciA9PSBcInJnYmEoMCwgMCwgMCwgMClcIilcclxuICAgICAgICAgICAgICAgIGJnY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ2NvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZSgkY3RybDogRG91Z2hudXRDb250cm9sbGVyLCBmcm9tOiBudW1iZXIgfCBzdHJpbmcsIHRvOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHRoaXMuZ2V0RWxlbWVudFN0eWxlKCRjdHJsLmNvbG9yQ2xhc3MgfHwgXCJkb3VnaG51dC1maWxsLWNvbG9yXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC5jb2xvcilcclxuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICRjdHJsLmNvbG9yO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5Gcm9tID0gTnVtYmVyKGZyb20pO1xyXG4gICAgICAgICAgICB2YXIgblRvID0gTnVtYmVyKHRvKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuRnJvbSA8IG5UbylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGVVcCgkY3RybCwgbkZyb20sIG5UbywgZmlsbENvbG9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZURvd24oJGN0cmwsIG5Gcm9tLCBuVG8sIGZpbGxDb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltYXRlVXAoJGN0cmw6IERvdWdobnV0Q29udHJvbGxlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmaWxsQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tO1xyXG4gICAgICAgICAgICAkY3RybC5hbmltYXRpb25Qcm9taXNlID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgkY3RybC5hbmltYXRpb25Qcm9taXNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoJGN0cmwsIGZyb20sIHZhbHVlLCBmaWxsQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUrKztcclxuICAgICAgICAgICAgfSwgJGN0cmwuYW5pbWF0ZVNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFuaW1hdGVEb3duKCRjdHJsOiBEb3VnaG51dENvbnRyb2xsZXIsIGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmlsbENvbG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCRjdHJsLmFuaW1hdGlvblByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbTtcclxuICAgICAgICAgICAgJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSA9IHRoaXMuJGludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoJGN0cmwuYW5pbWF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCRjdHJsLCB0bywgdmFsdWUsIGZpbGxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS0tO1xyXG4gICAgICAgICAgICB9LCAkY3RybC5hbmltYXRlU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsKHByb21pc2UpIHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnRlcnZhbC5jYW5jZWwocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgnZG91Z2hudXQnLCBEb3VnaG51dERpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2R3JvdXBJdGVtQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRhdHRycycsICckbG9jYXRpb24nXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMsIHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGhhc0ljb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmljb25DbGFzcyAhPSBudWxsICYmIHRoaXMuaWNvbkNsYXNzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBocmVmKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYXR0cnMuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcy4kbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ocmVmICE9IG51bGwgJiYgcGF0aC5pbmRleE9mKHRoaXMuaHJlZikgPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuZmlsdGVyKHggPT4gcGF0aC5pbmRleE9mKHgpID09PSAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgodGhpcy5ocmVmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2R3JvdXBJdGVtQ29udHJvbGxlcicsIE5hdkdyb3VwSXRlbUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBRUMnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ25hdi1ncm91cC1pdGVtL25hdi1ncm91cC1pdGVtLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZHcm91cEl0ZW1Db250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY3RybDogTmF2R3JvdXBJdGVtQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnRvZ2dsZUNsYXNzKCduYXYtZ3JvdXAtaXRlbS0tc2VsZWN0ZWQnLCBjdHJsLmlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwubmF2aWdhdGUoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkdyb3VwSXRlbScsIE5hdkdyb3VwSXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2SGVhZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblx0XHJcblx0QW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2SGVhZGVyQ29udHJvbGxlcicsIE5hdkhlYWRlckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNsYXNzIE5hdkhlYWRlckRpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnbmF2LWhlYWRlci9uYXYtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBOYXZIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdAJyxcclxuICAgICAgICAgICAgc21hbGw6ICdAJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdkhlYWRlcicsIE5hdkhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTmF2TWVudUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckYXR0cnMnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkYXR0cnMpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkluaXQodG9nZ2xlU2hvd24pIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVTaG93biA9IHRvZ2dsZVNob3duO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsZW1lbnQ6IGFueTtcclxuXHJcbiAgICAgICAgZ2V0IGljb25DbGFzcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF0dHJzLmljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc05hdlNob3duOiBib29sZWFuO1xyXG4gICAgICAgIGdldCBpc05hdlNob3duKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNOYXZTaG93bjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGlzTmF2U2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNOYXZTaG93biA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNob3duKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlU2hvd24oJGN0cmw6IE5hdk1lbnVDb250cm9sbGVyKSB7IH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIE5hdk1lbnVDb250cm9sbGVyKTtcclxuXHJcbiAgICBjbGFzcyBOYXZNZW51RGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wbGF0ZVVybCA9ICduYXYtbWVudS9uYXYtbWVudS5odG1sJztcclxuICAgICAgICBjb250cm9sbGVyID0gTmF2TWVudUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybDogTmF2TWVudUNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNOYXZTaG93biA9ICEkY3RybC5pc05hdlNob3duOyBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRjdHJsLm9uSW5pdCh0aGlzLnRvZ2dsZVNob3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZVNob3duKCRjdHJsOiBOYXZNZW51Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS50b2dnbGVDbGFzcygnbmF2LS1zaG93JywgJGN0cmwuaXNOYXZTaG93bik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ25hdk1lbnUnLCBOYXZNZW51RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KCRlbGVtZW50LCBpc0RlZmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmlzRGVmYXVsdCA9IGlzRGVmYXVsdDtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0OiBib29sZWFuO1xyXG4gICAgICAgIHBhdGg6IHN0cmluZztcclxuICAgICAgICAkZWxlbWVudDogYW55O1xyXG4gICAgICAgIHBhcmFtOiBzdHJpbmc7XHJcbiAgICAgICAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9hcmVhOiBzdHJpbmc7XHJcbiAgICAgICAgZ2V0IGFyZWEoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYXJlYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyZWEgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbkFyZWFDaGFuZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpc0FjdGl2ZSgpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fYXJlYSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWZhdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoLnRvTG93ZXJDYXNlKCkgPT0gdGhpcy5fYXJlYS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLnBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblJvdXRlQ2hhbmdlKCRyb3V0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9hcmVhID0gJHJvdXRlUGFyYW1zW3RoaXMucGFyYW0gfHwgJ2FyZWEnXTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluaXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHBhcmFtc1t0aGlzLnBhcmFtIHx8ICdhcmVhJ10gPSB0aGlzLl9hcmVhO1xyXG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5zZWFyY2gocGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9nZ2xlQWN0aXZlID0gKCRjdHJsOiBQYWdlQ29udGVudE5hdkl0ZW1Db250cm9sbGVyKSA9PiB7IH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlQ29udGVudE5hdkl0ZW1EaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIG11bHRpRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgcGFyYW06ICdAJyxcclxuICAgICAgICAgICAgcGF0aDogJ0AnLFxyXG4gICAgICAgICAgICBhcmVhOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyLCAkY3RybDogUGFnZUNvbnRlbnROYXZJdGVtQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tFdmVudCA9IGBjbGljay4keyRzY29wZS4kaWR9YDtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGNsaWNrRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnRvZ2dsZUFjdGl2ZSA9IHRoaXMudG9nZ2xlQWN0aXZlO1xyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQoJGVsZW1lbnQsICRhdHRyLmRlZmF1bHQgIT0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckcm91dGVVcGRhdGUnLCBmdW5jdGlvbihldnQsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICRjdHJsLm9uUm91dGVDaGFuZ2UoY3VycmVudC5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0b2dnbGVBY3RpdmUoJGN0cmw6IFBhZ2VDb250ZW50TmF2SXRlbUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgJGN0cmwuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ3BhZ2UtY29udGVudC1uYXYtaXRlbS0tYWN0aXZlJywgJGN0cmwuaXNBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VDb250ZW50TmF2SXRlbScsIFBhZ2VDb250ZW50TmF2SXRlbURpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBhZ2VIZWFkZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIHRlbXBsYXRlVXJsID0gJ3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBQYWdlSGVhZGVyQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBzdWJ0aXRsZTogJ0AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ0AnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTGF5b3V0UGFnZVwiKS5kaXJlY3RpdmUoJ3BhZ2VIZWFkZXInLCBQYWdlSGVhZGVyRGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBMYXlvdXRQYWdlTW9kdWxlIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyQ29udHJvbGxlciBpbXBsZW1lbnRzIElQYWdlU2xpZGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfc2xpZGVJZjtcclxuXHJcbiAgICAgICAgZ2V0IHNsaWRlSWYoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGlkZUlmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHNsaWRlSWYodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVJZiA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGVWaXNpYmlsaXR5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNsb3NlO1xyXG4gICAgICAgIHRvZ2dsZVZpc2liaWxpdHk7XHJcbiAgICAgICAgd2l0aEZvb3RlcjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJZiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYWdlU2xpZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICB0cmFuc2NsdWRlID0gdHJ1ZTtcclxuICAgICAgICBjb250cm9sbGVyID0gUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgc2xpZGVJZjogJz0nLFxyXG4gICAgICAgICAgICBvbkNsb3NlOiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICR0cmFuc2NsdWRlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYWdlU2xpZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc10sXHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTY29wZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVZpc2liaWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNWaXNpYmxlID0gISFjdHJsLnNsaWRlSWY7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b2dnbGVDbGFzcyhcImlzLXZpc2libGVcIiwgaXNWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJTY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJHRyYW5zY2x1ZGUoIChjbG9uZSwgc2NvcGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlclNjb3BlID0gc2NvcGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYWdlU2xpZGVyJywgUGFnZVNsaWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFnZVNsaWRlckNhbmNlbERpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICdecGFnZVNsaWRlcic7XHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjbGlja0V2ZW50ID0gYGNsaWNrLiR7JHNjb3BlLiRpZH1gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oY2xpY2tFdmVudCwoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KHNsaWRlci5jbG9zZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdMYXlvdXRQYWdlXCIpLmRpcmVjdGl2ZSgncGFnZVNsaWRlckNhbmNlbCcsIFBhZ2VTbGlkZXJDYW5jZWxEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFBhbmVGb290ZXJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KFwiLnBhbmVcIikuYWRkQ2xhc3MoXCJwYW5lLS13aXRoRm9vdGVyXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lRm9vdGVyJywgUGFuZUZvb3RlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgUGFuZUhlYWRlckNvbnRyb2xsZXIge1xyXG4gICAgICAgIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICAgICAgICBwYWdlU2xpZGVyOiBJUGFnZVNsaWRlckNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlU2xpZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVNsaWRlci5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQYW5lSGVhZGVyRGlyZWN0aXZlIHtcclxuICAgICAgICByZXN0cmljdCA9ICdFJztcclxuICAgICAgICByZXF1aXJlID0gJz9ecGFnZVNsaWRlcic7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAncGFuZS1oZWFkZXIvcGFuZS1oZWFkZXIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFBhbmVIZWFkZXJDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQCcsXHJcbiAgICAgICAgICAgIHN1YnRpdGxlOiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgcGFnZVNsaWRlcjogSVBhZ2VTbGlkZXJDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdHJsOiBQYW5lSGVhZGVyQ29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcbiAgICAgICAgICAgIGN0cmwucGFnZVNsaWRlciA9IHBhZ2VTbGlkZXI7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0Nsb3NlID0gJGF0dHJzLnNob3dDbG9zZSAhPSBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCdwYW5lSGVhZGVyJywgUGFuZUhlYWRlckRpcmVjdGl2ZSk7XHJcbn0iLCJtb2R1bGUgTGF5b3V0UGFnZU1vZHVsZSB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVGFiQ29udHJvbGxlciB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFiQ29udHJvbGxlciBpbXBsZW1lbnRzIElUYWJDb250cm9sbGVyIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUYWJEaXJlY3RpdmUge1xyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ150YWJzJywgJ3RhYiddO1xyXG4gICAgICAgIC8vIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRlbXBsYXRlVXJsID0gJ3RhYi90YWIuaHRtbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IFRhYkNvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3ZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdAJyxcclxuICAgICAgICAgICAgbmFtZTogJ0AnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICR0YWJzOiBJVGFic0NvbnRyb2xsZXIgPSAkY3RybHNbMF07XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogSVRhYkNvbnRyb2xsZXIgPSAkY3RybHNbMV07XHJcblxyXG4gICAgICAgICAgICAkdGFicy5hZGRUYWIoJGN0cmwpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWInLCBUYWJEaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIExheW91dFBhZ2VNb2R1bGUge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVRhYnNDb250cm9sbGVyIHtcclxuICAgICAgICBhZGRUYWIodGFiOiBJVGFiQ29udHJvbGxlcik7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlOYW1lKG5hbWU6IHN0cmluZyk7XHJcbiAgICAgICAgc2VsZWN0VGFiQnlJbmRleChpZHg6IG51bWJlcik7XHJcbiAgICAgICAgc2VsZWN0TmV4dFRhYigpO1xyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJVGFic0NvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkVGFiOiBJVGFiQ29udHJvbGxlcjtcclxuICAgICAgICB0YWJzOiBJVGFiQ29udHJvbGxlcltdO1xyXG5cclxuICAgICAgICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMudGFicy5sZW5ndGggKiAxMDB9JWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdGFiUG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoaXMudGFicy5pbmRleE9mKHRoaXMuc2VsZWN0ZWRUYWIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7aWR4ICogLTEwMH0lYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRhYih0YWI6IElUYWJDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0VGFiKHRhYjogSVRhYkNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFRhYkJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpcy50YWJzLmZpbHRlcih4ID0+IHgubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihmb3VuZFswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RUYWJCeUluZGV4KGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwICYmIHRoaXMudGFicy5sZW5ndGggPiBpZHgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0VGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXZpb3VzVGFiKCkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy50YWJzLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhYik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiQnlJbmRleChpZHggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGFiTGluazogSVRhYnNDb250cm9sbGVyXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVGFic0RpcmVjdGl2ZSB7XHJcbiAgICAgICAgcmVzdHJpY3QgPSAnRSc7XHJcbiAgICAgICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAndGFicy90YWJzLmh0bWwnO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUYWJzQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0YWJMaW5rOiAnPSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCRhdHRycy50YWJMaW5rKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudGFiTGluayA9ICRjdHJsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ0xheW91dFBhZ2VcIikuZGlyZWN0aXZlKCd0YWJzJywgVGFic0RpcmVjdGl2ZSk7XHJcbn0iXX0=
(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bar-graph/bar-graph.html',
    '<div class="bar-graph-bg">\n' +
    '    <div class="bar-graph-fill" ng-class="{\'bar-graph-fill--full\': vm.isFull}" ng-style="vm.style" ng-transclude></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('blankslate/blankslate.html',
    '<i class="blankslate-icon {{vm.icon}}"></i>\n' +
    '<div class="blankslate-content">\n' +
    '    <div class="blankslate-content-title">{{vm.title}}</div>\n' +
    '    <div class="blankslate-content-subtitle">\n' +
    '        <div ng-transclude></div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('body-header/body-header.html',
    '<div class="body-header-top">\n' +
    '    <div class="body-header-titles">\n' +
    '        <div class="body-header-subtitle" ng-if="vm.subtitle">{{vm.subtitle}}</div>\n' +
    '        <div class="body-header-title">{{vm.title}}</div>\n' +
    '    </div>\n' +
    '    <div class="body-header-actions">\n' +
    '        <div ng-transclude></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<!--<div class="body-header-bottom">\n' +
    '    <div class="body-header-subtitle" ng-show="vm.subtitle">{{vm.subtitle}}</div>\n' +
    '</div>-->');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('doughnut/doughnut.html',
    '<div class="doughnut-text">\n' +
    '    <div ng-transclude></div>\n' +
    '</div>\n' +
    '<canvas class="doughnut-hole"></canvas>\n' +
    '<canvas class="doughnut-fill"></canvas>\n' +
    '<canvas class="doughnut-bg"></canvas>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('nav-group-item/nav-group-item.html',
    '<i ng-if="vm.hasIcon" class="nav-group-item-icon" ng-class="vm.iconClass"></i>\n' +
    '<span class="nav-group-item-text" ng-transclude></span>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('page-dropdown/page-dropdown.html',
    '<div class="page-dropdown" ng-class="{\'page-dropdown--isVisible\': vm.showIf}">\n' +
    '    <div class="page-dropdown-menu">\n' +
    '        <div class="page-dropdown-content" ng-transclude></div>\n' +
    '        <div class="page-dropdown-close" ng-click="vm.showIf=false">\n' +
    '            <i class="fa fa-angle-up"></i>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('page-header/page-header.html',
    '<div class="page-header">\n' +
    '    <div class="page-header-left">\n' +
    '        <i class="page-header-navMenu fa fa-navicon" ng-click="vm.toggleNav()"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Transclude default -->\n' +
    '    <div class="page-header-center" ng-if-start="vm.transcludeContent">\n' +
    '        <span class="page-header-title">{{vm.title}}</span>\n' +
    '        <span class="page-header-subtitle">{{vm.subtitle}}</span>\n' +
    '        <span class="page-header-label">{{vm.label}}</span>\n' +
    '    </div>\n' +
    '    <div class="page-header-right" ng-if-end>\n' +
    '        <div class="page-header-actions" ng-transclude></div>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Transclude title and actions -->\n' +
    '    <div class="page-header-center" ng-if-start="!vm.transcludeContent" ng-transclude="title"> </div>\n' +
    '    <div class="page-header-right" ng-if-end>\n' +
    '        <div class="page-header-actions" ng-transclude="actions"></div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pane-header/pane-header.html',
    '<a href="#" class="pane-header-close" ng-if="vm.showClose" ng-click="vm.close()">\n' +
    '    <span class="pane-header-closeIcon fa fa-close"></i>\n' +
    '</a>\n' +
    '<div class="pane-header-actions" ng-transclude></div>\n' +
    '<div class="pane-header-titles">\n' +
    '    <div class="pane-header-title">\n' +
    '        <span class="pane-header-titleText">{{vm.title}}</span>\n' +
    '    </div>\n' +
    '    <div class="pane-header-subtitle">\n' +
    '        <span class="pane-header-subtitleText" ng-if="vm.subtitle">{{vm.subtitle}}</span>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tabs.html',
    '<div class="tab-titles">\n' +
    '    <div class="tab-titles-item" \n' +
    '        ng-class="{\'tab-titles-item--selected\': tab == vm.selectedTab }"\n' +
    '        ng-repeat="tab in vm.tabs" \n' +
    '        ng-click="vm.selectTab(tab)">\n' +
    '        <i class="tab-titles-item-icon {{tab.icon}}" ng-if="tab.icon"></i>\n' +
    '        <div class="tab-titles-item-title">{{tab.title}}</div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="tab-content">\n' +
    '    <div class="tab-content-window" \n' +
    '        ng-style="{\'width\': vm.width, \'left\': vm.tabPosition}"\n' +
    '        ng-transclude>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tab/tab.html',
    '');
}]);
})();

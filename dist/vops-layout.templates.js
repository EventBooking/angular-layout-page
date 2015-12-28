(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('body-header/body-header.html',
    '<div class="body-header-actions" ng-transclude></div>\n' +
    '<div class="body-header-titles">\n' +
    '    <span class="body-header-title">{{bodyHeader.title}}</span>\n' +
    '    <span class="body-header-subtitle" ng-show="bodyHeader.subtitle">{{bodyHeader.subtitle}}</span>\n' +
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
  $templateCache.put('nav-group-item/nav-group-item.html',
    '<i ng-if="navGroupItem.hasIcon" class="nav-group-item-icon" ng-class="navGroupItem.iconClass"></i>\n' +
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
  $templateCache.put('nav-header/nav-header.html',
    '<span class="nav-header-text">{{navHeader.text}}</span>\n' +
    '<span class="nav-header-small">{{navHeader.small}}</span>');
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
    '<div class="page-header-actions" ng-transclude></div>\n' +
    '<div class="page-header-titles">\n' +
    '    <span class="page-header-title">{{pageHeader.title}}</span>\n' +
    '    <span class="page-header-subtitle" ng-if="pageHeader.subtitle">{{pageHeader.subtitle}}</span>\n' +
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
    '<a href="#" class="pane-header-close" ng-if="paneHeader.showClose" ng-click="paneHeader.close()">\n' +
    '    <i class="pane-header-closeIcon"></i>\n' +
    '</a>\n' +
    '<div class="pane-header-actions" ng-transclude></div>\n' +
    '<div class="pane-header-titles" ng-class="{ \'pane-header-titles--withSubtitle\': paneHeader.subtitle }">\n' +
    '    <span class="pane-header-title">\n' +
    '        <span class="pane-header-titleText">{{paneHeader.title}}</span>\n' +
    '    </span>\n' +
    '    <span class="pane-header-subtitle" ng-if="paneHeader.subtitle">\n' +
    '        <span class="pane-header-subtitleText">{{paneHeader.subtitle}}</span>\n' +
    '    </span>\n' +
    '</div>');
}]);
})();

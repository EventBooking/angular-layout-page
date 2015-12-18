(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('body-header/body-header.html',
    '<div class="bodyHeader">\n' +
    '    <div class="bodyHeader-actions" ng-transclude></div>\n' +
    '    <div class="bodyHeader-titles">\n' +
    '        <span class="bodyHeader-title">{{vm.title}}</span>\n' +
    '        <span class="bodyHeader-subtitle" ng-show="vm.subtitle">{{vm.subtitle}}</span>\n' +
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
  $templateCache.put('navigation/navigation.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('navigation-group/navigation-group.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ngLayoutPage');
} catch (e) {
  module = angular.module('ngLayoutPage', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('navigation-group-item/navigation-group-item.html',
    '');
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
    '<div class="pageHeader">\n' +
    '    <div class="pageHeader-actions" ng-transclude></div>\n' +
    '    <div class="pageHeader-titles">\n' +
    '        <span class="pageHeader-title">{{vm.title}}</span>\n' +
    '        <span class="pageHeader-subtitle" ng-if="vm.subtitle">{{vm.subtitle}}</span>\n' +
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
    '<a href="#" class="paneHeader-close" ng-if="vm.showClose" ng-click="vm.close()">\n' +
    '    <i class="paneHeader-closeIcon"></i>\n' +
    '</a>\n' +
    '<div class="paneHeader-actions" ng-transclude></div>\n' +
    '<div class="paneHeader-titles" ng-class="{ \'paneHeader-titles--withSubtitle\': vm.subtitle }">\n' +
    '    <span class="paneHeader-title">\n' +
    '        <span class="paneHeader-titleText">{{vm.title}}</span>\n' +
    '    </span>\n' +
    '    <span class="paneHeader-subtitle" ng-if="vm.subtitle">\n' +
    '        <span class="paneHeader-subtitleText">{{vm.subtitle}}</span>\n' +
    '    </span>\n' +
    '</div>');
}]);
})();

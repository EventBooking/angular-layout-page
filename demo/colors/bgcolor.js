function bgcolor() {
    var $body = $(document.body);

    function rgb2hex(rgb) {
        var value = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (value && value.length === 4) ? "#" +
            ("0" + parseInt(value[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(value[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(value[3], 10).toString(16)).slice(-2) : '';
    }

    return function (css) {
        var $element = angular.element('<div class="' + css + '"></div>');
        $body.append($element);
        var value = $element.css("background-color");
        $element.remove();
        return rgb2hex(value).toUpperCase();
    };
}

angular.module("demo").filter('bgcolor', bgcolor);
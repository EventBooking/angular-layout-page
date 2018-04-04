/// <reference path="../app.js"/>

function Shade(name, css) {
    var arr = ['background-color', name];
    if (css != null) arr.push(css);
    this.css = arr.join('-');
    this.name = css;
}

function Color(name, pre, post) {
    this.name = name;
    this.shades = [
        ...(pre||[]),
        new Shade(name, 'lightest'),
        new Shade(name, 'lighter'),
        new Shade(name, 'light'),
        new Shade(name, null),
        new Shade(name, 'dark'),
        new Shade(name, 'darker'),
        new Shade(name, 'darkest'),
        ...(post||[]),
    ]
}

function ColorsController($routeParams) {
    var gray = new Color('gray', [
        new Shade('gray', 'lightest2')
    ]);

    const colorsTypes = [
        'red',
        'red-orange',
        'orange',
        'yellow',
        'yellow-green',
        'chrome-green',
        'inchworm-green',
        'green',
        'fern-green',
        'carribean-green',
        'green-blue',
        'blue',
        'navy-blue',
        'cerulean-blue',
        'denim-blue',
        'purple',
        'violet',
        'fuchsia',
        'magenta',
        'carmine'
    ];

    this.colors = [
        ...colorsTypes.map( type => new Color(type)),
        gray
    ];

    this.getColor = function ($element) {
        console.log('getColor', $element);
    }
}

angular.module("demo").controller('colorsController', ColorsController);
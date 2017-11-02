/// <reference path="../app.js"/>

function PageTestController($routeParams) {
    this.views = [];
    for (var i = 0; i < 10; i++)
        this.views.push("My View " + i);
}

angular.module("demo").controller('pageTestController', PageTestController);
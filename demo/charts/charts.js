/// <reference path="../app.js"/>

function ChartsController() {
    this.label = "75%";
    this.value = 75;
    this.color = "green";
}

angular.module("demo").controller('chartsController', ChartsController);
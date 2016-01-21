/// <reference path="../app.js"/>

function ChartsController() {
    this.color = "green";
    this.value1 = 50;
    this.value2 = 45;
    this.value3 = 75;
    this.value4 = 25;
    this.value5 = 0;
}

angular.module("demo").controller('chartsController', ChartsController);
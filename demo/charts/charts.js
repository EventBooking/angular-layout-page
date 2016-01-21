/// <reference path="../app.js"/>

function ChartsController() {
    this.color = "green";
    this.width = 200;
    this.height = 200;
    this.value1 = 0;
    this.value2 = 45;
    this.value3 = 75;
    this.value4 = 25;
    this.value5 = 0;
}

angular.module("demo").controller('chartsController', ChartsController);
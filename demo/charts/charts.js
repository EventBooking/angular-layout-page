/// <reference path="../app.js"/>

function ChartsController() {
    this.color = "green";
    this.width = 200;
    this.height = 200;
    this.value1 = 80;
    this.value2 = 45;
    this.value3 = 75;
    this.value4 = 25;
    this.value5 = 0;
    this.barValue1 = 50;
    this.barValue2 = 2500;
    this.barValue3 = 7500000;
    
    this.bg = function() {
        if(this.value1 == 0)
            return "#fff";
        if(this.value1 < 20)
            return "gray";
        if(this.value1 < 50)
            return "lightblue";
        if(this.value1 > 50)
            return "lightgreen";
    } 
}

angular.module("demo").controller('chartsController', ChartsController);
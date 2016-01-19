/// <reference path="../app.js"/>

function PaneTestController($routeParams) {
	this.area = $routeParams.area || 'twoPane';	
	
	this.showSlider1 = false;
	this.showSlider2 = false;
	
	this.openSlider1 = function() {
		this.showSlider1 = true;
		this.showSlider2 = false;
	}
	
	this.openSlider2 = function() {
		this.showSlider1 = false;
		this.showSlider2 = true;
	}
	
	this.openSlider2OverSlider1 = function() {
		this.showSlider1 = true;
		this.showSlider2 = true;
	}
	
	this.closeSlider1 = function() {
		// this.showSlider1 = false;
	}
	
	this.closeSlider2 = function() {
		this.showSlider2 = false;
	}
    
    this.slider1Closed = function() {
        this.showSlider1 = false;
    }
}

angular.module("demo").controller('paneTestController', PaneTestController);
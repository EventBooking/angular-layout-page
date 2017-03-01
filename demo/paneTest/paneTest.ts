import doublePane from "./doublePane.html";
import paneTest from "./paneTest.html";
import slider1 from "./slider1.html";
import slider2 from "./slider2.html";
import tabPane from "./tabPane.html";
import twoPane from "./twoPane.html";

export function PaneTestController($routeParams) {
	console.log('PaneTestController');

    var self = this;
	this.area = $routeParams.area;	
	this.subarea = $routeParams.subarea;
    this.activeTab = 'tab2';
	
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

var name = Angular.module("demo").controller('paneTestController', PaneTestController);
export default name;

var routes =  {
	"/panes": {
		template: paneTest,
		controller: name,
		controllerAs: 'vm',
		reloadOnSearch: false
	},
	"/routetest/:area": {
		template: paneTest,
		controller: name,
		controllerAs: 'vm'
	},
	"/routetest": {
		redirectTo: '/routetest/twoPane'
	}
}

export {
	routes
};
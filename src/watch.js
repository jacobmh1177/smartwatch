"use strict";

var edison = require('edison-oled');
var display = new edison.Oled();
//setup buttons
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);

function Watch() {
	var date = new Date();
	this.hours = date.getHours();
	console.log(this.hours);
	this.minutes = date.getMinutes();
	this.seconds = date.getSeconds();
	this.isPM = this.hours >= 12;	
}

Watch.prototype.display = function() {
	display.begin();
	display.clear(0);
	display.setFontType(1);
	display.setCursor(0,15);
	var AMPM;
	if (this.isPM) {
		AMPM = "PM";
	} else {
		AMPM = "AM";
	}
	display.print(this.hours + ":" + this.minutes +  AMPM);
	display.display();
}

var watch = new Watch();
watch.display();


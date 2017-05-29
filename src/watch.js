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
var btnB = new edison.Gpio(46, edison.INPUT);

function Watch() {
	var date = new Date();
	this.hours = date.getHours();
	this.hours12 = this.hours
	if (this.hours > 12) {
		this.hours12 = this.hours - 12;
	}
	this.minutes = date.getMinutes();
	this.seconds = date.getSeconds();
	this.isPM = this.hours >= 12;	
	this.month = date.getMonth();
	this.day = date.getDate();
	this.year = date.getFullYear().toString().substr(-2);
}

Watch.prototype.display = function() {
	display.begin();
	display.clear(0);
	display.setFontType(1);
	display.setCursor(0,10);
	var AMPM;
	if (this.isPM) {
		AMPM = "PM";
	} else {
		AMPM = "AM";
	}
	display.print(this.hours12 + ":" + this.minutes +  AMPM);
	display.setCursor(0, 30);
	display.print(this.month + "/" + this.day + "/" + this.year);
	display.display();
	while (true) {
		if (btnA.pinRead() === edison.LOW) return "Off";
		if (btnRight.pinRead() === edison.LOW || btnLeft.pinRead() === edison.LOW) return "Menu";
	}
}

//var watch = new Watch();
//watch.display();

var exports = module.exports;
exports.Watch = Watch;

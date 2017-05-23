"use strict";

function Alarms () {
	this.alarmList = [];
}

Alarms.prototype.add = function(time) {
	this.alarmList.push(time);
}

Alarms.prototype.remove = function(index) {
	this.alarmList.splice(index, 1);
}

Alarms.prototype.clear = function(index) {
	this.alarmList = [];
}

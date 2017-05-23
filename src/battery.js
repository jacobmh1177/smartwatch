'use strict';
var exec = require('child_process').execSync;

function BatteryMonitor() {}

BatteryMonitor.prototype.percentage = function(command) {
	var output = exec(command).toString();
	return output;
}


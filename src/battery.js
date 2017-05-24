'use strict';
var exec = require('child_process').execSync;

var exports = module.exports

var edison = require('edison-oled');
var display = new edison.Oled();
//setup buttons
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);

function BatteryMonitor() {
        this.status = exec('battery-voltage').toString();
}

BatteryMonitor.prototype.percentage = function() {
        return this.status.split('=')[2];
}

BatteryMonitor.prototype.display = function () {
        display.begin();
        display.clear(0);
        display.setCursor(0,0);
        display.print(this.status);
        display.display();
        while (true) {
                if (btnLeft.pinRead() == edison.LOW) break;
        }
        return 'Menu';
}
exports.BatteryMonitor = BatteryMonitor;


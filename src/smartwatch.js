//Initialize ANCS connection
var BleAncs = require('ble-ancs');
var ancs = new BleAncs();
var notificationList = [];
//Intialize Display connection
var edison = require('edison-oled');
var display = new edison.Oled();
//setup screen 
display.begin();
display.clear(0);
display.display();
display.setFontType(0);
//setup buttons
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);
var btnB = new edison.Gpio(46, edison.INPUT);

//setup menu
var menu = require('./menu.js').Menu;

//setup battery
var battery = require('./battery.js');
var batteryMonitor = new battery.BatteryMonitor();

//setup weather forecaster
var forecast = require('./weather.js');
var weatherForecast = new forecast.WeatherForecast();
// ancs.on('notification', function(notification) {
// 	notification.readTitle( function(title) {
// 		notification.readMessage( function(message) {
// 			console.log("Notification: " + notification);
// 			notificationList.push(notification)
// 		});
// 	});
// });

var STATE = 'menu';

while (true) {
	if (STATE === 'menu') {
		STATE = menu();
		console.log(STATE);
	}
	if (STATE === 'battery') {
		STATE = batteryMonitor.display();
		console.log(STATE);
	}
	if (STATE === 'weather') {
		STATE = weatherForecast.display();
	}
	else {
		break;
	}
}
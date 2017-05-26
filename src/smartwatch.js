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
var forecast = require('./weatherSync.js');
var weatherForecast = new forecast.WeatherForecast();
// ancs.on('notification', function(notification) {
// 	notification.readTitle( function(title) {
// 		notification.readMessage( function(message) {
// 			console.log("Notification: " + notification);
// 			notificationList.push(notification)
// 		});
// 	});
// });

var STATE = 'Menu';
var MENU_OPTIONS = ["Messages", "Weather", "Battery"];
var START_OPTION = 0;
while (true) {
	if (STATE === 'Menu') {
		console.log("here");
		var newState = menu(MENU_OPTIONS, START_OPTION);
		STATE = newState[0];
		START_OPTION = newState[1];
		console.log(STATE);
	} else if (STATE === 'Battery') {
		STATE = batteryMonitor.display();
		console.log(STATE);
	} else if (STATE === 'Weather') {
		STATE = weatherForecast.display();
		console.log(STATE);
	} else {
		console.log("breaking!!", STATE);
		break;
	}
}

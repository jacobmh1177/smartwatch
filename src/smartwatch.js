//Utility libraries
var sleep = require('sleep');
var exec = require('child_process').execSync;

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

//setup watch
var watch = require('./watch.js');
var Watch = new watch.Watch();

//setup ancs
var ancs = require('./notifUtil.js');
var NotifList = new ancs.NotifList();

//setup wifi scanner
var scanner = require('./wifiScanner.js');
var WifiScanner = new scanner.WifiScanner();

var STATE = 'Watch';
var MENU_OPTIONS = ["Notifs", "Weather", "Battery", "Watch", "Wifi", "Test3"];
var START_OPTION = 0;
var DISPLAY_ON = false;
exec('rfkill unblock bluetooth');
var notificationList = NotifList.getNotif();
var oldNumNotifications = notificationList.length;
while (true) {
	notificationList = NotifList.getNotif();
	var currNumNotifications = notificationList.length;
	MENU_OPTIONS[0] = "Notifs (" + currNumNotifications + ")";
	console.log("old = ", oldNumNotifications);
	console.log("new = ", currNumNotifications);
	if (currNumNotifications > oldNumNotifications) {
		DISPLAY_ON = true;
		STATE = "Notification";
		oldNumNotifications = currNumNotifications;
	}
	if (btnA.pinRead() === edison.LOW) {
		console.log("toggling display!");
		DISPLAY_ON = !DISPLAY_ON;
		console.log("display now is ", DISPLAY_ON);
		if (DISPLAY_ON) STATE = 'Watch';
		sleep.msleep(250);
	}
	if (!DISPLAY_ON || STATE === 'Off') {
		display.clear(0);
		display.display();
		continue;
	}
	if (STATE === 'Watch') {
		STATE = Watch.display();	
	} else if (STATE === 'Notification') {
		STATE = NotifList.displayOne(notificationList);
	} else if (STATE === 'Menu') {
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
	} else if (STATE === "Wifi") {
		WifiScanner.getNetworks();
		STATE = WifiScanner.connect();
		console.log(STATE);
	}	
	else if (STATE !== 'Off'){
		console.log("breaking!!", STATE);
		break;
	}
}

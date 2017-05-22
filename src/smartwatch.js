//Initialize ANCS connection
var BleAncs = require('ble-ancs');
var ancs = new BleAncs();
var notificationList = [];
//Intialize Display connection
var edison = require('edison-display');
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


ancs.on('notification', function(notification) {
	notification.readTitle( function(title) {
		notification.readMessage( function(message) {
			console.log("Notification: " + notification);
			notificationList.push(notification)
		});
	});
});
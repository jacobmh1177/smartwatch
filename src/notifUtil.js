var fs = require('fs');
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


var ANCS_STORE_FN = '/home/root/smartwatch/src/notif.txt';

function NotifList() {
	this.fileName = ANCS_STORE_FN
}

NotifList.prototype.removeNotif = function(index) {
	this.notificationList.splice(index, 1);
	//var file = fs.createWriteStream(this.fileName);
	//this.notificationList.forEach(function(value) {
	//	file.write(JSON.stringify(value) + '\n');
	//});
	//file.end();
	fs.writeFileSync(this.fileName, "");
	var self = this;
	this.notificationList.forEach(function(value) {
		fs.appendFileSync(self.fileName, JSON.stringify(value) + '\n');
	});
};

NotifList.prototype.getNotif = function() {
	var text = fs.readFileSync(this.fileName, "utf8");
	var stringNotificationList = text.split('\n');
	var notificationList = [];
	stringNotificationList.forEach(function(value) {
		if (value.length > 0) {
			notificationList.push(JSON.parse(value));
		}
	});
	this.notificationList = notificationList;
	return this.notificationList;
};

NotifList.prototype.displayOne = function(notificationList) {
	var notification = notificationList[notificationList.length - 1];
	display.begin();
	display.clear(0);
	display.setCursor(0,0);
	display.print(notification.title);
	display.setCursor(0, 15);
	notification.message = notification.message.replace(/[^a-zA-Z ]/g, "");
	display.print(notification.message);
	display.display();
	while (true) {
		if (btnA.pinRead() === edison.LOW) return 'Off';
		if (btnRight.pinRead() === edison.LOW) return 'Menu';	
	}
}

NotifList.prototype.clearAll = function() {
	this.notificationList = [];
	fs.writeFileSync(this.fileName, "");
}
//var list = new NotifList();
//list.getNotif();
//console.log("------------")
//console.log(list.notificationList);
//list.removeNotif(1);
//list.getNotif();
//console.log(list.notificationList);
var exports = module.exports;
exports.NotifList = NotifList;

var fs = require('fs');
var menu = require('./menu.js').Menu;
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

function NotifClient() {
	this.fileName = ANCS_STORE_FN
}

NotifClient.prototype.getNumNotifications = function() {
	return this.notificationList.length;
}
NotifClient.prototype.removeNotif = function(index) {
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

NotifClient.prototype.getNotif = function() {
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
NotifClient.prototype.displayDeleteMessage = function () {
	var options = ["Delete Notif", "Save Notif"];
	var state = menu(options, 0)[0];
	return state === "Delete Notif";
}

NotifClient.prototype.displayOne = function(notificationList, index, prevState) {
	var notification = notificationList[index];
	if (notification === undefined) this.getNotif();
	notification = notificationList[index];
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
		if (btnLeft.pinRead() === edison.LOW) return prevState;
		if (btnRight.pinRead() === edison.LOW) {
			var toDelete = this.displayDeleteMessage();
			if (toDelete) this.removeNotif(index);
			return prevState;
		}	
	}
}

NotifClient.prototype.displayAll = function () {
	var options = [];
	this.notificationList.forEach(function(notif){
		options.push(notif.title);
	});
	options.push("Clear all");
	var STATE = "Notif Menu";
	var START_OPTION = 0;
	while (true) {
		if (STATE === "Notif Menu") {
			options = [];
			this.notificationList.forEach(function(notif) {
				options.push(notif.title);
			});
			options.push("Clear all");
			var newState = menu(options, START_OPTION, true);
			STATE = newState[0];
			START_OPTION = newState[1];
		} else if (STATE === "Clear all") {
			this.clearAll();
			return "Menu";
		} else {
			var index = options.indexOf(STATE);
			STATE = this.displayOne(this.notificationList, index, 'Notif Menu');
		}
		if (btnLeft.pinRead() === edison.LOW) return "Menu";
		if (btnA.pinRead() === edison.LOW) return "Off";
	}	
}

NotifClient.prototype.clearAll = function() {
	this.notificationList = [];
	fs.writeFileSync(this.fileName, "");
}
//var list = new NotifClient();
//list.getNotif();
//list.displayAll();
//console.log("------------")
//console.log(list.notificationList);
//list.removeNotif(1);
//list.getNotif();
//console.log(list.notificationList);
var exports = module.exports;
exports.NotifClient = NotifClient;

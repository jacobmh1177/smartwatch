var fs = require('fs');
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
	console.log(stringNotificationList);
	stringNotificationList.forEach(function(value) {
		if (value.length > 0) {
			notificationList.push(JSON.parse(value));
		}
	});
	this.notificationList = notificationList;
	return this.notificationList;
};

//var list = new NotifList();
//list.getNotif();
//console.log("------------")
//console.log(list.notificationList);
//list.removeNotif(1);
//list.getNotif();
//console.log(list.notificationList);
var exports = module.exports;
exports.NotifList = NotifList;

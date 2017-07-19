var BleAncs = require('/home/root/smartwatch/src/ble-ancs/index.js');
var ancs = new BleAncs();

var fs = require('fs');

var exec = require('child_process').execSync;

var ANCS_STORE_FN = "/home/root/smartwatch/src/notif.txt";
var notificationList = [];

function syncList() {
	var text = fs.readFileSync(ANCS_STORE_FN, "utf8");
	var stringNotificationList = text.split('\n');
	var notificationList = [];
	stringNotificationList.forEach(function(value) {
		if (Value.length > 0) {
			notificationList.push(JSON.parse(value));
		}
	});
	return notificationList;
}
exec('rfkill unblock bluetooth');
ancs.on('notification', function(notification) {
	notification.readTitle(function(title) {
		notification.readMessage(function(message) {
			notifcationList = syncList();
			notificationList.push(notification);
			fs.writeFileSync(ANCS_STORE_FN, "");
			notificationList.forEach(function(notif) {
				fs.appendFileSync(ANCS_STORE_FN, notif + '\n');
			});
		});
	});
});
console.log("in notif service");

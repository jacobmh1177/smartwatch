var BleAncs = require('ble-ancs');
var ancs = new BleAncs();

var fs = require('fs');

var exec = require('child_process').execSync;

var ANCS_STORE_FN = "/home/root/smartwatch/src/notif.txt";
var notificationList = [];

exec('rfkill unblock bluetooth');
ancs.on('notification', function(notification) {
	notification.readTitle(function(title) {
		notification.readMessage(function(message) {
			notificationList.push(notification);
			fs.writeFileSync(ANCS_STORE_FN, "");
			notificationList.forEach(function(notif) {
				fs.appendFileSync(ANCS_STORE_FN, notif + '\n');
			});
		});
	});
});

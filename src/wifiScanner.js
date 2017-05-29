var fs = require('fs');
var exec = require('child_process').execSync;
var sleep = require('sleep');
var menu = require('./menu.js').Menu;
var edison = require('edison-oled');
var display = new edison.Oled();

var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);
var btnB = new edison.Gpio(46, edison.INPUT);

function WifiScanner() {
	this.networkFileName = "/home/root/smartwatch/src/networks.txt";
}

WifiScanner.prototype.getNetworks = function() {
	//exec('python scan.py');
	var text = fs.readFileSync(this.networkFileName, 'utf-8');
	text = text.replace(/\n\t/g, '');
	text = text.replace(/\"/g, '');
	text = text.replace("{", '');
	text = text.replace("}", '');
	var networkArray = text.split(',');
	var ssidArray = [];
	networkArray.forEach(function(value) {
		ssidArray.push(value.split(":")[0])
	});
	this.ssidArray = ssidArray;
};

WifiScanner.prototype.selectNetwork = function() {
	var newState = menu(this.ssidArray, 0);
	return newState;
}

WifiScanner.prototype.connect = function() {
	ssid = this.selectNetwork()[0];
	//var proc = spawn('python' , ['configureNetwork.py',  ssid]);
	//console.log("here");
	//proc.stdout.on('data', function(data) {
	//	console.log(data.toString());
	//	display.begin();
	//	display.clear(0);
	//	display.setCursor(0, 15);
	//	display.print(data.toString());
	//	display.display();
	//	console.log(data);		
	//});

	//proc.stderr.on('data', function(data) {
	//	console.log(data.toString());
	//});
	display.begin();
	display.clear(0);
	display.setCursor(0, 15);
	display.print("Connecting");
	display.display();
	var response = exec('python configureNetwork.py ' + "\"" + ssid + "\"").toString();
	var result = 'Succcess!';
	if (!response.includes('Success!')) result = 'Failed :(';
	display.clear(0);
	display.setCursor(0,15);
	display.print(result);
	display.display();
	while (true) {
		if (btnA.pinRead() === edison.LOW) return "Off";
		if (btnLeft.pinRead() === edison.LOW) return "Menu";
	}
	
}


//var scanner = new WifiScanner();
//scanner.getNetworks();
//scanner.connect();

var exports = module.exports
exports.WifiScanner = WifiScanner;

"use strict";

var DarkSky = require('forecast.io');

var Menu = require('./menu.js').Menu;
var edison = require('edison-oled');
var display = new edison.Oled();
//setup buttons
var btnUp = new edison.Gpio(47, edison.INPUT);
var btnDown = new edison.Gpio(44, edison.INPUT);
var btnLeft = new edison.Gpio(165, edison.INPUT);
var btnRight = new edison.Gpio(45, edison.INPUT);
var btnSelect = new edison.Gpio(48, edison.INPUT);
var btnA = new edison.Gpio(49, edison.INPUT);

var options = {
  APIKey: '8581aa6250437a4b012c73d2beeb3130',
  timeout: 1000,
  exclude: 'minutely, hourly, flags, alerts'
},
darksky = new DarkSky(options);


function WeatherForecast() {
        this.HOME_LAT = 37.420943;
        this.HOME_LONG = -122.170099;
}

WeatherForecast.prototype.getForecast = function(callback){
        darksky.get(this.HOME_LAT, this.HOME_LONG, function (err, res, data) {
                if (err) throw err;
        	callback(data);
	});
}


function displayForecast(data) {
	display.begin()
	display.clear(0);
	display.setCursor(0, 0);
	display.print("Max Temp: " + Number((data.temperatureMax).toFixed(1)));
	display.setCursor(0, 10);
	display.print("Min Temp: " + Number((data.temperatureMin).toFixed(1)));
	display.setCursor(0, 20);
	display.print("Rain %: " + precipProbability * 100 + "%");
	display.display();
	display.setFont(0);
	while (true) {
		if (btnLeft.pinRead() === edison.LOW) {
			return "Weather menu";
		}
	}	
}

function display(data) {
	var MENU_OPTIONS = ["Today", "Tomorrow"];
	var START_OPTION = 0;
	var STATE = "Weather menu";
	while (true) {
		if (STATE === "Weather menu") {
			Menu(MENU_OPTIONS, START_OPTION);
		}
		if (STATE === "Today") {
			var todayWeather = data.daily.data[0];
			displayForecast(todayWeather);
		}
		if (STATE === "Tomorrow") {
			var tomorrowWeather = data.daily.data[1];
			displayForecast(tomorrowWeather);
		}
		if (STATE === "Menu") {
			return "Menu";
		}		
	}	
}


var forecast = new WeatherForecast();
//forecast.getCurrentForecast(function(data) {
//	console.log(data.daily.data[7])
//});
forecast.display();
var exports = module.exports;
exports.WeatherForecast = WeatherForecast;


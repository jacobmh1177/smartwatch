"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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


function WeatherForecast() {
        this.HOME_LAT = 37.420943;
        this.HOME_LONG = -122.170099;
	this.APIKey = '8581aa6250437a4b012c73d2beeb3130';
}

WeatherForecast.prototype.getForecast = function(){
	console.log("sending request...");
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.darksky.net/forecast/' + this.APIKey + '/' + this.HOME_LAT + ',' + this.HOME_LONG, false);
	request.send(null);
	if (request.status === 200) {
		this.forecast = JSON.parse(request.responseText);
	}
	console.log("got response!");
}


function displayForecast(data) {
	display.begin();
	display.clear(0);
	display.setCursor(0, 0);
	display.print("High: " + Number((data.temperatureMax).toFixed(1)));
	display.setCursor(0, 10);
	display.print("Low: " + Number((data.temperatureMin).toFixed(1)));
	display.setCursor(0, 20);
	display.print("Rain %: " + data.precipProbability * 100 + "%");
	display.display();
	display.setFontType(0);
	while (true) {
		if (btnLeft.pinRead() === edison.LOW) {
			return "Weather menu";
		}
	}	
}

function displayWeather(data) {
	var MENU_OPTIONS = ["Today", "Tomorrow"];
	var START_OPTION = 0;
	var STATE = "Weather menu";
	while (true) {
		if (STATE === "Weather menu") {
			var newState = Menu(MENU_OPTIONS, START_OPTION, true);
			STATE = newState[0];
			START_OPTION = newState[1];
		} else if (STATE === "Today") {
			var todayWeather = data.daily.data[0];
			STATE = displayForecast(todayWeather);
		} else if (STATE === "Tomorrow") {
			var tomorrowWeather = data.daily.data[1];
			STATE = displayForecast(tomorrowWeather);
		} else if (STATE === "Menu") {
			return "Menu";
		}
	}	
}

WeatherForecast.prototype.display = function() {
	this.getForecast();
	return displayWeather(this.forecast);	
}


var exports = module.exports;
exports.WeatherForecast = WeatherForecast;
exports.display = WeatherForecast.prototype.display;

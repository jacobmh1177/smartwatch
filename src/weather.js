"use strict";

var DarkSky = require('forecast.io');
const util = require('util');

var options = {
  APIKey: '8581aa6250437a4b012c73d2beeb3130',
  timeout: 1000
},
darksky = new DarkSky(options);


function WeatherForecast() {
	this.HOME_LAT = 37.420943;
	this.HOME_LONG = -122.170099;
}

WeatherForecast.prototype.getCurrentForecast = function(){
		darksky.get(HOME_LAT, HOME_LONG, function (err, res, data) {
 		if (err) throw err;
 		this.currentForecast = data.currently;
 		return currentForecast;
	});
}


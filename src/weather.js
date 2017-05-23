"use strict";

var DarkSky = require('forecast.io');

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
  timeout: 1000
},
darksky = new DarkSky(options);


function WeatherForecast() {
        this.HOME_LAT = 37.420943;
        this.HOME_LONG = -122.170099;
}

WeatherForecast.prototype.getCurrentForecast = function(callback){
        darksky.get(this.HOME_LAT, this.HOME_LONG, function (err, res, data) {
                if (err) throw err;
        	callback(data);
	});
}

function display(data) {
	
}

var forecast = new WeatherForecast();
forecast.getCurrentForecast(function(data) {
	console.log(data)
});


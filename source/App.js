/*
	Copyright 2013 Garrett G Downs Jr

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

enyo.kind({
	name: "DashWeatherPlus",
	kind: "FittableRows",
	classes: "main",
	fit: true,
	components:[
		{kind: "FittableRows", classes: "widget", fit: true, components: [
			{kind: "FittableColumns", classes: "header", components: [
				{name: "iconMain", classes: "icon", ontap: "refreshData"},
				{name: "currentTemp", classes: "temp", content: "00&deg;", allowHtml: true},
				{kind: "FittableRows", fit: true, classes: "status-box", components: [
					{name: "statusLine1", classes: "line1", content: "Dash Weather+", allowHtml: true},
					{name: "statusLine2", classes: "line2", content: "Getting location...", allowHtml: true}
				]}
			]},
			{kind: "Panels", fit:true, classes: "tabs-container", arrangerKind: "CarouselArranger", onTransitionFinish: "panelChanged", narrowFit: false, components: [
				{name: "tabCurrently", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", components: [
					{name: "currentlyContainer", kind: "FittableRows", classes: "panel-content", components: [
						{classes: "c-title", content: "Your Hour"},
						{name: "yourHour", classes: "c-desc"},
						{classes: "c-title", content: "Your Day"},
						{name: "yourDay", classes: "c-desc"},
						{classes: "c-title", content: "Your Week"},
						{name: "yourWeek", classes: "c-desc"},
						{classes: "c-title", content: "Right Now"},
						{kind: "FittableColumns", components: [
							{kind: "FittableRows", classes: "currently-col", components: [
								{name: "elePrecip", kind: "CurrentlyElementL", icon: "rain", desc:"Precipitation"},
								{name: "eleCloud", kind: "CurrentlyElementL", icon: "cloudy", desc:"Cloud cover"},
								{name: "eleWind", kind: "CurrentlyElementL", icon: "wind", desc:"Wind"},
								{name: "eleVis", kind: "CurrentlyElementL", icon: "fog", desc:"Visibility"}
							]},
							{kind: "FittableRows", classes: "currently-col", components: [
								{name: "eleSun", kind: "CurrentlyElementR", icon: "clear-day", desc:"Sunrise"},
								{name: "eleMoon", kind: "CurrentlyElementR", icon: "clear-night", desc:"Sunset"},
								{name: "eleHumid", kind: "CurrentlyElementR", icon: "fog", desc:"Humidity"},
								{name: "eleBaro", kind: "CurrentlyElementR", icon: "temp", desc:"Barometer"}
							]}
						]}
					]}
				]},
				{name: "tabHourly", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", components: [
					{name: "hourlyContainer", kind: "FittableRows", classes: "panel-content", components: [
						{content: "No data."}
					]}
				]},
				{name: "tabDaily", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", components: [
					{name: "dailyContainer", kind: "FittableRows", classes: "panel-content", components: [
						{content: "No data."}
					]}
				]}
			]},
			{kind: "TabIndicator"},
			{kind: "FittableColumns", classes: "tab-bar", components: [
				{name: "tabbarCurrently", classes: "tab", content: "Currently", ontap: "switchTab"},
				{name: "tabbarHourly", classes: "tab", content: "Hourly", ontap: "switchTab"},
				{name: "tabbarDaily", classes: "tab", content: "Daily", ontap: "switchTab"}
			]}
		]}
	],
	demoMode: true,
	demoLoc: "39.953333,-75.17",
	apiKey: "",
	rendered: function() {
		this.inherited(arguments);
		if (this.demoMode)
			console.log("Dash Weather+ is in DEMO MODE");
		if (enyo.platform.firefoxOS) {
			console.log("FirefoxOS detected.");
		}
		else if (enyo.platform.chrome) {
			console.log("Chrome detected.");
		}
		else if (enyo.platform.firefox) {
			console.log("Firefox detected.");
		}
		else {
			console.log("Unknown platform.");
		}
		this.refreshData();
	},
	refreshData: function() {
		if (this.demoMode) {
			this.getWeatherData(this.demoLoc);
			return;
		}
		this.getLocation();
	},
	getLocation: function() {
		this.$.statusLine2.setContent("Requesting location...");

		var app = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			var location = position.coords.latitude + "," + position.coords.longitude;
			console.log("GPS location: " + location);
			app.getWeatherData(location);
		});
	},
	switchTab: function(sender, event) {
		if (sender.name == "tabbarCurrently")
			this.$.panels.setIndex(0);
		else if (sender.name == "tabbarHourly")
			this.$.panels.setIndex(1);
		else
			this.$.panels.setIndex(2);
	},
	panelChanged: function(sender, event) {
		// Thanks, Arthur for the nifty tab indicator!
		this.$.tabIndicator.setPosition(event.toIndex);
	},
	getWeatherData: function(location) {
		this.$.statusLine2.setContent("Getting forecast...");

		if (this.demoMode) {
			var url = "assets/demo.json";
			var request = new enyo.Ajax({
					url: url
				});
			request.response(this, "gotWeatherData");
			request.go();
		}
		else {
			var myLoc = location || this.demoLoc;
			var url = "https://api.forecast.io/forecast/"+this.apiKey+"/"+myLoc;
			// console.log(url);
			var jsonp = new enyo.JsonpRequest({
				url: url
			});
			jsonp.response(this, "gotWeatherData");
			jsonp.go();
		}
	},
	gotWeatherData: function(sender, response) {
		// console.log(response);

		// ---------- Set up the widget header ----------

		this.$.iconMain.applyStyle("background-image", "url('assets/icons/icon64/" + response.currently.icon + ".png')");

		// Get current temperature
		var temp = parseInt(response.currently.temperature);
		this.$.currentTemp.setContent(temp + "&deg;");

		// Use Google to get the city and state name
		var location = response.latitude + "," + response.longitude;
		this.getCityState(location);

		// Get the current conditions
		this.$.statusLine2.setContent(response.currently.summary);

		// ---------- Set up the 'Currently' tab ----------

		this.$.yourHour.setContent(response.minutely.summary);
		this.$.yourDay.setContent(response.hourly.summary);
		this.$.yourWeek.setContent(response.daily.summary);

		var now = response.currently;

		// Get precipitation intesnity
		var precip = now.precipIntensity;
		if (precip == 0)
			precip = "None";
		else if (precip < 0.002)
			precip = "Sprinkling";
		else if (precip < 0.017)
			precip = "Light";
		else if (precip < 0.1)
			precip = "Moderate";
		else
			precip = "Heavy";
		this.$.elePrecip.setDesc(precip);

		// Get cloud cover
		var clouds = parseInt(now.cloudCover * 100);
		clouds += "%";
		this.$.eleCloud.setDesc(clouds);

		// Get wind speed and direction
		var wind;
		var windSpeed = parseInt(now.windSpeed);
		var windBearing;

		if(now.windBearing == 0)
			windBearing = "Var";
		else if (now.windBearing >= 338 || now.windBearing <= 22)
			windBearing = "N";
		else if (now.windBearing >= 23 && now.windBearing <= 67)
			windBearing = "NE";
		else if (now.windBearing >= 68 && now.windBearing <= 112)
			windBearing = "E";
		else if (now.windBearing >= 113 && now.windBearing <= 157)
			windBearing = "SE";
		else if (now.windBearing >= 158 && now.windBearing <= 202)
			windBearing = "S";
		else if (now.windBearing >= 203 && now.windBearing <= 247)
			windBearing = "SW";
		else if (now.windBearing >= 248 && now.windBearing <= 292)
			windBearing = "W";
		else if (now.windBearing >= 293 && now.windBearing <= 337)
			windBearing = "NW";
		else
			windBearing = "?";

		wind = windBearing + " at " + windSpeed + "mph";
		this.$.eleWind.setDesc(wind);

		// Get visibility
		var vis = now.visibility + " mi";
		this.$.eleVis.setDesc(vis);

		// Get sunrise time
		var sunrise = new Date(response.daily.data[0].sunriseTime * 1000);
		sunrise = sunrise.getHours() + ":" + sunrise.getMinutes();
		this.$.eleSun.setDesc(sunrise);

		// Get sunset time
		var sunset = new Date(response.daily.data[0].sunsetTime * 1000);
		sunset = sunset.getHours() + ":" + sunset.getMinutes();
		this.$.eleMoon.setDesc(sunset);

		// Get humidity
		var humid = parseInt(now.humidity * 100);
		humid += "%";
		this.$.eleHumid.setDesc(humid);

		// Get barometric pressure
		var pressure = parseInt(now.pressure);
		pressure += "mb";
		this.$.eleBaro.setDesc(pressure);

		// ---------- Set up the 'Hourly' tab ----------

		this.$.hourlyContainer.destroyClientControls();
		var hourly = response.hourly.data;
		for (i=0; i<18; i++) {
			// Get the hour
			var time = hourly[i].time * 1000;
			var hour = new Date(time).getHours();
			hour = this.formatHour(hour);

			// Get the temperature
			var temp = parseInt(hourly[i].temperature);
			temp += "&deg;";

			// Get the forecast
			var forecast = hourly[i].summary;

			// Get the precipitation
			var precip = "0%";
			if (hourly[i].precipIntensity != 0) {
				precip = parseInt(hourly[i].precipProbability * 100);
				precip += "%";
			}

			// Create a new HourlyForecast row
			this.$.hourlyContainer.createComponent({kind: "HourlyForecastRow", hour: hour, temp: temp, forecast: forecast, precip: precip});
		}

		// ---------- Set up the 'Daily' tab ----------

		this.$.dailyContainer.destroyClientControls();
		var daily = response.daily.data;
		for (i=0; i<daily.length; i++) {
			// Get the icon
			var icon = daily[i].icon;

			// Get the high and low temperatures
			var high = parseInt(daily[i].temperatureMax);
			high += "&deg;";
			var low = parseInt(daily[i].temperatureMin);
			low += "&deg;";

			// Get the date and properly format it
			var d = new Date(daily[i].time * 1000);
			var day = d.getDay();
			var month = d.getMonth();
			var datenum = d.getDate();

			var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
			var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

			var date = d_names[day] + ", " + m_names[month] + " " + datenum;

			// Get the forecast
			var forecast = daily[i].summary;

			// Create a new DailyForecast row
			this.$.dailyContainer.createComponent({kind: "DailyForecastRow", icon: icon, high: high, low: low, date: date, forecast: forecast});
		}

		// Make it so
		this.$.hourlyContainer.render();
		this.$.dailyContainer.render();
	},
	getCityState: function(location) {
		var request = new enyo.Ajax({url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ location + "&sensor=true"});
		request.response(this, function(sender, response) {
			this.gotCityState(response);
		});
		request.go();
	},
	gotCityState: function(response) {
		var results = response.results[0].address_components;
		// console.log(results);

		var city = "";
		var state = "";

		for (i=0; i<results.length; i++) {
			// console.log(results[i].types[0] + ": " + results[i].short_name + " / " + results[i].long_name);
			if (results[i].types[0] == "locality" || results[i].types[0] == "administrative_area_level_3")
				city = results[i].short_name;
			else if (results[i].types[0] == "administrative_area_level_1")
				state = results[i].short_name;
		}

		this.$.statusLine1.setContent(city + ", " + state);
	},
	formatHour: function(h) {
		// This does stuff...
		if (h > 12) {
			h -= 12;
		}
		else if (h == 0) {
			h = 12;
		}
		h += ":00";
		return(h);
	}
});

enyo.kind({
	name: "TabIndicator",
	published: {
		position: ""
	},
	style: "width: 100%",
	components: [
		{name: "indicator", classes: "white-bar"}
	],
	positionChanged: function() {
		if (typeof this.position != "number") {
			this.position = parseInt(this.position, 10);
		}
		if (this.position < 3) {
			this.$.indicator.applyStyle("margin-left", (this.position * 33.3) + "%");
		}
	}
});
enyo.kind({
	name: "DashWeatherPlusWidget",
	kind: "FittableRows",
	classes: "widget",
	fit: true,
	components:[
		{kind: "FittableRows", fit: true, components: [
			{name: "tapScroller", classes: "tap-scroller", components: [
				{name: "tapScrollUp", classes: "up", ontap: "scrollIt"},
				{name: "tapScrollDown", classes: "down", ontap: "scrollIt"}
			]},
			{kind: "FittableColumns", classes: "header", components: [
				{name: "iconMain", classes: "icon", ontap: "refreshData"},
				{name: "currentTemp", classes: "temp", content: "00&deg;", allowHtml: true},
				{kind: "FittableRows", fit: true, classes: "status-box", components: [
					{name: "statusLine1", classes: "line1", content: "Dash Weather+", allowHtml: true},
					{name: "statusLine2", classes: "line2", content: "Getting location...", allowHtml: true}
				]}
			]},
			{kind: "Panels", fit:true, classes: "tabs-container", arrangerKind: "CarouselArranger", onTransitionFinish: "panelChanged", narrowFit: false, index: 1, components: [
				{name: "tabMenu", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", style: "width: 250px;", components: [
					{name: "menuContainer", kind: "FittableRows", classes: "panel-content", components: [
						{classes: "c-title", content: "Settings"},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Units", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefUnitsButton", kind: "onyx.PickerButton", content: "Units", classes: "custom-picker"},
								{name: "prefUnitsPick", kind: "onyx.Picker", onChange: "setAppPrefs", components: [
									{content: "Imperial", name: "optImperial", active: true},
									{content: "Metric", name: "optMetric"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Time", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefTimeButton", kind: "onyx.PickerButton", content: "Time", classes: "custom-picker"},
								{name: "prefTimePick", kind: "onyx.Picker", onChange: "setAppPrefs", components: [
									{content: "12 hour", name: "opt12hour", active: true},
									{content: "24 hour", name: "opt24hour"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Icon Pack", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefIconsButton", kind: "onyx.PickerButton", content: "Default", classes: "custom-picker"},
								{name: "prefIconsPick", kind: "onyx.Picker", onChange: "setAppPrefs", components: [
									{content: "White", name: "optIconsWhite", active: true},
									{content: "Color", name: "optIconsColor"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Theme", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefThemeButton", kind: "onyx.PickerButton", content: "Default", classes: "custom-picker"},
								{name: "prefThemePick", kind: "onyx.Picker", onChange: "setAppPrefs", components: [
									{content: "Default", name: "optThemeDefault", active: true},
									{content: "Light", name: "optThemeLight"},
									{content: "Holo Dark", name: "optThemeHoloDark"}
								]}
							]}
						]},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Save and Apply", ontap: "saveAppPrefs"},
						{classes: "c-title", style: "margin-top: 20px;", content: "App"},
						// {kind: "onyx.WebAppButton", classes: "onyx-dark settings-button"},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Show Help Boxes", ontap: "showHelpBoxes"},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Launch Widget", ontap: "launchWidget"}
					]}
				]},
				{name: "tabCurrently", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", components: [
					{name: "currentlyContainer", kind: "FittableRows", classes: "panel-content", components: [
						{name: "helpSettings", kind: "FittableRows", classes: "help-box", ontap: "closeHelpBox", components: [
							{classes: "title", content: "Did you know?"},
							{classes: "desc", content: "You can get to the settings menu by swiping to the right."}
						]},
						{name: "warnCallLimit", kind: "FittableRows", classes: "help-box", ontap: "closeHelpBox", components: [
							{classes: "title", content: "Notice"},
							{classes: "desc", content: "Daily call limit reached; reverting to demo mode. Thanks for trying the live demo!"}
						]},
						{name: "sysWarning", classes: "system-warning"},
						{classes: "c-title", content: "Your Hour"},
						{name: "yourHour", classes: "c-desc"},
						{classes: "c-title", content: "Your Day"},
						{name: "yourDay", classes: "c-desc"},
						{classes: "c-title", content: "Your Week"},
						{name: "yourWeek", classes: "c-desc"},
						{classes: "c-title", content: "Right Now"},
						{name: "helpIcons", kind: "FittableRows", classes: "help-box", ontap: "closeHelpBox", components: [
							{classes: "title", content: "What are these icons?"},
							{kind: "FittableColumns", components: [
								{kind: "FittableRows", style: "width: 50%;", components: [
									{content: "- Precip Intensity"},
									{content: "- Cloud Cover"},
									{content: "- Wind"},
									{content: "- Visibility"}
								]},
								{kind: "FittableRows", style: "width: 50%; text-align: right;", components: [
									{content: "Sunrise -"},
									{content: "Sunset -"},
									{content: "Humidity -"},
									{content: "Pressure -"}
								]}
							]}
						]},
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
						]},
						{classes: "powered-by", content: "Powered by Forecast.io", ontap: "openWeb"}
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
				// {name: "tabbarMenu", classes: "tab", content: "Menu", ontap: "switchTab"},
				{name: "tabbarCurrently", classes: "tab", content: "Currently", ontap: "switchTab"},
				{name: "tabbarHourly", classes: "tab", content: "Hourly", ontap: "switchTab"},
				{name: "tabbarDaily", classes: "tab", content: "Daily", ontap: "switchTab"}
			]}
		]}
	],
	demoMode: false,
	demoLoc: "39.953333,-75.17",
	apiKey: "82f4ad9f79e1adddf92732f5ca2c2f0d",
	callLimit: 40,
	create: function() {
		this.inherited(arguments);

		if (enyo.platform.firefoxOS) {
			console.log("FirefoxOS detected.");
		}
		else if (enyo.platform.chrome) {
			console.log("Chrome detected.");
		}
		else if (enyo.platform.firefox) {
			console.log("Firefox detected.");
		}
		else if (enyo.platform.webos) {
			console.log("Platform: " + "webOS detected.");
			PalmSystem.stageReady();
		}
		else {
			console.log("Unknown platform.");
		}
	},
	rendered: function() {
		this.inherited(arguments);
		if (this.demoMode)
			console.log("Dash Weather+ is in DEMO MODE");

		// window.localStorage.callCount = 0;
		if (window.localStorage.callCount) {
			console.log("Call count: " + window.localStorage.callCount + " / " + this.callLimit);
		}
		else {
			console.log("Cannot read window.localStorage.callCount. Resetting.");
			window.localStorage.callCount = 0;
		}

		this.loadAppPrefs();

		this.$.panels.getAnimator().setDuration(200);
		this.refreshData();
	},
	scrollIt: function(sender, event) {
		var tab = this.$.panels.getActive();
		var pos = tab.getScrollTop();
		var newPos = pos;
		if (sender.name == "tapScrollUp") {
			newPos -= 100;
			tab.scrollTo(0, newPos);
		}
		else {
			newPos += 100;
			tab.scrollTo(0, newPos);
		}
	},
	openWeb: function() {
		window.open("http://forecast.io");
	},
	loadAppPrefs: function() {
		appPrefs = {
			units: "optImperial",
			hours: "opt12hour",
			icons: "optIconsWhite",
			theme: "optThemeDefault",
			firstUse: true
		};
		if (window.localStorage.prefUnits)
			appPrefs.units = window.localStorage.prefUnits;
		if (window.localStorage.prefTime)
			appPrefs.hours = window.localStorage.prefTime;
		if (window.localStorage.prefIcons)
			appPrefs.icons = window.localStorage.prefIcons;
		if (window.localStorage.prefTheme)
			appPrefs.theme = window.localStorage.prefTheme;
		if (window.localStorage.firstUse)
			appPrefs.firstUse = window.localStorage.firstUse;

		// console.log("Load app prefs...");
		// console.log(appPrefs);

		this.$.prefUnitsPick.setSelected(this.$[appPrefs.units]);
		this.$.prefTimePick.setSelected(this.$[appPrefs.hours]);
		this.$.prefIconsPick.setSelected(this.$[appPrefs.icons]);
		this.$.prefThemePick.setSelected(this.$[appPrefs.theme]);

		this.applyTheme(appPrefs.theme);

		if (appPrefs.firstUse === true) {
			this.showHelpBoxes();
			appPrefs.firstUse = false;
			window.localStorage.firstUse = appPrefs.firstUse;
		}
	},
	setAppPrefs: function(sender) {
		if (sender.name == "prefUnitsPick")
			appPrefs.units = this.$.prefUnitsPick.getSelected().name;
		else if (sender.name == "prefTimePick")
			appPrefs.hours = this.$.prefTimePick.getSelected().name;
		else if (sender.name == "prefIconsPick")
			appPrefs.icons = this.$.prefIconsPick.getSelected().name;
		else if (sender.name == "prefThemePick")
			appPrefs.theme = this.$.prefThemePick.getSelected().name;
	},
	saveAppPrefs: function(sender) {
		// console.log("Save app prefs...");
		// console.log(appPrefs);

		window.localStorage.prefUnits = appPrefs.units;
		window.localStorage.prefTime = appPrefs.hours;
		window.localStorage.prefIcons = appPrefs.icons;
		window.localStorage.prefTheme = appPrefs.theme;
		window.localStorage.firstUse = appPrefs.firstUse;

		if (sender.content == "Save and Apply") {
			this.gotWeatherData({}, this.lastWeatherResponse);
			this.applyTheme(appPrefs.theme);
		}
	},
	applyTheme: function(theme) {
		var head = document.getElementsByTagName("head")[0];

		// Remove any other theme stylesheets
		console.log("Removing old theme sheets...");
		var themeList = ["optThemeLight", "optThemeHoloDark"];
		var appsheets = document.getElementsByTagName("link");
		for (i=0; i < appsheets.length; i++) {
			var sheet = appsheets[i];
			for (a=0; a<themeList.length; a++) {
				var findTheme = sheet.href.search(themeList[a]);
				if (findTheme > -1) {
					console.log("Removing theme: " + themeList[a]);
					head.removeChild(sheet);
				}
			}
		}

		if (theme != "optThemeDefault") {
			// Add the new theme stylesheet
			console.log("Adding new theme stylesheet: " + theme);
			var e = document.createElement("link");
			e.setAttribute("rel",	"stylesheet");
			e.setAttribute("type",	"text/css");
			e.setAttribute("href",	"assets/" + theme + ".css");

			head.appendChild(e);
		}
	},
	launchWidget: function() {
		window.open("myDashboard.html", "My Dashboard", 'attributes={"window": "dashboard", "dashHeight": 240}');
	},
	refreshData: function() {
		if (this.demoMode) {
			this.getWeatherData(this.demoLoc);
			return;
		}
		this.getLocation();
	},
	getLocation: function() {
		this.updateRequested();

		var forceDemo = false;
		var reject = this.dailyLimitReached();

		if (reject) {
			console.log("Daily limit reached. Reverting to Demo mode.");
			this.$.warnCallLimit.applyStyle("display", "block");
			forceDemo = true;
		}

		if (this.demoMode || forceDemo) {
			var url = "assets/demo.json";
			var request = new enyo.Ajax({
					url: url
				});
			request.response(this, "gotWeatherData");
			request.go();
			return;
		}

		this.$.statusLine2.setContent("Requesting location...");

		var app = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			var location = position.coords.latitude + "," + position.coords.longitude;
			// console.log("GPS location: " + location);
			app.getWeatherData(location);
		});
	},
	switchTab: function(sender, event) {
		if (sender.name == "tabbarMenu")
			this.$.panels.setIndex(0);
		else if (sender.name == "tabbarCurrently")
			this.$.panels.setIndex(1);
		else if (sender.name == "tabbarHourly")
			this.$.panels.setIndex(2);
		else
			this.$.panels.setIndex(3);
	},
	panelChanged: function(sender, event) {
		var newPanel = event.toIndex - 1;
		this.$.tabIndicator.setPosition(newPanel);
	},
	getWeatherData: function(location) {
		this.$.statusLine2.setContent("Getting forecast...");
		this.updateCallCount();

		var myLoc = location || this.demoLoc;
		var url = "https://api.forecast.io/forecast/"+this.apiKey+"/"+myLoc;
		// console.log(url);
		var jsonp = new enyo.JsonpRequest({
			url: url
		});
		jsonp.response(this, "gotWeatherData");
		jsonp.go();
	},
	gotWeatherData: function(sender, response) {
		// console.log(response);
		this.lastWeatherResponse = response;
		this.$.sysWarning.setContent("");

		// ---------- Set up the widget header ----------

		this.$.iconMain.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon64/" + response.currently.icon + ".png')");

		// Get current temperature
		var temp = parseInt(response.currently.temperature, 10);
		if (appPrefs.units == "optMetric")
			temp = this.convertToMetric(temp, "temperature");
		this.$.currentTemp.setContent(temp + "&deg;");

		// Use Google to get the city and state name
		var location = response.latitude + "," + response.longitude;
		this.getCityState(location);

		// Get the current conditions
		this.$.statusLine2.setContent(response.currently.summary);

		// ---------- Set up the 'Currently' tab ----------

		this.$.elePrecip.updateIcon();
		this.$.eleCloud.updateIcon();
		this.$.eleWind.updateIcon();
		this.$.eleVis.updateIcon();
		this.$.eleSun.updateIcon();
		this.$.eleMoon.updateIcon();
		this.$.eleHumid.updateIcon();
		this.$.eleBaro.updateIcon();

		// Depending on the quality of the API in your area, some info in the response may not be included.
		var description;
		try {
			description = response.minutely.summary;
		}
		catch (err) {
			description = "Unable to retrieve this information.";
		}
		this.$.yourHour.setContent(description);

		try {
			description = response.hourly.summary;
		}
		catch (err) {
			description = "Unable to retrieve this information.";
		}
		this.$.yourDay.setContent(description);

		try {
			description = response.daily.summary;
		}
		catch (err) {
			description = "Unable to retrieve this information.";
		}
		this.$.yourWeek.setContent(description);

		var now = response.currently;

		// Get precipitation intesnity
		var precip = now.precipIntensity;
		if (precip === 0)
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
		// clouds += "%";
		// this.$.eleCloud.setUnits("%");
		this.$.eleCloud.setDesc(clouds + "<span class='label-units'>%</span>");

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

		wind = windBearing + " at " + windSpeed + "<span class='label-units'>mph</span>";

		if (appPrefs.units == "optMetric") {
			windSpeed = this.convertToMetric(windSpeed, "speed");
			wind = windBearing + " at " + windSpeed + "<span class='label-units'>kph</span>";
		}

		this.$.eleWind.setDesc(wind);

		// Get visibility
		var vis = now.visibility;

		if (appPrefs.units == "optMetric") {
			vis = this.convertToMetric(vis, "distance");
			vis += "<span class='label-units'>km</span>";
		}
		else {
			vis += "<span class='label-units'>mi</span>";
		}

		this.$.eleVis.setDesc(vis);

		// Get sunrise time
		var sunrise = new Date(response.daily.data[0].sunriseTime * 1000);
		sunrise = this.formatTime(sunrise.getHours(), sunrise.getMinutes());
		// sunrise = sunrise.getHours() + ":" + sunrise.getMinutes();
		this.$.eleSun.setDesc(sunrise);

		// Get sunset time
		var sunset = new Date(response.daily.data[0].sunsetTime * 1000);
		sunset = this.formatTime(sunset.getHours(), sunset.getMinutes());
		// sunset = sunset.getHours() + ":" + sunset.getMinutes();
		this.$.eleMoon.setDesc(sunset);

		// Get humidity
		var humid = parseInt(now.humidity * 100, 10);
		// humid += "%";
		this.$.eleHumid.setDesc(humid + "<span class='label-units'>%</span>");

		// Get barometric pressure
		var pressure = parseInt(now.pressure, 10);
		// pressure += "mb";
		this.$.eleBaro.setDesc(pressure + "<span class='label-units'>mb</span>");

		// ---------- Set up the 'Hourly' tab ----------

		this.$.hourlyContainer.destroyClientControls();
		var hourly = response.hourly.data;
		for (i=0; i<12; i++) {
			// Get the hour
			var time = hourly[i].time * 1000;
			var hour = new Date(time).getHours();
			hour = this.formatTime(hour);

			// Get the icon
			var icon = hourly[i].icon;

			// Get the temperature
			var temp = parseInt(hourly[i].temperature, 10);
			if (appPrefs.units == "optMetric")
				temp = this.convertToMetric(temp, "temperature");
			temp += "&deg;";

			// Get the forecast
			var forecast = hourly[i].summary;

			// Get the precipitation
			var precip = "0";
			if (hourly[i].precipIntensity !== 0) {
				precip = parseInt(hourly[i].precipProbability * 100, 10);
				// precip += "%";
			}

			// Get cloud cover
			var cloud = parseInt(hourly[i].cloudCover * 100, 10);

			// Create a new HourlyForecast row
			this.$.hourlyContainer.createComponent({kind: "HourlyForecastRow", hour: hour, icon: icon, temp: temp, forecast: forecast, precip: precip, cloud: cloud});
		}

		// ---------- Set up the 'Daily' tab ----------

		this.$.dailyContainer.destroyClientControls();
		var daily = response.daily.data;
		for (i=0; i<daily.length; i++) {
			// Get the icon
			var icon = daily[i].icon;

			// Get the high and low temperatures
			var high = parseInt(daily[i].temperatureMax, 10);
			if (appPrefs.units == "optMetric")
				high = this.convertToMetric(high, "temperature");
			high += "&deg;";
			var low = parseInt(daily[i].temperatureMin, 10);
			if (appPrefs.units == "optMetric")
				low = this.convertToMetric(low, "temperature");
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
	formatTime: function(h,m) {
		// This does stuff...
		var ampm, time;

		if(!m)
			m = "00";

		if (appPrefs.hours == "opt24hour") {
			time = h + ":" + m;
		}
		else {
			if (h >= 12)
				ampm = "pm";
			else
				ampm = "am";

			if (h > 12)
				h -= 12;
			else if (h === 0)
				h = 12;

			time = h + ":" + m + "<span class='label-units'>" + ampm + "</span>";
		}

		return(time);
	},
	convertToMetric: function(num, type) {
		var newNum;

		if (typeof num != "number")
			num = parseInt(num, 10);

		switch (type) {
			case "temperature":
				newNum = (num - 32) / 1.8;
				break;
			case "distance":
				newNum = num * 1.6;
				break;
			case "speed":
				newNum = num * 1.6;
				break;
			default:
				console.log("convertToMetric: No action taken.");
		}
		newNum = parseInt(newNum, 10);
		return(newNum);
	},
	updateRequested: function() {
		var lastCall = -1;
		if (window.localStorage.lastCall)
			lastCall = window.localStorage.lastCall;

		var thisCall = new Date().getDate();
		if (thisCall != lastCall)
			window.localStorage.callCount = 1;

		var calls = window.localStorage.callCount;
		console.log("Update requested. Current count: " + calls + " / " + this.callLimit);

		window.localStorage.lastCall = thisCall;
	},
	updateCallCount: function() {
		var calls = parseInt(window.localStorage.callCount, 10);
		calls++;
		window.localStorage.callCount = calls;
	},
	dailyLimitReached: function() {
		var callsUsed = window.localStorage.callCount;
		if (callsUsed > this.callLimit)
			return true;
		else
			return false;
	},
	showHelpBoxes: function() {
		this.$.helpSettings.applyStyle("display", "block");
		this.$.helpIcons.applyStyle("display", "block");
	},
	closeHelpBox: function(sender) {
		this.$[sender.name].applyStyle("display", "none");
	}
});
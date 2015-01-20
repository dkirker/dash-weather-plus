/*
	Copyright 2013 Garrett G Downs Jr
	Copyright (c) 2013 Donald C. Kirker, OpenMobl Systems

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

var appPrefs = {
	units: "optAuto",
	hours: "opt12hour",
	icons: "optIconsColor",
	theme: "optThemeDefault",
	loc: "gps",
	firstUse: true,
	autoloadWidget: false,
	closeOnLoad: false,
	locs: [
		{displayName: "Current Location", coords: "gps", active: true}
	]
};

enyo.kind({
	name: "DashWeatherPlus",
	kind: "FittableRows",
	classes: "main",
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
				{kind: "FittableRows", fit: true, classes: "daily-box", components: [
					{name: "dailyHigh", classes: "line1", content: "0&deg;", allowHtml: true},
					{name: "dailyLow", classes: "line2", content: "0&deg;", allowHtml: true}
				]},
				{kind: "FittableRows", fit: true, classes: "status-box", ontap: "launchIndex", components: [
					{name: "statusLine1", classes: "line1", content: "Dash Weather+", allowHtml: true},
					{name: "statusLine2", classes: "line2", content: "Getting location...", allowHtml: true}
				]}
			]},
			{kind: "Panels", fit:true, classes: "tabs-container", arrangerKind: "CarouselArranger", onTransitionFinish: "panelChanged", narrowFit: false, index: 1, components: [
				{name: "tabMenu", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container menu", components: [
					{name: "menuContainer", kind: "FittableRows", classes: "panel-content", components: [
						{classes: "c-title", content: "Locations"},
						{name: "locationList", components: [
							// Locations get populated here
						]},
						{name: "prefLocRow", kind: "FittableColumns", classes: "settings-row", showing: false, components: [
							{kind: "onyx.InputDecorator", style: "width: 230px;", alwaysLooksFocused: true, components: [
							    {name: "prefLocInp", kind: "onyx.Input", placeholder: "City/State or Zip", fit: true}
							]}
						]},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Add Location", ontap: "addLocation"},
						{style: "height: 25px;"},
						{classes: "c-title", content: "Settings"},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Units", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefUnitsButton", kind: "onyx.PickerButton", content: "Units", classes: "custom-picker"},
								{name: "prefUnitsPick", kind: "onyx.Picker", components: [
									{content: "Auto", name: "optAuto", active: true},
									{content: "Imperial", name: "optImperial"},
									{content: "Metric", name: "optMetric"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Time", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefTimeButton", kind: "onyx.PickerButton", content: "Time", classes: "custom-picker"},
								{name: "prefTimePick", kind: "onyx.Picker", components: [
									{content: "12 hour", name: "opt12hour", active: true},
									{content: "24 hour", name: "opt24hour"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Icon Pack", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefIconsButton", kind: "onyx.PickerButton", content: "Default", classes: "custom-picker"},
								{name: "prefIconsPick", kind: "onyx.Picker", components: [
									{content: "White", name: "optIconsWhite", active: true},
									{content: "Color", name: "optIconsColor"}
								]}
							]}
						]},
						{kind: "FittableColumns", classes: "settings-row", components: [
							{content: "Theme", classes: "label", fit: true},
							{kind: "onyx.PickerDecorator", components: [
								{name: "prefThemeButton", kind: "onyx.PickerButton", content: "Default", classes: "custom-picker"},
								{name: "prefThemePick", kind: "onyx.Picker", components: [
									{content: "Default", name: "optThemeDefault", active: true},
									{content: "Light", name: "optThemeLight"},
									{content: "Holo Dark", name: "optThemeHoloDark"}
								]}
							]}
						]},

						{style: "height: 20px;"},
						{name: "prefWidgetOnStart", kind: "onyx.Checkbox", content: "Widget on start", classes: "settings-checkbox", showing: false, onchange: "setAppPrefs"},
						{name: "prefCloseOnLoad", kind: "onyx.Checkbox", content: "Close after widget", classes: "settings-checkbox", showing: false, onchange: "setAppPrefs"},
						{style: "height: 20px;"},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Save and Apply", ontap: "saveAppPrefs"},
						{name: "btnLaunchWidget", kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Launch Widget", showing: false, ontap: "launchWidget"},
						// {classes: "c-title", style: "margin-top: 20px;", content: "App"},
						// {kind: "onyx.WebAppButton", classes: "onyx-dark settings-button"},
						{kind: "onyx.Button", classes: "onyx-dark settings-button", content: "Show Help Boxes", ontap: "showHelpBoxes"}
					]}
				]},
				{name: "tabCurrently", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container", components: [
					{name: "weatherAlerts", kind: "FittableRows", showing: false},
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
						{content: "Loading..."}
					]}
				]},
				{name: "tabDaily", kind: "enyo.Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, horizontal: "hidden", classes: "panel-container last", components: [
					{name: "dailyContainer", kind: "FittableRows", classes: "panel-content", components: [
						{content: "Loading"}
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
		]},
		{kind: "enyo.Signals", onactivate: "activated"}
	],

	dailyHigh: 0,
	dailyLow: 99999,
    refreshing: true,
    
    parseQueryString: function(query) {
		var	params = {};

		if (query) {
			var items = query.split('&');

			for (var i = 0, param; param = items[i]; i++) {
				var pair = param.split('=');

				if (pair.length != 2) {
					continue;
				}

				params[pair[0]] = decodeURIComponent(pair[1]);
			}
		}

		return(params);
	},
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
			this.$.btnLaunchWidget.setShowing(true);
			this.$.prefWidgetOnStart.setShowing(true);
			this.$.prefCloseOnLoad.setShowing(true);
		}
		else {
			console.log("Unknown platform.");
			console.log(enyo.platform);
		}
	},
	rendered: function() {
		this.inherited(arguments);

		if (dwpDemoMode)
			console.log("Dash Weather+ is in DEMO MODE");

		this.requestRefresh = false;

		this.params = this.parseQueryString((window.location.search	|| '').slice(1));
		this.loadAppPrefs();

		this.$.panels.getAnimator().setDuration(200);
		this.refreshData();
	},
	activated: function() {
		if (!this.refreshing)
			this.refreshData();
	},
	openWeb: function() {
		window.open("http://forecast.io");
	},
	openAlert: function(sender) {
		window.open(sender.uri);
	},
	isLocalStorageAvailable: function() {
		try {
			var test = window.localStorage;
			// console.log("window.localStorage is available");
			return true;
		}
		catch (e) {
			// console.log("window.localStorage is not available");
			return false;
		}
	},
	loadAppPrefs: function() {
		if(!this.isLocalStorageAvailable()) {
			chrome.storage.local.get("appPrefs", enyo.bind(this, function(response){
				if(response.appPrefs)
					appPrefs = enyo.json.parse(response.appPrefs);
				this.gotAppPrefs();
			}));
		}
		else {
			if (window.localStorage.appPrefs) {
				appPrefs = enyo.json.parse(window.localStorage.appPrefs);
			}
			this.gotAppPrefs();
		}
	},
	gotAppPrefs: function() {
		this.$.prefUnitsPick.setSelected(this.$[appPrefs.units]);
		this.$.prefTimePick.setSelected(this.$[appPrefs.hours]);
		this.$.prefIconsPick.setSelected(this.$[appPrefs.icons]);
		this.$.prefThemePick.setSelected(this.$[appPrefs.theme]);
        this.$.prefWidgetOnStart.setChecked(appPrefs.autoloadWidget);
        this.$.prefCloseOnLoad.setChecked(appPrefs.closeOnLoad);

		this.applyTheme(appPrefs.theme);

		if (appPrefs.firstUse === true) {
			this.showHelpBoxes();
			appPrefs.firstUse = false;
			this.saveAppPrefs();
		}

		this.populateLocations();
		
		if (!this.params.sublaunch) {
			if (appPrefs.autoloadWidget === true) {
				this.launchWidget();
			}
			if (appPrefs.closeOnLoad === true) {
				window.close();
			}
		}
	},
	populateLocations: function() {
		this.$.locationList.destroyClientControls();
		for (i=0; i<appPrefs.locs.length; i++) {
			var classes;
			if (appPrefs.locs[i].active)
				classes = "location-row active";
			else
				classes = "location-row";

			this.$.locationList.createComponent({index: i, classes: classes, coords: appPrefs.locs[i].coords, content: appPrefs.locs[i].displayName, ontap: "selectLocation", onhold: "removeLocation", owner: this});
		}
		this.$.locationList.render();
	},
	selectLocation: function(sender) {
		for (i=0; i<appPrefs.locs.length; i++) {
			if (i == sender.index)
				appPrefs.locs[i].active = true;
			else
				appPrefs.locs[i].active = false;
		}

		appPrefs.loc = sender.coords;
		this.populateLocations();
		this.saveAppPrefs({content: "Save and Apply"}, true);
	},
	removeLocation: function(sender, event) {
		if (sender.index != 0) {
			appPrefs.locs.splice(sender.index, 1);
			this.saveAppPrefs();
			this.populateLocations();
		}
	},
	addLocation: function() {
		var inputShowing = this.$.prefLocRow.getShowing();
		if (!inputShowing) {
			this.$.prefLocRow.setShowing(true);
		}
		else {
			var query = this.$.prefLocInp.getValue();
			var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&sensor=true";
			var request = new enyo.Ajax({url: url});
			request.response(this, function(sender, response) {
				// console.log(response);
				if (response.status == "OK") {
					// Break down the response into a nice name
					var city, state, country = "";
					var results = response.results[0].address_components;
					for (i=0; i<results.length; i++) {
						if (results[i].types[0] == "locality" || results[i].types[0] == "administrative_area_level_3")
							city = results[i].short_name;
						else if (results[i].types[0] == "administrative_area_level_1")
							state = results[i].short_name;
						else if (results[i].types[0] == "country")
							country = results[i].short_name;
					}

					// Grab the gps coords
					var coords = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng;

					// Add the new location to the list
					appPrefs.locs.push({displayName: city+", "+state, coords: coords, active: false});

					this.populateLocations();
					this.saveAppPrefs();
				}
				else {
					this.$.statusLine2.setContent("Error: Location not found");
				}
			});
			request.go();
			this.$.prefLocRow.setShowing(false);
		}
		// this.$.prefLocRow.applyStyle("display", "block");
	},
	saveAppPrefs: function(sender, refresh) {
		console.log("Saving app prefs...");

		// If prefUnitsPick or prefGpsPick is different, we need to call forecast.io for updated data
		var requestRefresh = false;
		if (refresh === true || (appPrefs.units != this.$.prefUnitsPick.getSelected().name)) {
			requestRefresh = true;
		}

		// Getting appPrefs updated and ready to be stored
		appPrefs.units = this.$.prefUnitsPick.getSelected().name;
		appPrefs.hours = this.$.prefTimePick.getSelected().name;
		appPrefs.icons = this.$.prefIconsPick.getSelected().name;
		appPrefs.theme = this.$.prefThemePick.getSelected().name;

		var prefs = enyo.json.stringify(appPrefs);
		if(!this.isLocalStorageAvailable()) {
			chrome.storage.local.set({'appPrefs': prefs}, enyo.bind(this, function() {
				console.log('appPrefs saved');
			}));
		}
		else {
			window.localStorage.appPrefs = prefs;
		}

		if (sender && sender.content == "Save and Apply") {
			if (requestRefresh)
				this.refreshData();
			else
				this.gotWeatherData({}, this.lastWeatherResponse);

			this.applyTheme(appPrefs.theme);
		}
	},
	applyTheme: function(theme) {
		var head = document.getElementsByTagName("head")[0];

		// Remove any other theme stylesheets
		// console.log("Removing old theme sheets...");
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
	refreshData: function() {
		this.getLocation();
	},
	getLocation: function() {
		// appPrefs.loc = 19040;
		// console.log("Demo Mode: " + dwpDemoMode);
		if (dwpDemoMode) {
			var url = "assets/demo.json";
			var request = new enyo.Ajax({
					url: url
				});
			request.response(this, "gotWeatherData");
			request.go();
		}
		else {
			this.$.statusLine2.setContent("Requesting location...");
			if (appPrefs.loc != "gps") {
				var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + appPrefs.loc + "&sensor=true";
				var request = new enyo.Ajax({url: url});
				request.response(this, function(sender, response) {
					// console.log(response);
					if (response.status == "OK") {
						var location = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng;
						this.getWeatherData(location);
					}
					else {
						this.$.statusLine2.setContent("Error: Location not found");
					}
				});
				request.go();
			}
			else {
				navigator.geolocation.getCurrentPosition(enyo.bind(this, function(position) {
					var location = position.coords.latitude + "," + position.coords.longitude;
					// console.log("GPS location: " + location);
					this.getWeatherData(location);
				}));
			}
		}
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
		if (event.fromIndex == 0)
			this.$.prefLocRow.setShowing(false);
	},
	getWeatherData: function(location) {
		this.$.statusLine2.setContent("Getting forecast...");

		var myLoc = location || dwpDemoLoc;
		var units;
		switch (appPrefs.units) {
			case "optImperial":
				units = "us";
				break;
			case "optMetric":
				units = "si";
				break;
			default:
				units = "auto";
				break;
		};

		var url = "https://api.forecast.io/forecast/"+dwpApiKey+"/"+myLoc+"?&units="+units;

		if(!this.isLocalStorageAvailable()) { // TODO: Find a better way to determine if running as a Chrome packaged app.
			var request = new enyo.Ajax({
				url: url
			});
		}
		else {
			var request = new enyo.JsonpRequest({
				url: url
			});
		}
		
		request.response(this, "gotWeatherData");
		request.go();
	},
	gotWeatherData: function(sender, response) {
		this.refreshing = false;
		
		// console.log(response);
		this.lastWeatherResponse = response;
		this.$.sysWarning.setContent("");

		// ---------- Set up the widget header ----------

		this.$.iconMain.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon64/" + response.currently.icon + ".png')");

		// Get current temperature
		var temp = parseInt(response.currently.temperature, 10) + "&deg;";
		this.$.currentTemp.setContent(temp);

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

		// Check for severe weather alerts
		var alert;
		var hasAlerts = false;
		try {
			alert = response.alerts;
			if (alert.length > 0)
				hasAlerts = true;
		}
		catch (err) {
			// Do nothing
		}

		this.$.weatherAlerts.destroyClientControls();
		if (hasAlerts) {
			for(var i=0; i<alert.length; i++) {
				this.$.weatherAlerts.createComponent({classes: "alert", content: alert[i].title, uri: alert[i].uri, ontap: "openAlert", owner: this});
			}
			this.$.weatherAlerts.setShowing(true);
			this.$.weatherAlerts.render();
		}
		else {
			this.$.weatherAlerts.setShowing(false);
		}

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
		var clouds = parseInt(now.cloudCover * 100) + "<span class='label-units'>%</span>";
		this.$.eleCloud.setDesc(clouds);

		// Get wind speed and direction
		var wind;
		var windSpeed = parseInt(now.windSpeed);
		var windBearing;

		if(now.windBearing === 0)
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

		if (response.flags.units == "us") {
			wind = windBearing + " at " + windSpeed + "<span class='label-units'>mph</span>";
		}
		else {
			wind = windBearing + " at " + windSpeed + "<span class='label-units'>m/s</span>";
		}

		this.$.eleWind.setDesc(wind);

		// Get visibility
		var vis = now.visibility;

		if (response.flags.units == "us") {
			vis += "<span class='label-units'>mi</span>";
		}
		else {
			vis += "<span class='label-units'>km</span>";
		}

		this.$.eleVis.setDesc(vis);

		// Get sunrise time
		var sunrise = new Date(response.daily.data[0].sunriseTime * 1000);
		sunrise = this.formatTime(sunrise.getHours(), sunrise.getMinutes());
		this.$.eleSun.setDesc(sunrise);

		// Get sunset time
		var sunset = new Date(response.daily.data[0].sunsetTime * 1000);
		sunset = this.formatTime(sunset.getHours(), sunset.getMinutes());
		this.$.eleMoon.setDesc(sunset);

		// Get humidity
		var humid = parseInt(now.humidity * 100, 10) + "<span class='label-units'>%</span>";
		this.$.eleHumid.setDesc(humid);

		// Get barometric pressure
		var pressure = parseInt(now.pressure, 10) + "<span class='label-units'>mb</span>";
		this.$.eleBaro.setDesc(pressure);

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
			this.dailyHigh = Math.max(this.dailyHigh, temp);
			this.$.dailyHigh.setContent(this.dailyHigh + "&deg;");
			this.dailyLow = Math.min(this.dailyLow, temp);
			this.$.dailyLow.setContent(this.dailyLow + "&deg;");
			temp += "&deg;";

			// Get the forecast
			var forecast = hourly[i].summary;

			// Get the precipitation
			var precip = "0";
			if (hourly[i].precipIntensity !== 0) {
				precip = parseInt(hourly[i].precipProbability * 100, 10) + "<span class='label-units'>%</span>";
			}

			// Get cloud cover
			var cloud = parseInt(hourly[i].cloudCover * 100, 10) + "<span class='label-units'>%</span>";

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
			var high = parseInt(daily[i].temperatureMax, 10) + "&deg;";
			var low = parseInt(daily[i].temperatureMin, 10) + "&deg;";

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
			m = 0;

		if (m < 10)
			m = "0" + m;

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
	showHelpBoxes: function() {
		this.$.helpSettings.applyStyle("display", "block");
		this.$.helpIcons.applyStyle("display", "block");
	},
	closeHelpBox: function(sender) {
		this.$[sender.name].applyStyle("display", "none");
	},
	// webOS widget stuff
	launchWidget: function() {
		window.open("widget.html?widget=true", "dwpWidget", 'attributes={"window": "dashboard", "dashHeight": 320}');
	},
	launchIndex: function() {
		if (this.params.widget) {
			window.open("index.html?sublaunch=true", "dwp", '');
		}
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
	}
});

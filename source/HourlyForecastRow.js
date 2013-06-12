enyo.kind({
	name: "HourlyForecastRow",
	kind: "FittableColumns",
	classes: "hour-box",
	published: {
		hour: "12:00",
		icon: "na",
		temp: "0&deg;",
		forecast: "Unknown",
		precip: "0%",
		cloud: "100%"
	},
	components:[
		// {name: "hour", classes: "hour"},
		{name: "icon", classes: "icon"},
		{kind: "FittableRows", classes: "detail-box", fit: true, components: [
			{name: "hour", classes: "hour", allowHtml: true},
			{name: "forecast", classes: "forecast", allowHtml: true}
		]},
		{kind: "FittableRows", classes: "detail-box2", components: [
			{name: "precip", classes: "precip", allowHtml: true},
			{name: "cloud", classes: "cloud", allowHtml: true}
		]}
		// {name: "precip", classes: "precip"}
	],
	rendered: function() {
		this.inherited(arguments);

		this.$.hour.setContent(this.hour);
		// this.$.hour.setContent(this.hour);
		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon64/" + this.icon + ".png')");
		// this.$.temp.setContent(this.temp);
		this.$.forecast.setContent(this.temp + " " + this.forecast);
		this.$.precip.setContent(this.precip + "<span class='label-units'>%</span>");
		this.$.precip.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/rain.png')");
		this.$.cloud.setContent(this.cloud + "<span class='label-units'>%</span>");
		this.$.cloud.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/cloudy.png')");
	}
});
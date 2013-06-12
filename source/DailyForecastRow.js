enyo.kind({
	name: "DailyForecastRow",
	kind: "FittableColumns",
	classes: "day-box",
	published: {
		date: "Wednesday, March 27",
		icon: "partly-cloudy-day",
		high: "-42&deg;",
		low: "100&deg;",
		forecast: "slight chance of rain"
	},
	components:[
		{name: "icon", classes: "icon"},
		{kind: "FittableRows", components: [
			{name: "high", classes: "high", content: "112°", allowHtml: true},
			{name: "low", classes: "low", content: "12°", allowHtml: true}
		]},
		{kind: "FittableRows", fit: true, components: [
			{name: "date", classes: "date"},
			{name: "forecast", classes: "forecast"}
		]}
	],
	rendered: function() {
		this.inherited(arguments);

		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon64/" + this.icon + ".png')");
		this.$.high.setContent(this.high);
		this.$.low.setContent(this.low);
		this.$.date.setContent(this.date);
		this.$.forecast.setContent(this.forecast);
	}
});
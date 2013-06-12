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

		// console.log("TabIndicator: " + this.position);
		if (this.position < 3 && this.position >= 0) {
			this.$.indicator.applyStyle("margin-left", (this.position * 33.3) + "%");
		}
	}
});
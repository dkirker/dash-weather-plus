enyo.kind({
	name: "CurrentlyElementL",
	kind: "FittableColumns",
	classes: "currently-element left",
	published: {
		icon: "na",
		desc: "0"
	},
	components:[
		{name: "icon", classes: "icon"},
		{name: "desc", classes: "desc", allowHtml: true}
	],
	updateIcon: function() {
		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/" + this.icon + ".png')");
	},
	rendered: function() {
		this.inherited(arguments);

		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/" + this.icon + ".png')");
		this.$.desc.setContent(this.desc);
	},
	descChanged: function() {
		this.$.desc.setContent(this.desc);
	}
});

enyo.kind({
	name: "CurrentlyElementR",
	kind: "FittableColumns",
	classes: "currently-element right",
	published: {
		icon: "na",
		desc: "0"
	},
	components:[
		{name: "desc", classes: "desc", allowHtml: true},
		{name: "icon", classes: "icon"}
	],
	updateIcon: function() {
		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/" + this.icon + ".png')");
	},
	rendered: function() {
		this.inherited(arguments);

		this.$.icon.applyStyle("background-image", "url('assets/icons/" + appPrefs.icons + "/icon24/" + this.icon + ".png')");
		this.$.desc.setContent(this.desc);
	},
	descChanged: function() {
		this.$.desc.setContent(this.desc);
	}
});
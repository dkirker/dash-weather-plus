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
	name: "HourlyForecastRow",
	kind: "FittableColumns",
	classes: "hour-box",
	published: {
		hour: "12:00",
		temp: "00&deg;",
		forecast: "Unknown",
		precip: "00%"
	},
	components:[
		{name: "hour", classes: "hour"},
		{name: "temp", classes: "temp", allowHtml: true},
		{name: "forecast", classes: "forecast", fit: true},
		{name: "precip", classes: "precip"}
	],
	rendered: function() {
		this.inherited(arguments);

		this.$.hour.setContent(this.hour);
		this.$.temp.setContent(this.temp);
		this.$.forecast.setContent(this.forecast);
		this.$.precip.setContent(this.precip);
	}
});
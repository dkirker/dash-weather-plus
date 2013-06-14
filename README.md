Dash Weather Plus
=================

A beautiful weather app built entirely with Enyo2.

Want to see it running on your device? Point your browser to the [Dash Weather+ Live Demo](http://app.choorp.org/DashWeatherPlus)!

### How to Build

1. git clone https://github.com/choorp/dash-weather-plus.git
2. cd dash-weather-plus
3. git submodule update --init
4. Get your own Forecast.io API key and add it to /source/config.js. Also set dwpDemoMode to false.
5. From this directory (!important), run 'tools\deploy.bat'.

Now, here's what else you need to do to get it running on your platform-of-choice:

**Build for Web**

1. Copy /deploy/dash-weather-plus/ to your server.
2. Enjoy!

**Build as Chrome Extension**

1. Copy contents of /extension/ to /deploy/dash-weather-plus/
2. Install and enjoy!

**Build for webOS**

1. Copy contents of /webos/ to /deploy/dash-weather-plus/
2. Use an ipk packager to package /deploy/dash-weather-plus/
3. Install and enjoy!

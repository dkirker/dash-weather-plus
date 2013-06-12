Dash Weather Plus
=================

A beautiful weather app built entirely with Enyo2.

**Build for webOS**

1. git clone https://github.com/choorp/dash-weather-plus.git
2. cd dash-weather-plus
3. git submodule update --init
4. Get your own Forecast.io API key and add it to App.js and Widget.js Also set demoMode to false.
5. From this directory (!important), run 'tools\deploy.bat'
6. Copy contents of /webos/ to /deploy/dash-weather-plus/
7. Use an ipk packager to make an installable app
8. Enjoy!
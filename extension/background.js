chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("index.html",
    { frame: "chrome",
      bounds: {
        width: 415,
        height: 570
      },
      minWidth: 300,
      minHeight: 400
    }
  );
});
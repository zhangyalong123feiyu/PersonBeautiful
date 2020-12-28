chrome.runtime.onConnect.addListener(function (externalPort) {
    externalPort.onDisconnect = function () {
      try { 
        var ignoreError = chrome.runtime.lastError
      } catch (error) {
        console.log("onDisconnect")
      }
    }
})
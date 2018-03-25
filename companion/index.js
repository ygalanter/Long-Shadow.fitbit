import * as messaging from "messaging";
import { settingsStorage } from "settings";

console.log("Companion Started");

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  
  // special handling for present theme
  if (evt.key == "colorThemePreset") {
    
    //saving individual colors
    let preset = JSON.parse(evt.newValue).values[0].value;
    for (var key in preset)
      settingsStorage.setItem(key, `"${preset[key]}"`);
    
  }
  
  console.log(evt.newValue);
  
  //sending to device
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key && key != "colorThemePreset") { // not sending color scheme presets, individual colors will be send
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
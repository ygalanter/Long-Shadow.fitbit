import clock from "clock";
import document from "document";
import { battery } from "power";
import { preferences } from "user-settings";
import * as messaging from "messaging";
import * as fs from "fs";
import { me } from "appbit";
import dtlib from "../common/datetimelib";

let h1img = document.getElementById("h1");
let h2img = document.getElementById("h2");
let m1img = document.getElementById("m1");
let m2img = document.getElementById("m2");
let h1shimg = document.getElementById("h1sh");
let h2shimg = document.getElementById("h2sh");
let m1shimg = document.getElementById("m1sh");
let m2shimg = document.getElementById("m2sh");
let solidBackground = document.getElementById("solidBackground");

let batterytext = document.getElementById("batterytext");
let datelbl = document.getElementById("date");
let dowlbl = document.getElementById("dow");

function assignAllColors(){
  h1img.style.fill = userSettings.h1color;
  h2img.style.fill = userSettings.h2color;
  m1img.style.fill = userSettings.m1color;
  m2img.style.fill = userSettings.m2color;
  h1shimg.style.fill = userSettings.h1shadowcolor;
  h2shimg.style.fill = userSettings.h2shadowcolor;
  m1shimg.style.fill = userSettings.m1shadowcolor;
  m2shimg.style.fill = userSettings.m2shadowcolor;
  solidBackground.style.fill =  userSettings.backgroundcolor;
  batterytext.style.fill = userSettings.optionscolor;
  datelbl.style.fill = userSettings.optionscolor;
  dowlbl.style.fill = userSettings.optionscolor;
}

function showHideDate(showDate) {
    datelbl.style.display = showDate? "inline": "none";
}

function showHideDOW(showDOW) {
    dowlbl.style.display = showDOW? "inline": "none";
}

function showHideBattery(showSteps) {
    batterytext.style.display = showSteps? "inline": "none";
}


function updateBattery(charge) {
  batterytext.text = `${charge}%`;
}


// on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
}


// Message is received
messaging.peerSocket.onmessage = evt => {
  
  switch (evt.data.key) {
    case "h1color": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          h1img.style.fill = userSettings.h1color;
          break;
     case "h2color": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          h2img.style.fill = userSettings.h2color;
          break;
     case "m1color": 
         userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          m1img.style.fill = userSettings.m1color;
          break;
     case "m2color": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          m2img.style.fill = userSettings.m2color;
          break;
     case "h1shadowcolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          h1shimg.style.fill = userSettings.h1shadowcolor;
          break;
     case "h2shadowcolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          h2shimg.style.fill = userSettings.h2shadowcolor;
          break;
     case "m1shadowcolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          m1shimg.style.fill = userSettings.m1shadowcolor;
          break;
     case "m2shadowcolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          m2shimg.style.fill = userSettings.m2shadowcolor;
          break;
      case "backgroundcolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          solidBackground.style.fill = userSettings.backgroundcolor;
          break;
     case "optionscolor": 
          userSettings[evt.data.key] = evt.data.newValue.replace(/["']/g, "");
          batterytext.style.fill = userSettings.optionscolor;
          datelbl.style.fill = userSettings.optionscolor;
          dowlbl.style.fill = userSettings.optionscolor;
          break;     
     case "showDate":
         userSettings[evt.data.key] = evt.data.newValue == 'true';
         showHideDate(userSettings.showDate); 
         break;
     case "showDOW": 
         userSettings[evt.data.key] = evt.data.newValue == 'true';
         showHideDOW(userSettings.showDOW); 
         break;
     case "showBattery":
         userSettings[evt.data.key] = evt.data.newValue == 'true';
         showHideBattery(userSettings.showBattery);
         break;
    case "colorThemePreset":
         let preset = JSON.parse(evt.data.newValue).values[0].value;
         userSettings = {...userSettings, ...preset};
         assignAllColors();
  };
 
      
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};



// trying to get user settings if saved before
let userSettings;
try {
  userSettings = fs.readFileSync("user_settings.json", "json");
} catch (e) {
  userSettings = {h1color: "#00fcfd", h2color: "#00fcfd", m1color: "#00fcfd", m2color: "#00fcfd", 
                  h1shadowcolor: "#fa3500", h2shadowcolor: "#0000ff", m1shadowcolor: "#00aa00", m2shadowcolor: "#fab900",
                  backgroundcolor: "#000000", optionscolor: "#fab900",
                  showDOW: false, showDate: false, showBattery: false}
}


//trap
if (!userSettings.h2shadowcolor) userSettings = {h1color: "#00fcfd", h2color: "#00fcfd", m1color: "#00fcfd", m2color: "#00fcfd", 
                  h1shadowcolor: "#fa3500", h2shadowcolor: "#0000ff", m1shadowcolor: "#00aa00", m2shadowcolor: "#fab900",
                  backgroundcolor: "#000000", optionscolor: "#fab900",
                  showDOW: false, showDate: false, showBattery: false}

assignAllColors();


// get user time format preference
dtlib.timeFormat = preferences.clockDisplay == "12h" ? 1: 0;
// Update the clock every minute
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  
  // obtaining hours in user-preferred format and split them into 2 digits
  let hours = dtlib.format1224hour(today.getHours());
  let h1 = Math.floor(hours/10);
  let h2 = hours % 10;
  
  // obtaining minutes and split them into 2 digits
  let mins = today.getMinutes();
  let m1 = Math.floor(mins/10);
  let m2 = mins % 10;
  
  h1img.href = `digits/${h1}.png`; h2img.href = `digits/${h2}.png`;
  m1img.href = `digits/${m1}.png`; m2img.href = `digits/${m2}.png`;
  
  h1shimg.href = `digits/${h1}sh.png`; h2shimg.href = `digits/${h2}sh.png`;
  m1shimg.href = `digits/${m1}sh.png`; m2shimg.href = `digits/${m2}sh.png`;
  
  // getting short name of the month in English
  let month = dtlib.getMonthNameShort(dtlib.LANGUAGES.ENGLISH, today.getMonth());
  
  // getting 0-preprended day of the month
  let day = dtlib.zeroPad(today.getDate())
  
  datelbl.text = `${month} ${day}`;
  
  // displaying day of the week
  let dow = today.getDay();
  dowlbl.text = dtlib.getDowNameShort(dtlib.LANGUAGES.ENGLISH, dow);
  
}

showHideBattery(userSettings.showBattery);
showHideDate(userSettings.showDate);
showHideDOW(userSettings.showDOW);

//battery
updateBattery(Math.floor(battery.chargeLevel));
battery.onchange = () => updateBattery(Math.floor(battery.chargeLevel));

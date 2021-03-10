// 1 Year In Minutes (For Cookies)
// 525600

var Swal = Swal;

// Call the animation maker
var gsap = gsap;
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
// The body element for the home page
var Body = document.querySelector("body");
// Owner cookie
var Owner = getCookie("Owner");

// The share input and button (/share)
var ShareCopyInput = document.getElementById("ShareCopyInput");
var ShareCopyButton = document.getElementById("ShareCopyButton");

// setCookie() and getCookie() functions
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

// Play a sound with it's url
function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

// Show the error message and bring them to the error page if the website is disabled
// If the website is disabled, un-comment the line below:
//Error();
function Error() {
  Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: "Loading Message",
    allowOutsideClick: false,
    showConfirmButton: false,
    toast: true,
    position: "top"
  });

  window.open("https://tikogrant.glitch.me/error/", "_self");
}

// Cookie alert cookie
var CookieAlertCookie = getCookie("CookieAlertCookie");

// Check if the cookie alert cookie is there, if it isn't, it will show the cookie alert
if (CookieAlertCookie === null) {
  document.getElementById("CookieAlert").style.display = "block";
}

// When the "Accept" button is pressed in the cookie alert
function ConfirmCookieAlert() {
  setCookie("CookieAlertCookie", "true", 525600);
  tl.to("#CookieAlert", { opacity: 0, duration: 1.5 });
  setTimeout(function() {
    document.querySelector("#CookieAlert").style.display = "none";
  }, 1500);
}

// When the user clicks on the bottom right button and it smoothly scrolls to the top
function scroll_to_top() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Copy the link (/share)
function ShareCopy() {
  document.getElementById("ShareCopyInput").select();
  document.execCommand("Copy");
  setTimeout(function() {}, 500);
  Swal.fire({
    icon: "success",
    title: "Copied...",
    text: "The Link Has Been Copied!",
    showCloseButton: false,
    timer: "7000",
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    showComfirmButton: false,
    toast: true,
    position: "top"
  });
}

function logScroll() {
  console.log(window.scrollY);
  setTimeout(function() {
    logScroll();
  }, 1);
}

if (Notification.permission === "default") {
  document.querySelector("#notificationsContent").style.display = "block";
} else if (Notification.permission === "allowed") {
  document.querySelector("#notificationsContent").style.display = "none";
} else if (Notification.permission === "denied") {
  document.querySelector("#notificationsContent").style.display = "block";
}

async function enableNotifications() {
  await Notification.requestPermission();
  if (Notification.permission === "default") {
    Swal.fire({
      icon: "warning",
      title: "You Closed The Pop-up",
      text:
        "You closed the pop-up. Press the button again if you want to enable notifications!",
      confirmButtonText: "Continue",
      toast: true,
      position: "top"
    });
  } else if (Notification.permission === "granted") {
    Swal.fire({
      icon: "success",
      title: "Allowed",
      text: "Thanks for allowing!",
      confirmButtonText: "Okay!",
      toast: true,
      position: "top"
    });
    document.querySelector("#notificationsButton").style.display = "none";
  } else if (Notification.permission === "denied") {
    Swal.fire({
      icon: "error",
      title: "Blocked",
      text:
        "The notification permision is blocked. Please enable it if you want to get notifications!",
      confirmButtonText: "Continue Without Notifications",
      footer:
        "If you want to enable this permission, please look it up on Google or YouTube!",
      toast: true,
      position: "top"
    });
  }
}

function showAlarm() {
  document.querySelector("#showAlarmButton").style.display = "none";
  document.querySelector("#alarmContent").style.display = "block";
}

function checkHourInputAlarm() {
  var input = document.querySelector("#alarmHourInput");

  if (input.value > 12) {
    input.value = "";
  }
}

function checkMinuteInputAlarm() {
  var input = document.querySelector("#alarmMinuteInput");

  if (input.value > 59) {
    input.value = "";
  }
}

function checkSecondInputAlarm() {
  var input = document.querySelector("#alarmSecondInput");

  if (input.value > 59) {
    input.value = "";
  }
}

var hourInput = document.querySelector("#alarmHourInput");
var minuteInput = document.querySelector("#alarmMinuteInput");
var secondInput = document.querySelector("#alarmSecondInput");
var alarmType = "";
var alarmAM = document.querySelector("#alarmTypeAM");
var alarmPM = document.querySelector("#alarmTypePM");
var alarmTime = getCookie("AlarmTime");

function setAlarm() {
  if (
    hourInput.value === "" ||
    minuteInput.value === "" ||
    secondInput.value === "" ||
    hourInput.value.length > 2 ||
    minuteInput.value.length == 1 ||
    minuteInput.value.length > 2 ||
    secondInput.value.length == 1 ||
    secondInput.value.length > 2
  ) {
    alert(
      "There is an error, please make sure that the hour input has no 0 and the minute and second input have a 0 in front of it if it's a single digit number!"
    );
    return false;
  }

  if (alarmAM.selected) {
    alarmType = "AM";
  } else if (alarmPM.selected) {
    alarmType = "PM";
  }

  setCookie(
    "AlarmTime",
    hourInput.value +
      ":" +
      minuteInput.value +
      ":" +
      secondInput.value +
      " " +
      alarmType,
    525600
  );
  document.location.reload();
}

if (alarmTime === null) {
} else {
  document.querySelector("#showAlarmButton").style.display = "none";
  document.querySelector("#cancelAlarmButton").style.display = "block";
  document.querySelector("#cancelAlarmButton").innerHTML =
    '<i class="far fa-bell-slash"></i> Cancel Alarm (' + alarmTime + ")";
}

function cancelAlarm() {
  setCookie("AlarmTime", null, 0);
  document.location.reload();
}

checkAlarm();

function checkAlarm() {
  var time = new Date().toLocaleTimeString();
  var Music = document.querySelector("#Music");

  if (time === alarmTime) {
    document.querySelector("#alarmFinishedContent").style.display = "block";
    Music.play();
  }

  setTimeout(function() {
    checkAlarm();
  }, 100);
}

function closeAlarmContent() {
  var Music = document.querySelector("#Music");

  document.querySelector("#alarmFinishedContent").style.display = "none";
  Music.pause();
  setCookie("AlarmTime", null, 0);
  document.location.reload();
}

window.addEventListener("online", function() {
  playSound(
    "https://cdn.glitch.com/7d8cd8bd-9b28-4d06-91c4-1a607d45f24c%2Fdone-for-you-612.mp3?v=1610674504983"
  );
  Swal.close();
  Swal.fire({
    icon: "success",
    title: "Online",
    text: "You are back online!",
    toast: true,
    position: "top-end",
    confirmButtonText: "Close"
  });
  const notification = new Notification("You are back online!");
});
window.addEventListener("offline", function() {
  offline();
  const notification = new Notification("Looks Like You Are Offline!");
});

function offline() {
  playSound(
    "https://cdn.glitch.com/7d8cd8bd-9b28-4d06-91c4-1a607d45f24c%2Ftesla_warning.mp3?v=1610926202610"
  );
  Swal.fire({
    icon: "error",
    title: "You Are Offline",
    text:
      "You have been disconnected from the internet! We will tell you when you are back online, you don't need to reload or close this page! This pop-up will close by itself when you are back online!",
    allowOutsideClick: false,
    showConfirmButton: false,
    backdrop: "red",
    footer: "Please Connect To The Internet!"
  });
  Swal.showLoading();
}

document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.which == 73) {
    if (Owner === "true") {
    } else {
      e.preventDefault();
    }
  }
});

document.addEventListener("contextmenu", function(e) {
  if (Owner === "true") {
  } else {
    e.preventDefault();
  }
});

document.addEventListener("keydown", async function(e) {
  if (e.ctrlKey && e.which == 66) {
    Swal.close();
    var prompt = await window.prompt("Enter owner password!");
    if (prompt === "2580") {
      setCookie("Owner", "true", 525600);
      document.querySelector("#becomeOwnerButton").style.display = "none";
    } else if (prompt === "" || prompt === null) {
      // Closed or noting answered
      return false;
    } else {
      // Incorrect
      setCookie("Owner", "false", 0);
    }
    e.preventDefault();
  }
});

function becomeOwner() {
  Swal.fire({
    icon: "info",
    title: "Confirmation",
    text: "Please press Ctrl + B to continue!",
    toast: true,
    position: "top",
    showConfirmButton: false
  });
}

if (Owner === "true") {
  if (document.location.href === "https://tikogrant.glitch.me/") {
    document.querySelector("#becomeOwnerButton").style.display = "none";
  }
}

var seenRememberAlert = getCookie("seenRememberAlert");
var waitingForRememberConfirm = getCookie("waitingForRememberConfirm");

if (seenRememberAlert === null) {
  setTimeout(function() {
    setCookie("waitingForRememberConfirm", true, 525600);
    document.querySelector(".rememberBackground").style.display = "block";
    tl.fromTo(
      ".rememberBackground",
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, 10000);
}

function confirmRememberAlert() {
  setCookie("seenRememberAlert", true, 7200);
  setCookie("waitingForRememberConfirm", false, 0);
  tl.fromTo(".rememberBackground", { opacity: 1 }, { opacity: 0, duration: 1 });
  setTimeout(function() {
    document.querySelector(".rememberBackground").style.display = "none";
  }, 1000);
}

if (waitingForRememberConfirm === "true") {
  document.querySelector(".rememberBackground").style.display = "block";
  tl.fromTo(".rememberBackground", { opacity: 0 }, { opacity: 1, duration: 1 });
}

var theme = getCookie("theme");
var themeLight = document.querySelector("#themeLight");
var themeDark = document.querySelector("#themeDark");

if (theme === "light") {
  if (document.location.href === "https://tikogrant.glitch.me/") {
    themeLight.selected = true;
  }
  document.body.style.background =
    "url('https://cdn.glitch.com/7d8cd8bd-9b28-4d06-91c4-1a607d45f24c%2FFortnite.jpg?v=1614121222958') cover";
} else if (theme === "dark") {
  themeDark.selected = true;
  document.body.style.background = "black";
}

function changeTheme() {
  var light = document.querySelector("#themeLight");
  var dark = document.querySelector("#themeDark");

  if (light.selected) {
    setCookie("theme", "light", 525600);
  } else if (dark.selected) {
    setCookie("theme", "dark", 525600);
  }

  document.location.reload();
}

checkScreenSize();

function checkScreenSize() {
  if (window.screen.width < 200) {
    document.querySelector("body").style.display = "none";
    console.log(
      "Sorry, Your Screen Size Is Not Supported On Our Website. You Must Have A Small Screen!"
    );
    setTimeout(function() {
      document.location.reload();
    }, 1000);
    return false;
  }

  setTimeout(function() {
    checkScreenSize();
  }, 1);
}

checkScrollButtonPosition();

function checkScrollButtonPosition() {
  var elem = document.querySelector(".scroll_to_top");
  var screenSize = window.screen.width;

  if (screenSize < 586) {
    if (document.location.href === "https://tikogrant.glitch.me/") {
      elem.hidden = true;
    }
  } else {
    if (document.location.href === "https://tikogrant.glitch.me/") {
      elem.hidden = false;
    }
  }

  setTimeout(function() {
    checkScrollButtonPosition();
  }, 1);
}

checkThemeSelectPosition();

function checkThemeSelectPosition() {
  var elem = document.querySelector("#theme");
  var screenSize = window.screen.width;

  if (screenSize < 834) {
    if (document.location.href === "https://tikogrant.glitch.me/") {
      elem.hidden = true;
    }
  } else {
    if (document.location.href === "https://tikogrant.glitch.me/") {
      elem.hidden = false;
    }
  }

  setTimeout(function() {
    checkThemeSelectPosition();
  }, 1);
}

window.onselectstart = function() {
  return false;
};

function search() {
  var input = document.querySelector(".searchInput");
  var button = document.querySelector(".searchButton");

  if (input.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Note",
      text: "You can't search without typing something!",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      toast: true,
      position: "bottom-end"
    });
    return false;
  }

  if (input.value.toLowerCase() == "info") {
    window.open("/info", "_self");
    return false;
  }
  if (input.value.toLowerCase() == "widget") {
    window.open("/widget", "_self");
    return false;
  }
  if (input.value.toLowerCase() == "youtube") {
    window.open("/yt", "_self");
    return false;
  }
  if (input.value.toLowerCase() == "discord") {
    window.open("/discord", "_self");
    return false;
  }
  if (input.value.toLowerCase() == "share") {
    window.open("/share", "_self");
    return false;
  }
  if (
    input.value.toLowerCase() == "fortnite" ||
    input.value.toLowerCase() == "fortnite (home)"
  ) {
    window.open("/#fortnite", "_self");
    return false;
  }
  Swal.fire({
    icon: "error",
    title: "No Results Found",
    text:
      "Sorry, no results were found, make sure your search request is the same as one of the options listed!",
    showConfirmButton: false,
    toast: true,
    position: "top",
    timer: 7000,
    timerProgressBar: true
  });
}

if (document.location.href === "https://tikogrant.glitch.me/") {
  document
    .querySelector(".searchInput")
    .addEventListener("keypress", function(e) {
      if (e.which == 13) {
        document.querySelector(".searchButton").click();
      }
    });
}

checkSearchWidth();

function checkSearchWidth() {
  if (document.location.href === "https://tikogrant.glitch.me/") {
    var screenWidth = window.innerWidth;
    var elem = document.querySelector(".searchContent");

    if (screenWidth > 966) {
      elem.hidden = false;
    } else if (screenWidth < 966) {
      elem.hidden = true;
    }

    setTimeout(function() {
      checkSearchWidth();
    }, 1);
  }
}

var title = document.title;

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") {
    document.title = "Come Back!";
    document.querySelector("body").style.display = "none";
  } else if (document.visibilityState === "visible") {
    document.title = title;
    setTimeout(function() {
      document.querySelector("body").style.display = "block";
    }, 100);
  }
});

document.querySelector("body").style.display = "block";

document.title = "Loading... Please Wait!";

setTimeout(function() {
  document.title = title;
}, 500);

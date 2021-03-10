var button = document.querySelector("#tiko_grant_widget_button");
var widgetOpened = false;

var widgetToggle = {
  type: "N/A",
  time: "N/A"
};

function tiko_grant_widget() {
  if (widgetOpened === false) {
    document.getElementById("tiko_grant_widget_iframe").style.display = "block";
    widgetOpened = true;
    widgetToggle = {
      type: "open",
      time: new Date().toLocaleTimeString()
    };
  } else if (widgetOpened === true) {
    document.getElementById("tiko_grant_widget_iframe").style.display = "none";
    widgetOpened = false;
    widgetToggle = {
      type: "close",
      time: new Date().toLocaleTimeString()
    };
  }
}

// Cookie functions from w3schools
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// A custom function to get cookies
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

console.log("%cWidget is now on this current website!", "border-radius: 10px; text-align: center; font-family: 'Langar', cursive; color: gold; background-image: url('https://www.ecomagazine.com/images/Newsletter/0_2019/Week_11-18-19/birdseyeview_ocean.jpg'); background-size: cover; font-size: 40px; font-weight: bold;");

document.querySelector(".tiko_grant_button").innerHTML = "Tiko Grant";
document
  .querySelector(".tiko_grant_button")
  .addEventListener("click", function() {
    window.open("https://tikogrant.glitch.me");
  });

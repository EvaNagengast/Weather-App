// current time
//

function updateTime(apiInfo) {
  let months = [
    // "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    //"Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();

  let timeshift = apiInfo.data.timezone;
  if (timeshift !== undefined) {
    let timeshiftInMilliseconds = timeshift * 1000;
    let localTimezoneInMilliseconds = now.getTimezoneOffset() * 60000;
    now = new Date(
      now.getTime() + timeshiftInMilliseconds + localTimezoneInMilliseconds
    );
  }
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  document.querySelector(
    "#current-time"
  ).innerHTML = `${day}, ${date}.${month}, ${hour}:${minute}`;
}

function updateTimeApi(cityname) {
  let apikey = "a5c55c774ac8198c087358853c4a79a9";
  let units = "metric"; // or let units = "metric"
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=${units}&appid=${apikey}`;

  axios.get(url).then(updateTime);
}
//
// change Icon
//
function changeIconColor(iconName) {
  let icon = document.querySelector("#iconT");
  icon.classList.remove("dayIcon", "nightIcon");

  if (iconName.endsWith("night")) {
    icon.classList.add("nightIcon");
  } else {
    icon.classList.add("dayIcon");
  }
}

function changeIcon(iconName) {
 let iconValue = iconMap[iconName];
 let icon = document.querySelector("#iconT");
 icon.innerHTML = iconValue;

  changeIconColor(iconName);
}

//
//
//update forecast days

function getForecastData(city) {
  let apiKey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function forecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]; //"Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"
  return days[day];
}

//
//update forecast icons

let iconMap = {
  "clear-sky-day": "wb_sunny",
  "clear-sky-night": "nightlight",
  "few-clouds-day": "partly_cloudy_day",
  "few-clouds-night": "partly_cloudy_night",
  "scattered-clouds-day": "cloud",
  "scattered-clouds-night": "cloud",
  "broken-clouds-day": "filter_drama",
  "broken-clouds-night": "filter_drama",
  "shower-rain-day": "rainy",
  "shower-rain-night": "rainy",
  "rain-day": "cloudy_snowing",
  "rain-night": "cloudy_snowing",
  "thunderstorm-day": "thunderstorm",
  "thunderstorm-night": "thunderstorm",
  "snow-day": "weather_snowy",
  "snow-night": "weather_snowy",
  "mist-day": "foggy",
  "mist-night": "foggy",
};

function getHTMLIcon(iconValue) {
  return iconMap[iconValue];
}

function displayForecast(apiInfo) {
  let forecastarray = apiInfo.data.daily;
  let forecastsection = document.querySelector("#forecast");
  let forecastHtml = "";

  forecastHtml =
    forecastHtml +
    `  <li> <div class="row">
      <div class="col-6"><span class="material-symbols-outlined">${getHTMLIcon(
        forecastarray[0].condition.icon
      )}</span></div>
      <div class="col-6">
         ${forecastDays(forecastarray[0].time)}
        <br />
        ${Math.round(forecastarray[0].temperature.maximum)} | ${Math.round(
      forecastarray[0].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-6"><span class="material-symbols-outlined">${getHTMLIcon(
        forecastarray[1].condition.icon
      )}</span></div>
      <div class="col-6">
         ${forecastDays(forecastarray[1].time)}
        <br />
        ${Math.round(forecastarray[1].temperature.maximum)} | ${Math.round(
      forecastarray[1].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-6"><span class="material-symbols-outlined">${getHTMLIcon(
        forecastarray[2].condition.icon
      )}</span></div>
      <div class="col-6">
         ${forecastDays(forecastarray[2].time)}
        <br />
        ${Math.round(forecastarray[2].temperature.maximum)} | ${Math.round(
      forecastarray[2].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-6"><span class="material-symbols-outlined">${getHTMLIcon(
        forecastarray[3].condition.icon
      )}</span></div>
      <div class="col-6">
         ${forecastDays(forecastarray[3].time)}
        <br />
        ${Math.round(forecastarray[3].temperature.maximum)} | ${Math.round(
      forecastarray[3].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-6"><span class="material-symbols-outlined">${getHTMLIcon(
        forecastarray[4].condition.icon
      )}</span></div>
      <div class="col-6">
         ${forecastDays(forecastarray[4].time)}
        <br />
        ${Math.round(forecastarray[4].temperature.maximum)} | ${Math.round(
      forecastarray[4].temperature.minimum
    )}  </div>  </div> </li> `;

  forecastsection.innerHTML = forecastHtml;
}

//
//
// City search Buttons

function cityInfo(cityInformation) {
  document.querySelector("#main-city").innerHTML = cityInformation.data.city;
  document.querySelector("#weather-now").innerHTML =
    cityInformation.data.condition.description;
  document.querySelector("#feels").innerHTML = Math.round(
    cityInformation.data.temperature.feels_like
  );
  document.querySelector("#humid").innerHTML =
    cityInformation.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    cityInformation.data.wind.speed
  );
  celsiusTemperature = cityInformation.data.temperature.current;
  document.querySelector("#today-temperature").innerHTML =
    Math.round(celsiusTemperature);
  updateTimeApi(cityInformation.data.city);
  changeIcon(cityInformation.data.condition.icon);
  getForecastData(cityInformation.data.city);
}

//
//
//update city

function getInputCity(city) {
  let apikey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let units = "metric"; // or let units = "metric"
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;

  axios.get(url).then(cityInfo);
}

function getCurrentCity(currentCity) {
  let lat = currentCity.coords.latitude;
  let lon = currentCity.coords.longitude;
  let apikey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let units = "metric"; // or let units = "metric"
  let latlonUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikey}&units=${units}`;
  axios.get(latlonUrl).then(cityInfo);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getInputCity(city);
}
function currentSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCity);
}

document.querySelector("#search-form").addEventListener("submit", citySubmit);
document
  .querySelector("#current-search-button")
  .addEventListener("click", currentSubmit);

getInputCity("Sydney");

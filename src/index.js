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
      <div class="col-5 iconDiv"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[0].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[0].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[0].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[0].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-5"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[1].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[1].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[1].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[1].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-5"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[2].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[2].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[2].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[2].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-5"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[3].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[3].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[3].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[3].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-5"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[4].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[4].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[4].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[4].temperature.minimum
    )}  </div>  </div> </li> ` +
    `  <li> <div class="row">
      <div class="col-5"><span class="material-symbols-outlined forecastIcon">${getHTMLIcon(
        forecastarray[5].condition.icon
      )}</span></div>
      <div class="col-7">
         ${forecastDays(forecastarray[5].time)}
        <br /><strong>
        ${Math.round(
          forecastarray[5].temperature.maximum
        )}</strong> | ${Math.round(
      forecastarray[5].temperature.minimum
    )}  </div>  </div> </li> `;

  forecastsection.innerHTML = forecastHtml;
}
//
//
//
// change Tips

function changeTips(condition) {
  let conditionName = condition.icon;
  let tipbox = document.querySelector("#tip-box");
  if (conditionName === "clear-sky-day") {
   tipbox.innerHTML = "Enjoy the sunny day! <bt /> don't forget the sunscreen";
  }
  if (conditionName === "clear-sky-night") {
    tipbox.innerHTML =
      "Admire the starry night!<br /> Enjoy stargazing and a warm cup of cocoa";
  }
  if (conditionName === "few-clouds-day") {
    tipbox.innerHTML =
      "Bring a light jacket. <br /> Few clouds won't spoil your outdoor plans, but keep an eye on the sky";
  }
  if (conditionName === "few-clouds-night") {
    tipbox.innerHTML = "Look at the stars through the clouds!";
  }
  if (conditionName === "scattered-clouds-day") {
    tipbox.innerHTML =
      "Patchy clouds might bring a nice breeze! <br /> A mix of sun and shade";
  }
  if (conditionName === " scattered-clouds-night") {
    tipbox.innerHTML = "Stargazing might be possible tonight!";
  }
  if (conditionName === "broken-clouds-day") {
    tipbox.innerHTML =
      "Cloudy but not gloomy! <br /> Enjoy some fresh air.";
  }
  if (conditionName === "broken-clouds-night") {
    tipbox.innerHTML = "Partly cloudy night for stargazing... <br /> ... or a comfy movienight!";
  }
  if (conditionName === "shower-rain-day") {
    tipbox.innerHTML = "Don't forget your umbrella!";
  }
  if (conditionName === "shower-rain-night") {
    tipbox.innerHTML = "Better stay indoors and cozy!";
  }
  if (conditionName === "rain-day") {
    tipbox.innerHTML = "Time to wear your raincoat!";
  }
  if (conditionName === "rain-night") {
    tipbox.innerHTML =
      "Snuggle up indoors with a good book!";
  }
  if (conditionName === "thunderstorm-day") {
    tipbox.innerHTML =
      "Be cautious during thunderstorms, stay safe indoors... <br /> and outdoors stay away from tall objects!";
  }
  if (conditionName === "thunderstorm-night") {
    tipbox.innerHTML = "Enjoy the thrilling lightning show!";
  }
  if (conditionName === "snow-day") {
    tipbox.innerHTML = "Bundle up, it's snowy outside!";
  }
  if (conditionName === "snow-night") {
    tipbox.innerHTML =
      "Cozy up at home and enjoy the winter wonderland!";
  }
  if (conditionName === "mist-day") {
    tipbox.innerHTML = "Be careful where you walk!<br /> Drive carefully!";
  }
  if (conditionName === "mist-night") {
    tipbox.innerHTML = "Enjoy the mysterious misty night";
  }
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
  changeTips(cityInformation.data.condition);
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

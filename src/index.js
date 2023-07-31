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
  let name = iconName;
  let nameboth = name.substring(0, 2);
  if (name === "clear-sky-day") {
    document.querySelector("#iconT").innerHTML = "wb_sunny";
  }
  if (name === "clear-sky-night") {
    document.querySelector("#iconT").innerHTML = " nightlight";
  }
  if (name === "few-clouds-day") {
    document.querySelector("#iconT").innerHTML = "partly_cloudy_day";
  }

  if (name === "few-clouds-night") {
    document.querySelector("#iconT").innerHTML = "partly_cloudy_night";
  }

  if (nameboth === "sca") {
    document.querySelector("#iconT").innerHTML = "cloud";
  }

  if (name === "bro") {
    document.querySelector("#iconT").innerHTML = " filter_drama";
  }

  if (name === "sho") {
    document.querySelector("#iconT").innerHTML = "rainy";
  }

  if (name === "rai") {
    document.querySelector("#iconT").innerHTML = "cloudy_snowing ";
  }

  if (name === "thu") {
    document.querySelector("#iconT").innerHTML = " thunderstorm";
  }

  if (name === "sno") {
    document.querySelector("#iconT").innerHTML = "weather_snowy ";
  }

  if (name === "mis") {
    document.querySelector("#iconT").innerHTML = "foggy";
  }
  changeIconColor(iconName);
}
//
// above
//
//
//

//
//all
//
//
///
//done#
//
//
//
//change icon

//
//
//
//update forecast

function getForecastData(city) {
  let apiKey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function forecastDays() {
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
  let day1 = days[now.getDay() + 1];
  let day2 = days[now.getDay() + 2];
  let day3 = days[now.getDay() + 3];
  let day4 = days[now.getDay() + 4];
  let day5 = days[now.getDay() + 5];
  let day6 = days[now.getDay() + 6];

  return [day1, day2, day3, day4, day5, day6];
}

function displayForecast(apiInfo) {
  let forecastarray = apiInfo.data.daily;
  let forecastsection = document.querySelector("#forecast");

  let forecastHtml = "";

  forecastarray.forEach(function (info) {
    forecastHtml =
      forecastHtml +
      `  <li>
    <div class="row">
      <div class="col-6">${info.condition.icon}</div>
      <div class="col-6">
        {day} ${forecastDays()}
        <br />
        ${Math.round(info.temperature.maximum)} | ${Math.round(
        info.temperature.minimum
      )}
      </div>
    </div>
  </li>
    `;

    forecastsection.innerHTML = forecastHtml;
  });
}

// City search Buttons

function cityInfo(cityInformation) {
  //do

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
  //
  //
  //
  ////TODO
  //
  //
  //
  //
  //;
  //
  //
  //
  //
}

function getInputCity(city) {
  //done
  let apikey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let units = "metric"; // or let units = "metric"
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;

  axios.get(url).then(cityInfo);
} //done

function getCurrentCity(currentCity) {
  //done
  let lat = currentCity.coords.latitude;
  let lon = currentCity.coords.longitude;
  let apikey = "5101b1tb3fba4e5cedfo0b346a6ccc32";
  let units = "metric"; // or let units = "metric"
  let latlonUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikey}&units=${units}`;
  axios.get(latlonUrl).then(cityInfo); //done
}

function citySubmit(event) {
  //done
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getInputCity(city); //done
}
function currentSubmit(event) {
  //done
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCity);
} //done
// change temperature

function changetoFahrenheit(event) {
  //done
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
  document.querySelector("#celsius").classList.add("notactive");
  document.querySelector("#fahrenheit").classList.remove("notactive");
} //done

function changetoCelsius(event) {
  //done
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#fahrenheit").classList.add("notactive");
  document.querySelector("#celsius").classList.remove("notactive");
} //done

//

let celsiusTemperature = null;
document
  .querySelector("#fahrenheit")
  .addEventListener("click", changetoFahrenheit); //done
document.querySelector("#celsius").addEventListener("click", changetoCelsius); //done
document.querySelector("#search-form").addEventListener("submit", citySubmit); //done
document
  .querySelector("#current-search-button")
  .addEventListener("click", currentSubmit); //done

getInputCity("Sydney");

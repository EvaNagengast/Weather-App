//
//
// current time
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

function updateTime(cityTimeShift) {
  let now = new Date();

  if (cityTimeShift !== undefined) {
    let timeshiftInMilliseconds = cityTimeShift * 1000;
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
//change icon

function changeIcon(iconName) {
  if (iconName === "01d") {
    document.querySelector(".icon").innerHTML = "wb_sunny";
  }
  if (iconName === "02d") {
    document.querySelector(".icon").innerHTML = "partly_cloudy_day";
  }

  if (iconName === "03d") {
    document.querySelector(".icon").innerHTML = "cloud";
  }

  if (iconName === "04d") {
    document.querySelector(".icon").innerHTML = "filter_drama";
  }

  if (iconName === "09d") {
    document.querySelector(".icon").innerHTML = " rainy_light";
  }

  if (iconName === "10d") {
    document.querySelector(".icon").innerHTML = "rainy";
  }

  if (iconName === "11d") {
    document.querySelector(".icon").innerHTML = "thunderstorm";
  }

  if (iconName === "13d") {
    document.querySelector(".icon").innerHTML = " cloudy_snowing";
  }

  if (iconName === "50d") {
    document.querySelector(".icon").innerHTML = "foggy";
  }
}
//
// City search Buttons
//

function cityInfo(cityInformation) {

  document.querySelector("#main-city").innerHTML = cityInformation.data.name;
  document.querySelector("#weather-now").innerHTML =
    cityInformation.data.weather[0].description;
  document.querySelector("#feels").innerHTML = Math.round(
    cityInformation.data.main.feels_like
  );
  document.querySelector("#humid").innerHTML =
    cityInformation.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    cityInformation.data.wind.speed
  );
  document.querySelector("#today-temperature").innerHTML = Math.round(
    cityInformation.data.main.temp
  );
  updateTime(cityInformation.data.timezone);
 
  changeIcon(cityInformation.data.weather[0].icon);
}

function getInputCity(city) {
  let apikey = "a5c55c774ac8198c087358853c4a79a9";
  let units = "metric"; // or let units = "metric"
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apikey}`;
  axios.get(url).then(cityInfo);
}

function getCurrentCity(currentCity) {
  let lat = currentCity.coords.latitude;
  let lon = currentCity.coords.longitude;
  let apikey = "a5c55c774ac8198c087358853c4a79a9";
  let units = "metric"; // or let units = "metric"
  let latlonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apikey}`;
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

getInputCity("London");

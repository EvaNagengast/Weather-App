//
//
//

//
// City search Buttons
//

function cityInfo(cityInformation) {
  console.log(cityInformation.data);
  document.querySelector("#main-city").innerHTML = cityInformation.data.name;
  document.querySelector("#weather-now").innerHTML =
    cityInformation.data.weather[0].description;
  document.querySelector("#feels").innerHTML = Math.round(
    cityInformation.data.main.feels_like
  );
  document.querySelector("#humid").innerHTML =
    cityInformation.data.main.humidity;
  document.querySelector("#wind").innerHTML = cityInformation.data.wind.speed;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    cityInformation.data.main.temp
  );
  //document.querySelector("#main-city").innerHTML = cityInformation.data.name;
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
console.log("🐈‍⬛");
console.log("🐈‍");

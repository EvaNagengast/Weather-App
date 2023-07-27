let apikey = "a5c55c774ac8198c087358853c4a79a9";
let units  = "metric" // or let units = "metric" 
let city = "London"
let lat = 51.477928;
let lon = -0.001545;



let latlonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apikey}`;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apikey}`;
 console.log(url)
 console.log(latlonUrl);

// axios.get(url).then(firstfunction);

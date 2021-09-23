let now = new Date();

function fixHours() {
  let hour = now.getHours();
  if (hour < 10) {
    return `0${hour}`;
  } else {
    return hour;
  }
}
function fixMinutes() {
  let minute = now.getMinutes();
  if (minute < 10) {
    return `0${minute}`;
  } else {
    return minute;
  }
}
let hour = fixHours();
let minutes = fixMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showSearchValue);

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  console.log(temp);
  //let FahrentTemp = Number(temp.innerHTML);
  temp.innerHTML = Math.round(((temp.innerHTML - 32) * 5) / 9);
}
let celsius = document.querySelector("#current-celsius");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let CelsiTemp = Math.round((temp.innerHTML * 9) / 5 + 32);
  temp.innerHTML = CelsiTemp;
}
let fahrenheit = document.querySelector("#current-fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showSearchValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let cityName = document.querySelector("h2");
  cityName.innerHTML = searchInput.value;

  function displayCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;

    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );

    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
  }

  let city = searchInput.value;
  let apiKey = "f06f33fa82e34456842a86cff0b730a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCondition);
}

function searchLocation(position) {
  let apiKey = "f06f33fa82e34456842a86cff0b730a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;

    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );

    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
  }
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

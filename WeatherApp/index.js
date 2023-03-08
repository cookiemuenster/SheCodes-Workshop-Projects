function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}
let citySlicker = document.querySelector("#city-slicker");
citySlicker.addEventListener("submit", city);

//2
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[now.getDay()];
  let display = document.querySelector("h2");
  display.innerHTML = `${day} ${hour}:${minutes}`;
}

//get searched city weather info
function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = response.data.main.temp;
}

//search city info
function search(event) {
  event.preventDefault();
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

//get current location info

function searchLocal(position) {
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocal);
}

let currentLocationButton = document.querySelector("#my-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

//3
function convertF(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#temp");
  tempUnit.innerHTML = 66;
}

function convertC(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#temp");
  tempUnit.innerHTML = 19;
}

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", convertF);
let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", convertC);

let date = document.querySelector("#date");
let current = new Date();
date.innerHTML = formatDate(current);

search();

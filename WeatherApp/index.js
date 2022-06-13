import { get } from "axios";

//2
function formatDate(now) {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = now.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[today];
  return `${day} ${hour}:${minutes}`;
}

//search city info
function search(city) {
  //event.preventDefault();
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
//get searched city weather info
function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = response.data.main.temp;
}

//get current location info

function searchLocal(position) {
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  get(apiUrl).then(displayWeather);
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

let citySlicker = document.querySelector("#city-slicker");
citySlicker.addEventListener("submit", handleSubmit);

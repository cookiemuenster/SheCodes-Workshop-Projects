//formatting the date and time to make it accessible for end users
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
}

formatDate();

//formatting dates for daily forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//displaying forecast
function displayForecast(response) {
  console.log(response.data.list);
  let forecast = response.data.list;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class= "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width = "45" />
            <div class="weather-forecast-temperatures">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.main.temp_max
              )} </span>
              <span class="forecast-temperature-min"> ${Math.round(
                forecastDay.main.temp_min
              )} </span>
           </div>
         </div>
          
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

//function to get the daily forecast data from the open weather api
function getDailyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//get searched city weather info
function displayWeather(response) {
  //console.log(response.data.name); --> Don't need this anymore. Also, not good form to log to the console in the program.
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weatherIcon");

  fahrenheitTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getDailyForecast(response.data.coord);
}

//search function to call weather api for city of choice
function search(city) {
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

//handling user input for city of choice
function handleCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
let citySlicker = document.querySelector("#city-slicker");
citySlicker.addEventListener("submit", handleCitySubmit);

//get weather info for current location
function searchLocal(position) {
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

//get current location by default upon loading app in browser
function defaultLocation() {
  navigator.geolocation.getCurrentPosition(searchLocal);
}

//get current position when "Current" button is clicked
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocal);
}

let currentLocationButton = document.querySelector("#my-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

//setting temperature to fahrenheight by default and allowing user to toggle between fahrenheit and celsius
function tempInF(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#temp");
  fLink.classList.add("set-active");
  cLink.classList.remove("set-active");

  tempUnit.innerHTML = Math.round(fahrenheitTemp);
}

//converting fahrenheight to celsius
function tempInC(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#temp");
  fLink.classList.remove("set-active");
  cLink.classList.add("set-active");
  //subtract 32 and multiply by .5556 (or 5/9)
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  tempUnit.innerHTML = Math.round(celsiusTemp);
}

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", tempInF);
let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", tempInC);

defaultLocation();
search();
//displayForecast();

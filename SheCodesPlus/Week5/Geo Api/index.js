function showME(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
  let apiUrl = `http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let temp = response.data.main.temp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temp}`;
}

navigator.geolocation.getCurrentPosition(showME);

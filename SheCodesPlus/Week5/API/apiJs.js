let apiKey = "3cd9127280fccb0f6f49ef4edbb978bb";
let city = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function showTemp(response) {
  console.log(response.data.main.temp);
  let temp = (response.data.main.temp);
  let h1 = document.querySelector('h1');
  h1.innerHTML = `It is ${temp} in ${city}.`;
}
axios.get(`${apiUrl}`).then(showTemp);
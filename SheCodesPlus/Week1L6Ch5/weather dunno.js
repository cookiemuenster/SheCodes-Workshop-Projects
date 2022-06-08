let weather = {
    "paris": {
      temp: 19.7,
      humidity: 80
    },
    "tokyo": {
      temp: 17.3,
      humidity: 50
    },
    "lisbon": {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    "moscow": {
      temp: -5,
      humidity: 20
    }
  };
  
  // write your code here
  
  let city = prompt('Enter a city.')
  if (city === 'Paris' | city === 'paris') {
    alert(weather['paris']);
  } else {
  if (city === 'Tokyo' | citty === 'tokyo') {
    alert(weather['tokyo']);
  } else {
  if (city === 'Lisbon' | city === 'lisbon') {
    alert(weather['lisbon']);
  } else {
  if (city === 'San Fransisco' | city === 'san fransisco') {
    alert(weather['san fransisco']);
  } else {
  if (city === 'Moscow' | city === 'moscow') {
    alert(weather['moscow']);
  } else {
    alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney");}
  } 
} 
} 
}
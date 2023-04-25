var textAreaEl = document.querySelector('input');
var saveBtn = document.querySelector('button');
var currentDay = document.getElementById('current-day');
var currentIconEl = document.getElementById('current-icon');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
localStorage.removeItem("cityName");

// displays current date of the city the user searched
function displayTime() {
  var cityName = getFromLocal();
  
  // capitalizes the first letter in the city name
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  var rightNow = dayjs().format('(MM/DD/YYYY)');

  currentDay.textContent = cityName + ' ' + rightNow;
}

//sets the userInput into the local storage
function setLocalStorage(event) {
  event.preventDefault();
  userInput = textAreaEl.value;
  
  // sets the city name in local storage
  window.localStorage.setItem('cityName', userInput);
  
  // calls the getFromLocal func to get the cityName
  var cityName = getFromLocal();

  // passes cityName as argument to getWeatherInfo func
  todayWeatherInfo(cityName)
  currentTemp.innerHTML = 'Temp:';
  currentWind.innerHTML = 'Wind:';
  currentHumidity.innerHTML = 'Humidity:';

  // allows the displayTime function to only be called when user hits the search button
  displayTime();
}

// retrieves the data stored into the local storage
function getFromLocal() {
  
  var cityName = window.localStorage.getItem('cityName');
  
  // checks to see if there is a cityName in the local storage if not it returns and empty string
  if (!cityName) {
    cityName = "";
  } return cityName;
}

// gets current days info
function todayWeatherInfo() {
  var cityName = textAreaEl.value;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d36ac030ab884f835f45f7845b925646&units=imperial`;
  
  fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var currentIcon = data.weather[0].icon;
    var currentPic = currentIconEl.src = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    currentTemp.innerHTML += ' ' + data.main.temp + '°F';
    currentWind.innerHTML += ' ' + data.wind.speed + ' MPH';
    currentHumidity.innerHTML += ' ' + data.main.humidity + '%';
    getFiveDay(cityName)
  })
}

// gets the 5-day forecast
function getFiveDay(cityName) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d36ac030ab884f835f45f7845b925646&units=imperial`;

  fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var fiveDayForecast = [];
    // loops through in intervals of 8 since it is in every 3 hours 8x3=24
    for (var i = 0; i < data.list.length; i += 8) {
      fiveDayForecast.push(data.list[i]);
    }
    // gets the date for that day
    var day1DateEl = document.getElementById('day1')
    var day1Date = fiveDayForecast[0].dt_txt.slice(0, 10)
    day1Date = dayjs().format('MM/DD/YYYY');
    day1DateEl.textContent = day1Date;
    var day1IconEl = document.getElementById('day1-icon');
    var day1TempEl = document.getElementById('day1-temp');
    var day1WindEl = document.getElementById('day1-wind');
    var day1HumidityEl = document.getElementById('day1-humidity');
    // gets the icon for weather condition that day
    var day1Icon = fiveDayForecast[0].weather[0].icon
    day1IconEl.src = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`
    // displays the info
    day1TempEl.innerHTML += ' ' + fiveDayForecast[0].main.temp + '°F';
    day1WindEl.innerHTML += ' ' + fiveDayForecast[0].wind.speed + ' MPH';
    day1HumidityEl.innerHTML += ' ' + fiveDayForecast[0].main.humidity + '%';
  
    // day 2 info
    var day2DateEl = document.getElementById('day2')
    var day2Date = fiveDayForecast[1].dt_txt.slice(0, 10)
    day2Date = dayjs(day2Date).format('MM/DD/YYYY');
    day2DateEl.textContent = day2Date;
    var day2IconEl = document.getElementById('day2-icon');
    var day2TempEl = document.getElementById('day2-temp');
    var day2WindEl = document.getElementById('day2-wind');
    var day2HumidityEl = document.getElementById('day2-humidity');
    var day2Icon = fiveDayForecast[1].weather[0].icon
    day2IconEl.src = `https://openweathermap.org/img/wn/${day2Icon}@2x.png`
    day2TempEl.innerHTML += ' ' + fiveDayForecast[1].main.temp + '°F';
    day2WindEl.innerHTML += ' ' + fiveDayForecast[1].wind.speed + ' MPH';
    day2HumidityEl.innerHTML += ' ' + fiveDayForecast[1].main.humidity + '%';

    // day 3 info
    var day3DateEl = document.getElementById('day3')
    var day3Date = fiveDayForecast[2].dt_txt.slice(0, 10);
    day3Date = dayjs(day3Date).format('MM/DD/YYYY');
    day3DateEl.textContent = day3Date;
    var day3IconEl = document.getElementById('day3-icon');
    var day3TempEl = document.getElementById('day3-temp');
    var day3WindEl = document.getElementById('day3-wind');
    var day3HumidityEl = document.getElementById('day3-humidity');
    var day3Icon = fiveDayForecast[2].weather[0].icon
    day3IconEl.src = `https://openweathermap.org/img/wn/${day3Icon}@2x.png`
    day3TempEl.innerHTML += ' ' + fiveDayForecast[2].main.temp + '°F';
    day3WindEl.innerHTML += ' ' + fiveDayForecast[2].wind.speed + ' MPH';
    day3HumidityEl.innerHTML += ' ' + fiveDayForecast[2].main.humidity + '%';

    // day 4 info
    var day4DateEl = document.getElementById('day4')
    var day4Date = fiveDayForecast[3].dt_txt.slice(0, 10);
    day4Date = dayjs(day4Date).format('MM/DD/YYYY');
    day4DateEl.textContent = day4Date;
    var day4TempEl = document.getElementById('day4-temp');
    var day4WindEl = document.getElementById('day4-wind');
    var day4HumidityEl = document.getElementById('day4-humidity');
    var day4IconEl = document.getElementById('day4-icon');
    var day4Icon = fiveDayForecast[3].weather[0].icon
    day4IconEl.src = `https://openweathermap.org/img/wn/${day4Icon}@2x.png`
    day4TempEl.innerHTML += ' ' + fiveDayForecast[3].main.temp + '°F';
    day4WindEl.innerHTML += ' ' + fiveDayForecast[3].wind.speed + ' MPH';
    day4HumidityEl.innerHTML += ' ' + fiveDayForecast[3].main.humidity + '%';

    // day 2 info
    var day5DateEl = document.getElementById('day5')
    var day5Date = fiveDayForecast[4].dt_txt.slice(0, 10);
    day5Date = dayjs(day5Date).format('MM/DD/YYYY');
    day5DateEl.textContent = day5Date;
    var day5IconEl = document.getElementById('day5-icon');
    var day5TempEl = document.getElementById('day5-temp');
    var day5WindEl = document.getElementById('day5-wind');
    var day5HumidityEl = document.getElementById('day5-humidity');
    var day5Icon = fiveDayForecast[4].weather[0].icon
    day5IconEl.src = `https://openweathermap.org/img/wn/${day5Icon}@2x.png`
    day5TempEl.innerHTML += ' ' + fiveDayForecast[4].main.temp + '°F';
    day5WindEl.innerHTML += ' ' + fiveDayForecast[4].wind.speed + ' MPH';
    day5HumidityEl.innerHTML += ' ' + fiveDayForecast[4].main.humidity + '%';
  })
}




// calls the displayTime func
displayTime();

// adds and event listener to the search button
saveBtn.addEventListener ('click', setLocalStorage);

// calls the getFromLocal func
getFromLocal();
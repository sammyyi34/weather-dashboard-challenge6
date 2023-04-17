var textAreaEl = document.querySelector('input');
var saveBtn = document.querySelector('button');
var currentDayEl = document.getElementById('current-day')

// displays current date of the city the user searched
function displayTime() {
  var cityName = getFromLocal();
  
  // capitalizes the first letter in the city name
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  var rightNow = dayjs().format('(MM/DD/YYYY)');

  if (cityName) {
    currentDayEl.textContent = cityName + ' ' + rightNow;
  } else {
    currentDayEl.textContent = "";   // <---- if there is not city name in local storage then now text is displayed
  }
}

// retrieves the data stored into the local storage
function getFromLocal() {
  
  var cityName = window.localStorage.getItem('cityName');
  
  // checks to see if there is a cityName in the local storage if not it returns and empty string
  if (!cityName) {
    cityName = "";
  }
    return cityName;
}

function todayWeatherInfo(cityName) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d36ac030ab884f835f45f7845b925646`;
  
  fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
  })
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

  // allows the displayTime function to only be called when user hits the search button
  displayTime();
}

// calls the displayTime func
displayTime();

// adds and event listener to the search button
saveBtn.addEventListener ('click', setLocalStorage);

// calls the getFromLocal func
getFromLocal();
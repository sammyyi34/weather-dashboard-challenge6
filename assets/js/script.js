var textAreaEl = document.querySelector('input');
var saveBtn = document.querySelector('button');

//sets the userInput into the local storage
function setLocalStorage(event) {
  // prevent page from refreshing because of button
  event.preventDefault();
  userInput = textAreaEl.value;
  // sets an object
  window.localStorage.setItem('cityName', userInput);
}

function getFromLocal(event) {
  event.preventDefault()
  var cityNames = window.localStorage.getItem('cityName');
  console.log(cityNames);

}





saveBtn.addEventListener ('click', setLocalStorage);
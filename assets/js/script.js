var textAreaEl = document.querySelector('input');
var saveBtn = document.querySelector('button');

function setLocalStorage() {
  userInput = textAreaEl.value;
  window.localStorage.setItem('cityName', JSON.stringify(userInput));
}

function getFromLocal



saveBtn.addEventListener ('click', setLocalStorage);
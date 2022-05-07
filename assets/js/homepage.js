var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var citySearchTerm = document.querySelector("#city-search-term");
var currentDate = moment();

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserCity(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
    // console.log(event);
};

var getUserCity = function (user) {
  // format the api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayUserCity(data, user);
      console.log(data);
    });
  });
};

var displayUserCity = function (city, searchTerm) {
  // clear old content
//   cityContainerEl.textContent = "";
  citySearchTerm.textContent = searchTerm;

};



userFormEl.addEventListener("submit", formSubmitHandler);

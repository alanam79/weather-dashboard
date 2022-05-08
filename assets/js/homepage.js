var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#username");
var cityContainerEl = document.querySelector("#repos-container");
var citySearchTerm = document.querySelector("#repo-search-term");
var recentSearches = JSON.parse(localStorage.getItem("recents") || "[]");

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = nameInputEl.value.trim();

  if (city) {
    getWeather(city);

    // clear old content
    cityContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var buttonClickHandler = function (event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedcitys(language);

    // clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
  }
};

var getWeather = function (cityLat, cityLon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityLat +
    "&lon=" +
    cityLon +
    "&units=imperial&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCity(data, cityLat, cityLon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to find City");
    });
};

// function setLocalStorage(city) {
//   if (recentSearches.indexOf(city) === -1) {
//     recentSearches.push(city);
//     localStorage.setItem("recents", JSON.stringify(recentSearches));
//   }
// }

var getFeaturedcitys = function (language) {
  // format the github api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayCity(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displayCity = function (data) {
  console.log(data);

  var currentWeather = {
    description: data.weather[0].description,
    main: data.main,
    wind: data.wind,
    clouds: data.clouds,
    coord: data.coord
  };
  console.log(currentWeather);
  weatherData.textContent = data.weather[0].description;

  // create a space for each city
  var cityEl = document.createElement("div");
  cityContainerEl.classList = "list-item flex-row justify-space-between align-center";

  // create a h2 element to hold city name
  var titleEl = document.createElement("h2");
  titleEl.classList = "list-item flex-row justify-space-between align-center";

  // append to container
  cityContainerEl.appendChild(titleEl);

  // create a h2 element
  var statusEl = document.createElement("h2");
  statusEl.classList = "flex-row align-center";

  // append to container
  cityEl.appendChild(statusEl);

  // append container to the dom
  cityContainerEl.appendChild(cityEl);
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#username");
var cityContainerEl = document.querySelector("#repos-container");
var citySearchTerm = document.querySelector("#repo-search-term");
var recentSearches = JSON.parse(localStorage.getItem("recents") || "[]");

var formSubmitHandler = function(event) {
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

var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedcitys(language);

    // clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
  }
};

var getWeather = function(city) {
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&units=imperial&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displaycitys(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to find City");
    });
};

function setLocalStorage(city) {
  if (recentSearches.indexOf(city) === -1) {
    recentSearches.push(city);
    localStorage.setItem("recents", JSON.stringify(recentSearches));
  }
}

var getFeaturedcitys = function(language) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displaycitys(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displaycitys = function(city, searchTerm) {
  // check if api returned any city
  if (city.length === 0) {
    cityContainerEl.textContent = "No City found.";
    // location.reload(); - refreshes page
    return;
  }

  citySearchTerm.textContent = searchTerm;

  // // loop over city
  // for (var i = 0; i < city.length; i++) {
  //   // format city name
  //   var cityName = city[i].owner.login + "/" + city[i].name;

    // create a space for each city
    var cityEl = document.createElement("div");
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    // cityEl.setAttribute("href", "./single-city.html?city=" + cityName);

    // create a h2 element to hold city name
    var titleEl = document.createElement("h2");
    titleEl.textContent = cityName;

    // append to container
    cityEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("h2");
    statusEl.classList = "flex-row align-center";

  //   // check if current city has issues or not
  //   if (city[i].open_issues_count > 0) {
  //     statusEl.innerHTML =
  //       "<i class='fas fa-times status-icon icon-danger'></i>" + city[i].open_issues_count + " issue(s)";
  //   } else {
  //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
  //   }

    // append to container
    cityEl.appendChild(statusEl);

    // append container to the dom
    cityContainerEl.appendChild(cityEl);
  };



// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

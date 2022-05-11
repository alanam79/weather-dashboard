var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var cityName = document.querySelector("#repo-search-term");
var cityDateIcon = document.querySelector("c#ity-date-icon");
var weatherData = document.querySelector("#city-weather");
var currentWeather = document.getElementById("current-weather");
var fiveDayWeather = document.getElementById("fiveDayWeather");
var currentDate = moment();
// var languageButtonsEl = document.querySelector("#language-buttons");
// var recentSearches = JSON.parse(localStorage.getItem("recents") || "[]");

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var city = nameInputEl.value.trim();

  if (city) {
    getCurrentWeather(city);
    // renderRecents();
    // clear old content
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

// var buttonClickHandler = function (event) {
//   // get the language attribute from the clicked element
//   var language = event.target.getAttribute("data-language");

//   if (language) {
//     getFeatureditys(language);

//     // clear old content
//     cityName.textContent = "";
//     cityName.textContent = cityName;
//   }
// };

var getCurrentWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        console.log("data from api", data);
        //  displayCity(data, city);

        let cityName = data.name + currentDate.format(" (M/DD/YYYY) ");
          // console.log(currentDate); checking current date is being pulled
        let weather = document.createElement("img");
        // console.log(weatherCondition);
        weather.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        let temp = (document.createElement("p").textContent =
          "Temperature: " + data.main.temp + "°F");
        let humidity = (document.createElement("p").textContent =
          "Humidity: " + data.main.humidity + "%");
        let wind = (document.createElement("p").textContent =
          "Wind Speed: " + data.wind.speed + "MPH");

        currentWeather.append(weather, temp, humidity, wind);

        weatherData.append(cityName);

        let coords = {
          lat: data.coord.lat,
          lon: data.coord.lon,
        };

        getFiveDay(coords);
      });
    } else {
      alert("Please enter a City");
    }
  });
};

function getFiveDay({ lat, lon }) {
  let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly,alerts&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc&units=imperial`;

  fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log("fiveDay data", data)

      let uvIndex = (document.createElement("p").textContent =
        "UV Index: " + data.daily[0].uvi);
      currentWeather.append(uvIndex);

      for (var i = 1; i < 6; i++) {
        console.log(data.daily[i]);

        // put the date in the cardTitle...put the cardTitle in the cardHeader...put the cardHeader in the card

        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let cardTitle = document.createElement("h3");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = currentDate.format(" (M/DD/YYYY) ");
        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let weather = document.createElement("img");
        weather.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
        let temp = document.createElement("h4");
        temp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        let humidity = document.createElement("h4");
        humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
        let wind = document.createElement("h4");
        wind.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";

        cardHeader.append(cardTitle);
        cardBody.append(weather, temp, humidity, wind);
        card.append(cardHeader, cardBody);

        fiveDayWeather.append(card);
      }
    })
    .catch((err) => console.error(err));
}

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
// languageButtonsEl.addEventListener("click", buttonClickHandler);

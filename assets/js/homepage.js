var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var cityName = document.querySelector("#repo-search-term");
var cityDateIcon = document.querySelector("c#ity-date-icon");
var weatherData = document.querySelector("#city-weather");
var currentWeather = document.getElementById("current-weather");
var fiveDayWeather = document.getElementById("fiveDayWeather");
var getSearchHistoryEl = document.getElementById("searchHistory");
var currentDate = moment();

var formSubmitHandler = function (event) {
      // prevent page from refreshing
  event.preventDefault();
      // get value from input element
  var city = nameInputEl.value.trim();

  let cityName = JSON.parse(localStorage.getItem("cityName")) || [];

  const newCity = {
    cityInfo: city
  };

  console.log("newCityName entered", newCity);

  cityName.push(newCity);
  console.log("city entered", cityName);
  localStorage.setItem("city", JSON.stringify(newCity));

  if (city) {
    getCurrentWeather(city);

    // clear old content
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};
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
        console.log(cityName);
        let weather = document.createElement("img");
        weather.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png"
        );

        let temp = document.createElement("p");
        temp.innerText = "Temperature: " + data.main.temp + "°F";
        let humidity = document.createElement("p");
        humidity.innerText = "Humidity: " + data.main.humidity + "%";
        let wind = document.createElement("p");
        wind.innerText = "Wind Speed: " + data.wind.speed + "MPH";

        currentWeather.append(cityName);
        currentWeather.append(weather);
        currentWeather.append(temp);
        currentWeather.append(humidity);
        currentWeather.append(wind);

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
      console.log("fiveDay data", data);

      let uvIndex = document.createElement("p");
      uvIndex.innerText = "UV Index: " + data.daily[0].uvi;
      currentWeather.append(uvIndex);
      // console.log(uvIndex);

      if (data.daily[0].uvi >= 8) {
        uvIndex.classList.add("badge", "badge-danger");
      }
      if (data.daily[0].uvi >= 6 && data.daily[0].uvi < 8) {
        uvIndex.classList.add("badge", "badge-warning");
      }
      if (data.daily[0].uvi < 6 && data.daily[0].uvi >= 3) {
        uvIndex.classList.add("badge", "badge-success");
      }
      if (data.daily[0].uvi < 3) {
        uvIndex.classList.add("badge", "badge-info");
      }

      for (var i = 1; i < 6; i++) {
        console.log(data.daily[i]);

        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let cardTitle = document.createElement("p");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = new Date(data.daily[i].dt * 1000);
        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let weather = document.createElement("img");
        weather.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            "@2x.png"
        );
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
// getSearchHistoryEl.addEventListener("submit", citySearchHistory);

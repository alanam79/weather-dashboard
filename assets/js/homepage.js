var userFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = nameInputEl.value.trim();

  if (city) {
    getWeather(city);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
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
          displayRepos(data, city);
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

var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No City found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);

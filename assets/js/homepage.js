var getUserRepos = function (user) {
  // format the api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=dbbe680cb39d3e2a4fbbb13d470ca5cc"

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos();

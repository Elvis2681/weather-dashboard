var resultBox = document.querySelector("#container");
var form = document.querySelector("#form");
var searchText = document.querySelector("#search") ;
var buttonList = document.querySelector("#buttons")
var searchBox = [];

form.addEventListener("submit", function(event){
    event.preventDefault()
    console.log(searchText.value)
   searchBox.push(searchText.value)
   printButton()
   console.log(searchBox)
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchText.value+'&units=imperial&appid=b010d4b216a7d1d395f1b36d3c5dca47'
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   
    printResults(data)
  });
  
})

var printResults = function(results){
resultBox.innerHTML= ""

var cityName = document.createElement ("h3");
cityName.textContent = results.name;

var cityTime = document.createElement ("p");
cityTime.textContent = (moment.unix(results.dt).format("MMM DD YYYY"));

var cityHumidity =document.createElement("p");
cityHumidity.textContent ="Humidity " + results.main.humidity + " %";

var cityTemp = document.createElement("p");
cityTemp.textContent="Temperature: " + results.main.temp + " °F";

var windVelocity = document.createElement("p");
windVelocity.textContent="Wind Speed: " + results.wind.speed + " MPH";

var cityMainWeatherElIcon = document.createElement("img")
    cityMainWeatherElIcon.src = "http://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png";
    cityMainWeatherElIcon.width, cityMainWeatherElIcon.height = "45";

resultBox.appendChild(cityName);
resultBox.appendChild(cityTime);
resultBox.appendChild(cityMainWeatherElIcon);
resultBox.appendChild(cityHumidity);
resultBox.appendChild(cityTemp);
resultBox.appendChild(windVelocity);
pinPoint5(results.coord.lat, results.coord.lon)
}
 
function printButton() {
    buttonList.innerHTML="";
    for (var i=0; i<searchBox.length; i++){
    var button = document.createElement("button")
    button.textContent= searchBox[i]
    buttonList.appendChild(button)
    }
}

function pinPoint5 (citylat, citylon) {
    var fiveAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + citylat + "&lon="
        + citylon + "&units=imperial&appid=b010d4b216a7d1d395f1b36d3c5dca47"
    fetch(fiveAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data); 

          printForecastUV (data)
        });
}

function printForecastUV (resultsII){
    cFive.innerHTML=""
    console.log(resultsII.daily[0].uvi)
var uvFive = document.createElement ("span")
uvFive.textContent = "UV Index: " + resultsII.daily[0].uvi;
    if (resultsII.daily[0].uvi < 2) {
        uvFive.setAttribute("class", "uvlow");
    } else if (resultsII.daily[0].uvi < 5) {
        uvFive.setAttribute("class", "uvmed");
    } else if (resultsII.daily[0].uvi < 7) {
        uvFive.setAttribute("class", "uvhigh");
    } else if (resultsII.daily[0].uvi < 10) {
        uvFive.setAttribute("class", "uvveryhigh");
    } else {
        uvFive.setAttribute("class", "uvtoohigh");
    }

    for (var i=0; i< 5; i++){
var fiveName = document.createElement ("h3");
fiveName.textContent= (moment.unix(resultsII.daily[i].dt).format("MMM DD YYYY"));
var weatherFiveLi = document.createElement("img")
    weatherFiveLi.src = "http://openweathermap.org/img/wn/" + resultsII.daily[i].weather[0].icon + "@2x.png";
    weatherFiveLi.width, weatherFiveLi.height = "45";

    var fivetemp = document.createElement("p")
    fivetemp.textContent = "Day Temperature: " +resultsII.daily[i].temp.day + " °F";
    var fiveHumidity = document.createElement("p")
    fiveHumidity.textContent = "Humidity: " +resultsII.daily[i].humidity + " %";

    var fiveWind = document.createElement("p")
    fiveWind.textContent = "Wind Speed: " +resultsII.daily[i].wind_speed + " MPH"

cFive.appendChild(fiveName)
cFive.appendChild(weatherFiveLi)
cFive.appendChild(fivetemp)
cFive.appendChild(fiveHumidity)
cFive.appendChild(fiveWind)

resultBox.appendChild(uvFive)
    }
}

function storeSearch(input) {
    localStorage.setItem("weather locations", JSON.stringify(input));
};





    





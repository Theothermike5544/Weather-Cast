//Look Data
var lookCity = $('#look-city');
var lookCityBtn = $('#look-city-btn');
var lookHistoryList = $('#look-history');
var removeHistoryBtn = $('#remove-history-btn');

//Weather Now
var nowWeatherContent = $('#now-weather-content');
var nowCity = $('#now-city');
var nowTemp = $('#now-temp');
var nowHumidity = $('#now-humidity');
var nowWindSpeed = $('#now-wind-speed');
var nowWeatherIcon = $('#icon')
var uvIndex = $('#uv-index');

var fiveDayForecast = $('#five-day-forecast');

// My API Key
var myAPI = "c15a1b87fa8e1cdb0179096355dade55";

//Document 
$(document).ready(function () {

    // Find date and display
var nowDate = moment().format('L');
$("#now-date").text("(" + nowDate + ")");

function nowWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myAPI + "&units=imperial"

    fetch(url)
     .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
          return response.json();
     })
     .then(function (data){
        console.log(data);
        fiveDayForecast(data.coord.lat, data.coord.lon);
        nowCity.text(data.name);
        nowTemp.text(data.main.temp);
        nowHumidity.text(data.main.humidity + "%");
        nowWindSpeed.text(data.wind.speed + "mph");
        nowWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
     })
}

function fiveDayForecast(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myAPI

    fetch(url)

    .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
          return response.json();
     })
     .then(function (data){
         console.log(data);
     })
}

lookCityBtn.on('click', function () {
    var input = lookCity.val()
    console.log(input); 
    nowWeather(input);
})

}); 
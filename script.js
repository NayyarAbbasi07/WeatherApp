$(document).ready(function() {
  $("#form-sub").submit(function(event) { 
      performSearch(event); 
  });
});

function performSearch(event) {
  var request;
  event.preventDefault();
  $("#city-name").text("Searching ...");
  $("#city-temp").text("");
  $("#weather-icon").attr('src', "");
  $("#city-weather").text("");

  // Send the request
  request = $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      type: "GET",
      data: { 
          q: $("#city").val(), 
          appid: 'f2fa06f2d855161f896e058e8edd199f',
          units: 'metric'
      }
  });

  // Callback handler for success
  request.done(function (response){
      formatSearchResults(response);
  });
  
  // Callback handler for failure
  request.fail(function (){
      $("#city-name").text("Please try again, incorrect input!");
      $("#city-temp").text("");
      $("#weather-icon").attr('src', "");
      $("#city-weather").text("");
  });
}

function formatSearchResults(jsonObject) {
  var city_name = jsonObject.name + ", " + jsonObject.sys.country;
  var city_weather = jsonObject.weather[0].main;
  var city_temp = jsonObject.main.temp;
  var imgurl = 'http://openweathermap.org/img/wn/' + jsonObject.weather[0].icon + '@2x.png';

  $("#city-name").text(city_name);
  $("#city-weather").text(city_weather);
  $("#city-temp").text(city_temp + " Celsius");  
  $("#weather-icon").attr('src', imgurl);
}

function showTime(){
    var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var d = now.getDay();
  var date = now.getDate();
  var month = now.getMonth();
  m = checkTime(m)
  s = checkTime(s)
  h = checkTime(h)
  d = checkDay(d)
  month = checkMonth(month)
  $("#time").text(h + ":" + m + ":" + s  );
  $("#currentdate").text(d + "," + month +  " " + date );
  var t = setTimeout(showTime, 500);
  }
function checkTime(i) {
    if (i < 10) {
      i = "0" + i};
    return i;
}
function checkDay(j){
  switch(j){
    case 0:return "Sunday";
      break;
    case 1:return "Monday";
      break;
    case 2:return "Tuesday";
      break;
    case 3:return "Wednesday";
      break;
    case 4:return "Thursday";
      break;
    case 5:return "Friday";
      break;
    default:return "Tuesday";
  }
}
function checkMonth(x){
  switch(x){
    case 0: return "January";
      break;
    case 1: return "February";
      break;
    case 2: return "March";
      break;
    case 3: return "April";
      break;
    case 4: return "May";
      break;
    case 5: return "June";
      break;
    case 6: return "July";
      break;
    case 7: return "August";
      break;
    case 8: return "September";
      break;
    case 9: return "October";
      break;
    case 10: return "November";
      break;
    case 11: return "December";
      break;
  }
}
$(document).ready(function(){
  showTime();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = "lat=" + position.coords.latitude
      var lon = "&lon=" + position.coords.longitude
      weather(lat,lon)
    })
  }
  else{
    console.log("Your browser does not support geolocation")
  }
  
})

function weather(lat,lon){
  urlString = "https://fcc-weather-api.glitch.me/api/current?" + lat + lon
  $.ajax({
    url: urlString,
    success:function(response){
      $("#city").text(response.name + ",")
      $("#country").text(response.sys.country)
       $("#desc").text(response.weather[0].main)
      var des = response.weather[0].main
      switch (des){
        case 'Clouds':
          $('<i class="fi fi-day-cloudy"></i>').appendTo("#icon");
          break;
        case 'Drizzle':
          $("#icon").append('<i class="fi fi-rain"></i>');
          break;
        case 'Thunderstorm':
          $("#icon").append('<i class="fi fi-lightnings"></i>')
          break;
        case 'Rain':
          $("#icon").append('<i class="fi fi-day-rain"></i>');
          break;
        case 'Clear':
          $("#icon").append('<i class="fi fi-day-sunny"></i>');
          break;
        case 'Snow':
          $("#icon").append('<i class="fi fi-snows"></i>');
          break;
        default:
          $("#icon").text("Not working")  
      }
      $("i").on("mouseover", function(){
        $("i").addClass("fi-spin")
      })
      $("i").on("mouseout", function(){
        $("i").removeClass("fi-spin")
      })
      var temp = Math.round(response.main.temp);
      var degree = "°C"
      $(".result").text( temp + degree )
      
     
      $(".celsius").on( 'click', function(){
        temp  = (response.main.temp)
        var degree = "°C"
        $(".result").text( Math.round(temp) + degree )
        
      })
      $(".fahrenheit").on('click', function(){
        temp = (response.main.temp) * 9 / 5 + 32
        degree = "°F"
        $(".result").text( Math.round(temp) + degree )
      })   
      
    }
  })
}

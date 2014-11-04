$(document).ready(function(){

	// Setup variables for our forecast.io request
	var apiKey     = 'c316f9aaf2693baa4ab5ffb576f659ea';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.6760148';
	var defaultLng = '-73.9785012';

	/*
		1. Request the user's location via their browser
	*/

	// Request the user's latitude/longitude
	if ( Modernizr.geolocation ) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		// Prompt user
	}

	// Recieved a latitude/longitude from the browser
	function success(position) {
		console.log(position);
		getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}

	// Unable to find a latitude/longitude
	function error(error) {
		console.log(error);
		getWeatherWithPos(defaultLat,defaultLng);
	}

	/*
		2. Request weather data for a location
	*/

	// Request weather from forecast.io with a latitude/longitude
	function getWeatherWithPos(lat,lng) {
		// Construct the url to request
		apiURL += "/" + lat + "," + lng;
		console.log(apiURL);

		// Make a request to forecast.io
		$.ajax({
			url: apiURL,
			type: "GET",
			crossDomain: true,
            dataType: 'jsonp',
			success: function (response) {
				// The request succeeded
				console.log(response);
				parseWeather(response);
				$('#loader').remove();
			},
			error: function (xhr, status) {
				// The request failed
		    	console.log(status);
		    	$('#loader').remove();
		    	showError();
			}
		});
	}


// you need to specify the actual names of the days
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var timestamp =1415042941; // use the "time" property you get back from JSON (i.e. data.currently.time) 


// Create a date object and set the time
var d = new Date();
d.setTime(timestamp*1000);

// Now you can access the day in different formats, and use your array to get the day
var date = d.toUTCString();
var time = d.getHours() + ":" + d.getMinutes();
var day  = days[d.getDay()]; // This will give you the day of the week


//$('#date').text(date);
//$('#time').text(time);
$('#day').text(day).css({
      "font-weight": "bolder",
	  "font-size":"30px",
	  "color":"rgba(0,0,0,0.3)",
	  "text-align":"center",
	  "margin-top":"20px",
    });
 
/*$('#icon1').css({ "width":"350px",
	"margin":"0 auto",
});*/


	$(document).ready(function() {

    // Mock data for testing
    var weeklyForecast = ["clear-day", "clear-night", "rain", "rain", "wind", "cloud", "cloud", "fog"];
    for ( var i = 0; i < weeklyForecast.length; i++) {
        var dailyWeather = weeklyForecast[i];
        var day = $('li').get(i);
        var color = parseDay(dailyWeather);
        $(day).css( 'background-color', color );
    }
 
 

    function parseDay(condition){

    	switch(condition) {

    		case "clear-day":
    		case "clear-night":	
                var color = "#ccc";

                break;
    		case "rain":
    		case "snow":
    		case "sleet":
                var color = "#C6DFFF";

                break;
    		case "wind":
    		case "fog":
    		case "cloudy":
    		case "partly-cloudy-day":
    		case "partly-cloudy-night":
                var color = "#85fcfc";<!--neon blue-->
                break;
                return color;
    		default:
    			break;	

        return color;
	}
    }
});





	// Parse and use the weather values from the forecast.io JSON
	function parseWeather(data) {
		var precipColor = getPrecipColor(data.currently.precipProbability);
		var tempColor	= data.currently.apparentTemperature;
		




$('<img>').attr("src", "images/"+data.currently.icon +  ".png").appendTo('#icon1');

	$('#temp').text("Currently: " + data.currently.apparentTemperature).css({
      "font-weight": "bolder",
	  "font-size":"30px",
	  "padding":"10px",
	  "margin-bottom":"40px",
	  "background-color":"rgba(0,0,0,0.3)",
	  "color":"white",
	  "text-align":"center",
    });
		$('#temp').addClass('degrees');
		$('body').css('background-color',precipColor);
		addWindAnimation();
	}
	function showError(){
		$('#temp').text('Oh no! Your forecast is currently unavailable.');
		$('body').css('background-color','rgb(240,14,10)');	
	}	

	var windSpeed;
	function addWindAnimation(){
		$('#temp').animate({ left: '+='+windSpeed  }, 4000 )
				  .animate({left: '-='+ windSpeed  },4000,addWindAnimation);
	}
	





	function getPrecipColor(precipitation) {
		if ( precipitation > .75 ) 
			return	'#3686FF';<!--blue-->
		if ( precipitation > .50 ) 
			return	'#ffc7c7';<!--pastel orange-->
		if ( precipitation > .30 ) 
			return	'#fff';<!--whit-->
		if ( precipitation > .25 ) 
			return	'#C6DFFF';<!--lavender-->
		//return '#FFF3B6';<!--pastel-->
	}






});
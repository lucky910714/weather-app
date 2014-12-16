$(document).ready(function(){

	// Setup variables for our forecast.io request
	var apiKey     = 'c316f9aaf2693baa4ab5ffb576f659ea';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.6760148';
	var defaultLng = '-73.9785012';

	var globalWeather;
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


    });
 
$('#icon1').css({ "width":"150px",
	"margin":"0 auto",
});

    function parseDay(condition){

    	switch(condition) {

    		case "clear-day":
    		case "clear-night":	
                var color = "#C6DFFF";

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





	// Parse and use the weather values from the forecast.io JSON
	function parseWeather(data) {
		// Now this variable is global!
		globalWeather = data;
		//formatCurrentWeather(data);
		formatWeeklyWeather(data);
	}

	// for one day's weather
	function formatCurrentWeather(data){
		console.log("CURRENT");
		var precipColor = getPrecipColor(data.currently.precipProbability);
		var tempColor	= data.currently.apparentTemperature;

		console.log("p " + precipColor);
		
		$('<img>').attr("src", "images/"+data.currently.icon +  ".png").appendTo('#icon1');

		$('#temp').text("Currently: " + data.currently.apparentTemperature).css({
	
		  "text-align":"center",
	    });
		$('#temp').addClass('degrees');
		$('body').css('background-color',precipColor);
		addWindAnimation();
	}

	// weekly code goes here
	function formatWeeklyWeather(data){
		console.log(data);
		$('<img>').attr("src", "images/"+data.currently.icon +  ".png").appendTo('#icon1');

		// Days of the week array
		var dailyData   = data.daily.data;
		for ( var i = 0; i < dailyData.length; i++) {
			// the current day we're looping through
        	var daysWeather = dailyData[i];
        	console.log(daysWeather);

        	var day = $('.temps').get(i);
	        var color = parseDay(daysWeather);
	        var weekday = getWeekday(daysWeather.time);
	        var apparentTemp = daysWeather.apparentTemperatureMax;
        	$(day).text(weekday + " " + apparentTemp);
        	
    	}

	
	}

	function getWeekday(timestamp)
	{
		// you need to specify the actual names of the days
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

		// Create a date object and set the time
		var d = new Date();
		d.setTime(timestamp*1000);

		return days[d.getDay()];
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
		console.log("g: " + globalWeather);
		console.log(precipitation)
		if ( precipitation > .75 ) 
			return	'#3686FF';<!--blue-->
		if ( precipitation > .50 ) 
			return	'#ffc7c7';<!--pastel orange-->
		if ( precipitation > .30 ) 
			return	'#e6960c';<!--organge-->

		if ( precipitation > .25 ) 
			return	'#C6DFFF';<!--lavender-->
i

		// the last return statement is the default -- if there is no preciptation 
		return '#FFF3B6';<!--pastel-->
	}



});
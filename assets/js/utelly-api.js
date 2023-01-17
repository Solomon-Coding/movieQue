
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6ebc9475e4mshe8509a12a672fc1p1988f4jsn8906c64e4c22',
		'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
	}
};
var API = "on"
var movieInput = 'Avatar 2009';
var watchPlatforms=[];
var whereToWatchMovieEl = document.querySelector('#whereToWatchMovie');
var utellyURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term='+ movieInput +'&country=us';


// method for calling stored API data or live API data
if (API === 'off') {
// Live API method
fetch(utellyURL, options) 
	.then(response => response.json())
	.then(response => test(response))
	.catch(err => console.error(err));
} else {
	// Stored API data
	response = JSON.parse(localStorage.getItem(movieInput));
	test(response);
};

var watchOptions = [];

function test(response) {
for (var i=0;i<response.results[1].locations.length;i++){
	$('#whereToWatchMovie').append($("<a href="+ response.results[1].locations[i].url+" "+"target='_blank'><img src="+response.results[1].locations[i].icon+"> </a>"));

	// Storing API info locally
	localStorage.setItem(movieInput,JSON.stringify(response))
}

}
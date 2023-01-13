
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6ebc9475e4mshe8509a12a672fc1p1988f4jsn8906c64e4c22',
		'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
	}
};
var movieInput = 'Avatar 2009';
var watchPlatforms=[];
var whereToWatchMovieEl = document.querySelector('#whereToWatchMovie');
var utellyURL = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term='+ movieInput +'&country=us';
fetch(utellyURL, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

whereToWatch(response);


var watchOptions ={
	
}

function whereToWatch(response){
    for (var i=0;i<response.results.length;i++){
		watchPlatforms[i] = response.results[i]
		watchOptions[i+1]
	}
}
console.log(watchPlatforms)
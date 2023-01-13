//This file contains code that grabs data from the IMDB API and prints it to the page
const IMDB_API_KEY = 'k_99xlpepl';

// Stores all relevant movie data
const movie = {
    searchTerm: "",
    imDbID: "",
    title: "",   
    poster: "",
    plot: "",
    imDbRating: "",
    metacriticRating: "",
}

// Selectors to grab content from the HTML DOM
let titleEl = document.querySelector('.title');

// Accepts a URL to get data back from and returns data object
async function checkAPI (url) {
    let apiData = await fetch(url);
        //.catch(error => { alert('Unable to connect to imdb') });;
    let apiJson = await apiData.json();
    return apiJson;
}

// Gets data from the API and saves it to the movie object, which is passed to the print function
async function getAPIData(query = '') {
         
    let queryUrl = 'https://imdb-api.com/en/API/SearchMovie/' + IMDB_API_KEY + '/' + query;
    let searchData = await checkAPI(queryUrl);
    //let searchData = fetch(queryUrl)
    //    .then();
    
    movie.imDbID = searchData.results[0].id;
       
    queryUrl = 'https://imdb-api.com/en/API/Title/' + IMDB_API_KEY + '/' + movie.imDbID;
    let titleData = await checkAPI(queryUrl);
    //let titleData = fetch(queryUrl);

    movie.title = titleData.fullTitle;
    movie.poster = titleData.image;
    movie.plot = titleData.plot;
    movie.imDbRating = titleData.imDbRating;
    movie.metacriticRating = titleData.metacriticRating;

    //console.log(movie);
    displayAPIData(movie);    
}

// Prints the recieved API data out to the page
async function displayAPIData(movieData) {
    console.log(movieData);

    titleEl.innerHTML = movieData.title;

}


// This function call accepts a search string which then gets data and prints it out to the page
getAPIData('avatar 2009');



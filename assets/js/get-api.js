export { getAPIData, readFromStorage, saveToStorage }

//This file contains code that grabs data from the IMDB API and prints it to the page
//const IMDB_API_KEY = 'k_99xlpepl';  //Primary API Key
const IMDB_API_KEY = 'k_sm3l0qjr';  //Backup API Key

const UTELLY_API_KEY = '6ebc9475e4mshe8509a12a672fc1p1988f4jsn8906c64e4c22'; //Primary
//const UTELLY_API_KEY = 'b41d6055ddmshff73aeabdafca16p10f353jsn689c85b1fa30'; //Backup

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

const watchLocation = {
    url: "",
    icon: "",
};

function readFromStorage(key) {
    var data = localStorage.getItem(key);
    if (data) { data = JSON.parse(data) }
    else { data = [] }
    return data;
  };
  
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};

// Accepts a URL to get data back from and returns data object
async function checkAPI (url,options) {
    let apiData = await fetch(url,options);
        //.catch(error => { alert('Unable to connect to imdb') });;
    let apiJson = await apiData.json();
    return apiJson;
}

// Gets data from the API and saves it to the movie object, which is passed to the print function
async function getAPIData(mode = '',query = ''){
    let imdbBaseUrl = 'https://imdb-api.com/en/API/';
    let utellyBaseUrl = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=';
    let url = '';
    let APIData = '';
    let options = {};
    let utellyData = [];
    let API = false;

    switch(mode){
        case 'imdb-search':
            url = imdbBaseUrl + 'SearchMovie/' + IMDB_API_KEY + '/' + query;
            if(API){
                APIData = await checkAPI(url,options);
                saveToStorage('imdb-search',APIData);
            }
            else{ APIData = readFromStorage('imdb-search') }
            movie.imDbID = APIData.results[0].id;
            
            return movie.imDbID;
        case 'imdb-title':
            url = imdbBaseUrl + 'Title/' + IMDB_API_KEY + '/' + query;
            if(API){
                APIData = await checkAPI(url,options);
                saveToStorage('imdb-title',APIData);
            }
            else{ APIData = readFromStorage('imdb-title') }

            movie.title = APIData.fullTitle;
            movie.poster = APIData.image;
            movie.plot = APIData.plot;
            movie.imDbRating = APIData.imDbRating;
            movie.metacriticRating = APIData.metacriticRating;

            return movie;
        case 'utelly':
            url = utellyBaseUrl + query + '&source=imdb&country=us';
            options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': UTELLY_API_KEY,
                    'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
                }
            };
            if(API){
                APIData = await checkAPI(url,options);
                saveToStorage('utelly',APIData);
            }
            else{ APIData = readFromStorage('utelly') }

            for(var x in APIData.collection.locations){
                watchLocation.url = APIData.collection.locations[x].url;
                watchLocation.icon = APIData.collection.locations[x].icon;

                utellyData.push(watchLocation);
            }

            return utellyData;
    }
}
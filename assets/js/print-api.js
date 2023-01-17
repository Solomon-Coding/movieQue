export { displayAPIData }

// Selectors to grab content from the HTML DOM
let titleEl = $('#movieTitle');
let posterEl = $('#moviePoster');
let descriptionEl = $('#description');
let ratingsEl = $('#movieRatings');
let imDbRatingsEl = $(ratingsEl).children().eq(0);
let metacriticRatingsEl = $(ratingsEl).children().eq(1);
let watchedListEl = $('#watchedList');
let unWatchedListEl = $('#unWatchedList');
let whereToWatchEl = $('#whereToWatchMovie');

// Prints the recieved API data out to the page
async function displayAPIData(mode = '',movieData) {
    console.log(movieData);

    switch(mode){
        case 'imdb':
            $(titleEl).text(movieData.title);
            $(posterEl).attr('src', movieData.poster);
            $(descriptionEl).text(movieData.plot);
            $(imDbRatingsEl).text(movieData.imDbRating);
            $(metacriticRatingsEl).text(movieData.metacriticRating);
            
            break;
        case 'utelly':
            for(var x in movieData){
                $(whereToWatchEl).append("<a href=" + movieData[x].url + " target='_blank'><img src=" + movieData[x].icon + "></a>");
            }

            break;
    }    
}
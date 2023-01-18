export { displayAPIData }

// Selectors to grab content from the HTML DOM
async function defineSelectors(){
    let titleEl = $('#movieTitle');
    let posterEl = $('#moviePoster');
    let descriptionEl = $('#description');
    let ratingsEl = $('#movieRatings');
    let imDbRatingsEl = $(ratingsEl).children().eq(0);
    let metacriticRatingsEl = $(ratingsEl).children().eq(1);
    let watchedListEl = $('#watchedList');
    let unWatchedListEl = $('#unWatchedList');
    let whereToWatchEl = $('#whereToWatchMovie');
}

// Prints the recieved API data out to the page
function displayAPIData(imdbData,utellyData) {
    //defineSelectors();
    console.log("Print func");
    console.log(imdbData);
    console.log(utellyData);
    
    $('#movieTitle').text(imdbData.title);
    $('#moviePoster').attr('src', imdbData.poster);
    $('#description').text(imdbData.plot);
    $('#movieRatings').children().eq(0).text(imdbData.imDbRating);
    $('#movieRatings').children().eq(1).text(imdbData.metacriticRating);
    

    for(var x in utellyData.collection.locations){
        $('#whereToWatchMovie').append("<a href=" + utellyData.collection.locations[x].url + " target='_blank'><img src=" + utellyData.collection.locations[x].icon + "></a>");
    }


}
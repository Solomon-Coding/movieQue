export { displayAPIData }

// Prints the recieved API data out to the page
async function displayAPIData(imdbData,utellyData) {

    console.log("Print func");
    console.log(imdbData);
    console.log(utellyData);
    
    $('#movieTitle').text(imdbData.title);
    $('#moviePoster').attr('src', imdbData.poster);
    $('#description').text(imdbData.plot);
    $('#imdbRating p').text(imdbData.imDbRating);
    $('#metacriticRating p').text(imdbData.metacriticRating);
    
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: imdbData.youtubeId,
            playerVars: {
            'playsinline': 1
            },                                        
        });
    }

    setTimeout(() => {
        onYouTubeIframeAPIReady();
    }, 450);

    for(var x in utellyData.collection.locations){
        $('#whereToWatchMovie').append("<a href=" + utellyData.collection.locations[x].url + " target='_blank'><img src=" + utellyData.collection.locations[x].icon + "></a>");
    }

}
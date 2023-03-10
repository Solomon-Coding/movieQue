import { getAPIData } from "./get-api.js";
import { displayAPIData } from "./print-api.js";

// This will contain the code that grabs the user input from the search bar
$(function () {

    $('#searchInput').val('');

    $('#searchBtn').on("click", function () {
        if ($('#searchInput').val().trim() === '') {
            openModal(document.getElementById('modal-error'));
            $('#searchInput').val('');
        } else {
            movieSearchButton();
        }
    });

    $('#searchForm').on("submit", function (event) {
        event.preventDefault();

        if ($('#searchInput').val().trim() === '') {
            openModal(document.getElementById('modal-error'));
            $('#searchInput').val('');
        } else {
            movieSearchButton();
        }
    });

    $('body').on("click", "button[data-attribute=add]", function () {
        //console.log("Button clicked");
        openModal(document.getElementById('modal-success'));
    });

    function openModal($el) {
        $el.classList.add('is-active');
    }

    function movieSearchButton() {
        var userSearch = '';

        // Grabs the text from the search bar 
        userSearch = $('#searchInput').val();
        //console.log("User input: "+userSearch);

        // Replaces the body of index.html with the body from searchResult.html
        $('body').load('./searchResult.html');
        document.title = 'movieQue - Search';

        // Set up a promise to get the imdb ID in order to get other data
        let imDbSearch = new Promise(function (resolve, reject) {
            resolve(getAPIData('imdb-search', userSearch))
        });

        // Calls the promise which executes code upon data return/completing the promise
        imDbSearch.then(
            function (imDbID) {
                //console.log(imDbID);                

                // Set up a promise to get all movie data from imdb
                let imDbTitle = new Promise(function (resolve, reject) {
                    resolve(getAPIData('imdb-title', imDbID))
                });

                // Set up a promise to get streaming locations from utelly
                let utellyLookup = new Promise(function (resolve, reject) {
                    resolve(getAPIData('utelly', imDbID))
                });

                let imDbYoutube = new Promise(function (resolve, reject) {
                    resolve(getAPIData('imdb-youtube-trailer', imDbID))
                });

                // Calls the promise to get data back from imdb
                imDbTitle.then(imdb => {
                    //console.log(imdb);
                    imDbYoutube.then(youtubeId => {
                        //console.log(youtubeId);  

                        // Nested promise that excecutes after data has been returned from imdb
                        utellyLookup.then(utelly => {
                            //console.log(utelly)

                            // For use when API is turned off
                            setTimeout(() => {

                                // Displays data returned from imdb and utelly
                                displayAPIData(imdb, utelly);

                                // Changes from the loading screen
                                document.getElementById("mainPage").style.display = "contents";
                                document.getElementById("loadingPage").style.display = "none";
                                $('html').css('overflow-y', 'scroll');

                            }, 4000);

                            // For use when API is turned on
                            //displayAPIData(imdb,utelly);
                        });
                    });
                });
            } //end then func
        ); //end then
    } //end func   



}); //end document ready
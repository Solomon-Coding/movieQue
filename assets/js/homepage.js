// import { getAPIData as queryIMDB } from "./imdb-api.js";

// This will contain the code that grabs the user input from the search bar
$(function() {
    var searchFormEl = $('#searchForm');
    var searchInputEl = $('#searchInput');   
    searchInputEl.on("click",function(){
    console.log(searchFormEl.val())
    })
    //var searchSubmitEl = $('#searchSubmit');

    /*
    $(searchBar).on('submit', function(){
        var searchQuery = $(searchEl).val();
    });
    */

    //queryIMDB('avatar 2009');

    
});
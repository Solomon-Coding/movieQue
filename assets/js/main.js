import { getAPIData } from "./get-api.js";
import { displayAPIData } from "./print-api.js";

// This will contain the code that grabs the user input from the search bar
$(function() {
    var searchFormEl = $('#searchForm');
    var searchInputEl = $('#searchInput');
    var userSearch = '';
    var imDbID = '';


    searchInputEl.on("click",function(){
        userSearch = searchFormEl.val();
        console.log("User input: "+userSearch);

        let imDbSearch = new Promise(function(resolve, reject) {
            resolve(getAPIData('imdb-search',userSearch))
        });        
        
        imDbSearch
        .then(
            function(value) {
                console.log(value)
                imDbID = value.imDbID;
                console.log("After promise: "+imDbID);
                
                let imDbTitle = new Promise(function(resolve, reject) {
                    resolve(getAPIData('imdb-title',imDbID))
                });
        
                let utellyLookup = new Promise(function(resolve, reject) {
                    resolve(getAPIData('utelly',imDbID))
                });

                imDbTitle.then(function(value2) {console.log(value2)} );
                utellyLookup.then(function(value3) {console.log(value3)} );
            }
        );
        
        
    })    
    
    

    
    
    

    
});
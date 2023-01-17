import { getAPIData } from "./get-api.js";
import { displayAPIData } from "./print-api.js";
import { readFromStorage, saveToStorage } from "./localStorage.js";

// This will contain the code that grabs the user input from the search bar
$(function() {
    var searchInputEl = $('#searchInput');
    var searchBtnEl = $('#searchBtn');
    var userSearch = '';
    //var imDbID = '';

    searchBtnEl.on("click",function(){
        userSearch = searchInputEl.val();
        console.log("User input: "+userSearch);

        $('body').load('./searchResult.html');       

        let imDbSearch = new Promise(function(resolve, reject) {
            resolve(getAPIData('imdb-search',userSearch))
        });        
        
        imDbSearch.then(
            function(imDbID) {
                console.log(imDbID);                
                
                let imDbTitle = new Promise(function(resolve, reject) {
                    resolve(getAPIData('imdb-title',imDbID))
                });
        
                let utellyLookup = new Promise(function(resolve, reject) {
                    resolve(getAPIData('utelly',imDbID))
                });

                imDbTitle.then(imdb => {
                    console.log(imdb);

                    utellyLookup.then(utelly => {
                        console.log(utelly)

                        displayAPIData(imdb,utelly);
                    });           
                });               
            }
        );
        
        
    })    
    
    

    
    
    

    
});
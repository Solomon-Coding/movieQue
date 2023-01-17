// This will contain code that will allow the user to add or remove items to lists
var watchedTableEl = document.querySelector('#watchedTable');
var unWatchedTableEl = document.querySelector('#unWatchedTable');
var movieTitleEl = document.querySelector('#movieTitle');
var movieRatingsEl = document.querySelector('#movieRatings');


function addToWatchedList(){
    // console.log(movieData.title)
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text("");
    var ratingEl = $('<td>').text("");
    var addToOtherListEl = $('<td>').text('X');
    var removeFromListEl = $('<td>').text('X');

    rowEl.append(nameEL, ratingEl, addToOtherListEl, removeFromListEl)
    console.log(rowEl)
    watchedTableEl.append(rowEl);
    // $('#whereToWatchMovie').append($("<a href="+ response.results[1].locations[i].url+" "+"target='_blank'><img src="+response.results[1].locations[i].icon+"> </a>"));
    
};

// unWatchedListEl.onClick = function() {
    
//     var rowEl = $('<tr>');
//     var nameEL = $('<td>').text(movieTitleEl.value);
//     var ratingEl = $('<td>').text(movieRatingsEl.value);
//     var addToOtherListEl = $('<td>').text('X');
//     var removeFromListEl = $('<td>').text('X');

//     rowEl.append(nameEL, ratingEl, addToOtherListEl, removeFromListEl)
//     unWatchedTableEl.append(rowEl);
// };

/* <tr>
    <td></td>
    <td></td>
    <td><button>X</button></td>
    <td><button>X</button></td>
</tr> */
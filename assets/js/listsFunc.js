// This will contain code that will allow the user to add or remove items to lists
var watchedTableEl = document.querySelector('#watchedTable');
var unWatchedTableEl = document.querySelector('#unWatchedTable');
var movieTitleEl = document.querySelector('#movieTitle');
var movieRatingsEl = document.querySelector('#movieRatings');


function addToWatchedList(){
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text("");
    var ratingEl = $('<td>').text("");
    var addToOtherListEl = $('<td>').text('X');
    var removeFromListEl = $('<td>').text('X');

    rowEl.append(nameEL, ratingEl, addToOtherListEl, removeFromListEl)
    console.log(rowEl)
    watchedTableEl.append(rowEl);
}


// Reads movies from local storage and returns array of movie objects.
// Returns an empty array ([]) if there aren't any movies.
function readMoviesFromStorage() {
    var movies = localStorage.getItem('movies');
    if (movies) {
      movies = JSON.parse(movies);
    } else {
      movies = [];
    }
    return movies;
  }
  
  // Takes an array of movies and saves them in localStorage.
  function saveMoviesToStorage(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
  }
  
  // Gets movie data from local storage and displays it
  function printMovieData() {
    // clear current movies on the page
    movieDisplayEl.empty();
  
    // get movies from localStorage
    var movies = readMoviesFromStorage();
  
    // loop through each movie and create a row
    for (var i = 0; i < movies.length; i += 1) {
      var movie = movies[i];
  
      // Create row and columns for movie
      var rowEl = $('<tr>');
      var nameEL = $('<td>').text();
      var typeEl = $('<td>').text();
      var dateEl = $('<td>').text();
  
      // Save the index of the movie as a data-* attribute on the button. This
      // will be used when removing the movie from the array.
      var deleteEl = $(
        '<td><button class="btn btn-sm btn-delete-movie" data-index="' +
          i +
          '">X</button></td>'
      );
  
      // append elements to DOM to display them
      rowEl.append(nameEL, typeEl, dateEl, deleteEl);
      movieDisplayEl.append(rowEl);
    }
  }
  
  // Removes a movie from local storage and prints the movie data
  function handleDeleteMovie() {
    var movieIndex = parseInt($(this).attr('data-index'));
    var movies = readMoviesFromStorage();
    // remove movie from the array
    movies.splice(movieIndex, 1);
    saveMoviesToStorage(movies);
  
    // print movies
    printMovieData();
  }
  
  // Adds a movie to local storage and prints the movie data
  function handleMovieFormSubmit(event) {
    event.preventDefault();
  
    // read user input from the form
    var movieName = movieNameInputEl.val().trim();
    var movieType = movieTypeInputEl.val(); // don't need to trim select input
    var movieDate = movieDateInputEl.val(); // yyyy-mm-dd format
  
    var newMovie = {
      name: movieName,
      type: movieType,
      date: movieDate,
    };
  
    // add movie to local storage
    var movies = readMoviesFromStorage();
    movies.push(newMovie);
    saveMoviesToStorage(movies);
  
    // print movie data
    printMovieData();
  
    // clear the form inputs
    movieNameInputEl.val('');
    movieTypeInputEl.val('');
    movieDateInputEl.val('');
  }
  
  movieFormEl.on('submit', handleMovieFormSubmit);
  
  // Use jQuery event delegation to listen for clicks on dynamically added delete
  // buttons.
  movieDisplayEl.on('click', '.btn-delete-movie', handleDeleteMovie);
  

  
  printMovieData();
  
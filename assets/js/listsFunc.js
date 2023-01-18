// // This will contain code that will allow the user to add or remove items to lists

// save reference to important DOM elements
var watchedTableEl = $('#watchedTable');
var unWatchedTableEl = $('#unWatchedTable');
var watchedListEl = $('#watchedList');
var unWatchedListEl = $('#unWatchedList');
var movieTitleEl = $('#movieTitle');
var movieRatingsEl = $('#movieRatings');
var movieSwapInputEl = $('#movieRatings');

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
    
    watchedTableEl.empty();
  
    // get movies from localStorage
    var movies = readMoviesFromStorage();
  
    // loop through each movie and create a row
    for (var i = 0; i < movies.length; i += 1) {
      var movie = movies[i];
  
      // Create row and columns for movie
      var rowEl = $('<tr>');
      var nameEL = $('<td>').text(movie.name);
      var ratingEl = $('<td>').text(movie.rating);
      var swapEl = $('<td>').text(movie.swap);  
  
      // Save the index of the movie as a data-* attribute on the button. This
      // will be used when removing the movie from the array.
      var deleteEl = $(
        '<td><button class="btn btn-delete-movie" data-index="' +
          i +
          '">X</button></td>'
      );
  
      // append elements to DOM to display them
      rowEl.append(nameEL, ratingEl, swapEl, deleteEl);
      watchedTableEl.append(rowEl);
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
  function addMovie(event) {
    event.preventDefault();
    
    console.log("clicked")
    // read user input from the form
    var movieName = movieTitleEl.text();
    var movieRating = movieRatingsEl.text();
    var movieSwap = movieSwapInputEl.text()

    var newMovie = {
      name: movieName,
      rating: movieRating,
      swap: movieSwap,
    };
  
    // add movie to local storage
    var movies = readMoviesFromStorage();
    movies.push(newMovie);
    saveMoviesToStorage(movies);
  
    // print movie data
    printMovieData();

  }
  
  watchedListEl.on('click', addMovie);
  
  // Use jQuery event delegation to listen for clicks on dynamically added delete
  // buttons.
  watchedTableEl.on('click', '.btn-delete-movie', handleDeleteMovie);
  
  printMovieData();
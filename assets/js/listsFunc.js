// // This will contain code that will allow the user to add or remove items to lists

// save reference to important DOM elements
var watchedTableEl = $('#watchedTable');
var unWatchedTableEl = $('#unWatchedTable');
var watchedListEl = $('#watchedList');
var unWatchedListEl = $('#unWatchedList');
var movieTitleEl = $('#movieTitle');
var movieRatingsEl = $('#movieRatings');
var imDbRatingEl = $('#imdbRating p');
var metacriticRatingEl = $('#metacriticRating p');
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
    var rating1El = $('<td>').text(movie.rating1);
    var rating2El = $('<td>').text(movie.rating2);

    // Save the index of the movie as a data-* attribute on the button. This
    // will be used when removing the movie from the array.
    var deleteEl = $(
      '<td><button class="btn btn-delete-movie" data-index="' +
      i +
      '">X</button></td>'
    );

    // append elements to DOM to display them
    rowEl.append(nameEL, rating1El, rating2El, deleteEl);
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

  //console.log("clicked")
  // read user input from the form
  var movieName = movieTitleEl.text();
  var movieRating1 = imDbRatingEl.text();
  var movieRating2 = metacriticRatingEl.text();


  var newMovie = {
    name: movieName,
    rating1: movieRating1,
    rating2: movieRating2,
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



// Reads movies from local storage and returns array of movie objects.
// Returns an empty array ([]) if there aren't any movies.
function readMoviesFromStorage2() {
  var unwatchedMovies = localStorage.getItem('unwatchedMovies');
  if (unwatchedMovies) {
    unwatchedMovies = JSON.parse(unwatchedMovies);
  } else {
    unwatchedMovies = [];
  }
  return unwatchedMovies;
}

// Takes an array of movies and saves them in localStorage.
function saveMoviesToStorage2(unwatchedMovies) {
  localStorage.setItem('unwatchedMovies', JSON.stringify(unwatchedMovies));
}

// Gets movie data from local storage and displays it
function printMovieData2() {

  unWatchedTableEl.empty();

  // get movies from localStorage
  var unwatchedMovies = readMoviesFromStorage2();

  // loop through each movie and create a row
  for (var i = 0; i < unwatchedMovies.length; i += 1) {
    var unwatchedMovie = unwatchedMovies[i];

    // Create row and columns for movie
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text(unwatchedMovie.name);
    var rating1El = $('<td>').text(unwatchedMovie.rating1);
    var rating2El = $('<td>').text(unwatchedMovie.rating2);

    // Save the index of the movie as a data-* attribute on the button. This
    // will be used when removing the movie from the array.
    var deleteEl = $(
      '<td><button class="btn btn-delete-unwatchedMovie" data-index="' +
      i +
      '">X</button></td>'
    );

    // append elements to DOM to display them
    rowEl.append(nameEL, rating1El, rating2El, deleteEl);
    unWatchedTableEl.append(rowEl);
  }
}

// Removes a movie from local storage and prints the movie data
function handleDeleteMovie2() {
  var movieIndex = parseInt($(this).attr('data-index'));
  var unwatchedMovies = readMoviesFromStorage2();
  // remove movie from the array
  unwatchedMovies.splice(movieIndex, 1);
  saveMoviesToStorage2(unwatchedMovies);

  // print movies
  printMovieData2();
}

// Adds a movie to local storage and prints the movie data
function addMovie2(event) {
  event.preventDefault();

  //console.log("clicked")
  // read user input from the form
  var movieName = movieTitleEl.text();
  var movieRating1 = imDbRatingEl.text();
  var movieRating2 = metacriticRatingEl.text();

  var newMovie = {
    name: movieName,
    rating1: movieRating1,
    rating2: movieRating2,
  };

  // add movie to local storage
  var unwatchedMovies = readMoviesFromStorage2();
  unwatchedMovies.push(newMovie);
  saveMoviesToStorage2(unwatchedMovies);

  // print movie data
  printMovieData2();

}

unWatchedListEl.on('click', addMovie2);

// Use jQuery event delegation to listen for clicks on dynamically added delete
// buttons.
unWatchedTableEl.on('click', '.btn-delete-unwatchedMovie', handleDeleteMovie2);

printMovieData2();  
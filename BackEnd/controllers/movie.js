const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const paginate = require('../utils/paging').paginate;

const PAGE_SIZE = 20;
const ERROR_MESSAGES = {
  MISSING_GENRE_PARAM: "Not found genre param",
  INVALID_GENRE_ID: "Not found that genre id"
};

const getMovies = (sortField) => (req, res) => { // helper function
  const page = Number(req.query.page) || 1;

  const movies = Movies.all().sort((a, b) => b[sortField] - a[sortField]);
  const paginatedMovies = paginate(movies, page, PAGE_SIZE);

  res.status(200).json({
    results: paginatedMovies,
    page: page,
    total_pages: Math.ceil(movies.length / PAGE_SIZE),
  });
};

exports.getTrendingMovies = getMovies('popularity');

exports.getTopRatedMovies = getMovies('vote_average');

exports.getMoviesByGenre = (req, res) => {
  const genreId = req.query.genre;
  if (!genreId) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_GENRE_PARAM });
  }

  const genre = Genres.all().find(g => g.id === parseInt(genreId));
  if (!genre) {
    return res.status(400).json({ message: ERROR_MESSAGES.INVALID_GENRE_ID });
  }

  const page = Number(req.query.page) || 1;
  const genreIdInt = parseInt(genreId);
  const movies = Movies.all().filter(movie => movie.genre_ids.includes(genreIdInt));
  const paginatedMovies = paginate(movies, page, PAGE_SIZE);

  res.status(200).json({
    results: paginatedMovies,
    page: page,
    total_pages: Math.ceil(movies.length / PAGE_SIZE),
    genre_name: genre.name,
  });
};
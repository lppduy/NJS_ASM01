const Movies = require('../models/Movies');
const paginate = require('../utils/paging').paginate;

const getMovies = (sortField) => (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const PAGE_SIZE = 20;
  const movies = Movies.all().sort((a, b) => b[sortField] - a[sortField]);
  const paginatedMovies = paginate(movies, page, PAGE_SIZE);

  res.status(200).json({
    results: paginatedMovies,
    page: page,
    total_pages: Math.ceil(movies.length / PAGE_SIZE),
  });
};

const getTrendingMovies = getMovies('popularity');
const getTopRatedMovies = getMovies('vote_average');

module.exports = {
  getTrendingMovies,
  getTopRatedMovies,
};
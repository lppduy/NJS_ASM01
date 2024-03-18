const Movies = require('../models/Movies');
const { paginate } = require('../utils/paging');

const getTrendingMovies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const LIMIT = 20;
  const movies = Movies.all().sort((a, b) => b.popularity - a.popularity);
  const paginatedMovies = paginate(movies, page, LIMIT);

  res.status(200).json({
    results: paginatedMovies,
    page: page,
    total_pages: Math.ceil(movies.length / LIMIT),
  });
};

module.exports = {
  getTrendingMovies,
};
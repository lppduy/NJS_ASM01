const express = require('express');
const { getTrendingMovies, getTopRatedMovies, getMoviesByGenre } = require('../controllers/movie');

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/top-rate', getTopRatedMovies);
router.get('/discover', getMoviesByGenre);

module.exports = router;
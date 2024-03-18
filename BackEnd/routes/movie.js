const express = require('express');

const { getTrendingMovies, getTopRatedMovies, getMoviesByGenre, fetchMovieTrailer, searchMovies } = require('../controllers/movie');

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/top-rate', getTopRatedMovies);
router.get('/discover', getMoviesByGenre);
router.post('/video', fetchMovieTrailer);
router.post('/search', searchMovies);

module.exports = router;
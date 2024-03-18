const express = require('express');
const { getTrendingMovies, getTopRatedMovies, getMoviesByGenre, getMovieTrailer } = require('../controllers/movie');

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/top-rate', getTopRatedMovies);
router.get('/discover', getMoviesByGenre);
router.post('/video', getMovieTrailer);

module.exports = router;
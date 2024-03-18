const express = require('express');
const { getTrendingMovies, getTopRatedMovies } = require('../controllers/movie');

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/top-rate', getTopRatedMovies);

module.exports = router;
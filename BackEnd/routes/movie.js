const express = require('express');
const { getTrendingMovies } = require('../controllers/movie');

const router = express.Router();

router.get('/trending', getTrendingMovies);

module.exports = router;
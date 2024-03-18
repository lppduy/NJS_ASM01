const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const Videos = require('../models/Videos');

const paginate = require('../utils/paging').paginate;

const PAGE_SIZE = 20;
const ERROR_MESSAGES = {
  MISSING_GENRE_PARAM: "Not found genre param",
  INVALID_GENRE_ID: "Not found that genre id"
};

// HELPER FUNCTIONS

const getMovies = (sortField) => (req, res) => {
  const page = Number(req.query.page) || 1;

  const movies = Movies.all().sort((a, b) => b[sortField] - a[sortField]);
  const paginatedMovies = paginate(movies, page, PAGE_SIZE);

  res.status(200).json({
    results: paginatedMovies,
    page: page,
    total_pages: Math.ceil(movies.length / PAGE_SIZE),
  });
};

const getMostRecentOfficialVideo = (videos) => {
  // Filter the videos to only include official YouTube trailers
  const officialTrailers = videos.filter(video =>
    video.official === true &&
    video.site === 'YouTube' &&
    video.type === 'Trailer'
  );

  // Filter the videos to only include official YouTube teasers
  const officialTeasers = videos.filter(video =>
    video.official === true &&
    video.site === 'YouTube' &&
    video.type === 'Teaser'
  );

  let selectedVideo;

  // If there are official trailers, select the most recent one
  if (officialTrailers.length > 0) {
    officialTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    selectedVideo = officialTrailers[0];
  } else if (officialTeasers.length > 0) {
    // If there are no official trailers, but there are teasers, select the most recent teaser
    officialTeasers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    selectedVideo = officialTeasers[0];
  }

  return selectedVideo;
}

// CONTROLLER FUNCTIONS

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

exports.getMovieTrailer = (req, res) => {
  const filmId = req.body.film_id;
  const filmMatchedIt = Movies.all().find(m => m.id === parseInt(filmId));
  if (!filmMatchedIt) {
    return res.status(400).json({ message: "Not found film_id param" });
  }

  const filmVideos = Videos.all().find(v => v.id === parseInt(filmId));
  if (!filmVideos) {
    return res.status(404).json({ message: "Not found video" });
  }

  const selectedVideo = getMostRecentOfficialVideo(filmVideos.videos);

  if (!selectedVideo) {
    return res.status(404).json({ message: "Not found video" });
  }

  res.status(200).json(selectedVideo);
  // 361743 for testing success, -1 for testing not found film_id, 94997 for testing not found video
};

exports.searchMovies = (req, res) => {
  const { keyword, genre, mediaType, language, year, page } = req.body;
  let pageInt = parseInt(page);


  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  // Get all movies
  const movies = Movies.all();

  let matchedMovies = movies.filter(movie =>
    (movie.title && movie.title.toLowerCase().includes(keyword.toLowerCase())) ||
    (movie.overview && movie.overview.toLowerCase().includes(keyword.toLowerCase()))
  );

  if (genre) {
    const genreId = Genres.findIdByName(genre);
    matchedMovies = matchedMovies.filter(movie => movie.genre_ids.includes(genreId));
  }

  if (mediaType) {
    if (mediaType.toLowerCase() === 'all') {
      // Do nothing, keep all matchedMovies
    } else if (['movie', 'tv', 'person'].includes(mediaType.toLowerCase())) {
      matchedMovies = matchedMovies.filter(movie => movie.media_type && movie.media_type.toLowerCase() === mediaType.toLowerCase());
    } else {
      return res.status(400).json({ message: "Invalid mediaType. Valid options are 'all', 'movie', 'tv', 'person'." });
    }
  }

  if (language) {
    if (['en', 'ja', 'ko'].includes(language.toLowerCase())) {
      matchedMovies = matchedMovies.filter(movie => movie.original_language && movie.original_language.toLowerCase() === language.toLowerCase());
    } else {
      return res.status(400).json({ message: "Invalid language. Valid options are 'en', 'ja', 'ko'." });
    }
  }

  if (year) {
    matchedMovies = matchedMovies.filter(movie => movie.release_date && new Date(movie.release_date).getFullYear() === year);
  }

  const totalPages = Math.ceil(matchedMovies.length / PAGE_SIZE);

  // Check if page is greater than total pages
  if (pageInt > totalPages) {
    pageInt = totalPages;
    // return res.status(400).json({ message: `Invalid page. Maximum page is ${totalPages}` });
  }

  const paginatedMovies = paginate(matchedMovies, pageInt, PAGE_SIZE);

  const output = {
    results: paginatedMovies,
    page: pageInt,
    total_pages: totalPages,
    genre_name: genre,
    media_type: mediaType,
    language,
    year,
  };

  res.status(200).json(output);
};
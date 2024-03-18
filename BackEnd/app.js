const express = require('express');
const movieRouter = require('./routes/movie');

const app = express();

app.use(express.json()); // Middleware for JSON request parsing

app.use('/api/movies', movieRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports = app;
const express = require('express');
const movieRouter = require('./routes/movie');
const { authenticate } = require('./middleware/auth');

const PORT = 8000;
const app = express();

app.use(express.json()); // Middleware for JSON request parsing

app.use('/api/movies', authenticate, movieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port 8000`);
});

module.exports = app;
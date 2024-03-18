const express = require('express');
const movieRouter = require('./routes/movie');
const { authenticate } = require('./middleware/auth');

const PORT = 8000;
const app = express();

app.use(express.json());

app.use('/api/movies', authenticate, movieRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port 8000`);
});

module.exports = app;

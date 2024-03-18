const fs = require('fs');
const path = require('path');

// Đường dẫn tới file JSON
const DATA_PATH = path.join(__dirname, '../data/genreList.json');

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },

  findIdByName: function (name) {
    const genres = this.all();
    const genre = genres.find(genre => genre.name.toLowerCase() === name.toLowerCase());
    return genre ? genre.id : null;
  },
};

module.exports = Genres;
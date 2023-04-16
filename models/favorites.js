const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
  },
});

const Favorites = mongoose.model("favorites", favoritesSchema);

module.exports = { Favorites };

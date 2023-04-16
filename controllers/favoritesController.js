const { Favorites } = require("../models/favorites");
const { Pets } = require("../models/pets");

async function getUserFavorites(req, res) {
  const username = res.locals.token._doc.username;

  try {
    const favoriteDoc = await Favorites.findOne({ username });
    if (!favoriteDoc) {
      res.status(200).json([]);
      return;
    }
    const favorites = [];
    for (const petId of favoriteDoc.favorites) {
      const pet = await Pets.findById(petId);
      if (!pet) {
        // pet was deleted
        continue;
      }
      favorites.push(pet);
    }
    res.status(200).json(favorites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

async function addToFavorites(req, res) {
  const { petId } = req.params;
  const username = res.locals.token._doc.username;
  try {
    const favorites = await Favorites.findOne({ username });
    if (favorites) {
      const updatedDocument = await Favorites.findOneAndUpdate(
        { username },
        { $push: { favorites: petId } },
        { new: true }
      );
      res.status(200).json(updatedDocument);
      return;
    }

    const newFavorites = [petId];
    const newFavoritesRecord = new Favorites({
      username,
      favorites: newFavorites,
    });
    await newFavoritesRecord.save();
    res.status(201).json(newFavoritesRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

async function deleteFromFavorites(req, res) {
  const username = res.locals.token._doc.username;
  const { petId } = req.params;
  try {
    const favoritesDoc = await Favorites.findOne({ username });
    if (favoritesDoc) {
      const { favorites } = favoritesDoc;
      const updatedFavorites = favorites.filter((id) => id !== petId);
      await Favorites.findOneAndUpdate(
        { username },
        { favorites: updatedFavorites }
      );
      res.status(200).json(updatedFavorites);
      return;
    }
    res.status(404).json({
      message: "Favorites not found",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  getUserFavorites,
  addToFavorites,
  deleteFromFavorites,
};

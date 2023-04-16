const { Favorites } = require("../models/favorites");
const { Pets } = require("../models/pets");
const { petSchema } = require("../schema/pet");

async function getAllPets(req, res) {
  try {
    const pets = await Pets.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
async function createPet(req, res) {
  try {
    const { error } = petSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newPet = await Pets.create(req.body);
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
async function deletePet(req, res) {
  const { id } = req.params;
  try {
    await Pets.findByIdAndDelete(id);

    // delete pets from all favorites
    const favoritesDocs = await Favorites.find();
    for (const doc of favoritesDocs) {
      const { favorites } = doc;
      if (favorites.includes(id)) {
        await Favorites.findOneAndUpdate(
          { username: doc.username },
          { favorites: favorites.filter((petId) => petId !== id) }
        );
      }
    }

    res.status(200).json({ result: "delete success" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function editPet(req, res) {
  const pet = req.body;
  const id = pet._id;
  delete pet._id;
  try {
    await Pets.findOneAndUpdate({ _id: id }, { ...pet });
    const updated = await Pets.findById(id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports.petsController = {
  getAllPets,
  createPet,
  deletePet,
  editPet,
};

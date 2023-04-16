const { Router } = require("express");
const favoritesController = require("../controllers/favoritesController");
const router = Router();
const { requireAuth } = require("../middleware/auth-middleware");

router.get("/", requireAuth, favoritesController.getUserFavorites);
router.get("/:petId", requireAuth, favoritesController.addToFavorites);
router.delete("/:petId", requireAuth, favoritesController.deleteFromFavorites);

module.exports = router;

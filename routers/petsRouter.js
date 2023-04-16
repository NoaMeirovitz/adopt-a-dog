const { Router } = require("express");
const { petsController } = require("../controllers/petsController");
const router = Router();
const { requireAuth } = require("../middleware/auth-middleware");

router.get("/", petsController.getAllPets);
router.post("/", requireAuth, petsController.createPet);
router.put("/", requireAuth, petsController.editPet);
router.delete("/:id", requireAuth, petsController.deletePet);

module.exports = router;

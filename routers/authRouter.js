const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;

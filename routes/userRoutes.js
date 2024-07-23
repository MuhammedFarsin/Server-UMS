const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authenticateJWT = require("../Config/config")


router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.patch("/editprofile/:id",authenticateJWT, userController.updateProfile);

module.exports = router
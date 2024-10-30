const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const { login, register, logout } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/logout").delete(authenticateUser, logout);

module.exports = router;

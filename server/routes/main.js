const express = require("express");
const { dashboard } = require("../controllers/main");

const authenticationMiddleware = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(authenticationMiddleware, dashboard);

module.exports = router;

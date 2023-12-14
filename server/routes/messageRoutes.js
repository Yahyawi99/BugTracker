const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allMessages,
  createMessage,
} = require("../controllers/messageController");

router.route("/:id").get(authenticateUser, allMessages);

router.route("/").post(authenticateUser, createMessage);

module.exports = router;

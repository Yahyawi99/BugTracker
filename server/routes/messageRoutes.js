const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allMessages,
  createMessage,
  editMessage,
} = require("../controllers/messageController");

router.route("/:id").get(authenticateUser, allMessages);

router.route("/:messageId").put(authenticateUser, editMessage);

router.route("/").post(authenticateUser, createMessage);

module.exports = router;

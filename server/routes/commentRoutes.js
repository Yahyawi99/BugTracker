const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  getComments,
  createComments,
} = require("../controllers/commentController");

router
  .route("/:id")
  .get(authenticateUser, getComments)
  .post(authenticateUser, createComments);

module.exports = router;

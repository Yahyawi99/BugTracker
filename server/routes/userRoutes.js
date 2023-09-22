const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");

router
  .route("/")
  .get(authenticateUser, allUsers)
  .post(authenticateUser, createUser);

router
  .route("/:id")
  .get(authenticateUser, singleUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

module.exports = router;

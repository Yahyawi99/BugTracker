const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allUsers,
  singleUser,
  userProjects,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");

router.route("/").get(authenticateUser, allUsers);

router.route("/projects/:id").get(authenticateUser, userProjects);

router
  .route("/:id")
  .get(authenticateUser, singleUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allProjects,
  singleProject,
  createProject,
  updateProject,
  deleteProject,
  archiveProject,
  userProjects,
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticateUser, allProjects)
  .post(authenticateUser, createProject);

router.route("/user-projects").get(authenticateUser, userProjects);

router.route("/archive/:id").patch(authenticateUser, archiveProject);

router
  .route("/:id")
  .get(authenticateUser, singleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);

module.exports = router;

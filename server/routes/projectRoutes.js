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
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticateUser, allProjects)
  .post(authenticateUser, createProject);

router.route("/archive/:id").patch(archiveProject);

router
  .route("/:id")
  .get(authenticateUser, singleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);

module.exports = router;

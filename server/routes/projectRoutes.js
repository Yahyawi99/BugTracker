const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allProjects,
  singleProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticateUser, allProjects)
  .post(authenticateUser, createProject);

router
  .route("/:id")
  .get(authenticateUser, singleProject)
  .put(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);

module.exports = router;

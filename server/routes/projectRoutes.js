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
  assignManager,
  assignTeamMembers,
} = require("../controllers/projectController");

router
  .route("/")
  .get(authenticateUser, allProjects)
  .post(authenticateUser, createProject);

router.route("/user-projects").get(authenticateUser, userProjects);

router.route("/manage-pm/:id").patch(authenticateUser, assignManager);
router.route("/manage-team/:id").patch(authenticateUser, assignTeamMembers);

router.route("/archive/:id").patch(authenticateUser, archiveProject);

router
  .route("/:id")
  .get(authenticateUser, singleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);

module.exports = router;

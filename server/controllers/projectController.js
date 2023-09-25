const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const Ticket = require("../model/Ticket");

// get all projects
const allProjects = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const projects = await Project.find({})
    .populate({
      path: "managedBy",
      select: "name avatar",
    })
    .skip(skip)
    .limit(limit);

  projects.forEach(async (project) => {
    await project.projectTeam();
    await project.save();
  });

  const numOfPages = Math.ceil(projects.length / limit);

  res
    .status(StatusCodes.OK)
    .json({ projects, numOfPages, count: projects.length });
};

// get single project
const singleProject = async (req, res) => {
  res.send("one");
};

// create project
const createProject = async (req, res) => {
  res.send("create");
};

// update project
const updateProject = async (req, res) => {
  res.send("update");
};

// delete project
const deleteProject = async (req, res) => {
  res.send("delete");
};

module.exports = {
  allProjects,
  singleProject,
  createProject,
  updateProject,
  deleteProject,
};

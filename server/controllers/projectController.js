const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const Ticket = require("../model/Ticket");

// get all projects
const allProjects = async (req, res) => {
  const projects = await Project.find({}).populate({
    path: "tickets",
  });

  console.log(projects);

  res.status(StatusCodes.OK).json({ projects, count: projects.length });
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

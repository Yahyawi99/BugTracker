const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const Ticket = require("../model/Ticket");

// get all projects
const allProjects = async (req, res) => {
  const { sort } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let projects = Project.find({})
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

  // **************
  // sorting
  if (sort) {
    console.log(sort);
  }

  const totalProjects = await Project.countDocuments();
  const numOfPages = Math.ceil(totalProjects / limit);

  const count = projects.length;

  res
    .status(StatusCodes.OK)
    .json({ projects, numOfPages, currentPage: page, count, totalProjects });
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

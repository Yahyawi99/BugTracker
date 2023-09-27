const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const CustomErros = require("../errors");

// get all projects
const allProjects = async (req, res) => {
  const { sort, search } = req.query;

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

  // **************
  // sorting
  if (sort) {
    if (sort === "Project") {
      projects = projects.sort("name");
    }

    if (sort === "-Project") {
      projects = projects.sort("-name");
    }

    if (sort === "End Date") {
      projects = projects.sort("endDate");
    }

    if (sort === "-End Date") {
      projects = projects.sort("-endDate");
    }
  }

  // search
  if (search) {
    projects = projects.find({ name: { $regex: search, $options: "i" } });
  }

  projects = await projects;

  projects.forEach(async (project) => {
    await project.projectTeam();
    await project.save();
  });

  const totalProjects = await Project.countDocuments();
  const numOfPages = Math.ceil(totalProjects / limit);

  const count = projects.length;

  res
    .status(StatusCodes.OK)
    .json({ projects, numOfPages, currentPage: page, count, totalProjects });
};

// get single project
const singleProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.find({ _id: projectId }).populate("tickets");

  if (!project) {
    throw new CustomErros.NotFoundError(`No project with id :${projectId}`);
  }

  res.status(StatusCodes.OK).json({ project });
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

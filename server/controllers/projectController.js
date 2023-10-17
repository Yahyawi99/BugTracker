const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const Ticket = require("../model/Ticket");
const User = require("../model/User");

const CustomErrors = require("../errors");
const { default: isBoolean } = require("validator/lib/isBoolean");

// get all projects
const allProjects = async (req, res) => {
  const { sort, search, isArchived } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let projects;

  if (isArchived === "all") {
    projects = Project.find({});
  } else {
    projects = Project.find({ isArchived: isBoolean(isArchived) });
  }

  projects = projects
    .populate({
      path: "managedBy tickets",
      select: "name avatar",
    })
    .skip(skip)
    .limit(limit);

  // **************
  // sorting
  if (sort) {
    if (sort === "Project") {
      projects = projects.sort("-name");
    }

    if (sort === "-Project") {
      projects = projects.sort("name");
    }

    if (sort === "End Date") {
      projects = projects.sort("-endDate");
    }

    if (sort === "-End Date") {
      projects = projects.sort("endDate");
    }
  }

  // search
  if (search) {
    projects = projects.find({ name: { $regex: search, $options: "i" } });
  }

  projects = await projects;

  // Create Team Arr
  projects.forEach(async (project) => {
    await project.projectTeam(User);
    await project.save();
  });

  // *************
  const totalProjects = await Project.countDocuments({
    isArchived: isBoolean(isArchived),
  });
  const numOfPages = Math.ceil(totalProjects / limit);

  const count = projects.length;

  res
    .status(StatusCodes.OK)
    .json({ projects, numOfPages, currentPage: page, count, totalProjects });
};

// get single project
const singleProject = async (req, res) => {
  const { id: projectId } = req.params;
  const { sort, search } = req.query;

  const project = await Project.findOne({ _id: projectId }).populate(
    "managedBy"
  );

  if (!project) {
    throw new CustomErrors.NotFoundError(`No project with id :${projectId}`);
  }

  // create team Arr
  await project.projectTeam(User);
  await project.save();

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  let associatedTickets = Ticket.find({
    project: projectId,
  })
    .populate("assignedTo")
    .limit(limit)
    .skip(skip);

  // search
  if (search) {
    associatedTickets = associatedTickets.find({
      title: { $regex: search, $options: "i" },
    });
  }

  // sort
  if (sort) {
    switch (sort) {
      case "Title":
        associatedTickets = associatedTickets.sort("-title");
        break;

      case "-Title":
        associatedTickets = associatedTickets.sort("title");
        break;

      case "Developer":
        associatedTickets = associatedTickets.sort("-assignedTo");
        break;

      case "-Developer":
        associatedTickets = associatedTickets.sort("assignedTo");
        break;

      case "Status":
        associatedTickets = associatedTickets.sort("-status");
        break;

      case "-Status":
        associatedTickets = associatedTickets.sort("status");
        break;

      case "Priority":
        associatedTickets = associatedTickets.sort("-priority");
        break;

      case "-Priority":
        associatedTickets = associatedTickets.sort("priority");
        break;

      case "Date":
        associatedTickets = associatedTickets.sort("-createdAt");
        break;

      case "-Date":
        associatedTickets = associatedTickets.sort("createdAt");
        break;

      default:
        associatedTickets = associatedTickets.sort("");
        break;
    }
  }

  associatedTickets = await associatedTickets;

  // ***********************
  const totalAssociatedTickets = await Ticket.countDocuments({
    project: projectId,
  });
  const numOfPages = Math.ceil(totalAssociatedTickets / limit);

  const count = associatedTickets.length;

  res.status(StatusCodes.OK).json({
    project,
    tickets: {
      associatedTickets,
      numOfPages,
      currentPage: page,
      count,
      totalAssociatedTickets,
    },
  });
};

// create project
const createProject = async (req, res) => {
  const { name, description, startDate, endDate, priority, managedBy } =
    req.body;
  const { userId } = req.user;

  const data = {
    name,
    description,
    startDate,
    endDate,
    priority,
    createdBy: userId,
  };

  if (managedBy._id) {
    data.managedBy = managedBy._id;
  }

  await Project.create(data);

  res.status(StatusCodes.CREATED).json({ msg: "Project Created" });
};

// update project
const updateProject = async (req, res) => {
  const { name, description, endDate, startDate, priority, managedBy } =
    req.body;
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  if (!project) {
    throw new CustomErrors.NotFoundError(`No project with id : ${id}`);
  }

  project.name = name;
  project.description = description;
  project.startDate = startDate;
  project.endDate = endDate;
  project.priority = priority;
  project.managedBy = managedBy;

  await project.save();

  res.status(StatusCodes.OK).json({ project });
};

// archive project
const archiveProject = async (req, res) => {
  const { isArchived } = req.body;
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  project.isArchived = isArchived;

  await project.save();

  res.status(StatusCodes.OK).json({ project });
};

// My projects
const userProjects = async (req, res) => {
  const { sort, search } = req.query;
  const { userId } = req.user;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let projects = Project.find({ createdBy: userId })
    .populate({
      path: "managedBy tickets",
      select: "name avatar",
    })
    .skip(skip)
    .limit(limit);

  // **************
  // sorting
  if (sort) {
    if (sort === "Project") {
      projects = projects.sort("-name");
    }

    if (sort === "-Project") {
      projects = projects.sort("name");
    }

    if (sort === "End Date") {
      projects = projects.sort("-endDate");
    }

    if (sort === "-End Date") {
      projects = projects.sort("endDate");
    }
  }

  // search
  if (search) {
    projects = projects.find({ name: { $regex: search, $options: "i" } });
  }

  projects = await projects;

  // Create Team Arr
  projects.forEach(async (project) => {
    await project.projectTeam(User);
    await project.save();
  });

  // *************
  const totalProjects = await Project.countDocuments({
    createdBy: userId,
  });
  const numOfPages = Math.ceil(totalProjects / limit);

  const count = projects.length;

  res
    .status(StatusCodes.OK)
    .json({ projects, numOfPages, currentPage: page, count, totalProjects });
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
  archiveProject,
  userProjects,
};

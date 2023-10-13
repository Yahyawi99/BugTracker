const { StatusCodes } = require("http-status-codes");
const { default: isBoolean } = require("validator/lib/isBoolean");
const Ticket = require("../model/Ticket");
const History = require("../model/History");
const CustomError = require("../errors");

// get all tickets
const allTickets = async (req, res) => {
  const { sort, search, isArchived } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let tickets;

  if (isArchived === "all") {
    tickets = Ticket.find({});
  } else {
    tickets = Ticket.find({ isArchived: isBoolean(isArchived) });
  }

  tickets = tickets.populate("project").skip(skip).limit(limit);

  // **************
  // sorting
  if (sort) {
    if (sort === "Title") {
      tickets = tickets.sort("title");
    }

    if (sort === "-Title") {
      tickets = tickets.sort("-title");
    }

    if (sort === "Date") {
      tickets = tickets.sort("createdAt");
    }

    if (sort === "-Date") {
      tickets = tickets.sort("-createdAt");
    }

    if (sort === "Priority") {
      tickets = tickets.sort("priority");
    }

    if (sort === "-Priority") {
      tickets = tickets.sort("-priority");
    }
  }

  // search
  if (search) {
    tickets = tickets.find({ title: { $regex: search, $options: "i" } });
  }

  // ***************
  tickets = await tickets;

  const totalTickets = await Ticket.countDocuments({
    isArchived: isBoolean(isArchived + ""),
  });
  const numOfPages = Math.ceil(totalTickets / limit);

  const count = tickets.length;

  res
    .status(StatusCodes.OK)
    .json({ tickets, numOfPages, currentPage: page, count, totalTickets });
};

// get single ticket
const singleTicket = async (req, res) => {
  const { id } = req.params;

  const ticket = await Ticket.findOne({ _id: id }).populate(
    "project assignedTo"
  );

  if (!ticket) {
    throw new CustomError.NotFoundError(`No Ticket with id :${id}`);
  }

  await ticket.save();

  const history = await History.find({ ticket: id }).populate("actionBy");

  res.status(StatusCodes.OK).json({ ticket, history });
};

// create Ticket
const createTicket = async (req, res) => {
  res.send("create");
};

// archive ticket
const archiveTicket = async (req, res) => {
  const { isArchived } = req.body;
  const { id } = req.params;

  const ticket = await Ticket.findOne({ _id: id });

  ticket.isArchived = isArchived;

  await ticket.save();

  res.status(StatusCodes.OK).json({ ticket });
};

// My tickets
const userTickets = async (req, res) => {
  const { sort, search } = req.query;
  const { userId } = req.user;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let tickets = Ticket.find({ assignedBy: userId })
    .populate("assignedTo")
    .skip(skip)
    .limit(limit);

  // **************
  // sorting
  if (sort) {
    if (sort === "Title") {
      tickets = tickets.sort("title");
    }

    if (sort === "-Title") {
      tickets = tickets.sort("-title");
    }

    if (sort === "Date") {
      tickets = tickets.sort("createdAt");
    }

    if (sort === "-Date") {
      tickets = tickets.sort("-createdAt");
    }

    if (sort === "Priority") {
      tickets = tickets.sort("priority");
    }

    if (sort === "-Priority") {
      tickets = tickets.sort("-priority");
    }
  }

  // search
  if (search) {
    tickets = tickets.find({ title: { $regex: search, $options: "i" } });
  }

  // ***************
  tickets = await tickets;

  const totalTickets = await Ticket.countDocuments({ assignedBy: userId });
  const numOfPages = Math.ceil(totalTickets / limit);

  const count = tickets.length;

  res
    .status(StatusCodes.OK)
    .json({ tickets, numOfPages, currentPage: page, count, totalTickets });
};

// update Ticket
const updateTicket = async (req, res) => {
  res.send("update");
};

// delete Ticket
const deleteTicket = async (req, res) => {
  res.send("delete");
};

module.exports = {
  allTickets,
  singleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  archiveTicket,
  userTickets,
};

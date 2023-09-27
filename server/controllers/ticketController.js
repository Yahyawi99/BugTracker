const { StatusCodes } = require("http-status-codes");
const Ticket = require("../model/Ticket");

// get all tickets
const allTickets = async (req, res) => {
  const { sort, search } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let tickets = Ticket.find({}).skip(skip).limit(limit);
  // const tickets = await Ticket.find({});

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

  const totalTickets = await Ticket.countDocuments();
  const numOfPages = Math.ceil(totalTickets / limit);

  const count = tickets.length;

  res
    .status(StatusCodes.OK)
    .json({ tickets, numOfPages, currentPage: page, count, totalTickets });
};

// get single ticket
const singleTicket = async (req, res) => {
  res.send("one");
};

// create Ticket
const createTicket = async (req, res) => {
  res.send("create");
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
};

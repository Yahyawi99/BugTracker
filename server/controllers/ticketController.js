const { StatusCodes } = require("http-status-codes");
const Ticket = require("../model/Ticket");

// get all tickets
const allTickets = async (req, res) => {
  const tickets = await Ticket.find({});

  res.status(StatusCodes.OK).json({ tickets, count: tickets.length });
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

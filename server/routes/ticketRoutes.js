const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth");

const {
  allTickets,
  singleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  archiveTicket,
  userTickets,
  unassignedTickets,
  assignTicketTo,
} = require("../controllers/ticketController");

router
  .route("/")
  .get(authenticateUser, allTickets)
  .post(authenticateUser, createTicket);

router.route("/user-tickets").get(authenticateUser, userTickets);

router.route("/unassigned-tickets").get(authenticateUser, unassignedTickets);

router.route("/assign-to/:id").post(authenticateUser, assignTicketTo);

router.route("/archive/:id").patch(authenticateUser, archiveTicket);

router
  .route("/:id")
  .get(authenticateUser, singleTicket)
  .patch(authenticateUser, updateTicket)
  .delete(authenticateUser, deleteTicket);

module.exports = router;

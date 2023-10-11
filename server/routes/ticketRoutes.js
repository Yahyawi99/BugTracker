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
} = require("../controllers/ticketController");

router
  .route("/")
  .get(authenticateUser, allTickets)
  .post(authenticateUser, createTicket);

router.route("/archive/:id").patch(authenticateUser, archiveTicket);

router
  .route("/:id")
  .get(authenticateUser, singleTicket)
  .patch(authenticateUser, updateTicket)
  .delete(authenticateUser, deleteTicket);

module.exports = router;

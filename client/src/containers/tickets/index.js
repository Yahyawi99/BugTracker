import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllTickets from "./all-tickets";
import TicketDetails from "./ticketDetails";
import ArchivedTickets from "./archived-tickets";
import MyTickets from "./MyTickets";
import EditTicket from "./EditTicket";
import CreateTicket from "./CreateTicket";
import UnassignedTickets from "./UnassignedTickets";

const Tickets = () => {
  return (
    <>
      <Routes>
        <Route path="/all-tickets" Component={AllTickets} />
        <Route path="/ticket-details/:ticketId" Component={TicketDetails} />
        <Route path="/archived-tickets" Component={ArchivedTickets} />
        <Route path="/edit-ticket/:ticketId" Component={EditTicket} />
        <Route path="/create-ticket" Component={CreateTicket} />
        <Route path="/user-tickets" Component={MyTickets} />
        <Route path="/unassigned-tickets" Component={UnassignedTickets} />
      </Routes>
    </>
  );
};
export default Tickets;

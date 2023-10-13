import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllTickets from "./all-tickets";
import TicketDetails from "./ticketDetails";
import ArchivedTickets from "./archived-tickets";
import MyTickets from "./MyTickets";

const Tickets = () => {
  return (
    <>
      <Routes>
        <Route path="/all-tickets" Component={AllTickets} />
        <Route path="/ticket-details/:ticketId" Component={TicketDetails} />
        <Route path="/archived-tickets" Component={ArchivedTickets} />
        <Route path="/user-tickets" Component={MyTickets} />
      </Routes>
    </>
  );
};
export default Tickets;

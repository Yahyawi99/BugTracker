import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllTickets from "./all-tickets";
import TicketDetails from "./ticketDetails";

const Tickets = () => {
  return (
    <>
      <Routes>
        <Route path="/all-tickets" Component={AllTickets} />
        <Route path="/ticket-details/:ticketId" Component={TicketDetails} />
      </Routes>
    </>
  );
};
export default Tickets;

import React from "react";
// hooks
import useTickets from "../../hooks/useTickets";
// components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/tickets/all-tickets.css";

const AllTickets = () => {
  const { getAllTickets, allTickets } = useTickets();

  return (
    <ShowAllDocuments
      sectionName="All Tickets"
      controller={getAllTickets}
      labels={[
        "Assigned by",
        "Assigned to",
        "Title",
        "Status",
        "Priority",
        "Date",
        "Action",
      ]}
      sortLabels={["Title", "Date", "Priority"]}
      data={allTickets}
    />
  );
};

export default AllTickets;

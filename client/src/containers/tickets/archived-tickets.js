import React from "react";
// hooks
import useTickets from "../../hooks/useTickets";

const ArchivedTickets = () => {
  const { getAllTickets, allTickets, archiveTicket } = useTickets();

  return (
    <ShowAllDocuments
      sectionName="Archived Tickets"
      controller={getAllTickets}
      archiveController={archiveTicket}
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
      isArchived={true}
    />
  );
};

export default ArchivedTickets;

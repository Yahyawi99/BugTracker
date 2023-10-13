import React from "react";
// hooks
import useTickets from "../../hooks/useTickets";
// compenent
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";

const MyTickets = () => {
  const { getUserTickets, userTickets, archiveTicket } = useTickets();

  return (
    <ShowAllDocuments
      sectionName="My Tickets"
      controller={getUserTickets}
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
      data={userTickets}
    />
  );
};

export default MyTickets;

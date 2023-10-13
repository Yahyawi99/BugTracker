import React from "react";
// hooks
import useTickets from "../../hooks/useProjects";
// compenent
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";

const MyTickets = () => {
  const { getUserProjects, userProjects, archiveProject } = useProjects();

  return (
    <ShowAllDocuments
      sectionName="My Projects"
      controller={getUserProjects}
      archiveController={archiveProject}
      labels={[
        "Project",
        "End Date",
        "Progress",
        "Project Manager",
        "Team",
        "Status",
        "Action",
      ]}
      sortLabels={["Project", "End Date"]}
      data={userProjects}
    />
  );
};

export default MyTickets;

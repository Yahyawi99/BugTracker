import React from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";

const ArchivedProjects = () => {
  const { getAllProjects, allProjects, archiveProject } = useProjects();

  return (
    <ShowAllDocuments
      sectionName="Archived Projects"
      controller={getAllProjects}
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
      data={allProjects}
      isArchived={true}
    />
  );
};

export default ArchivedProjects;

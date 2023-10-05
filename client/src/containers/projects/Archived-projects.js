import React from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/archived-projects.css";

const ArchivedProjects = () => {
  const { getAllProjects, allProjects, editProject } = useProjects();

  return (
    <ShowAllDocuments
      sectionName="All Projects"
      controller={getAllProjects}
      editController={editProject}
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

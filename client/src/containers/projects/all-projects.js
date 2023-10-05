import React, { useEffect, useLayoutEffect } from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// Components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
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
      isArchived={false}
    />
  );
};

export default AllProjects;

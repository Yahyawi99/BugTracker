import React from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// Components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
  const { getAllProjects, allProjects } = useProjects();

  return (
    <ShowAllDocuments
      sectionName="All Projects"
      controller={getAllProjects}
      labels={[
        "Project",
        "End Date",
        "Progress",
        "Project Manager",
        "Team",
        "Status",
        "Action",
      ]}
      data={allProjects}
    />
  );
};

export default AllProjects;

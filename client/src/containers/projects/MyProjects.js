import React from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// compenent
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/my-projects.css";

const MyProjects = () => {
  const {} = useProjects();

  return (
    <ShowAllDocuments
      sectionName="My Projects"
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
    />
  );
};

export default MyProjects;

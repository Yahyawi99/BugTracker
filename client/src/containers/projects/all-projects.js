// hooks
import useProjects from "../../hooks/useProjects";
// Components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
  const { getAllProjects, allProjects, archiveProject } = useProjects();

  return (
    <ShowAllDocuments
      sectionName="All Projects"
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

export default AllProjects;

import React, { useEffect } from "react";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/manage-projects.css";

const ManageProjects = () => {
  const { getAllProjects, allProjects } = useProjects();

  useEffect(() => {
    getAllProjects(1, "", "", "", "all");
  }, []);

  return (
    <section>
      <HomeBtn name="Manage Projects" />

      <div className="projectsContainer">
        {allProjects.projects &&
          allProjects.projects.map((project) => {
            const { _id, name } = project;

            return (
              <div key={_id} className="project">
                {name}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ManageProjects;

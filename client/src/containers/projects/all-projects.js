import React, { useEffect } from "react";
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
  const { getAllProjects, allProjects } = useProjects();

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <section className="allProjectsSection">
      <HomeBtn name="All Projects" />

      <div>
        <div>
          <div className="sectionHeader"></div>
        </div>

        <div className="labels">
          <div>
            <p>Project</p>
          </div>

          <div>
            <p>End Date</p>
          </div>

          <div>
            <p>Progress</p>
          </div>

          <div>
            <p>Project Manager</p>
          </div>

          <div>
            <p>Team</p>
          </div>

          <div>
            <p>Status</p>
          </div>

          <div></div>
        </div>

        <div>
          <div className="projectName"></div>

          {/* <div className="date"></div>

          <div className="progress"></div>

          <div className="projectManager"></div>

          <div className="team"></div>

          <div className="status"></div>

          <div className="btns"></div> */}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;

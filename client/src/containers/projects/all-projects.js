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
          <div>
            <div className="sectionHeader"></div>
          </div>

          <div className="labels">
            {[
              "Project",
              "End Date",
              "Progress",
              "Project Manager",
              "Team",
              "Status",
              "",
            ].map((label) => {
              return (
                <div>
                  <p>{label}</p>

                  {label && (
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
                      </svg>

                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z" />
                    </svg> */}
                    </i>
                  )}
                </div>
              );
            })}
            {/* <div>
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

            <div></div> */}
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
      </div>
    </section>
  );
};

export default AllProjects;

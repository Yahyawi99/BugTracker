import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// utils
import progress from "../../utils/progress";
// icons
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/manage-projects.css";

const ManageProjects = () => {
  const { getAllProjects, allProjects, archiveProject } = useProjects();

  useEffect(() => {
    getAllProjects(1, "", "", "", "all");
  }, []);

  return (
    <section className="ManageProjectsSection">
      <HomeBtn name="Manage Projects" />

      <div className="projectsContainer">
        {allProjects.projects &&
          allProjects.projects.map((project) => {
            const {
              _id,
              name,
              priority,
              isArchive,
              description,
              team,
              tickets,
              startDate,
              endDate,
            } = project;

            return (
              <div key={_id} className="project">
                <div>
                  <div>
                    <p className="name">{name}</p>
                    <p className="priority">{priority}</p>
                  </div>

                  <i className="arrow-down">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </i>

                  <DropDownToggle
                    projectId={_id}
                    isArchive={isArchive}
                    archiveProject={archiveProject}
                  />
                </div>

                <div>
                  <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>

                <div>
                  <div>
                    <p>Team :</p>
                    {team.length ? (
                      <div className="team">
                        {team.map((user) => {
                          const { avatar } = user;

                          return <img src={avatar} alt="user" />;
                        })}
                      </div>
                    ) : (
                      <div className="noTeam">No Assigned Members</div>
                    )}
                  </div>

                  <button type="button">Manage Team</button>
                </div>

                <div className="progress">
                  <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: `${progress(startDate, endDate)}%` }}
                    transition={{ duration: 1 }}
                  ></motion.p>
                </div>

                <div>
                  <p>Tickets :</p>
                  <p>{tickets.length}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

// **************************
const DropDownToggle = (props) => {
  const { projectId, isArchive, archiveProject } = props;

  return (
    <div className="dropDown">
      <Link to={`/projects/project-details/${projectId}`}>
        <button>View</button>
      </Link>

      <Link to={`/projects/edit-project/${projectId}`}>
        <button>Edit</button>
      </Link>

      <button onClick={() => archiveProject(projectId, !isArchive)}>
        Archive
      </button>
    </div>
  );
};

export default ManageProjects;

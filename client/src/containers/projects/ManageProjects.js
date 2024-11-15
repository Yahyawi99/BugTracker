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

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;

const ManageProjects = () => {
  const { getAllProjects, allProjects, archiveProject } = useProjects();

  useEffect(() => {
    getAllProjects(1, "", "", "", "all");
    // eslint-disable-next-line
  }, []);

  // Drop down
  const toggleDropDown = (icon) => {
    icon.nextSibling.classList.toggle("showDropDown");
  };

  return (
    <section className="ManageProjectsSection">
      <HomeBtn name="Manage Projects" />

      <div className="manageProjectsContainer">
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

            const members = team[0].members;

            return (
              <div key={_id} className="project">
                <div>
                  <div>
                    <p className="name">{name}</p>
                    <p className="priority">{priority}</p>
                  </div>

                  <i
                    onClick={(e) => toggleDropDown(e.currentTarget)}
                    className="arrow-down"
                  >
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

                    {members.length ? (
                      <div className="team">
                        {members.map((user) => {
                          const { _id, avatar } = user;

                          return <img key={_id} src={avatar} alt="user" />;
                        })}
                      </div>
                    ) : (
                      <div className="noTeam">No Assigned Members</div>
                    )}
                  </div>

                  {USER_ROLE === "admin" && (
                    <Link to={`/admin/manage-team/${project._id}`}>
                      <button type="button">Manage Team</button>
                    </Link>
                  )}
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

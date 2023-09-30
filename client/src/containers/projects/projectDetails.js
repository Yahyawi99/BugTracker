import React, { useEffect, useState } from "react";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// hooks
import useProjects from "../../hooks/useProjects";
import { useParams } from "react-router-dom";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import Labels from "../../components/shared/Labels";
// css
import "../../styles/containers/projects/project-details.css";

const ProjectDetails = () => {
  const { getSingleProject, singleProject } = useProjects();
  const { projectId } = useParams();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getSingleProject(projectId);
  }, []);

  const {
    name,
    description,
    startDate,
    endDate,
    priority,
    status,
    team,
    tickets,
  } = singleProject;

  // manager
  const manager = team && team.filter((user) => user.role === "PM");

  return (
    singleProject && (
      <section className="DocumentDetails">
        <HomeBtn name="Details" />

        <div className="details">
          <div className="first-column">
            <div className="row-one">
              <h1>{name}</h1>
              <p>{description}</p>

              <div className="progress">
                <p>Progress Status:</p>
                <div>
                  {startDate && (
                    <div
                      style={{ width: progress(startDate, endDate) + "%" }}
                      className="thumb"
                    >
                      <p>{progress(startDate, endDate)}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="action">
                <button>Edit Project</button>
                <button>Archive Project</button>
              </div>
            </div>

            <div className="row-two">
              <div className="created">
                <p>Created</p>
                <p>
                  {startDate &&
                    formatDate(startDate, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="deadline">
                <p>Deadline</p>
                <p>
                  {endDate &&
                    formatDate(endDate, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="priority">
                <p>Priority</p>
                <p className={`${priority}`}>{priority}</p>
              </div>

              <div className="status">
                <p>Status</p>
                <p className={`${status}`}>{status}</p>
              </div>
            </div>

            <div className="row-three">
              <h3>Project Team</h3>
              <p>{team && team.length} team members</p>

              {manager && !!manager.length ? (
                manager.map((info) => {
                  const { _id, avatar, name, email } = info;

                  return (
                    <div key={_id} className="manager">
                      <img src={avatar} alt="manager" className="avatar" />

                      <div className="managerInfo">
                        <p className="name">{name}</p>
                        <p>{email}</p>
                        <p>Project Manager</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="noManager">
                  <p>No Project Manager Assigned</p>
                  <button>Assign Project Manager</button>
                </div>
              )}

              <div className="team">
                {team &&
                  team.map((user) => {
                    const { _id, name, avatar, role } = user;

                    return (
                      <div key={_id} className="user">
                        <img src={avatar} alt="user" className="avatar" />

                        <div className="userInfo">
                          <p>{name}</p>
                          <p className="role">{role}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <button type="button">Manage Team</button>
            </div>
          </div>

          <div className="second-column">
            <div>
              <LimitAndSearch
                controller={getSingleProject}
                currentPage={1}
                states={{
                  limit,
                  setLimit,
                  dropDown,
                  setDropDown,
                  searchInput,
                  setSearchInput,
                }}
              />

              <Labels
                labels={[
                  "Title",
                  "Developer",
                  "Status",
                  "Priority",
                  "Date",
                  "Action",
                ]}
                sortLabels={[
                  "Title",
                  "Developer",
                  "Status",
                  "Priority",
                  "Date",
                ]}
                controller={getSingleProject}
                data={singleProject}
                states={{ limit, searchInput }}
              />

              <div className="tickets"></div>
              <div className="pagination"></div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default ProjectDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
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
import Pagination from "../../components/shared/Pagination";
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

  if (
    singleProject.hasOwnProperty("project") &&
    singleProject.hasOwnProperty("tickets")
  ) {
    var {
      project: {
        name,
        description,
        startDate,
        endDate,
        priority,
        status,
        team,
        managedBy,
      },
      tickets,
    } = singleProject;
  }

  return (
    singleProject.tickets &&
    singleProject.project && (
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

              {managedBy ? (
                <div key={managedBy._id} className="manager">
                  <img
                    src={managedBy.avatar}
                    alt="manager"
                    className="avatar"
                  />

                  <div className="managerInfo">
                    <p className="name">{managedBy.name}</p>
                    <p>{managedBy.email}</p>
                    <p>Project Manager</p>
                  </div>
                </div>
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
                projectId={projectId}
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
                projectId={projectId}
              />
              <div className="tickets">
                <Tickets tickets={tickets.associatedTickets} />
              </div>
              {tickets && (
                <Pagination
                  controller={getSingleProject}
                  states={{ limit, searchInput }}
                  data={singleProject.tickets}
                  projectId={projectId}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

const ActionBtn = () => {
  return (
    <div className="btns">
      <Link to={``}>
        <button className="details">
          <FontAwesomeIcon icon={faEye} />
        </button>
      </Link>

      <button className="edit">
        <FontAwesomeIcon icon={faPencil} />
      </button>

      <button className="archive">
        <FontAwesomeIcon icon={faBoxArchive} />
      </button>
    </div>
  );
};

const Tickets = ({ tickets }) => {
  return tickets.map((ticket) => {
    const { _id, title, assignedTo, status, priority, createdAt } = ticket;

    return (
      <div key={_id}>
        <div className="title">
          <p>{title}</p>
        </div>

        <div className="dev">
          <p>{assignedTo.name}</p>
        </div>

        <div className="status">
          <p className={`${status}`}>{status}</p>
        </div>

        <div className="priority">
          <p className={`${priority}`}>{priority}</p>
        </div>

        <div>
          <p>
            {formatDate(createdAt, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </p>
        </div>
        <ActionBtn />
      </div>
    );
  });
};

export default ProjectDetails;

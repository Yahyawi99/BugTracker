import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// hooks
import useProjects from "../../hooks/useProjects";
import useTickets from "../../hooks/useTickets";
import { useParams } from "react-router-dom";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
// css
import "../../styles/containers/projects/project-details.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;
const USER_NAME = JSON.parse(localStorage.getItem("user"))?.name;
const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

const ProjectDetails = () => {
  const { getSingleProject, singleProject, archiveProject } = useProjects();
  const { archiveTicket } = useTickets();

  const { projectId } = useParams();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getSingleProject(projectId);
    // eslint-disable-next-line
  }, []);

  // handle the undefined errors
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
    } = singleProject;

    var members = team[0]?.members;
  }

  return (
    singleProject.tickets &&
    singleProject.project && (
      <section className="projectDetails">
        <HomeBtn name="Details" />

        <div className="details">
          <div className="first-column">
            <div className="row-one">
              <h1>{name}</h1>
              <p dangerouslySetInnerHTML={{ __html: description }} />

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

              {(USER_NAME === managedBy?.name || USER_ROLE === "admin") && (
                <div className="action">
                  <Link to={`/projects/edit-project/${projectId}`}>
                    <button className="editBtn">Edit Project</button>
                  </Link>

                  {singleProject.project.isArchived ? (
                    <button
                      onClick={() => {
                        archiveProject(projectId, false);
                      }}
                      className="unarchive"
                    >
                      Unarchive Project
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        archiveProject(projectId, true);
                      }}
                      className="archive"
                    >
                      Archive Project
                    </button>
                  )}
                </div>
              )}
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

              <p>{members && members.length} team members</p>

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

                  {USER_ROLE === "admin" && (
                    <Link to={`/admin/manage-pm/${projectId}`}>
                      <button>Assign Project Manager</button>
                    </Link>
                  )}
                </div>
              )}

              <div className="team">
                {members &&
                  members.map((user) => {
                    const { _id, name, avatar, role } = user;

                    return (
                      role !== "PM" && (
                        <div key={_id} className="user">
                          <img src={avatar} alt="user" className="avatar" />

                          <div className="userInfo">
                            <p>{name}</p>
                            <p className="role">{role}</p>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>

              {(USER_NAME === managedBy?.name || USER_ROLE === "admin") && (
                <Link to={`/admin/manage-team/${projectId}`}>
                  <button type="button">Manage Team</button>
                </Link>
              )}
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

              <div className="table">
                <Table
                  data={singleProject}
                  archiveTicket={archiveTicket}
                  getSingleProject={getSingleProject}
                  limit={limit}
                  searchInput={searchInput}
                  projectId={projectId}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// ========================
const Table = ({
  data,
  archiveTicket,
  getSingleProject,
  limit,
  searchInput,
  projectId,
}) => {
  const {
    tickets: {
      associatedTickets: tickets,
      numOfPages,
      currentPage,
      count,
      totalAssociatedTickets: totalTickets,
    },
  } = data;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <table summary="Company Projects">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr>
          {["Title", "Developer", "Status", "Priority", "Date", "Action"].map(
            (value, i) => {
              return (
                <th key={i}>
                  <TableHead value={value} />
                </th>
              );
            }
          )}
        </tr>
      </thead>

      <tbody>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => {
            return (
              <tr key={ticket._id}>
                <Ticket ticket={ticket} archiveTicket={archiveTicket} />
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7">
              <p className="noDocuments">No tickets to show</p>
            </td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="6">
            <div>
              <p className="count">
                {count ? count : 0} out of {totalTickets} documents
              </p>

              <div className="pagination">
                {numOfPages > 1 && (
                  <>
                    {currentPage > 1 && (
                      <button
                        className="prevPage"
                        onClick={() => {
                          getSingleProject(
                            projectId,
                            currentPage - 1,
                            "",
                            limit,
                            searchInput
                          );
                        }}
                      >
                        previous
                      </button>
                    )}

                    <div className="pages">
                      {numOfpagesArr &&
                        numOfpagesArr.map((num) => {
                          return (
                            <p
                              key={num}
                              onClick={() => {
                                getSingleProject(
                                  projectId,
                                  num,
                                  "",
                                  limit,
                                  searchInput
                                );
                              }}
                              className={`${
                                currentPage === num && "viewedPage"
                              }`}
                            >
                              {num}
                            </p>
                          );
                        })}
                    </div>

                    {currentPage < numOfPages && (
                      <button
                        className="nextPage"
                        onClick={() => {
                          getSingleProject(
                            projectId,
                            currentPage + 1,
                            "",
                            limit,
                            searchInput
                          );
                        }}
                      >
                        next
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const TableHead = ({ value }) => {
  return (
    <div>
      <p>{value}</p>

      {value !== "Action" && value !== "Manage Role" && (
        <i className="on">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
          </svg>
        </i>
      )}
    </div>
  );
};

const Ticket = ({ ticket, archiveTicket }) => {
  const {
    _id,
    title,
    assignedTo,
    status,
    priority,
    createdAt,
    isArchived,
    project,
  } = ticket;

  return (
    <>
      <td>
        <div className="title">
          <p>{title}</p>
        </div>
      </td>

      <td>
        <div className="dev">
          {assignedTo ? (
            <p>{assignedTo.name}</p>
          ) : USER_ROLE === "admin" || USER_ID === project?.managedBy ? (
            <Link to={`/tickets/assign-dev/${_id}`}>
              <button className="assignDevBtn">Assign Dev</button>
            </Link>
          ) : (
            <p className="unassigned">Unassigned</p>
          )}
        </div>
      </td>

      <td>
        <div className="status">
          <p className={`${status}`}>{status}</p>
        </div>
      </td>

      <td>
        <div className="priority">
          <p className={`${priority}`}>{priority}</p>
        </div>
      </td>

      <td>
        <div className="date">
          <p>
            {formatDate(createdAt, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </p>
        </div>
      </td>

      <td>
        <div className="btns">
          <Link to={`/tickets/ticket-details/${_id}`}>
            <button className="details">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>

          {USER_ROLE === "admin" && (
            <Link to={`/tickets/edit-ticket/${_id}`}>
              <button className="edit">
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </Link>
          )}

          {USER_ROLE === "admin" && isArchived && (
            <button
              onClick={() => {
                archiveTicket(_id, !isArchived);
              }}
              className="unarchive"
            >
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
          )}

          {USER_ROLE === "admin" && !isArchived && (
            <button
              onClick={() => {
                archiveTicket(_id, !isArchived);
              }}
              className="archive"
            >
              <FontAwesomeIcon icon={faBoxArchive} />
            </button>
          )}
        </div>
      </td>
    </>
  );
};

// const ActionBtn = ({ archiveTicket, ticketId, isArchived }) => {
//   return (
//     <div className="btns">
//       <Link to={`/tickets/ticket-details/${ticketId}`}>
//         <button className="details">
//           <FontAwesomeIcon icon={faEye} />
//         </button>
//       </Link>
//       {USER_ROLE === "admin" && (
//         <Link to={`/tickets/edit-ticket/${ticketId}`}>
//           <button className="edit">
//             <FontAwesomeIcon icon={faPencil} />
//           </button>
//         </Link>
//       )}

// {USER_ROLE === "admin" && isArchived && (
//   <button
//     onClick={() => {
//       archiveTicket(ticketId, !isArchived);
//     }}
//     className="unarchive"
//   >
//     <FontAwesomeIcon icon={faBoxOpen} />
//   </button>
// )}

// {USER_ROLE === "admin" && !isArchived && (
//   <button
//     onClick={() => {
//       archiveTicket(ticketId, !isArchived);
//     }}
//     className="archive"
//   >
//     <FontAwesomeIcon icon={faBoxArchive} />
//   </button>
// )}
// </div>
//   );
// };

export default ProjectDetails;

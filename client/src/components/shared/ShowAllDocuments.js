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
// components
import HomeBtn from "./HomeBtn";
import LimitAndSearch from "./LimitAndSearch";
import Pagination from "./Pagination";
import Labels from "./Labels";
// css
import "../../styles/components/shared/showAllDocuments.css";

const ShowAllDocuments = (props) => {
  const {
    sectionName,
    controller,
    labels,
    data,
    sortLabels,
    archiveController,
    isArchived,
  } = props;
  const { currentPage } = props.data;

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    controller(1, "", limit, searchInput, isArchived);
  }, []);

  return (
    data && (
      <section
        className={`getAllDocuments ${
          sectionName.indexOf("Tickets") !== -1
            ? "allTicketsSection"
            : "allProjectsSection"
        }`}
      >
        <HomeBtn name={sectionName} />

        <div>
          <div>
            <div>
              <LimitAndSearch
                controller={controller}
                currentPage={currentPage}
                states={{
                  limit,
                  setLimit,
                  dropDown,
                  setDropDown,
                  searchInput,
                  setSearchInput,
                }}
                isArchived={isArchived}
              />

              <Labels
                labels={labels}
                sortLabels={sortLabels}
                controller={controller}
                data={data}
                states={{ limit, searchInput }}
                isArchived={isArchived}
              />

              {/* Data */}
              {sectionName.indexOf("Tickets") !== -1 ? (
                <Tickets
                  tickets={data.tickets}
                  archiveController={archiveController}
                />
              ) : (
                <Projects
                  projects={data.projects}
                  archiveController={archiveController}
                />
              )}

              <Pagination
                controller={controller}
                states={{ limit, searchInput }}
                data={data}
                isArchived={isArchived}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// *******************
const Projects = ({ projects, archiveController }) => {
  return projects && projects.length ? (
    <div>
      {projects.map((project) => {
        const {
          _id,
          name,
          startDate,
          endDate,
          status,
          managedBy,
          team,
          isArchived,
        } = project;

        return (
          <div key={_id} className="document project">
            <div className="title">
              <p>{name && name}</p>
              <p>Created {formatDate(startDate)}</p>
            </div>

            <div className="endDate">
              {endDate && <p> {formatDate(endDate)}</p>}
            </div>

            <div className="progress">
              {endDate && startDate && (
                <>
                  <div className="progressBar">
                    <div
                      style={{
                        width: `${progress(startDate, endDate)}%`,
                      }}
                    ></div>
                  </div>
                  <p>{endDate && startDate && progress(startDate, endDate)}%</p>
                </>
              )}
            </div>

            <div className="pm">
              {managedBy ? (
                <>
                  <Link to={`/member-profile/${managedBy._id}`}>
                    <img src={`${managedBy.avatar}`} alt="pm" />
                  </Link>
                  <p>{managedBy.name}</p>
                </>
              ) : (
                <p className="unassigned">Unassigned</p>
              )}
            </div>

            <div className="team">
              {team.length > 0 &&
                team.map((user) => {
                  const { _id, avatar } = user;
                  return (
                    <Link to={`/member-profile/${_id}`}>
                      <img key={_id} src={`${avatar}`} alt="user" />
                    </Link>
                  );
                })}
            </div>

            <div className="status">
              <p className={`${status}`}>{status}</p>
            </div>

            <div className="btns">
              <Link to={`/projects/project-details/${_id}`}>
                <button className="details">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </Link>

              <Link to={`/projects/edit-project/${_id}`}>
                <button className="edit">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </Link>

              <button
                onClick={() => archiveController(_id, !isArchived)}
                className={`${isArchived ? "unarchive" : "archive"}`}
              >
                {isArchived ? (
                  <FontAwesomeIcon icon={faBoxOpen} />
                ) : (
                  <FontAwesomeIcon icon={faBoxArchive} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noDocuments">
      <p>No documents to show</p>
    </div>
  );
};

const Tickets = ({ tickets, archiveController }) => {
  return tickets && tickets.length ? (
    <div>
      {tickets.map((ticket) => {
        const {
          _id,
          title,
          createdAt,
          status,
          priority,
          isArchived,
          assignedTo,
          assignedBy,
        } = ticket;

        return (
          <div key={_id} className="document ticket">
            <div className="assignedBy">
              <p>{assignedBy.name}</p>
            </div>

            <div className="assignedTo">
              {assignedTo ? (
                <p>{assignedTo.name}</p>
              ) : (
                <p className="unassigned">Unassigned</p>
              )}
            </div>

            <div className="title">
              <p>{title}</p>
            </div>

            <div className="status">
              <p className={`${status}`}>{status}</p>
            </div>

            <div className="priority">
              <p className={`${priority}`}>{priority}</p>
            </div>

            <div className="date">
              <p>{createdAt ? formatDate(createdAt) : ""}</p>
            </div>

            <div className="btns">
              <Link to={`/tickets/ticket-details/${_id}`}>
                <button className="details">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </Link>

              <Link to={`/tickets/edit-ticket/${_id}`}>
                <button className="edit">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </Link>

              <button
                className={`${isArchived ? "unarchive" : "archive"}`}
                onClick={() => archiveController(_id, !isArchived)}
              >
                <FontAwesomeIcon icon={faBoxArchive} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noDocuments">
      <p>No documents to show</p>
    </div>
  );
};

export default ShowAllDocuments;

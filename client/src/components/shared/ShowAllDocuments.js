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
          sectionName === "All Tickets"
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
              {sectionName === "All Tickets" ? (
                data && <Tickets tickets={data.tickets} />
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
                  <img src={`${managedBy.avatar}`} alt="pm" />
                  <p>{managedBy.name}</p>
                </>
              ) : (
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Unassigned
                </p>
              )}
            </div>

            <div className="team">
              {team.length > 0 &&
                team.map((user) => {
                  const { _id, avatar } = user;
                  return <img key={_id} src={`${avatar}`} alt="user" />;
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
                onClick={() => {
                  isArchived
                    ? archiveController(_id, false)
                    : archiveController(_id, true);
                }}
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
const Tickets = ({ tickets }) => {
  return tickets && tickets.length ? (
    <div>
      {tickets.map((ticket) => {
        const { _id, title, createdAt, status, priority } = ticket;

        return (
          <div key={_id} className="document ticket">
            <div className="assignedBy">
              <p>Demo Admin</p>
            </div>

            <div className="assignedTo">
              <p>Demo Developer</p>
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

              <button className="edit">
                <FontAwesomeIcon icon={faPencil} />
              </button>

              <button className="archive">
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

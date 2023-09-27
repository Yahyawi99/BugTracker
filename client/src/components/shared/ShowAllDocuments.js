import React, { useEffect, useState } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// components
import HomeBtn from "./HomeBtn";
// css
import "../../styles/components/shared/showAllDocuments.css";

const ShowAllDocuments = (props) => {
  const { sectionName, controller, labels, data } = props;
  const { count, numOfPages, currentPage } = props.data;

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  useEffect(() => {
    controller(1, "", limit, searchInput);
  }, []);

  // sort
  const sort = (element, label) => {
    const sibling =
      element.nextElementSibling || element.previousElementSibling;

    if (element.classList.contains("on")) {
      element.classList.remove("on");
      sibling.classList.add("on");
    } else {
      element.classList.add("on");
      sibling.classList.remove("on");
    }

    controller(data.currentPage, label, limit, searchInput);
  };

  // limit
  const changeLimit = (element) => {
    if (element.dataset.value) {
      setLimit(element.dataset.value);
      setDropDown(false);
    }
  };

  useEffect(() => {
    controller(currentPage, "", limit, searchInput);
  }, [limit]);

  // search
  const search = () => {
    controller(1, "", limit, searchInput);
  };

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
              {/* Limt and search */}
              <div className="sectionHeader">
                <div className="limitControl">
                  <p>show</p>

                  <div className="dropdownContainer">
                    <p className="dropDownValue">
                      <span>{limit}</span>

                      <i onClick={() => setDropDown(!dropDown)}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </i>
                    </p>

                    <div
                      className={`${dropDown && "showDropDown"} dropDown`}
                      onClick={(e) => changeLimit(e.target)}
                    >
                      <p data-value="3">3</p>
                      <p data-value="5">5</p>
                      <p data-value="10">10</p>
                    </div>
                  </div>
                  <p>documents</p>
                </div>

                <div className="searchBar">
                  <p>search :</p>

                  <input
                    type="text"
                    onChange={(e) => setSearchInput(e.currentTarget.value)}
                  />

                  <button type="button" onClick={search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>

              {/*  Labels */}
              <div className="labels">
                {labels.map((label, i) => {
                  return (
                    <div key={i}>
                      <p>{label}</p>

                      {["Title", "Date", "Priority"].includes(label) && (
                        <>
                          <i
                            onClick={(e) => {
                              sort(e.currentTarget, `-${label}`);
                            }}
                            className="on"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
                            </svg>
                          </i>

                          <i
                            onClick={(e) => {
                              sort(e.currentTarget, label);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z" />
                            </svg>
                          </i>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Data */}
              {sectionName === "All Tickets" ? (
                data && <Tickets tickets={data.tickets} />
              ) : (
                <Projects projects={data.projects} />
              )}

              {/* pagination */}
              <div className="sectionFooter">
                <p className="count">
                  {count} out of {data.totalTickets || data.totalProjects}{" "}
                  documents
                </p>

                <div className="pagination">
                  {numOfPages > 1 && (
                    <>
                      {currentPage > 1 && (
                        <button
                          className="prevPage"
                          onClick={() =>
                            controller(currentPage - 1, "", limit, searchInput)
                          }
                        >
                          previous
                        </button>
                      )}

                      <div className="pages">
                        {numOfpagesArr.map((num) => {
                          return (
                            <p
                              key={num}
                              onClick={() =>
                                controller(num, "", limit, searchInput)
                              }
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
                          onClick={() =>
                            controller(currentPage + 1, "", limit, searchInput)
                          }
                        >
                          next
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// *******************
const Projects = ({ projects }) => {
  return (
    projects && (
      <div>
        {projects.map((project) => {
          const { _id, name, startDate, endDate, status, managedBy, team } =
            project;

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
                          width: `${progress(endDate, startDate)}%`,
                        }}
                      ></div>
                    </div>
                    <p>
                      {endDate && startDate && progress(endDate, startDate)}%
                    </p>
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
                <button className="details">
                  <FontAwesomeIcon icon={faEye} />
                </button>

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
    )
  );
};

const Tickets = ({ tickets }) => {
  return (
    tickets && (
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
                <button className="details">
                  <FontAwesomeIcon icon={faEye} />
                </button>

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
    )
  );
};

export default ShowAllDocuments;

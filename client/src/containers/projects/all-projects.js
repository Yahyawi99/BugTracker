import React, { useEffect } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useProjects from "../../hooks/useProjects";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
  const { getAllProjects, allProjects } = useProjects();

  const labels = [
    "Project",
    "End Date",
    "Progress",
    "Project Manager",
    "Team",
    "Status",
    "Action",
  ];

  useEffect(() => {
    getAllProjects(1);
  }, []);

  const { projects, numOfPages, totalProjects, count, currentPage } =
    allProjects;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

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

    getAllProjects(currentPage, label);
  };

  return (
    <section className="allProjectsSection">
      <HomeBtn name="All Projects" />

      <div>
        <div>
          <div>
            <div className="sectionHeader">
              <div className="limitControl">
                <p>show</p>
                <div className="dropdownContainer">
                  <p className="dropDownValue">3</p>
                  <div className="dropDown">
                    <p>3</p>
                    <p>5</p>
                    <p>10</p>
                  </div>
                </div>
                <p>documents</p>
              </div>

              <div className="searchBar">
                <p>search</p>
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="labels">
            {labels.map((label, i) => {
              return (
                <div key={i}>
                  <p>{label}</p>

                  {["Project", "End Date"].includes(label) && (
                    <>
                      <i
                        onClick={(e) => {
                          sort(e.currentTarget, label);
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
                          sort(e.currentTarget, `-${label}`);
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

          <div>
            {projects &&
              projects.map((project) => {
                const {
                  _id,
                  name,
                  startDate,
                  endDate,
                  status,
                  managedBy,
                  team,
                } = project;

                return (
                  <div key={_id} className="project">
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
                            {endDate &&
                              startDate &&
                              progress(endDate, startDate)}
                            %
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

          <div className="sectionFooter">
            <p className="count">
              {count} out of {totalProjects} documents
            </p>

            <div className="pagination">
              {projects && numOfPages > 1 && (
                <>
                  {currentPage > 1 && (
                    <button className="prevPage">previous</button>
                  )}

                  <div className="pages">
                    {numOfpagesArr.map((num) => {
                      return (
                        <p
                          onClick={() => getAllProjects(num)}
                          className={`${currentPage == num && "viewedPage"}`}
                        >
                          {num}
                        </p>
                      );
                    })}
                  </div>

                  {currentPage == 1 && (
                    <button className="nextPage">next</button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;

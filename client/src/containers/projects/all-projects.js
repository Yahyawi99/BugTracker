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
          </div>

          <div>
            {allProjects.slice(0, 5).map((project) => {
              const { name, startDate, endDate, status, managedBy } = project;

              return (
                <div className="project">
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
                          {endDate && startDate && progress(endDate, startDate)}
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
                    <img
                      className="first"
                      src="/assets/images/avatar.png"
                      alt="pm"
                    />
                    <img src="/assets/images/avatar.png" alt="pm" />
                    <img src="/assets/images/avatar.png" alt="pm" />
                    <img src="/assets/images/avatar.png" alt="pm" />
                    <img src="/assets/images/avatar.png" alt="pm" />
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
            <p className="count">5 out of 50 documents</p>

            <div className="pagination">
              <button>previous</button>
              <div className="pages">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>

              <button>next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;

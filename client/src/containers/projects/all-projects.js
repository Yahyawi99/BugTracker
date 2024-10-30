import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxOpen,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useProjects from "../../hooks/useProjects";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// Components
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/shared.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;

const AllProjects = () => {
  const { getAllProjects, allProjects, archiveProject } = useProjects();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllProjects(1, "", limit, searchInput);
<<<<<<< HEAD
=======
    // eslint-disable-next-line
>>>>>>> master
  }, []);

  if (allProjects) {
    var { currentPage } = allProjects;
  }

  return (
    <section className="projectsContainer">
      <HomeBtn name="Projects" />

      <div>
        <LimitAndSearch
          controller={getAllProjects}
          currentPage={currentPage}
          states={{
            limit,
            setLimit,
            dropDown,
            setDropDown,
            searchInput,
            setSearchInput,
          }}
        />

        <div className="table">
          <div>
            <Table
              data={allProjects}
              archiveProject={archiveProject}
              getAllProjects={getAllProjects}
              limit={limit}
              searchInput={searchInput}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// *********************************
const Table = ({
  data,
  archiveProject,
  getAllProjects,
  limit,
  searchInput,
}) => {
  const { numOfPages, currentPage, count, totalProjects } = data;

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
        <col />
      </colgroup>

      <thead>
        <tr>
          {[
            "Project",
            "End Date",
            "Progress",
            "Project Manager",
            "Team",
            "Status",
            "Action",
          ].map((value, i) => {
            return (
              <th key={i}>
                <TableHead value={value} />
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data?.projects?.length > 0 ? (
          data.projects.map((project) => {
            return (
              <tr key={project._id}>
                <Project project={project} archiveProject={archiveProject} />
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7">
              <p className="noDocuments"> No Projects to show</p>
            </td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="7">
            <div>
              <p className="count">
                {count ? count : 0} out of {totalProjects} documents
              </p>

              <div className="pagination">
                {numOfPages > 1 && (
                  <>
                    {currentPage > 1 && (
                      <button
                        className="prevPage"
                        onClick={() => {
                          getAllProjects(
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
                                getAllProjects(num, "", limit, searchInput);
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
                          getAllProjects(
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
    </div>
  );
};

const Project = ({ project, archiveProject }) => {
  const { _id, name, startDate, endDate, status, managedBy, team, isArchived } =
    project;

  const members = { ...team }[0].members;

  return (
    <>
      <td>
        <div className="title">
          <p>{name && name}</p>
          <p>
            Created{" "}
            {formatDate(startDate, {
              month: "long",
              year: "numeric",
              day: "2-digit",
            })}
          </p>
        </div>
      </td>

      <td>
        <div className="endDate">
          {endDate && <p> {formatDate(endDate)}</p>}
        </div>
      </td>

      <td>
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
      </td>

      <td>
        <div className="pm">
          {managedBy ? (
            <>
              <Link to={`/profile/member-profile/${managedBy._id}`}>
                <img src={`${managedBy.avatar}`} alt="pm" />
              </Link>
              <p>{managedBy.name}</p>
            </>
          ) : (
            <p className="unassigned">Unassigned</p>
          )}
        </div>
      </td>

      <td>
        <div className="team">
          {members?.length > 0 &&
            members.map((user) => {
              const { _id, avatar } = user;
              return (
                <Link key={_id} to={`/profile/member-profile/${_id}`}>
                  <img src={`${avatar}`} alt="user" />
                </Link>
              );
            })}
        </div>
      </td>

      <td>
        <div className="status">
          <p className={`${status}`}>{status}</p>
        </div>
      </td>

      <td>
        <div className="btns">
          <Link to={`/projects/project-details/${_id}`}>
            <button className="details">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>

          {USER_ROLE === "admin" && (
            <Link to={`/projects/edit-project/${_id}`}>
              <button className="edit">
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </Link>
          )}

          {USER_ROLE === "admin" && (
            <button
              onClick={() => archiveProject(_id, !isArchived)}
              className={`${isArchived ? "unarchive" : "archive"}`}
            >
              {isArchived ? (
                <FontAwesomeIcon icon={faBoxOpen} />
              ) : (
                <FontAwesomeIcon icon={faBoxArchive} />
              )}
            </button>
          )}
        </div>
      </td>
    </>
  );
};

export default AllProjects;

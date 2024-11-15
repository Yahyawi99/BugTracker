import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Hooks
import useProjects from "../../hooks/useProjects";
// components
import LimitAndSearch from "../../components/shared/LimitAndSearch";
// utils
import formatDate from "../../utils/formatDate";

const Projects = () => {
  const { getAllProjects, allProjects } = useProjects();

  const [limit, setLimit] = useState(5);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllProjects(1, "", limit, searchInput, "all");
    // eslint-disable-next-line
  }, []);

  return (
    allProjects && (
      <section className="projects">
        <h2>Projects</h2>

        <div>
          <LimitAndSearch
            controller={getAllProjects}
            currentPage={allProjects.currentPage}
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
                getAllUsers={getAllProjects}
                limit={limit}
                searchInput={searchInput}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// **********************
const Table = ({ data, getAllProjects, limit, searchInput }) => {
  var { projects, numOfPages, currentPage, count, totalProjects } = data;

  var numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <table summary="All company projects">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr>
          <th>
            <TableHead value={"Project"} />
          </th>
          <th>
            <TableHead value={"Start Date"} />
          </th>
          <th>
            <TableHead value={"End Date"} />
          </th>
          <th>
            <TableHead value={"Team"} />
          </th>
          <th>
            <TableHead value={"Tickets"} />
          </th>
        </tr>
      </thead>

      <tbody>
        {projects &&
          projects.map((project) => {
            return (
              <tr key={project._id}>
                <TableData project={project} />
              </tr>
            );
          })}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="4">
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

const TableData = ({ project }) => {
  const { _id, name, startDate, endDate, team, tickets, managedBy } = project;

  const members = { ...team }[0].members;

  return (
    <>
      <td>
        <Link to={`/projects/project-details/${_id}`}>
          <p className="name">{name}</p>
        </Link>

        {managedBy ? (
          <p className="pm">{"Project Manager : " + managedBy.name}</p>
        ) : (
          <p className="pm">{"Project Manager : Unassigned"}</p>
        )}
      </td>

      <td>
        <p className="startDate">{startDate && formatDate(startDate)}</p>
      </td>

      <td>
        <p className="endDate">{endDate && formatDate(startDate)}</p>
      </td>

      <td>
        <p className="team">
          {members &&
            members.map((member) => {
              const { _id, avatar } = member;

              return (
                <Link key={_id} to={`/profile/member-profile/${_id}`}>
                  <img src={avatar} alt="avatar" />
                </Link>
              );
            })}
        </p>
      </td>

      <td>
        <p className="numOfTicket">{tickets?.length}</p>
      </td>
    </>
  );
};

export default Projects;

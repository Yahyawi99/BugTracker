import React, { useState, useEffect } from "react";
// hooks
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
// css
import "../../styles/containers/admin/manage-roles.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user")).role;

const ManageRoles = () => {
  const { getAllUsers, allUsers, updateCurrentUser } = useUsers();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllUsers(1, "", limit, searchInput, "all");
  }, []);

  if (allUsers) {
    var { currentPage } = allUsers;
  }

  return (
    <section className="mangeRoleContainers">
      <HomeBtn name="Manage Roles" />

      <div>
        <div>
          <div>
            <LimitAndSearch
              controller={getAllUsers}
              currentPage={currentPage}
              states={{
                limit,
                setLimit,
                dropDown,
                setDropDown,
                searchInput,
                setSearchInput,
              }}
              isArchived={"all"}
            />

            <Table />

            {/* <Labels
              labels={labels}
              sortLabels={sortLabels}
              controller={controller}
              data={data}
              states={{ limit, searchInput }}
              isArchived={isArchived}
            />

            {sectionName.indexOf("Tickets") !== -1 ? (
              <Tickets
                tickets={data.tickets}
                archiveController={archiveController}
              />
            ) : sectionName.indexOf("Projects") !== -1 ? (
              <Projects
                projects={data.projects}
                archiveController={archiveController}
              />
            ) : (
              <Members members={data.users} updateUser={updateUser} />
            )}

            <Pagination
              controller={controller}
              states={{ limit, searchInput }}
              data={data}
              isArchived={isArchived}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

// ***********************************
const Table = () => {
  return (
    <table summary="All company members">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr>
          {["Avatar", "Name", "Current Role", "Manage Role", "Action"].map(
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
        {/* {data.projects &&
          data.projects.map((project) => {
            return (
              <tr key={project._id}>
                <TableData project={project} />
              </tr>
            );
          })} */}
      </tbody>

      <tfoot>
        <tr>
          {/* <td colSpan="4">
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
          </td> */}
        </tr>
      </tfoot>
    </table>
  );
};

const TableHead = ({ value }) => {
  return (
    <div>
      <p>{value}</p>

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
    </div>
  );
};

/* 
<ShowAllDocuments
      sectionName="Manage Roles"
      controller={getAllUsers}
      updateUser={updateCurrentUser}
      labels={["Avatar", "Name", "Current Role", "Manage Role", "Action"]}
      sortLabels={["Name", "Current Role"]}
      data={allUsers}
    />
*/

export default ManageRoles;

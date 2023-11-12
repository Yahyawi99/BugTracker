import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// hooks
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import Checkbox from "../../components/shared/Checkbox";
// css
import "../../styles/containers/admin/manage-roles.css";

const ManageRoles = () => {
  const { getAllUsers, allUsers, updateCurrentUser } = useUsers();

  const [limit, setLimit] = useState(5);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllUsers(1, "", limit, searchInput, "all");
  }, []);

  if (allUsers) {
    var { currentPage } = allUsers;
  }

  return (
    <section className="manageRoleContainer">
      <HomeBtn name="Manage Roles" />

      <div className="mainSection">
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

            <Table
              data={allUsers}
              updateUser={updateCurrentUser}
              getAllUsers={getAllUsers}
              limit={limit}
              searchInput={searchInput}
            />

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
const Table = ({ data, updateUser, getAllUsers, limit, searchInput }) => {
  var { numOfPages, currentPage, count, totalUsers } = data;

  var numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

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
        {data.users &&
          data.users.map((member) => {
            return (
              member.role !== "admin" && (
                <tr key={member._id}>
                  <Member member={member} updateUser={updateUser} />
                </tr>
              )
            );
          })}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="5">
            <div>
              <p className="count">
                {count
                  ? count -
                    data.users.filter((member) => member.role === "admin")
                      .length
                  : 0}{" "}
                out of {totalUsers} documents
              </p>

              <div className="pagination">
                {numOfPages > 1 && (
                  <>
                    {currentPage > 1 && (
                      <button
                        className="prevPage"
                        onClick={() => {
                          getAllUsers(currentPage - 1, "", limit, searchInput);
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
                                getAllUsers(num, "", limit, searchInput);
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
                          getAllUsers(currentPage + 1, "", limit, searchInput);
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

const Member = ({ member, updateUser }) => {
  const { _id, name, role, avatar, email } = member;

  // dropdown
  const showDropDown = (element) => {
    const alldropDowns = document.getElementsByClassName("manageRoleDropdown");

    [...alldropDowns].forEach((e) => {
      if (e.dataset.id !== element.nextElementSibling.dataset.id) {
        e.classList.remove("showManageRoleDropdown");
      }
    });

    element.nextElementSibling.classList.toggle("showManageRoleDropdown");
  };

  // choose role
  const chooseRole = (element, newRole) => {
    const currentRoleElement =
      element.parentElement.previousElementSibling.children[0];
    const checkBox = element.children[0];
    const allCheckBoxs = document.getElementsByClassName("checkbox");

    [...allCheckBoxs].forEach(
      (e) => checkBox !== e && e.classList.remove("checkboxChecked")
    );

    checkBox.classList.toggle("checkboxChecked");

    if (currentRoleElement.textContent === newRole) {
      currentRoleElement.textContent = "None selected";
    } else {
      currentRoleElement.textContent = newRole;
    }
  };

  const assignRole = (memberId, element) => {
    const newRole =
      element.parentElement.previousElementSibling.children[0].textContent;

    const formData = new FormData();

    formData.append("data", JSON.stringify({ newRole }));

    updateUser(memberId, formData);
  };

  return (
    <>
      <td>
        <Link to={`/profile/member-profile/${_id}`}>
          <img className="avatar" src={avatar} alt="avatar" />
        </Link>
      </td>

      <td>
        <p className="name">{name}</p>
        <p className="email">{email}</p>
      </td>

      <td>
        <p className="role">{role}</p>
      </td>

      <td>
        <div className="manageRole">
          <div onClick={(e) => showDropDown(e.currentTarget)}>
            <p className="initialValue">
              {role || <span style={{ opacity: 0 }}>None selected</span>}
            </p>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

          <div data-id={_id} className="manageRoleDropdown">
            {["admin", "project manager", "developer", "submitter"].map(
              (value, i) => {
                return (
                  <p
                    key={i}
                    onClick={(e) => chooseRole(e.currentTarget, value)}
                  >
                    <Checkbox isChecked={value === role} />
                    <span>{value}</span>
                  </p>
                );
              }
            )}
          </div>
        </div>
      </td>

      <td>
        <div className="btns">
          <button
            onClick={(e) => assignRole(_id, e.currentTarget)}
            className="assign"
          >
            Assign Role
          </button>
        </div>
      </td>
    </>
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

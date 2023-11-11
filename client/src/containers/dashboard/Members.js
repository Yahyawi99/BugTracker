import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Hooks
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";

const Members = () => {
  const { getAllUsers, allUsers } = useUsers();

  const [limit, setLimit] = useState(5);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  if (allUsers) {
    var { numOfPages, currentPage, count, totalUsers } = allUsers;

    var numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);
  }

  return (
    <section className="members">
      <HomeBtn name="Members" />

      <div>
        <LimitAndSearch
          controller={getAllUsers}
          currentPage={allUsers.currentPage}
          states={{
            limit,
            setLimit,
            dropDown,
            setDropDown,
            searchInput,
            setSearchInput,
          }}
        />

        <table summary="All company members">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>

          <thead>
            <tr>
              <th>
                <TableHead value={"Avatar"} />
              </th>
              <th>
                <TableHead value={"Name"} />
              </th>
              <th>
                <TableHead value={"Projects"} />
              </th>
              <th>
                <TableHead value={"Role"} />
              </th>
            </tr>
          </thead>

          <tbody>
            {allUsers.users &&
              allUsers?.users.map((member) => {
                return (
                  <tr key={member._id}>
                    <TableData member={member} />
                  </tr>
                );
              })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">
                <div>
                  <p className="count">
                    {count ? count : 0} out of {totalUsers} documents
                  </p>

                  <div className="pagination">
                    {numOfPages > 1 && (
                      <>
                        {currentPage > 1 && (
                          <button
                            className="prevPage"
                            onClick={() => {
                              getAllUsers(
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
                              getAllUsers(
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
      </div>
    </section>
  );
};

// **********************
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

const TableData = ({ member }) => {
  const { _id, name, role, avatar, numOfProjects } = member;

  return (
    <>
      <td>
        <Link to={`/profile/member-profile/${_id}`}>
          <img src={avatar} alt="avatar" />
        </Link>
      </td>

      <td>
        <p className="name">{name}</p>
      </td>

      <td>
        <p className="numOfProjects">{numOfProjects}</p>
      </td>

      <td>
        <p className="role">{role}</p>
      </td>
    </>
  );
};

export default Members;

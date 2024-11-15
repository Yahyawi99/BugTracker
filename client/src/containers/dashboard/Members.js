import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Hooks
import useUsers from "../../hooks/useUsers";
// components
import LimitAndSearch from "../../components/shared/LimitAndSearch";

const Members = () => {
  const { getAllUsers, allUsers } = useUsers();

  const [limit, setLimit] = useState(5);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  if (allUsers) {
  }

  return (
    <section className="members">
      <h2>Members</h2>

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

        <div className="table">
          <div>
            <Table
              data={allUsers}
              getAllUsers={getAllUsers}
              limit={limit}
              searchInput={searchInput}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// **********************
const Table = ({ data, getAllUsers, limit, searchInput }) => {
  var { users, numOfPages, currentPage, count, totalUsers } = data;

  var numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
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
        {users &&
          users.map((member) => {
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

import React, { useState } from "react";
// Hooks
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import Pagination from "../../components/shared/Pagination";
import Labels from "../../components/shared/Labels";

const Members = () => {
  const { getAllUsers, allUsers } = useUsers();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
            {allUsers?.users.map()}
            <tr>
              <TableData />
            </tr>

            <tr>
              <TableData />
            </tr>

            <tr>
              <TableData />
            </tr>
          </tbody>
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

const TableData = ({}) => {
  return (
    <>
      <td>
        <img src="/assets/images/default-avatar-1.jpg" alt="avatar" />
      </td>

      <td>
        <p className="name">Bruce Appuser</p>
      </td>

      <td>
        <p className="numOfProjects">2</p>
      </td>

      <td>
        <p className="role">Developer</p>
      </td>
    </>
  );
};

export default Members;

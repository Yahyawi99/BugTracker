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
      </div>
    </section>
  );
};

export default Members;

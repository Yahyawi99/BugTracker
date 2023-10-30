import React, { useEffect, useState } from "react";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// hooks
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-pm.css";

const ManagePM = () => {
  const { getAllUsers, allUsers } = useUsers();
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.users) {
      setManagers(() => allUsers.users.filter((user) => (user.role = "PM")));
    }
  }, [allUsers]);

  return (
    <section className="managePM">
      <HomeBtn name="Assign Project Manager" />

      <div>
        <h2>Land Research Web Application</h2>
        <h4>Select Project Manager</h4>

        <Dropdown managers={managers} />
      </div>
    </section>
  );
};

// **********************
const Dropdown = ({ managers }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dropDown">
      <div
        className="initialValue"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p>None selected</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className={`${showDropdown && "showOptions"} options`}>
        {managers.map((manager) => {
          const { _id, name } = manager;

          return (
            <p key={_id} onClick={() => setShowDropdown(false)}>
              {name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ManagePM;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// hooks
import useUsers from "../../hooks/useUsers";
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-pm.css";

const ManagePM = () => {
  const { getAllUsers, allUsers } = useUsers();
  const { getSingleProject, singleProject, manageProjectManager } =
    useProjects();
  const { projectId } = useParams();

  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({});

  useEffect(() => {
    getAllUsers();
    getSingleProject(projectId);
  }, []);

  useEffect(() => {
    if (allUsers.users) {
      setManagers(() => allUsers.users.filter((user) => (user.role = "PM")));
    }
  }, [allUsers]);

  useEffect(() => {
    if (singleProject.project) {
      setNewManager(singleProject.project.managedBy);
    }
  }, [singleProject]);

  return (
    <section className="managePM">
      <HomeBtn name="Assign Project Manager" />

      <div>
        <h2>Land Research Web Application</h2>
        <h4>Select Project Manager</h4>

        <Dropdown
          managers={managers}
          newManager={newManager}
          setNewManager={setNewManager}
        />

        <button
          onClick={() => manageProjectManager(projectId, newManager._id)}
          className="assignBtn"
          type="button"
        >
          Assign
        </button>
      </div>
    </section>
  );
};

// **********************
const Dropdown = ({ managers, newManager, setNewManager }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dropDown">
      <div
        className="initialValue"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {newManager ? (
          <p> newManager.name</p>
        ) : (
          <span className="noManager">None selected</span>
        )}
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className={`${showDropdown && "showOptions"} options`}>
        {managers.map((manager) => {
          const { _id, name } = manager;

          return (
            <p
              key={_id}
              onClick={() => {
                setNewManager(manager);
                setShowDropdown(false);
              }}
            >
              {name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ManagePM;

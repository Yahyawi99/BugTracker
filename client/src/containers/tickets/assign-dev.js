import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/assign-dev.css";

const AssignDev = () => {
  const { getSingleTicket, singleTicket } = useTickets();
  const { getAllUsers, allUsers } = useUsers();

  const { ticketId } = useParams();

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    getSingleTicket(ticketId);
    getAllUsers(1, "", Infinity);
  }, []);

  useEffect(() => {
    if (allUsers.users) {
      setDevs(() => allUsers.users.filter((user) => user.role === "developer"));
    }
  }, [allUsers]);

  if (singleTicket.ticket) {
    var {
      ticket: {
        _id,
        title,
        description,
        project,
        isArchived,
        assignedTo,
        createdAt,
        type,
        priority,
        status,
      },
    } = singleTicket;
  }

  return (
    <section className="DocumentDetails assignDev">
      <HomeBtn name="Assign Developer" />

      <div className="details">
        <div className="first-column">
          <div className="row-one">
            <h3>Select Developer</h3>

            <DropDown developers={devs} currentDev={assignedTo} />

            <div className="btns">
              <button className="assignBtn" type="button">
                Assign
              </button>
              <button className="cancelBtn" type="button">
                Cancel
              </button>
            </div>
          </div>

          <div className="row-two">
            <h3>Current Developer</h3>

            {assignedTo ? (
              <div className="currentDev">
                <img src={assignedTo.avatar} alt="current developer" />
                <p className="name">{assignedTo.name}</p>
                <p className="email">{assignedTo.email}</p>
                <button type="button">Profile</button>
              </div>
            ) : (
              <div className="unassigned">
                <FontAwesomeIcon icon={faUser} />
                <p>Not Assigned</p>
              </div>
            )}
          </div>
        </div>

        <div className="second-column"></div>
      </div>
    </section>
  );
};

// ***********************
const DropDown = ({ developers, currentDev }) => {
  const [showDevs, setShowDevs] = useState(false);
  const [newDev, setNewDev] = useState(currentDev);

  return (
    <div className="devsDropdown">
      <div onClick={() => setShowDevs(!showDevs)}>
        <p className="initialValue">{newDev ? newDev.name : "None selected"}</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className={`${showDevs && "showDevs"} devs`}>
        {developers.map((dev) => {
          const { _id, name } = dev;
          return (
            <p
              key={_id}
              onClick={() => {
                setShowDevs(false);
                setNewDev(dev);
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

export default AssignDev;

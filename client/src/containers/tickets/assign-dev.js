import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    if (allUsers.users) {
      setDevs(() => allUsers.users.filter((user) => user.role === "developer"));
    }
  }, []);

  return (
    <section className="DocumentDetails assignDev">
      <HomeBtn name="Assign Developer" />

      <div className="details">
        <div className="first-column">
          <div className="row-one">
            <h3>Select Developer</h3>

            <DropDown developers={devs} />

            <div className="btns">
              <button className="assignBtn" type="button">
                Assign
              </button>
              <button className="cancelBtn" type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="second-column"></div>
      </div>
    </section>
  );
};

// ***********************
const DropDown = ({ developers }) => {
  return (
    <div className="devsDropdown">
      <div>
        <p className="initialValue">None</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className="devs">
        {developers.length &&
          developers.map((dev) => {
            const { _id, name } = dev;
            return <p key={_id}>{name}</p>;
          })}
      </div>
    </div>
  );
};

export default AssignDev;

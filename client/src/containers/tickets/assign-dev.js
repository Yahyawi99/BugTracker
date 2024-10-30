import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
import useUsers from "../../hooks/useUsers";
// utils
import progress from "../../utils/progress";
import formatDate from "../../utils/formatDate";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/assign-dev.css";

const AssignDev = () => {
  const { getSingleTicket, singleTicket, assignTicketTo } = useTickets();
  const { getAllUsers, allUsers } = useUsers();

  const { ticketId } = useParams();

  const [devs, setDevs] = useState([]);
  const [newDev, setNewDev] = useState({});

  useEffect(() => {
    getSingleTicket(ticketId);
    getAllUsers(1, "", Infinity);
<<<<<<< HEAD
=======
    // eslint-disable-next-line
>>>>>>> master
  }, []);

  useEffect(() => {
    if (allUsers.users) {
      setDevs(() => allUsers.users.filter((user) => user.role === "developer"));
    }

    if (singleTicket.ticket) {
      setNewDev(singleTicket.ticket.assignedTo);
    }
  }, [allUsers, singleTicket]);

  if (singleTicket.ticket) {
    var {
      ticket: {
        _id,
        title,
        description,
        project,
        assignedTo,
        createdAt,
        type,
        priority,
        status,
      },
    } = singleTicket;
  }

  return (
    singleTicket.ticket && (
      <section className="DocumentDetails assignDev">
        <HomeBtn name="Assign Developer" />

        <div className="details ticketDetails">
          <div className="first-column">
            <div className="row-one">
              <h3>Select Developer</h3>

              <DropDown
                developers={devs}
                newDev={newDev}
                setNewDev={setNewDev}
              />

              <div className="btns">
                <button
                  className="assignBtn"
                  type="button"
                  onClick={() => assignTicketTo(_id, newDev._id)}
                >
                  Assign
                </button>

                <button
                  className="cancelBtn"
                  type="button"
                  onClick={() => window.history.back()}
                >
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

                  <Link to={`/profile/member-profile/${assignedTo._id}`}>
                    <button type="button">Profile</button>
                  </Link>
                </div>
              ) : (
                <div className="unassigned">
                  <FontAwesomeIcon icon={faUser} />
                  <p>Not Assigned</p>
                </div>
              )}
            </div>
          </div>

          <div className="second-column">
            <div className="row-one">
              <h1>{title}</h1>

              <p dangerouslySetInnerHTML={{ __html: description }} />

              <div className="project">
                <p>Project :</p>
                <p>{project.name}</p>
              </div>

              <div className="progress">
                <p>Progress Status:</p>
                <div>
                  {project.startDate && (
                    <div
                      style={{
                        width:
                          progress(project.startDate, project.endDate) + "%",
                      }}
                      className="thumb"
                    >
                      <p>{progress(project.startDate, project.endDate)}%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row-two">
              <div className="created">
                <p>Created :</p>
                <p>
                  {createdAt &&
                    formatDate(createdAt, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="deadline">
                <p>Project Deadline :</p>
                <p>
                  {formatDate(project.endDate, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="type">
                <p>Type :</p>
                <p className={`${type}`}>{type}</p>
              </div>

              <div className="priority">
                <p>Priority :</p>
                <p className={`${priority}`}>{priority}</p>
              </div>

              <div className="status">
                <p>Status :</p>
                <p className={`${status}`}>{status}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// ***********************
const DropDown = ({ developers, newDev, setNewDev }) => {
  const [showDevs, setShowDevs] = useState(false);

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

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// hooks
import useTickets from "../../hooks/useTickets";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/ticket-details.css";

const TicketDetails = () => {
  const { getSingleTicket, singleTicket } = useTickets();
  const { ticketId } = useParams();

  useEffect(() => {
    getSingleTicket(ticketId);
  }, []);

  console.log(singleTicket);

  return (
    <section className="DocumentDetails">
      <HomeBtn name="Ticket Details" />

      <div className="details">
        {/* <div className="first-column">
          <div className="row-one">
            <h1>{name}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }} />

            <div className="progress">
              <p>Progress Status:</p>
              <div>
                {startDate && (
                  <div
                    style={{ width: progress(startDate, endDate) + "%" }}
                    className="thumb"
                  >
                    <p>{progress(startDate, endDate)}%</p>
                  </div>
                )}
              </div>
            </div>

            <div className="action">
              <Link to={`/projects/edit-project/${projectId}`}>
                <button>Edit Project</button>
              </Link>

              {singleProject.project.isArchived ? (
                <button
                  onClick={() => {
                    archiveProject(projectId, false);
                  }}
                  className="unarchive"
                >
                  Unarchive Project
                </button>
              ) : (
                <button
                  onClick={() => {
                    archiveProject(projectId, true);
                  }}
                  className="archive"
                >
                  Archive Project
                </button>
              )}
            </div>
          </div>

          <div className="row-two">
            <div className="created">
              <p>Created</p>
              <p>
                {startDate &&
                  formatDate(startDate, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
              </p>
            </div>

            <div className="deadline">
              <p>Deadline</p>
              <p>
                {endDate &&
                  formatDate(endDate, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
              </p>
            </div>

            <div className="priority">
              <p>Priority</p>
              <p className={`${priority}`}>{priority}</p>
            </div>

            <div className="status">
              <p>Status</p>
              <p className={`${status}`}>{status}</p>
            </div>
          </div>

          <div className="row-three">
            <h3>Project Team</h3>
            <p>{team && team.length} team members</p>

            {managedBy ? (
              <div key={managedBy._id} className="manager">
                <img src={managedBy.avatar} alt="manager" className="avatar" />

                <div className="managerInfo">
                  <p className="name">{managedBy.name}</p>
                  <p>{managedBy.email}</p>
                  <p>Project Manager</p>
                </div>
              </div>
            ) : (
              <div className="noManager">
                <p>No Project Manager Assigned</p>
                <button>Assign Project Manager</button>
              </div>
            )}

            <div className="team">
              {team &&
                team.map((user) => {
                  const { _id, name, avatar, role } = user;

                  return (
                    <div key={_id} className="user">
                      <img src={avatar} alt="user" className="avatar" />

                      <div className="userInfo">
                        <p>{name}</p>
                        <p className="role">{role}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <button type="button">Manage Team</button>
          </div>
        </div> */}

        <div className="second-column"></div>
      </div>
    </section>
  );
};

export default TicketDetails;

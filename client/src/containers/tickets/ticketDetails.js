import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// React quill
import reactQuillModules from "../../utils/reactQuill-modules";
import ReactQuill from "react-quill";
// utils
import progress from "../../utils/progress";
import formatDate from "../../utils/formatDate";
// hooks
import useTickets from "../../hooks/useTickets";
import useComments from "../../hooks/useComments";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/ticket-details.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;
const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

// **********************************
// **********************************
const TicketDetails = () => {
  const { getSingleTicket, singleTicket } = useTickets();
  const { createComments, getComments, comments } = useComments();

  const [commentValue, setCommentValue] = useState("");

  const { ticketId } = useParams();

  useEffect(() => {
    getSingleTicket(ticketId);
    getComments(ticketId);
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
      history,
    } = singleTicket;
  }

  return (
    singleTicket &&
    project && (
      <section className="ticketDetails">
        <HomeBtn name="Ticket Details" />

        <div className="details">
          <div className="first-column">
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

              <div className="dev">
                {assignedTo ? (
                  <>
                    <p>Developer :</p>
                    <div>
                      <img src={assignedTo.avatar} alt="developer" />
                      <p className="devName">{assignedTo.name}</p>
                    </div>
                  </>
                ) : (
                  <p className="unassigned">
                    Developer : <span>Unassigned</span>
                  </p>
                )}
              </div>

              <div className="action">
                {(USER_ROLE === "admin" || USER_ID === project?.managedBy) && (
                  <Link to={`/tickets/assign-dev/${_id}`}>
                    <button className="assignBtn">Assign Developer</button>
                  </Link>
                )}

                {USER_ROLE === "admin" && (
                  <Link to={`/tickets/edit-ticket/${_id}`}>
                    <button className="editBtn">Edit Ticket</button>
                  </Link>
                )}

                {((USER_ROLE === "admin" && isArchived) ||
                  USER_ID === project?.managedBy) && (
                  <button className="unarchive">Unarchive Ticket</button>
                )}

                {((USER_ROLE === "admin" && !isArchived) ||
                  USER_ID === project?.managedBy) && (
                  <button className="archive">Archive Ticket</button>
                )}
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

          <div className="second-column">
            <div id="row-one">
              <h3>Ticket Comments</h3>

              <form onSubmit={(e) => createComments(e, ticketId, commentValue)}>
                <div className="quill-editor">
                  <ReactQuill
                    modules={reactQuillModules}
                    theme="snow"
                    placeholder="Your comment..."
                    value={commentValue}
                    onChange={(value) => setCommentValue(value)}
                  />
                </div>

                <button type="submit">Submit</button>
              </form>

              <div className="comments">
                {comments &&
                  comments.map((comment) => {
                    const {
                      _id,
                      value,
                      createdAt,
                      createdBy: { name, avatar },
                    } = comment;

                    return (
                      <div key={_id}>
                        <div>
                          <img src={avatar} alt="user" />
                          <div>
                            <p className="name">{name}</p>
                            <p className="date">
                              {formatDate(createdAt, {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <p dangerouslySetInnerHTML={{ __html: value }} />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div id="row-two">
              <h3>Ticket History</h3>

              <div className="historyContainer">
                {history.map((data) => {
                  const { _id, createdAt, title, actionBy, description } = data;

                  return (
                    <div key={_id}>
                      <div className="pin"></div>

                      <div className="historyData">
                        <p className="date">
                          {formatDate(createdAt, {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                        <p className="title">{title}</p>
                        <p className="name">
                          By :{" "}
                          {actionBy && (
                            <Link
                              to={`/profile/member-profile/${actionBy._id}`}
                            >
                              <span>{actionBy.name}</span>
                            </Link>
                          )}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default TicketDetails;

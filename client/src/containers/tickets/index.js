import React, { useEffect } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/all-tickets.css";

const AllTickets = () => {
  const { getAllTickets, allTickets } = useTickets();

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <section className="allTicketsSection">
      <HomeBtn name="All Tickets" />

      <div>
        <div>
          <div>
            <div className="sectionHeader"></div>
          </div>

          <div className="labels">
            {[
              "Assigned by",
              "Assigned to",
              "Title",
              "Status",
              "Priority",
              "Date",
              "",
            ].map((label) => {
              return (
                <div>
                  <p>{label}</p>

                  {label && (
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
                      </svg>

                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z" />
                    </svg> */}
                    </i>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            {allTickets.slice(0, 5).map((ticket) => {
              const { title, createdAt, status, priority } = ticket;

              return (
                <div className="ticket">
                  <div className="assignedBy">
                    <p>Demo Admin</p>
                  </div>

                  <div className="assignedTo">
                    <p>Demo Developer</p>
                  </div>

                  <div className="title">
                    <p>{title}</p>
                  </div>

                  <div className="status">
                    <p className={`${status}`}>{status}</p>
                  </div>

                  <div className="priority">
                    <p className={`${priority}`}>{priority}</p>
                  </div>

                  <div className="date">
                    <p>{createdAt ? formatDate(createdAt) : ""}</p>
                  </div>

                  <div className="btns">
                    <button className="details">
                      <FontAwesomeIcon icon={faEye} />
                    </button>

                    <button className="edit">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>

                    <button className="archive">
                      <FontAwesomeIcon icon={faBoxArchive} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sectionFooter">
            <p className="count">5 out of 50 documents</p>

            <div className="pagination">
              <button>previous</button>
              <div className="pages">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>

              <button>next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTickets;

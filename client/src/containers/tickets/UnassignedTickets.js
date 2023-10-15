import React, { useState, useEffect } from "react";
import {
  faEye,
  faPencil,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// utils
import formatDate from "../../utils/formatDate";
// hooks
import useTickets from "../../hooks/useTickets";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import Labels from "../../components/shared/Labels";
import Pagination from "../../components/shared/Pagination";
// css
import "../../styles/containers/tickets/all-tickets.css";
import "../../styles/components/shared/showAllDocuments.css";

const UnassignedTickets = () => {
  const { unassignedTickets, allTickets, archiveTicket } = useTickets();

  const labels = [
    "Assigned by",
    "Assigned to",
    "Title",
    "Status",
    "Priority",
    "Date",
    "Action",
  ];
  const sortLabels = ["Title", "Date", "Priority"];

  const { currentPage } = allTickets;

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    unassignedTickets(1, "", limit, searchInput, "all");
  }, []);

  return (
    allTickets && (
      <section className="getAllDocuments allTicketsSection">
        <HomeBtn name="Unassigned Tickets" />

        <div>
          <div>
            <div>
              <LimitAndSearch
                controller={unassignedTickets}
                currentPage={currentPage}
                states={{
                  limit,
                  setLimit,
                  dropDown,
                  setDropDown,
                  searchInput,
                  setSearchInput,
                }}
                isArchived={"all"}
              />

              <Labels
                labels={labels}
                sortLabels={sortLabels}
                controller={unassignedTickets}
                data={allTickets}
                states={{ limit, searchInput }}
                isArchived={"all"}
              />

              {/* Data */}

              <Tickets
                tickets={allTickets.tickets}
                archiveController={archiveTicket}
              />

              <Pagination
                controller={unassignedTickets}
                states={{ limit, searchInput }}
                data={allTickets}
                isArchived={"all"}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

// *******************
const Tickets = ({ tickets, archiveController }) => {
  return tickets && tickets.length ? (
    <div>
      {tickets.map((ticket) => {
        const {
          _id,
          title,
          createdAt,
          status,
          priority,
          isArchived,
          assignedTo,
          assignedBy,
        } = ticket;

        return (
          <div key={_id} className="document ticket">
            <div className="assignedBy">
              <p>{assignedBy.name}</p>
            </div>

            <div className="assignedTo">
              <button className="assignDevBtn">Assign Dev</button>
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
              <Link to={`/tickets/ticket-details/${_id}`}>
                <button className="details">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </Link>

              <Link to={`/tickets/edit-ticket/${_id}`}>
                <button className="edit">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </Link>

              <button
                className={`${isArchived ? "unarchive" : "archive"}`}
                onClick={() => archiveController(_id, !isArchived)}
              >
                <FontAwesomeIcon icon={faBoxArchive} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="noDocuments">
      <p>No documents to show</p>
    </div>
  );
};

export default UnassignedTickets;

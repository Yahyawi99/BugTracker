import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
<<<<<<< HEAD
  faBoxOpen,
=======
>>>>>>> master
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
// compenent
import HomeBtn from "../../components/shared/HomeBtn";
import LimitAndSearch from "../../components/shared/LimitAndSearch";
// utils
import formatDate from "../../utils/formatDate";
// css
import "../../styles/containers/tickets/my-tickets.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;

const MyTickets = () => {
  const { getUserTickets, userTickets, archiveTicket } = useTickets();

  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getUserTickets();
<<<<<<< HEAD
=======
    // eslint-disable-next-line
>>>>>>> master
  }, []);

  if (userTickets) {
    var { currentPage } = userTickets;
  }

  return (
    <section className="ticketsContainer">
      <HomeBtn name="My Tickets" />

      <div>
        <LimitAndSearch
          controller={getUserTickets}
          currentPage={currentPage}
          states={{
            limit,
            setLimit,
            dropDown,
            setDropDown,
            searchInput,
            setSearchInput,
          }}
        />

        <div className="table">
          <div>
            <Table
              getUserTickets={getUserTickets}
              archiveTicket={archiveTicket}
              data={userTickets}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// *********************************
const Table = ({ data, archiveTicket, getUserTickets, limit, searchInput }) => {
  const { tickets, numOfPages, currentPage, count, totalTickets } = data;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  return (
    <table summary="Company Tickets">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr>
          {[
            "Assigned by",
            "Assigned to",
            "Title",
            "Status",
            "Priority",
            "Date",
            "Action",
          ].map((value, i) => {
            return (
              <th key={i}>
                <TableHead value={value} />
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => {
            return (
              <tr key={ticket._id}>
                <Ticket ticket={ticket} archiveTicket={archiveTicket} />
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7">
              <p className="noDocuments">No tickets to show</p>
            </td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="7">
            <div>
              <p className="count">
                {count ? count : 0} out of {totalTickets} documents
              </p>

              <div className="pagination">
                {numOfPages > 1 && (
                  <>
                    {currentPage > 1 && (
                      <button
                        className="prevPage"
                        onClick={() => {
                          getUserTickets(
                            currentPage - 1,
                            "",
                            limit,
                            searchInput
                          );
                        }}
                      >
                        previous
                      </button>
                    )}

                    <div className="pages">
                      {numOfpagesArr &&
                        numOfpagesArr.map((num) => {
                          return (
                            <p
                              key={num}
                              onClick={() => {
                                getUserTickets(num, "", limit, searchInput);
                              }}
                              className={`${
                                currentPage === num && "viewedPage"
                              }`}
                            >
                              {num}
                            </p>
                          );
                        })}
                    </div>

                    {currentPage < numOfPages && (
                      <button
                        className="nextPage"
                        onClick={() => {
                          getUserTickets(
                            currentPage + 1,
                            "",
                            limit,
                            searchInput
                          );
                        }}
                      >
                        next
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

const TableHead = ({ value }) => {
  return (
    <div>
      <p>{value}</p>
    </div>
  );
};

const Ticket = ({ ticket, archiveTicket }) => {
  const {
    _id,
    assignedTo,
    assignedBy,
    title,
    status,
    priority,
    createdAt,
    isArchived,
  } = ticket;

  return (
    <>
      <td>
        <div className="assignedBy">
          <p>{assignedBy?.name}</p>
        </div>
      </td>

      <td>
        <div className="assignedTo">
          {assignedTo ? (
            <p>{assignedTo.name}</p>
          ) : (
            <p className="unassigned">Unassigned</p>
          )}
        </div>
      </td>

      <td>
        <div className="title">
          <p>{title}</p>
        </div>
      </td>

      <td>
        <div className="status">
          <p className={`${status}`}>{status}</p>
        </div>
      </td>

      <td>
        <div className="priority">
          <p className={`${priority}`}>{priority}</p>
        </div>
      </td>

      <td>
        <div className="date">
          <p>{createdAt ? formatDate(createdAt) : ""}</p>
        </div>
      </td>

      <td>
        <div className="btns">
          <Link to={`/tickets/ticket-details/${_id}`}>
            <button className="details">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>

          {USER_ROLE === "admin" && (
            <Link to={`/tickets/edit-ticket/${_id}`}>
              <button className="edit">
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </Link>
          )}

          {USER_ROLE === "admin" && (
            <button
              className={`${isArchived ? "unarchive" : "archive"}`}
              onClick={() => archiveTicket(_id, !isArchived)}
            >
              <FontAwesomeIcon icon={faBoxArchive} />
            </button>
          )}
        </div>
      </td>
    </>
  );
};

export default MyTickets;

/*


*/

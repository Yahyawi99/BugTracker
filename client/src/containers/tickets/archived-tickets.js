import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
// utils
import formatDate from "../../utils/formatDate";
// Components
import LimitAndSearch from "../../components/shared/LimitAndSearch";
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/all-tickets.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;

const ArchivedTickets = () => {
  const { getAllTickets, allTickets, archiveTicket } = useTickets();

  const [limit, setLimit] = useState(5);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllTickets(1, "", limit, searchInput, true);
  }, []);

  if (allTickets) {
    var { currentPage } = allTickets;
  }

  return (
    <section className="ticketsContainer">
      <HomeBtn name="Tickets" />

      <div>
        <LimitAndSearch
          controller={getAllTickets}
          currentPage={currentPage}
          states={{
            limit,
            setLimit,
            dropDown,
            setDropDown,
            searchInput,
            setSearchInput,
          }}
          isArchived={true}
        />

        <div className="table">
          <div>
            <Table
              getAllTickets={getAllTickets}
              archiveTicket={archiveTicket}
              data={allTickets}
              limit={limit}
              searchInput={searchInput}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// *********************************
const Table = ({ data, archiveTicket, getAllTickets, limit, searchInput }) => {
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
                          getAllTickets(
                            currentPage - 1,
                            "",
                            limit,
                            searchInput,
                            true
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
                                getAllTickets(
                                  num,
                                  "",
                                  limit,
                                  searchInput,
                                  true
                                );
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
                          getAllTickets(
                            currentPage + 1,
                            "",
                            limit,
                            searchInput,
                            true
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
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
          )}
        </div>
      </td>
    </>
  );
};

/*

  return (
    <ShowAllDocuments
      sectionName="Archived Tickets"
      controller={getAllTickets}
      archiveController={archiveTicket}
      labels={[
        "Assigned by",
        "Assigned to",
        "Title",
        "Status",
        "Priority",
        "Date",
        "Action",
      ]}
      sortLabels={["Title", "Date", "Priority"]}
      data={allTickets}
      isArchived={true}
    />
  ); 

  */

export default ArchivedTickets;

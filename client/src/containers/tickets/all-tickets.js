import React, { useEffect, useState } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
// utils
import formatDate from "../../utils/formatDate";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/tickets/all-tickets.css";

const AllTickets = () => {
  const { getAllTickets, allTickets } = useTickets();
  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const labels = [
    "Assigned by",
    "Assigned to",
    "Title",
    "Status",
    "Priority",
    "Date",
    "Action",
  ];

  useEffect(() => {
    getAllTickets(1, "", limit, searchInput);
  }, []);

  const { tickets, numOfPages, totalTickets, count, currentPage } = allTickets;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  // sort
  const sort = (element, label) => {
    const sibling =
      element.nextElementSibling || element.previousElementSibling;

    if (element.classList.contains("on")) {
      element.classList.remove("on");
      sibling.classList.add("on");
    } else {
      element.classList.add("on");
      sibling.classList.remove("on");
    }

    getAllTickets(currentPage, label, limit, searchInput);
  };

  // limit
  const changeLimit = (element) => {
    if (element.dataset.value) {
      setLimit(element.dataset.value);
      setDropDown(false);
    }
  };

  useEffect(() => {
    getAllTickets(currentPage, "", limit, searchInput);
  }, [limit]);

  // search
  const search = () => {
    getAllTickets(1, "", limit, searchInput);
  };

  return (
    tickets && (
      <section className="allTicketsSection">
        <HomeBtn name="All Tickets" />

        <div>
          <div>
            <div>
              <div className="sectionHeader">
                <div className="limitControl">
                  <p>show</p>

                  <div className="dropdownContainer">
                    <p className="dropDownValue">
                      <span>{limit}</span>

                      <i onClick={() => setDropDown(!dropDown)}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </i>
                    </p>

                    <div
                      className={`${dropDown && "showDropDown"} dropDown`}
                      onClick={(e) => changeLimit(e.target)}
                    >
                      <p data-value="3">3</p>
                      <p data-value="5">5</p>
                      <p data-value="10">10</p>
                    </div>
                  </div>
                  <p>documents</p>
                </div>

                <div className="searchBar">
                  <p>search :</p>

                  <input
                    type="text"
                    onChange={(e) => setSearchInput(e.currentTarget.value)}
                  />

                  <button type="button" onClick={search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
            </div>

            <div className="labels">
              {labels.map((label) => {
                return (
                  <div>
                    <p>{label}</p>

                    {["Title", "Date", "Priority"].includes(label) && (
                      <>
                        <i
                          onClick={(e) => {
                            sort(e.currentTarget, `-${label}`);
                          }}
                          className="on"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z" />
                          </svg>
                        </i>

                        <i
                          onClick={(e) => {
                            sort(e.currentTarget, label);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z" />
                          </svg>
                        </i>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              {tickets.map((ticket) => {
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
              <p className="count">
                {count} out of {totalTickets} documents
              </p>

              <div className="pagination">
                {numOfPages > 1 && (
                  <>
                    {currentPage > 1 && (
                      <button
                        className="prevPage"
                        onClick={() =>
                          getAllTickets(currentPage - 1, "", limit, searchInput)
                        }
                      >
                        previous
                      </button>
                    )}

                    <div className="pages">
                      {numOfpagesArr.map((num) => {
                        return (
                          <p
                            onClick={() =>
                              getAllTickets(num, "", limit, searchInput)
                            }
                            className={`${currentPage === num && "viewedPage"}`}
                          >
                            {num}
                          </p>
                        );
                      })}
                    </div>

                    {currentPage < numOfPages && (
                      <button
                        className="nextPage"
                        onClick={() =>
                          getAllTickets(currentPage + 1, "", limit, searchInput)
                        }
                      >
                        next
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default AllTickets;

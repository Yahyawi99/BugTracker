import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import reactQuillModules from "../../utils/reactQuill-modules";
// packages
import ReactQuill from "react-quill";
// hooks
import useTickets from "../../hooks/useTickets";
// compenents
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-create-project.css";
import "react-quill/dist/quill.snow.css";

const EditTicket = () => {
  const { ticketId } = useParams();

  const { getSingleTicket, singleTicket, editTicket } = useTickets();

  const [ticket, setTicket] = useState({});

  useEffect(() => {
    getSingleTicket(ticketId);
  }, []);

  useEffect(() => {
    setTicket(singleTicket.ticket);
  }, [singleTicket]);

  // change state when drop down value clicked
  const changeDropDownValue = (property, value, setDropDown) => {
    if (property === "type") {
      setTicket({
        ...ticket,
        type: value,
      });
    }

    if (property === "priority") {
      setTicket({
        ...ticket,
        priority: value,
      });
    }

    if (property === "status") {
      setTicket({
        ...ticket,
        status: value,
      });
    }

    setDropDown(false);
  };

  //   **************************
  //   **************************
  return (
    <>
      <HomeBtn name="Edit Ticket" />

      {ticket && (
        <section className="editProject">
          <div className="editForm">
            <div>
              <label htmlFor="name">Title</label>
              <input
                type="text"
                id="name"
                placeholder="project name"
                value={ticket.title}
                onChange={(e) =>
                  setTicket({ ...ticket, title: e.currentTarget.value })
                }
              />
            </div>

            <div className="note-editor">
              <label htmlFor="description">Description</label>

              <div className="quill-editor">
                <ReactQuill
                  modules={reactQuillModules}
                  theme="snow"
                  placeholder="Your project description..."
                  value={ticket.description}
                  onChange={(value) =>
                    setTicket({ ...ticket, description: value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="type">Ticket Type</label>

              <DropDown
                initialValue={ticket.type}
                data={[
                  "enhancement",
                  "changeRequest",
                  "defect",
                  "workTask",
                  "newDevelopment",
                  "generalTask",
                ]}
                property="type"
                changeDropDownValue={changeDropDownValue}
              />
            </div>

            <div>
              <label htmlFor="priority">Ticket Priority</label>

              <DropDown
                initialValue={ticket.priority}
                data={["high", "low", "urgent"]}
                property="priority"
                changeDropDownValue={changeDropDownValue}
              />
            </div>

            <div>
              <label htmlFor="status">Ticket Status</label>

              <DropDown
                initialValue={ticket.status}
                data={["new", "resolved", "development"]}
                property="status"
                changeDropDownValue={changeDropDownValue}
              />
            </div>
          </div>

          <button type="button" onClick={() => editTicket(ticketId, ticket)}>
            Save Changes
          </button>

          <div className="links">
            <Link to="/tickets/all-tickets">Return to All Tickets</Link>
            <p>|</p>
            <Link to={`/tickets/ticket-details/${ticketId}`}>
              Return to Details
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

// dropDown component
const DropDown = (props) => {
  const { initialValue, data, changeDropDownValue, property } = props;

  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="DropDownContainer">
      <p className="dropDownValue" onClick={() => setDropDown(!dropDown)}>
        {initialValue}
      </p>

      <div className={`${dropDown && "showDropDown"} dropDown`}>
        {data.map((value, i) => (
          <p
            key={i}
            onClick={() => {
              changeDropDownValue(property, value, setDropDown);
            }}
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EditTicket;

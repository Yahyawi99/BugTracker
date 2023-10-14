import React, { useState, useEffect } from "react";
import reactQuillModules from "../../utils/reactQuill-modules";
// packages
import ReactQuill from "react-quill";
import Calendar from "react-calendar";
// hooks
import useTickets from "../../hooks/useTickets";
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-create-project.css";
import "../../styles/containers/projects/create-project.css";

const CreateTicket = () => {
  const { createTicket } = useTickets();
  const { getAllProjects, allProjects } = useProjects();

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    project: {},
  });
  const [projects, setProjects] = useState([]);

  //   projects
  useEffect(() => {
    getAllProjects(1, 100 * 100, "", "", "all");
  }, []);

  useEffect(() => {
    setProjects(allProjects.projects);
  }, [allProjects]);

  // change state when drop down value clicked
  const changeDropDownValue = (property, value, setDropDown) => {
    if (property === "project") {
      setNewTicket({
        ...newTicket,
        project: value,
      });
    }

    if (property === "type") {
      setNewTicket({
        ...newTicket,
        type: value,
      });
    }

    if (property === "priority") {
      setNewTicket({
        ...newTicket,
        priority: value,
      });
    }

    setDropDown(false);
  };

  return (
    <>
      <HomeBtn name="Create" />

      <section className="editProject createProject">
        <div className="editForm">
          <div>
            <label htmlFor="name">
              Ticket Title
              <span> *</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="ticket title"
              value={newTicket.title}
              onChange={(e) =>
                setNewTicket({ ...newTicket, title: e.currentTarget.value })
              }
            />
          </div>

          <div className="note-editor">
            <label htmlFor="description">
              Ticket Description
              <span> *</span>
            </label>

            <div className="quill-editor">
              <ReactQuill
                modules={reactQuillModules}
                theme="snow"
                placeholder="Your ticket description..."
                value={newTicket.description}
                onChange={(value) =>
                  setNewTicket({ ...newTicket, description: value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="priority">
              Ticket Priority
              <span> *</span>
            </label>

            <DropDown
              initialValue={newTicket.priority}
              data={["high", "low", "urgent"]}
              property="priority"
              changeDropDownValue={changeDropDownValue}
            />
          </div>

          <div>
            <label htmlFor="manager">
              Ticket Type <span>*</span>
            </label>

            <DropDown
              initialValue={newTicket.type}
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
            <label htmlFor="manager">
              Project <span>*</span>
            </label>

            {projects && (
              <DropDown
                initialValue={newTicket.project.name}
                data={projects}
                property="project"
                changeDropDownValue={changeDropDownValue}
              />
            )}
          </div>
        </div>

        <button type="button" onClick={() => createTicket(newTicket)}>
          Create Ticket
        </button>
      </section>
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
            onClick={() => changeDropDownValue(property, value, setDropDown)}
          >
            {value.name || value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreateTicket;

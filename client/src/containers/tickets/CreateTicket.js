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
  const { getAllProjects } = useProjects();

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    project: "",
  });

  //   managers
  useEffect(() => {
    getAllProjects(1, 100 * 100, "", "", "all");
  }, []);

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
              placeholder="project name"
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
                placeholder="Your project description..."
                value={newTicket.description}
                onChange={(value) =>
                  setNewTicket({ ...newTicket, description: value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="priority">
              Choose a priority
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
            <label htmlFor="manager">Project Manager</label>

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
        </div>

        <button type="button" onClick={() => createProject(newProject)}>
          Create Project
        </button>
      </section>
    </>
  );
};

// dropDown component
const DropDown = (props) => {
  const { initialValue, data, changeDropDownValue, type } = props;

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
            onClick={() => changeDropDownValue(type, value, setDropDown)}
          >
            {value.name || value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreateTicket;

import React, { useState } from "react";
import { Link } from "react-router-dom";
// packages
import ReactQuill from "react-quill";
import Calendar from "react-calendar";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/create-project.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  ],
};

const CreateProject = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    managedBy: "",
  });

  // change state when drop down value clicked
  const changeDropDownValue = (type, value, setDropDown) => {
    if (type === "managedBy") {
      setNewProject({
        ...newProject,
        managedBy: value,
      });
    } else {
      setNewProject({
        ...newProject,
        priority: value,
      });
    }

    setDropDown(false);
  };

  return (
    <section className="editProject">
      <HomeBtn name="Edit" />

      <div className="editForm">
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            placeholder="project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.currentTarget.value })
            }
          />
        </div>

        <div className="note-editor">
          <label htmlFor="description">Project Description</label>

          <div className="quill-editor">
            <ReactQuill
              modules={modules}
              theme="snow"
              placeholder="Your project description..."
              value={newProject.description}
              onChange={(value) =>
                setNewProject({ ...newProject, description: value })
              }
            />
          </div>
        </div>

        <div className="date">
          <div>
            <label htmlFor="startDate">Start Date</label>
            <div className="calendar">
              <Calendar
                defaultValue={new Date(newProject.startDate)}
                onChange={(value) =>
                  setNewProject({ ...newProject, startDate: value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate">End Date</label>
            <div className="calendar">
              <Calendar
                defaultValue={new Date(newProject.endDate)}
                onChange={(value) =>
                  setNewProject({ ...newProject, endDate: value })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="priority">Choose a priority</label>

          <DropDown
            initialValue={"___"}
            data={["high", "medium", "low", "urgent"]}
            setProject={setNewProject}
            project={newProject}
            type="priority"
            changeDropDownValue={changeDropDownValue}
          />
        </div>

        <div>
          <label htmlFor="manager">Project Manager</label>

          <DropDown
            initialValue={"___"}
            // data={managers}
            setProject={setNewProject}
            project={newProject}
            type="managedBy"
            changeDropDownValue={changeDropDownValue}
          />
        </div>
      </div>

      <button type="button">Create Project</button>

      {/* <div className="links">
        <Link to="/projects/all-projects">Return to All Projects</Link>
        <p>|</p>
        <Link to={`/projects/project-details/${projectId}`}>
          Return to Details
        </Link>
      </div> */}
    </section>
  );
};

// dropDown component
const DropDown = (props) => {
  const { initialValue, data, changeDropDownValue } = props;

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
              value.name
                ? changeDropDownValue("managedBy", value, setDropDown)
                : changeDropDownValue("priority", value, setDropDown);
            }}
          >
            {value.name || value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreateProject;

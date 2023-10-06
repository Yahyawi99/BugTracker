import React, { useState, useEffect } from "react";
// packages
import ReactQuill from "react-quill";
import Calendar from "react-calendar";
// hooks
import useUsers from "../../hooks/useUsers";
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-create-project.css";
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

// *********************
const CreateProject = () => {
  const { getAllUsers, allUsers } = useUsers();
  const { createProject } = useProjects();

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    managedBy: {},
  });
  const [managers, setManagers] = useState([""]);

  //   managers
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.users) {
      setManagers(() => allUsers.users.filter((user) => user.role == "PM"));
    }
  }, [allUsers]);

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
    <>
      <HomeBtn name="Create" />

      <section className="editProject createProject">
        <div className="editForm">
          <div>
            <label htmlFor="name">
              Project Name
              <span> *</span>
            </label>
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
            <label htmlFor="description">
              Project Description
              <span> *</span>
            </label>

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
              <label htmlFor="startDate">
                Start Date
                <span> *</span>
              </label>
              <div className="calendar">
                <Calendar
                  defaultValue={newProject.startDate}
                  onChange={(value) =>
                    setNewProject({ ...newProject, startDate: value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="endDate">
                End Date
                <span> *</span>
              </label>
              <div className="calendar">
                <Calendar
                  defaultValue={newProject.endDate}
                  onChange={(value) =>
                    setNewProject({ ...newProject, endDate: value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="priority">
              Choose a priority
              <span> *</span>
            </label>

            <DropDown
              initialValue={newProject.priority}
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
              initialValue={
                newProject.managedBy ? newProject.managedBy.name : ""
              }
              data={managers}
              setProject={setNewProject}
              project={newProject}
              type="managedBy"
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

export default CreateProject;

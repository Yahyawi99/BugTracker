import React, { useState, useEffect } from "react";
import reactQuillModules from "../../utils/reactQuill-modules";
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
    getAllUsers(1, "", Infinity);
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

      <section className="editCreateProject">
        <form className="editCreateForm">
          <div>
            <div className="label">
              Project Name
              <span> *</span>
            </div>
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
            <div className="label">
              Project Description
              <span> *</span>
            </div>

            <div className="quill-editor">
              <ReactQuill
                id="description"
                modules={reactQuillModules}
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
              <div className="label">
                Start Date
                <span> *</span>
              </div>
              <div className="calendar">
                <Calendar
                  id="startDate"
                  defaultValue={newProject.startDate}
                  onChange={(value) =>
                    setNewProject({ ...newProject, startDate: value })
                  }
                />
              </div>
            </div>

            <div>
              <div className="label">
                End Date
                <span> *</span>
              </div>
              <div className="calendar">
                <Calendar
                  id="endDate"
                  defaultValue={newProject.endDate}
                  onChange={(value) =>
                    setNewProject({ ...newProject, endDate: value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <div className="label">
              Choose a priority
              <span> *</span>
            </div>

            <DropDown
              initialValue={newProject.priority}
              data={["high", "medium", "low", "urgent"]}
              setProject={setNewProject}
              project={newProject}
              type="priority"
              changeDropDownValue={changeDropDownValue}
              id="priority"
            />
          </div>

          <div>
            <div className="label">Project Manager</div>

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
        </form>

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

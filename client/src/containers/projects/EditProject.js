import React, { useState, useEffect } from "react";
// packages
import ReactQuill from "react-quill";
import Calendar from "react-calendar";
// hooks
import useProjects from "../../hooks/useProjects";
import useUsers from "../../hooks/useUsers";
// compenents
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-project.css";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

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

const EditProject = () => {
  const { projectId } = useParams();

  const { getSingleProject, singleProject } = useProjects();
  const { getAllUsers, allUsers } = useUsers();

  const [project, setProject] = useState({});
  const [managers, setManagers] = useState([""]);

  useEffect(() => {
    getSingleProject(projectId);
    getAllUsers();
  }, []);

  useEffect(() => {
    setProject(singleProject.project);
  }, [singleProject]);

  useEffect(() => {
    if (allUsers.users) {
      setManagers((prev) =>
        allUsers.users
          .filter((user) => user.role == "PM")
          .map((manager) => manager.name)
      );
    }
  }, [allUsers]);

  //   **************************
  //   **************************
  return (
    !!project && (
      <section className="editProject">
        <HomeBtn name="Edit" />

        <div className="editForm">
          <div>
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              placeholder="project name"
              value={project.name}
              onChange={(e) =>
                setProject({ ...project, name: e.currentTarget.value })
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
                value={project.description}
                onChange={(value) =>
                  setProject({ ...project, description: value })
                }
              />
            </div>
          </div>

          <div className="date">
            <div>
              <label htmlFor="startDate">Start Date</label>
              <div className="calendar">
                <Calendar />
              </div>
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <div className="calendar">
                <Calendar />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="priority">Choose a priority</label>

            <DropDown
              data={[
                "high",
                "medium",
                "low",
                "urgent",
                "medium",
                "low",
                "urgent",
                ,
                "medium",
                "low",
                "urgent",
                ,
                "medium",
                "low",
                "urgent",
              ]}
            />
          </div>

          <div>
            <label htmlFor="manager">Project Manager</label>

            <DropDown data={managers} />
          </div>

          <button type="button">Save Changes</button>
        </div>
      </section>
    )
  );
};

const DropDown = ({ data }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="DropDownContainer">
      <p className="dropDownValue" onClick={() => setDropDown(!dropDown)}>
        {"test"}
      </p>

      <div className={`${dropDown && "showDropDown"} dropDown`}>
        {data.map((value, i) => (
          <p key={i}>{value}</p>
        ))}
      </div>
    </div>
  );
};

export default EditProject;

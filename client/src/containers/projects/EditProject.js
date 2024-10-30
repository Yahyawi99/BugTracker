import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reactQuillModules from "../../utils/reactQuill-modules";
// packages
import ReactQuill from "react-quill";
import Calendar from "react-calendar";
// hooks
import useProjects from "../../hooks/useProjects";
import useUsers from "../../hooks/useUsers";
// compenents
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-create-project.css";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

const EditProject = () => {
  const { projectId } = useParams();

  const { getSingleProject, singleProject, editProject } = useProjects();
  const { getAllUsers, allUsers } = useUsers();

  const [project, setProject] = useState({});
  const [managers, setManagers] = useState([""]);

  useEffect(() => {
    getSingleProject(projectId);
    getAllUsers();
<<<<<<< HEAD
=======
    // eslint-disable-next-line
>>>>>>> master
  }, []);

  useEffect(() => {
    setProject(singleProject.project);
  }, [singleProject]);

  useEffect(() => {
    if (allUsers.users) {
<<<<<<< HEAD
      setManagers(() => allUsers.users.filter((user) => user.role == "PM"));
=======
      setManagers(() => allUsers.users.filter((user) => user.role === "PM"));
>>>>>>> master
    }
  }, [allUsers]);

  // change state when drop down value clicked
  const changeDropDownValue = (type, value, setDropDown) => {
    if (type === "managedBy") {
      setProject({
        ...project,
        managedBy: value,
      });
    } else {
      setProject({
        ...project,
        priority: value,
      });
    }

    setDropDown(false);
  };

  //   **************************
  //   **************************
  return (
    <>
      <HomeBtn name="Edit Project" />

      {project && (
        <section className="editCreateProject">
          <form className="editCreateForm">
            <div>
              <div className="label">Project Name</div>
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
              <div className="label">Project Description</div>

              <div className="quill-editor">
                <ReactQuill
                  modules={reactQuillModules}
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
                <div className="label">Start Date</div>
                <div className="calendar">
                  {project.startDate && (
                    <Calendar
                      defaultValue={new Date(project.startDate)}
                      onChange={(value) =>
                        setProject({ ...project, startDate: value })
                      }
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="label">End Date</div>
                <div className="calendar">
                  {project.endDate && (
                    <Calendar
                      defaultValue={new Date(project.endDate)}
                      onChange={(value) =>
                        setProject({ ...project, endDate: value })
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="label">Choose a priority</div>

              <DropDown
                initialValue={project.priority}
                data={["high", "medium", "low", "urgent"]}
                setProject={setProject}
                project={project}
                type="priority"
                changeDropDownValue={changeDropDownValue}
              />
            </div>

            <div>
              <div className="label">Project Manager</div>

              {project.managedBy && (
                <DropDown
                  initialValue={project.managedBy.name}
                  data={managers}
                  setProject={setProject}
                  project={project}
                  type="managedBy"
                  changeDropDownValue={changeDropDownValue}
                />
              )}
            </div>
          </form>

          <button type="button" onClick={() => editProject(projectId, project)}>
            Save Changes
          </button>

          <div className="links">
            <Link to="/projects/all-projects">Return to All Projects</Link>
            <p>|</p>
            <Link to={`/projects/project-details/${projectId}`}>
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
            onClick={() => {
              changeDropDownValue(type, value, setDropDown);
            }}
          >
            {value.name || value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EditProject;

import React, { useEffect } from "react";
// hooks
import useProjects from "../../hooks/useProjects";
import { useParams } from "react-router-dom";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/project-details.css";

const ProjectDetails = () => {
  const { getSingleProject, singleProject } = useProjects();
  const { projectId } = useParams();

  useEffect(() => {
    getSingleProject(projectId);
  }, []);

  // console.log(projectId);

  return (
    <section className="DocumentDetails">
      <HomeBtn name="Details" />

      <div className="details">
        <div className="first-column">
          <div className="row-one">
            <h1>Electricity Usage Application</h1>
            <p>
              A web application to track exactly what devices are using the most
              electricity.
            </p>

            <div className="progress">
              <p>Progress Status:</p>
              <div>
                <div className="thumb">
                  <p>50%</p>
                </div>
              </div>
            </div>

            <div className="action">
              <button>Edit Project</button>
              <button>Archive Project</button>
            </div>
          </div>

          <div className="row-two">
            <div className="created">
              <p>Created</p>
              <p>09/11/2023</p>
            </div>

            <div className="deadline">
              <p>Deadline</p>
              <p>11/06/2023</p>
            </div>

            <div className="priority">
              <p>Priority</p>
              <p className="urgent">Urgent</p>
            </div>

            <div className="status">
              <p>Status</p>
              <p className="active">active</p>
            </div>
          </div>

          <div className="row-three">
            <h3>Project Team</h3>
            <p>6 team members</p>
          </div>
        </div>

        <div className="second-column">
          <p>Tickets</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;

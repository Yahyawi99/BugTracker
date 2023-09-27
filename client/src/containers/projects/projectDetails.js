import React from "react";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/project-details.css";

const ProjectDetails = () => {
  return (
    <section className="DocumentDetails">
      <HomeBtn name="Details" />

      <div>
        <div>
          <div className="row-one">
            <h1>Electricity Usage Application</h1>
            <p>
              A web application to track exactly what devices are using the most
              electricity.
            </p>

            <div className="progress">
              <p>Project Status:</p>
              <div></div>
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
              <p>Urgent</p>
            </div>

            <div className="status">
              <p>Status</p>
              <p>Active</p>
            </div>
          </div>

          <div className="row-three">
            <h3>Project Team</h3>
            <p>6 team members</p>
          </div>
        </div>

        <div></div>
      </div>
    </section>
  );
};

export default ProjectDetails;

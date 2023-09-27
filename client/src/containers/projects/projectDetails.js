import React, { useEffect } from "react";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
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

  const { name, description, startDate, endDate, priority, status } =
    singleProject;

  return (
    singleProject && (
      <section className="DocumentDetails">
        <HomeBtn name="Details" />

        <div className="details">
          <div className="first-column">
            <div className="row-one">
              <h1>{name}</h1>
              <p>{description}</p>

              <div className="progress">
                <p>Progress Status:</p>
                <div>
                  {startDate && (
                    <div
                      style={{ width: progress(startDate, endDate) + "%" }}
                      className="thumb"
                    >
                      <p>{progress(startDate, endDate)}%</p>
                    </div>
                  )}
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
                <p>
                  {startDate &&
                    formatDate(startDate, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="deadline">
                <p>Deadline</p>
                <p>
                  {endDate &&
                    formatDate(endDate, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>

              <div className="priority">
                <p>Priority</p>
                <p className={`${priority}`}>{priority}</p>
              </div>

              <div className="status">
                <p>Status</p>
                <p className={`${status}`}>{status}</p>
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
    )
  );
};

export default ProjectDetails;

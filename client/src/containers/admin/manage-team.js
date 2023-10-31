import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// hooks
import useProjects from "../../hooks/useProjects";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-team.css";

const ManageTeam = () => {
  const { getSingleProject, singleProject } = useProjects();
  const { projectId } = useParams();

  useEffect(() => {
    getSingleProject(projectId);
  }, []);

  if (singleProject.project) {
    var { managedBy, team } = singleProject.project;
  }

  return (
    <section className="manageTeam">
      <HomeBtn name="Manage Team" />

      <div>
        <div className="first-column">
          <h1>Project Team</h1>
          <p>8 team members</p>

          {managedBy && (
            <div className="pm">
              <img src={managedBy.avatar} alt="project-manager" />

              <div className="info">
                <p className="name">{managedBy.name}</p>
                <p className="email">{managedBy.email}</p>
                <p className="role">Project Manager</p>

                <Link to={`/admin/manage-pm/${projectId}`}>
                  <button type="button">Manage PM</button>
                </Link>
              </div>
            </div>
          )}

          <div className="team">
            {team &&
              team.map((member) => {
                const { _id, name, avatar, role } = member;

                return (
                  <div key={_id}>
                    <img src={avatar} alt="developer" />

                    <div>
                      <p className="name">{name}</p>
                      <p className="role">{role}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="second-column">
          <h1>Manage Developers</h1>
        </div>
      </div>
    </section>
  );
};

export default ManageTeam;

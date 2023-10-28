import React from "react";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-team.css";

const ManageTeam = () => {
  return (
    <section className="manageTeam">
      <HomeBtn name="Manage Team" />

      <div>
        <div className="first-column">
          <h1>Project Team</h1>
          <p>8 team members</p>

          <div className="pm">
            <img
              src="/assets/images/default-avatar-1.jpg"
              alt="project-manager"
            />

            <div className="info">
              <p className="name">Jane Appuser</p>
              <p className="email">yassinyahyawi@26gmail.com</p>
              <p className="role">Project Manager</p>
              <button type="button">Manage PM</button>
            </div>
          </div>

          <div className="team">
            <div>
              <img src="/assets/images/default-avatar-1.jpg" alt="developer" />

              <div>
                <p className="name">James Appuser</p>
                <p className="role">Developer</p>
              </div>
            </div>
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

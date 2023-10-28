import React from "react";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-team.css";

const ManageTeam = () => {
  return (
    <section className="manageTeam">
      <HomeBtn name="Manage Team" />

      <div className="first-column">
        <h1>Project Team</h1>
        <p>8 team members</p>

        <div className="pm">
          <img
            src="/assets/images/default-avatar-1.jpg"
            alt="project-manager"
          />

          <div className="info">
            <p>Jane Appuser</p>
            <p>yassinyahyawi@26gmail.com</p>
            <p>Project Manager</p>
            <button type="button">Manage PM</button>
          </div>
        </div>

        <div className="team">
          <div>
            <img src="/assets/images/default-avatar-1.jpg" alt="developer" />

            <div>
              <p>James Appuser</p>
              <p>Developer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="second-column"></div>
    </section>
  );
};

export default ManageTeam;

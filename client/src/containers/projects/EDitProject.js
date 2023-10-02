import React from "react";
// compenents
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-project.css";

const EDitProject = () => {
  return (
    <section className="editProject">
      <HomeBtn name="Edit" />

      <div>
        <div className="name">
          <label htmlFor="ProjectName">Project Name</label>
          <input type="text" id="ProjectName" />
        </div>

        <div>
          <label htmlFor="ProjectDEscription">Project Description</label>
        </div>

        <div>
          <div className="startDate"></div>
          <div className="endDate"></div>
        </div>
      </div>
    </section>
  );
};

export default EDitProject;

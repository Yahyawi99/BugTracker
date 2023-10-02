import React from "react";
// compenents
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/edit-project.css";

const EditProject = () => {
  return (
    <section className="editProject">
      <HomeBtn name="Edit" />

      <div className="editForm">
        <div>
          <label htmlFor="name">Project Name</label>
          <input type="text" id="name" />
        </div>

        <div>
          <label htmlFor="description">Project Description</label>
        </div>

        <div>
          <div className="startDate"></div>
          <div className="endDate"></div>
        </div>

        <div>
          <label htmlFor="priority">Choose a priority</label>
        </div>

        <div>
          <label htmlFor="manager">Project Manager</label>
        </div>

        <button type="button">Save Changes</button>
      </div>
    </section>
  );
};

export default EditProject;

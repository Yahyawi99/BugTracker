import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllProjects from "./all-projects";
import ProjectDetails from "./projectDetails";
import EditProject from "./EditProject";
import ArchivedProjects from "./Archived-projects";
import CreateProject from "./CreateProject";
import ManageProjects from "./ManageProjects";
import MyProjects from "./MyProjects";

const Projects = () => {
  return (
    <>
      <Routes>
        <Route path="/all-projects" Component={AllProjects} />
        <Route path="/project-details/:projectId" Component={ProjectDetails} />
        <Route path="/edit-project/:projectId" Component={EditProject} />
        <Route path="/archived-projects" Component={ArchivedProjects} />
        <Route path="/create-project" Component={CreateProject} />
        <Route path="/manage-projects" Component={ManageProjects} />
        <Route path="/my-projects" Component={MyProjects} />
      </Routes>
    </>
  );
};
export default Projects;

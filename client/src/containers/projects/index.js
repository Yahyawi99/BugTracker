import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllProjects from "./all-projects";
import ProjectDetails from "./projectDetails";

const Projects = () => {
  return (
    <>
      <Routes>
        <Route path="/all-projects" Component={AllProjects} />
        <Route path="/project-details/:projectId" Component={ProjectDetails} />
      </Routes>
    </>
  );
};
export default Projects;

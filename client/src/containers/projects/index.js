import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import AllProjects from "./all-projects";

const Projects = () => {
  return (
    <>
      <Routes>
        <Route path="/all-projects" Component={AllProjects} />
      </Routes>
    </>
  );
};
export default Projects;

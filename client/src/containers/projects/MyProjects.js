import React from "react";
// compenent
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/my-projects.css";

const MyProjects = () => {
  return (
    <section className="myProjectSection">
      <HomeBtn name="My Projects" />
    </section>
  );
};

export default MyProjects;

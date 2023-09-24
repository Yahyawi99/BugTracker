import React, { useEffect } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useTickets from "../../hooks/useTickets";
// utils
import formatDate from "../../utils/formatDate";
import progress from "../../utils/progress";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/projects/all-projects.css";
import { all } from "axios";

const AllTickets = () => {
  const { getAllTickets, allTickets } = useTickets();

  useEffect(() => {
    getAllTickets();
  }, []);

  console.log(allTickets);

  return (
    <section className="allProjectsSection">
      <HomeBtn name="All Projects" />
    </section>
  );
};

export default AllTickets;

import React, { useEffect, useState } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faBoxArchive,
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useProjects from "../../hooks/useProjects";
// Components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/projects/all-projects.css";

const AllProjects = () => {
  const { getAllProjects, allProjects } = useProjects();
  const [limit, setLimit] = useState(3);
  const [dropDown, setDropDown] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const labels = [
    "Project",
    "End Date",
    "Progress",
    "Project Manager",
    "Team",
    "Status",
    "Action",
  ];

  useEffect(() => {
    getAllProjects(1, "", limit, searchInput);
  }, []);

  const { projects, numOfPages, totalProjects, count, currentPage } =
    allProjects;

  const numOfpagesArr = Array.from({ length: numOfPages }, (_, i) => i + 1);

  // sort
  const sort = async (element, label) => {
    const sibling =
      element.nextElementSibling || element.previousElementSibling;

    if (element.classList.contains("on")) {
      element.classList.remove("on");
      sibling.classList.add("on");
    } else {
      element.classList.add("on");
      sibling.classList.remove("on");
    }

    getAllProjects(currentPage, label, limit, searchInput);
  };

  // limit
  const changeLimit = (element) => {
    if (element.dataset.value) {
      setLimit(element.dataset.value);
      setDropDown(false);
    }
  };

  useEffect(() => {
    getAllProjects(currentPage, "", limit, searchInput);
  }, [limit]);

  // search
  const search = () => {
    getAllProjects(1, "", limit, searchInput);
  };

  return (
    <ShowAllDocuments
      sectionName="All Projects"
      controller={getAllProjects}
      labels={[
        "Project",
        "End Date",
        "Progress",
        "Project Manager",
        "Team",
        "Status",
        "Action",
      ]}
      data={allProjects}
    />
  );
};

export default AllProjects;

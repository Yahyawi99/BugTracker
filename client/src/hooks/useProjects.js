import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allProjects, setAllProjects] = useState([]);
  const [singleProject, setSingleProject] = useState({});

  //   get all projects
  const getAllProjects = async (page, sortOption, limit, searchInput) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}`
      );

      loading(false);

      setAllProjects(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  // get single project
  const getSingleProject = async (
    projectId,
    page,
    sortOption,
    limit,
    searchInput
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project/${projectId}?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}`
      );

      loading(false);

      setSingleProject(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      // const msg = "Something went wrong please try again later!";
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  // Edit project
  const editProject = async (projectId, newProject) => {
    if (!singleProject.project.description || !singleProject.project.name) {
      await alertMe("All fields are required!" + "!", "var(--danger)");
      return;
    }

    console.log(newProject.managedBy);

    try {
      loading(true);

      const response = await axios.patch(
        `/api/v1/project/${projectId}`,
        newProject
      );

      loading(false);

      setSingleProject({ ...singleProject, project: response.data.project });

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  return {
    getAllProjects,
    allProjects,
    getSingleProject,
    singleProject,
    editProject,
  };
};

export default useProjects;

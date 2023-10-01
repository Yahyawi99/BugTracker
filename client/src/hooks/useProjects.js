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
  const getSingleProject = async (projectId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/project/${projectId}`);

      loading(false);

      setSingleProject(response.data);
      console.log(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  return { getAllProjects, allProjects, getSingleProject, singleProject };
};

export default useProjects;

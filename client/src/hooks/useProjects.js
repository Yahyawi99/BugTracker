import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allProjects, setAllProjects] = useState([]);

  //   get all projects
  const getAllProjects = async (page, sortOption, limit) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project?page=${page}&limit=${limit}&sort=${sortOption}`
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

  return { getAllProjects, allProjects };
};

export default useProjects;

import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allProjects, setAllProjects] = useState([]);

  //   get all projects
  const getAllProjects = async () => {
    try {
      loading(true);

      const response = await axios.get("/api/v1/project");

      loading(false);

      setAllProjects(response.data.projects);

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
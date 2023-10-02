import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allUsers, setAllUsers] = useState([]);

  //   get all projects
  const getAllUsers = async () => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/user`);

      loading(false);

      setAllUsers(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  return { getAllUsers, allUsers };
};

export default useProjects;

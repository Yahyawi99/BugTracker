import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useUsers = () => {
  const { alertMe, loading } = useMainContext();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [singleUser, setSingleUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);

  //   get all users
  const getAllUsers = async () => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/user`);

      loading(false);

      setAllUsers(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe(
        "Something went wrong please try again later!" + "!",
        "var(--danger)"
      );
    }
  };

  // get current user
  const getCurrentUser = async () => {
    try {
      loading(false);

      const response = await axios.get("/api/v1/user/current-user");

      setCurrentUser(response.data);

      loading(true);
    } catch (error) {
      loading(false);

      await alertMe("Something went wrong, please try again!");
    }
  };

  //   get single user
  const getSingleUser = async (memberId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/user/${memberId}`);

      loading(false);

      setSingleUser(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe(
        "Something went wrong please try again later!" + "!",
        "var(--danger)"
      );
    }
  };

  // user projects
  const getUserProjects = async (userId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/user/projects/${userId}`);

      loading(false);

      setUserProjects(response.data);

      await alertMe("Done", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe("something went wrong please try again!", "var(--danger)");
    }
  };

  return {
    getAllUsers,
    allUsers,
    getSingleUser,
    singleUser,
    getUserProjects,
    userProjects,
    getCurrentUser,
    currentUser,
  };
};

export default useUsers;

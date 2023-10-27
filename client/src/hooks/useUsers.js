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
  const getAllUsers = async (
    page,
    sortOption = "",
    limit,
    searchInput = ""
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/user?page=${page}&sort=${sortOption}&limit=${limit}&search=${searchInput}`
      );

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
      loading(true);

      const response = await axios.get("/api/v1/user/current-user");

      setCurrentUser(response.data);

      loading(false);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe("Something went wrong, please try again!", "var(--danger)");
    }
  };

  // update user
  const updateCurrentUser = async (userId, data) => {
    try {
      loading(true);

      await axios.patch(`/api/v1/user/${userId}`, data);

      loading(false);

      await alertMe("Done", "var(--success)");

      window.location.reload();
    } catch (error) {
      loading(false);

      if (error.response.status === 400) {
        await alertMe(error.response.data.msg, "var(--danger)");
        return;
      }

      await alertMe(
        "Something went wrong, please try again later.",
        "var(--danger)"
      );
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

  // // update user role
  // const updateUserRole = async (memberId,role) => {
  //   try {
  //     loading(true);

  //     const response = await axios.post(`/api/v1/user/${memberId}`,{role});

  //     loading(false);

  //     setSingleUser(response.data);

  //     await alertMe("Done.", "var(--success)");
  //   } catch (error) {
  //     loading(false);

  //     await alertMe(
  //       "Something went wrong please try again later!" + "!",
  //       "var(--danger)"
  //     );
  //   }
  // };

  return {
    getAllUsers,
    allUsers,
    getSingleUser,
    singleUser,
    getUserProjects,
    userProjects,
    getCurrentUser,
    currentUser,
    updateCurrentUser,
  };
};

export default useUsers;

import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useUsers = () => {
  const { alertMe, loading } = useMainContext();
  const [allUsers, setAllUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({});

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

  return { getAllUsers, allUsers, getSingleUser, singleUser };
};

export default useUsers;

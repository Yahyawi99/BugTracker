import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useComments = () => {
  const { alertMe, loading } = useMainContext();
  const [comments, setComments] = useState([]);

  //   get comments
  const getComments = async (ticketId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/comment/${ticketId}`);

      loading(false);

      setComments(response.data.comments);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe(
        "Something went wrong please try again later!",
        "var(--danger)"
      );
    }
  };

  //   create comments
  const createComments = async (e, ticketId, value) => {
    e.preventDefault();

    if (!value) {
      await alertMe("Please provide a comment!", "var(--danger)");
      return;
    }

    try {
      loading(true);

      await axios.post(`/api/v1/comment/${ticketId}`, { value });

      loading(false);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe(
        "Something went wrong please try again later!",
        "var(--danger)"
      );
    }
  };

  return { getComments, comments, createComments };
};

export default useComments;

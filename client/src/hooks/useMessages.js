import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useMessages = () => {
  const { alertMe, loading } = useMainContext();
  const [allMessages, setAllMessages] = useState([]);

  //   all messages
  const getAllMessages = async (memberId, page, limit) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/message/${memberId}/?page=${page}&limit=${limit}`
      );

      setAllMessages(response.data);

      loading(false);
      await alertMe("Done", "var(--success)");
    } catch (error) {
      loading(false);
    }
  };

  // create message
  const createMessage = async (data, clearFormData, setIsFormShown) => {
    try {
      loading(true);

      await axios.post(`/api/v1/message`, data);

      loading(false);

      clearFormData({ recipient: "", subject: "", message: "" });
      setIsFormShown(false);

      await alertMe("Message sent successfully.", "var(--success)");
    } catch (error) {
      loading(false);
      await alertMe(
        "Something went wrong. Please try again later!",
        "var(--danger)"
      );
    }
  };

  // Message is read
  const editMessage = async (messageId) => {
    try {
      await axios.put(`/api/v1/message/${messageId}`, { isRead: true });

      loading(false);
    } catch (error) {
      loading(false);
      await alertMe(
        "Something went wrong. Please try again later!",
        "var(--danger)"
      );
    }
  };

  return {
    createMessage,
    getAllMessages,
    allMessages,
    editMessage,
  };
};

export default useMessages;

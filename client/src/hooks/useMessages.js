import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useMessages = () => {
  const { alertMe, loading } = useMainContext();
  const [allMessages, setAllMessages] = useState([]);

  //   all messages
  const getAllMessages = async (memberId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/message/${memberId}`);

      setAllMessages(response.data.messages);

      loading(false);
      await alertMe("Done", "var(--success)");
    } catch (error) {
      loading(false);
    }
  };

  // create message
  const createMessage = async (recipientID) => {
    try {
      loading(true);

      await axios.post(`/api/v1/message/${recipientID}`);

      loading(false);

      await alertMe("Message sent successfully.", "var(--success)");
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
  };
};

export default useMessages;

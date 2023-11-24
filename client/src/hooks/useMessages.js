import axios from "axios";
import { useMainContext } from "../context/global";

const useMessages = () => {
  const { alertMe, loading } = useMainContext();

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
  };
};

export default useMessages;

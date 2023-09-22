import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useTickets = () => {
  const { alertMe, loading } = useMainContext();
  const [allTickets, setAllTickets] = useState([]);

  //   get all tickets
  const getAllTickets = async () => {
    try {
      loading(true);

      const response = await axios.get("/api/v1/ticket");

      loading(false);

      setAllTickets(response.data.tickets);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  return { getAllTickets, allTickets };
};

export default useTickets;

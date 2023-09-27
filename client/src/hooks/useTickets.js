import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useTickets = () => {
  const { alertMe, loading } = useMainContext();
  const [allTickets, setAllTickets] = useState([]);

  //   get all tickets
  const getAllTickets = async (page, sortOptions, limit, search) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/ticket?page=${page}&sort=${sortOptions}&limit=${limit}&search=${search}`
      );

      loading(false);

      setAllTickets(response.data);

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

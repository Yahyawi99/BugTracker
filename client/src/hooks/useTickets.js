import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useTickets = () => {
  const { alertMe, loading } = useMainContext();
  const [allTickets, setAllTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState({});

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

  // get sindle ticket
  const getSingleTicket = async (ticketId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/ticket/${ticketId}`);

      loading(false);

      setSingleTicket(response.data.ticket);

      alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later!", "var(--danger)");
    }
  };

  return { getAllTickets, allTickets, getSingleTicket, singleTicket };
};

export default useTickets;

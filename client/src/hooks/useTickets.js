import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useTickets = () => {
  const { alertMe, loading } = useMainContext();
  const [allTickets, setAllTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState({});
  const [userTickets, setUserTickets] = useState({});

  //   get all tickets
  const getAllTickets = async (
    page,
    sortOptions,
    limit,
    search,
    isArchived
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/ticket?page=${page}&sort=${sortOptions}&limit=${limit}&search=${search}&isArchived=${isArchived}`
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

  // get single ticket
  const getSingleTicket = async (ticketId) => {
    try {
      loading(true);

      const response = await axios.get(`/api/v1/ticket/${ticketId}`);

      loading(false);

      setSingleTicket(response.data);

      alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later!", "var(--danger)");
    }
  };

  // Edit ticket
  const editTicket = async (ticketId, updates) => {
    if (!singleTicket.ticket.title || !singleTicket.ticket.description) {
      await alertMe("All fields are required!", "var(--danger)");
    }

    const { title, description, status, type, priority } = updates;

    try {
      loading(true);

      await axios.patch(`/api/v1/ticket/${ticketId}`, {
        title,
        description,
        status,
        type,
        priority,
      });

      loading(false);

      alertMe("Done.", "var(--success)");

      window.history.back();
    } catch (error) {
      loading(false);

      alertMe("something went wrong please try again!", "var(--danger)");
    }
  };

  //Archive project
  const archiveTicket = async (ticketId, isArchived) => {
    try {
      loading(true);

      await axios.patch(`/api/v1/ticket/archive/${ticketId}`, {
        isArchived,
      });

      loading(false);

      alertMe("Done.", "var(--success)");

      window.location.reload();
    } catch (error) {
      loading(false);

      alertMe("something went wrong please try again!", "var(--danger)");
    }
  };

  // create ticket
  const createTicket = async (newTicket) => {
    if (
      !newTicket.title ||
      !newTicket.description ||
      !newTicket.priority ||
      !newTicket.type ||
      !newTicket.project
    ) {
      alertMe("Please fill out the required fields", "var(--danger)");
      return;
    }

    try {
      loading(true);

      await axios.post("/api/v1/ticket", newTicket);

      loading(false);

      await alertMe("Ticket Created", "var(--success)");

      window.location.href = "/tickets/all-tickets";
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later", "var(--danger)");
    }
  };

  // user tickets
  const getUserTickets = async (page, sortOption, limit, search) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/ticket/user-tickets?page=${page}&sort=${sortOption}&limit=${limit}&search=${search}`
      );

      setUserTickets(response.data);

      loading(false);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      await alertMe("something went wrong please try again!", "var(--danger)");
    }
  };

  // Unassigned Tickets
  const unassignedTickets = async (
    page,
    sortOptions,
    limit,
    search,
    isArchived
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/ticket/unassigned-tickets?page=${page}&sort=${sortOptions}&limit=${limit}&search=${search}&isArchived=${isArchived}`
      );

      setAllTickets(response.data);

      await alertMe("Done.", "var(--success)");

      loading(false);
    } catch (error) {
      loading(false);

      await alertMe("something went wrong please try again!", "var(--danger)");
    }
  };

  // Assign ticket to developer
  const assignTicketTo = async (ticketId, developerId) => {
    try {
      loading(true);

      await axios.post(`/api/v1/ticket/assign-to/${ticketId}`, { developerId });

      loading(false);

      await alertMe("Done", "var(--success)");

      window.location.reload();
    } catch (error) {
      loading(false);

      alertMe("Something went wrong. Please try again later", "var(--danger)");
    }
  };

  return {
    getAllTickets,
    allTickets,
    getSingleTicket,
    singleTicket,
    archiveTicket,
    getUserTickets,
    userTickets,
    editTicket,
    createTicket,
    unassignedTickets,
    assignTicketTo,
  };
};

export default useTickets;

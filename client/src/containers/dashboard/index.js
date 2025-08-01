import React, { useEffect, useState } from "react";
// hooks
import useProjects from "../../hooks/useProjects";
import useTickets from "../../hooks/useTickets";
import useUsers from "../../hooks/useUsers";
import useMessages from "../../hooks/useMessages";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faTicket,
  faCode,
  faFolder,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import PieChart from "../../components/dashboard/PieChart";
import BarChart from "../../components/dashboard/BarChart";
import Members from "./Members";
import Projects from "./Projects";
// css
import "../../styles/containers/dashboard/index.css";
import "../../styles/components/shared/pagination.css";

const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

const Dashboard = () => {
  const { getAllProjects, allProjects } = useProjects();
  const { getAllTickets, allTickets } = useTickets();
  const { getAllUsers, allUsers } = useUsers();
  const { getAllMessages, allMessages } = useMessages();

  const [newUsers, setNewUsers] = useState(0);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    getAllProjects(1, "", "", "", "all");
    getAllTickets(1, "", "", "");
    getAllUsers();
    getAllMessages(USER_ID);
    // eslint-disable-next-line
  }, []);

  const { projects } = allProjects;
  const { tickets, totalTickets } = allTickets;
  const { users } = allUsers;

  // New users
  useEffect(() => {
    const myNewUsers = users?.filter((user) => {
      const creationTime =
        new Date().getTime() - new Date(user.createdAt).getTime();

      const day = 24 * 3600 * 1000;

      return day - creationTime >= 0;
    });

    setNewUsers(myNewUsers?.length);
    // eslint-disable-next-line
  }, [allUsers]);

  // New messages
  useEffect(() => {
    if (allMessages.messages) {
      const myNewMessages = allMessages?.messages.filter((message) => {
        const creationTime =
          new Date().getTime() - new Date(message.createdAt).getTime();

        const day = 24 * 3600 * 1000;

        return day - creationTime >= 0;
      });

      setNewMessages(myNewMessages.length);
    }
  }, [allMessages]);

  return (
    <section className="dashboard-Container">
      <HomeBtn name="Dashboard" />

      <div className="number-data">
        <span>
          <p>
            {projects?.filter((project) => project.status === "active").length}
          </p>
          <p>Active Projects</p>
        </span>

        <span>
          <p>{totalTickets}</p>
          <p>Total Tickets</p>
        </span>

        <span>
          <p>{tickets?.filter((ticket) => !ticket.isAssigned).length}</p>
          <p>Unassigned Tickets</p>
        </span>

        <span>
          <p>{tickets?.filter((ticket) => ticket.isAssigned).length}</p>
          <p>Assigned Tickets</p>
        </span>
      </div>

      <div className="company">
        <div className="company-info">
          <div>
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>

            <span>
              <p>New User</p>
              <p className="num">{newUsers}</p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faUsers} />
            </i>

            <span>
              <p>Total Users</p>
              <p className="num">{users && users.length}</p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faTicket} />
            </i>

            <span>
              <p>Tickets in Development</p>
              <p className="num">
                {tickets &&
                  tickets.filter((ticket) => ticket.status === "development")
                    .length}
              </p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faCode} />
            </i>

            <span>
              <p>Total Developers</p>
              <p className="num">
                {users &&
                  users.filter((user) => user.role === "developer").length}
              </p>
            </span>
          </div>
        </div>

        <div className="company-data">
          <h3>Company Data</h3>

          <span>
            <i>
              <FontAwesomeIcon icon={faUsers} />
            </i>
            <p>Members</p>
            <p>{users && users.length}</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faFolder} />
            </i>
            <p>Projects</p>
            <p>{projects && projects.length}</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faTicket} />
            </i>
            <p>Tickets</p>
            <p>{tickets && tickets.length}</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faBell} />
            </i>
            <p>Notifications</p>
            <p>{newMessages}</p>
          </span>
        </div>

        <div className="priority-project">
          <h3>Priority Projects</h3>

          <PieChart projects={projects} />
        </div>

        <div className="team-statistics">
          <h3>Team Distribution</h3>
          <BarChart projects={projects} />
        </div>
      </div>

      <div className="membersAndProjectsContainer">
        <Members />

        <Projects />
      </div>
    </section>
  );
};

export default Dashboard;

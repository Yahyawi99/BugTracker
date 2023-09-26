import React, { useEffect } from "react";
// hooks
import useProjects from "../../hooks/useProjects";
import useTickets from "../../hooks/useTickets";
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
// css
import "../../styles/containers/dashboard/index.css";

const Dashboard = () => {
  const { getAllProjects, allProjects } = useProjects();
  const { getAllTickets, allTickets } = useTickets();

  useEffect(() => {
    getAllProjects();
    getAllTickets();
  }, []);

  const { projects } = allProjects;

  return (
    <section className="dashboard-Container">
      <HomeBtn name="Dashboard" />

      <div className="number-data">
        <span>
          <p>
            {projects &&
              projects.filter((project) => project.status === "active").length}
          </p>
          <p>Active Projects</p>
        </span>

        <span>
          <p>{allTickets.length}</p>
          <p>Total Tickets</p>
        </span>

        <span>
          <p>{allTickets.filter((ticket) => !ticket.isAssigned).length}</p>
          <p>Unassigned Tickets</p>
        </span>

        <span>
          <p>{allTickets.filter((ticket) => ticket.isAssigned).length}</p>
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
              <p className="num">0</p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faUsers} />
            </i>

            <span>
              <p>Total Users</p>
              <p className="num">0</p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faTicket} />
            </i>

            <span>
              <p>Tickets in Development</p>
              <p className="num">0</p>
            </span>
          </div>

          <div>
            <i>
              <FontAwesomeIcon icon={faCode} />
            </i>

            <span>
              <p>Total Developers</p>
              <p className="num">0</p>
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
            <p>18</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faFolder} />
            </i>
            <p>Projects</p>
            <p>{allProjects.length}</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faTicket} />
            </i>
            <p>Tickets</p>
            <p>{allTickets.length}</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faBell} />
            </i>
            <p>Notifications</p>
            <p>56</p>
          </span>
        </div>

        <div className="priority-project">
          <h3>Priority Projects</h3>
          <PieChart />
        </div>

        <div className="team-statistics">
          <h3>Team Distribution</h3>
          <BarChart />
        </div>
      </div>

      <div className="members"></div>
    </section>
  );
};

export default Dashboard;

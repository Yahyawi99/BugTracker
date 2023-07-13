import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faTicket,
  faCode,
  faFolder,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
// components
import HomeBtn from "./HomeBtn";
// css
import "../styles/components/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const graph = {
    labels: ["High", "Medium", "Low"],
    data: [3, 1, 2],
  };

  const Data = {
    labels: graph.labels,
    datasets: [
      {
        label: " ",
        data: graph.data,
        backgroundColor: ["#e83e8c", "#20c997", "#fd7e14"],
        borderColor: ["#e83e8c", "#20c997", "#fd7e14"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <section className="dashboard-Container">
      <HomeBtn name="Dashboard" />

      <div className="number-data">
        <span>
          <p>0</p>
          <p>Active Projects</p>
        </span>

        <span>
          <p>27</p>
          <p>Total Tickets</p>
        </span>

        <span>
          <p>8</p>
          <p>Unassigned Tickets</p>
        </span>

        <span>
          <p>19</p>
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
            <p>6</p>
          </span>

          <span>
            <i>
              <FontAwesomeIcon icon={faTicket} />
            </i>
            <p>Tickets</p>
            <p>69</p>
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
          <h3>Priority Project</h3>
          <div className="pie-chart">
            <Pie data={Data} />
          </div>
        </div>

        <div className="team-statistics"></div>
      </div>
    </section>
  );
};

export default Dashboard;

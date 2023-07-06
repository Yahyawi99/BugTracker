import React from "react";
// components
import HomeBtn from "./HomeBtn";
// css
import "../styles/components/dashboard.css";

const Dashboard = () => {
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
    </section>
  );
};

export default Dashboard;

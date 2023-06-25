import React from "react";
import { useNavGlobal } from "../context/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faGauge,
  faDiagramProject,
  faTicket,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// css
import "../styles/components/navbar.css";

const NavBar = () => {
  const { clicked, setClicked } = useNavGlobal();

  return (
    <nav className="navbarContainer">
      <div className="info">
        <img src="/assets/images/avatar.png" alt="avatar" />
        <div>
          <p>Welcome,</p>
          <p className="name">Demo Admin</p>
          <p className="role">Admin</p>
        </div>
      </div>

      <div className="navigationContainer">
        <div className="head">
          <h3>Project</h3>
          <i>
            <FontAwesomeIcon icon={faGear} />
          </i>
        </div>

        <div>
          <ul className="list">
            <li
              className={`listItem1 ${clicked === "dashboard" && "clicked"}`}
              onClick={() => setClicked("dashboard")}
            >
              <i>
                <FontAwesomeIcon icon={faGauge} />
              </i>
              <p>Dashboard</p>
            </li>

            <li
              className={`listItem2 ${clicked === "notification" && "clicked"}`}
              onClick={() => setClicked("notification")}
            >
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <p>Notification Inbox</p>
            </li>

            <li
              className={`listItem3 ${clicked === "projects" && "clicked"}`}
              onClick={() => setClicked("projects")}
            >
              <i>
                <FontAwesomeIcon icon={faDiagramProject} />
              </i>
              <p>Projects</p>
              <i className="arrow">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </li>

            <li
              className={`listItem4 ${clicked === "tickets" && "clicked"}`}
              onClick={() => setClicked("tickets")}
            >
              <i>
                <FontAwesomeIcon icon={faTicket} />
              </i>
              <p>Tickets</p>
              <i className="arrow">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

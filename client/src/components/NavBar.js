import React from "react";
import { useNavGlobal } from "../context/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faGauge,
  faDiagramProject,
  faTicket,
  faChevronDown,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// css
import "../styles/components/navbar.css";

const NavBar = () => {
  const { clicked, setClicked, dropDown, showHideDropDown } = useNavGlobal();

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
              onClick={(e) => {
                setClicked("projects");
                showHideDropDown(e, "projects");
              }}
            >
              <i>
                <FontAwesomeIcon icon={faDiagramProject} />
              </i>

              <p>Projects</p>

              <i
                className={`arrow ${dropDown === "projects" && "clickedArrow"}`}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </li>

            <div
              className={`options ${dropDown === "projects" && "openDropDown"}`}
            >
              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p>All Projects</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> My Projects</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> Archived Projects</p>
              </span>
            </div>

            <li
              className={`listItem4 ${clicked === "tickets" && "clicked"}`}
              onClick={(e) => {
                setClicked("tickets");
                showHideDropDown(e, "tickets");
              }}
            >
              <i>
                <FontAwesomeIcon icon={faTicket} />
              </i>
              <p>Tickets</p>
              <i
                className={`arrow ${dropDown === "tickets" && "clickedArrow"}`}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </li>

            <div
              className={`options ${dropDown === "tickets" && "openDropDown"}`}
            >
              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p>All Tickets</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> My Tickets</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> Add Ticket</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> Unassigned Tickets</p>
              </span>

              <span>
                <FontAwesomeIcon icon={faStarOfLife} />
                <p> Ticket Archive</p>
              </span>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

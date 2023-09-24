import React from "react";
import { Link } from "react-router-dom";
// context
import { useMainContext } from "../../context/global";
import { useNavbar } from "../../context/Navbar";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faGauge,
  faDiagramProject,
  faTicket,
  faChevronDown,
  faStarOfLife,
  faCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faGem } from "@fortawesome/free-regular-svg-icons";
// data
import skins from "../../data/colors.json";
// css
import "../../styles/components/navbar/index.css";

const NavBar = () => {
  const { skin: skinChoice, setSkin } = useMainContext();
  const { nav, setNav, clicked, setClicked, dropDown, dropDownFunctionality } =
    useNavbar();

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
        <div
          className={`head ${nav === "menu" ? "menuOnHead" : "menuOffHead"}`}
        >
          <h3 onClick={() => setNav("menu")}>Project</h3>

          <i onClick={() => setNav("skin")}>
            <FontAwesomeIcon icon={faGear} />
          </i>

          <div className="filler"></div>
        </div>

        {nav === "menu" ? (
          <div className="menu">
            <ul className="list">
              <li
                className={`listItem1 ${clicked === "dashboard" && "clicked"}`}
                onClick={() => setClicked("dashboard")}
              >
                <i>
                  <FontAwesomeIcon icon={faGauge} />
                </i>
                <Link to="/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>

              <li
                className={`listItem2 ${
                  clicked === "notification" && "clicked"
                }`}
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
                  dropDownFunctionality("projects");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faDiagramProject} />
                </i>

                <p>Projects</p>

                <i
                  className={`arrow ${
                    dropDown === "projects" && "clickedArrow"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${
                  dropDown === "projects" && "openDropDown"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/all-projects">
                    <p>All Projects</p>
                  </Link>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p> My Projects</p>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p> Add Projects</p>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p> Manage Projects</p>
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
                  dropDownFunctionality("tickets");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faTicket} />
                </i>

                <p>Tickets</p>

                <i
                  className={`arrow ${
                    dropDown === "tickets" && "clickedArrow"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${
                  dropDown === "tickets" && "openDropDown"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />

                  <Link to="/all-tickets">
                    <p>All Tickets</p>
                  </Link>
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

              <li
                className={`listItem4 ${clicked === "admin" && "clicked"}`}
                onClick={(e) => {
                  setClicked("admin");
                  dropDownFunctionality("admin");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faGem} />
                </i>
                <p>Admin</p>
                <i
                  className={`arrow ${dropDown === "admin" && "clickedArrow"}`}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${dropDown === "admin" && "openDropDown"}`}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p>Company Invite</p>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p>Manage Roles</p>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p>Manage Projects</p>
                </span>
              </div>

              <li
                className={`listItem4 ${clicked === "manager" && "clicked"}`}
                onClick={(e) => {
                  setClicked("manager");
                  dropDownFunctionality("manager");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faGem} />
                </i>
                <p>Project Manager</p>
                <i
                  className={`arrow ${
                    dropDown === "manager" && "clickedArrow"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${
                  dropDown === "manager" && "openDropDown"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <p>Manage Projects</p>
                </span>
              </div>
            </ul>
          </div>
        ) : (
          <div className="skins">
            <h4>Choose skin</h4>

            {skins.map((skin, i) => {
              const { name, hex } = skin;

              return (
                <span key={i} onClick={() => setSkin(name)}>
                  <i className="dot">
                    {skinChoice === name && (
                      <i className="check">
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                    )}

                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        fill: hex,
                      }}
                    />
                  </i>

                  <p>{name}</p>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

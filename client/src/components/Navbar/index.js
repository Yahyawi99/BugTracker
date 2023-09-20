import React from "react";
import { useMainContext } from "../../context";
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
import "../../styles/components/navbar.css";

const NavBar = () => {
  const { skin: skinChoice, setSkin } = useMainContext();

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
        <div className={`head ${true ? "menuOnHead" : "menuOffHead"}`}>
          <h3
          //   onClick={() => menuSettings("menu")}
          >
            Project
          </h3>

          <i
          //   onClick={() => menuSettings("skin")}
          >
            <FontAwesomeIcon icon={faGear} />
          </i>

          <div className="filler"></div>
        </div>

        {true ? (
          <div className="menu">
            <ul className="list">
              <li
                className={`listItem1 ${true === "dashboard" && "clicked"}`}
                // onClick={() => setClicked("dashboard")}
              >
                <i>
                  <FontAwesomeIcon icon={faGauge} />
                </i>
                <p>Dashboard</p>
              </li>

              <li
                className={`listItem2 ${true === "notification" && "clicked"}`}
                // onClick={() => setClicked("notification")}
              >
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
                <p>Notification Inbox</p>
              </li>

              <li
                className={`listItem3 ${true === "projects" && "clicked"}`}
                // onClick={(e) => {
                //   setClicked("projects");
                //   showHideDropDown(e, "projects");
                // }}
              >
                <i>
                  <FontAwesomeIcon icon={faDiagramProject} />
                </i>

                <p>Projects</p>

                <i className={`arrow ${true === "projects" && "clickedArrow"}`}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${true === "projects" && "openDropDown"}`}
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
                className={`listItem4 ${true === "tickets" && "clicked"}`}
                // onClick={(e) => {
                //   setClicked("tickets");
                //   showHideDropDown(e, "tickets");
                // }}
              >
                <i>
                  <FontAwesomeIcon icon={faTicket} />
                </i>
                <p>Tickets</p>
                <i className={`arrow ${true === "tickets" && "clickedArrow"}`}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${true === "tickets" && "openDropDown"}`}
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

              <li
                className={`listItem4 ${true === "admin" && "clicked"}`}
                // onClick={(e) => {
                //   setClicked("admin");
                //   showHideDropDown(e, "admin");
                // }}
              >
                <i>
                  <FontAwesomeIcon icon={faGem} />
                </i>
                <p>Admin</p>
                <i className={`arrow ${true === "admin" && "clickedArrow"}`}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div className={`options ${true === "admin" && "openDropDown"}`}>
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
                className={`listItem4 ${true === "manager" && "clicked"}`}
                // onClick={(e) => {
                //   setClicked("manager");
                //   showHideDropDown(e, "manager");
                // }}
              >
                <i>
                  <FontAwesomeIcon icon={faGem} />
                </i>
                <p>Project Manager</p>
                <i className={`arrow ${true === "manager" && "clickedArrow"}`}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </li>

              <div
                className={`options ${true === "manager" && "openDropDown"}`}
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

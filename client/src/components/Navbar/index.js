import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// hooks
import useUsers from "../../hooks/useUsers";
// context
import { useMainContext } from "../../context/global";
import { useAuth } from "../../context/auth/Auth-context";
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
  faBriefcase,
  faAngleDown,
  faUser,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faGem } from "@fortawesome/free-regular-svg-icons";
// data
import skins from "../../data/colors.json";
// css
import "../../styles/components/navbar/index.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user")).role;

const NavBar = () => {
  const { skin: skinChoice, setSkin, isHamOpen } = useMainContext();

  const { logout } = useAuth();

  const { nav, setNav, clicked, setClicked, dropDown, dropDownFunctionality } =
    useNavbar();

  const { getCurrentUser, currentUser } = useUsers();

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Drop down
  const toggleDropDown = (icon) => {
    icon.parentElement.parentElement.nextSibling.classList.toggle(
      "showMiniDropDown"
    );
  };

  return (
    <nav className={`${isHamOpen && "showNavbarContainer"} navbarContainer`}>
      {currentUser && (
        <div className="info">
          <img src={currentUser.avatar} alt="avatar" />

          <div>
            <p>Welcome,</p>

            <p className="name">
              <span>{currentUser.name}</span>
              <i
                onClick={(e) => toggleDropDown(e.currentTarget)}
                className="arrow-down"
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </i>
            </p>

            <p className="role">{currentUser.role}</p>
          </div>

          <DropDownToggle currentUser={currentUser} logout={logout} />
        </div>
      )}

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
              <Link to="/">
                <li
                  className={`listItem1 ${
                    clicked === "dashboard" && "clicked"
                  }`}
                  onClick={() => setClicked("dashboard")}
                >
                  <i>
                    <FontAwesomeIcon icon={faGauge} />
                  </i>
                  <p>Dashboard</p>
                </li>
              </Link>

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
                onClick={() => {
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
                onClick={() => {
                  setClicked("projects");
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/projects/all-projects">
                    <p>All Projects</p>
                  </Link>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/projects/my-projects">
                    <p>My Projects</p>
                  </Link>
                </span>

                {USER_ROLE === "admin" && (
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <Link to="/projects/create-project">
                      <p> Add Projects</p>
                    </Link>
                  </span>
                )}

                {USER_ROLE === "admin" && (
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <Link to="/projects/manage-projects">
                      <p> Manage Projects</p>
                    </Link>
                  </span>
                )}

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/projects/archived-projects">
                    <p> Archived Projects</p>
                  </Link>
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
                onClick={() => {
                  setClicked("tickets");
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />

                  <Link to="/tickets/all-tickets">
                    <p>All Tickets</p>
                  </Link>
                </span>

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/tickets/user-tickets">
                    <p> My Tickets</p>
                  </Link>
                </span>

                {(USER_ROLE === "admin" || USER_ROLE === "PM") && (
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <Link to="/tickets/create-ticket">
                      <p> Add Ticket</p>
                    </Link>
                  </span>
                )}

                {(USER_ROLE === "admin" || USER_ROLE === "PM") && (
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <Link to="/tickets/unassigned-tickets">
                      <p> Unassigned Tickets</p>
                    </Link>
                  </span>
                )}

                <span>
                  <FontAwesomeIcon icon={faStarOfLife} />
                  <Link to="/tickets/archived-tickets">
                    <p> Ticket Archive</p>
                  </Link>
                </span>
              </div>

              {USER_ROLE === "admin" && (
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
                    className={`arrow ${
                      dropDown === "admin" && "clickedArrow"
                    }`}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </i>
                </li>
              )}

              {USER_ROLE === "admin" && (
                <div
                  className={`options ${
                    dropDown === "admin" && "openDropDown"
                  }`}
                >
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />

                    <Link to="/admin/manage-roles">
                      <p>Manage Roles</p>
                    </Link>
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <Link to="/projects/manage-projects">
                      <p>Manage Projects</p>
                    </Link>
                  </span>
                </div>
              )}

              {USER_ROLE === "PM" && (
                <li
                  className={`listItem4 ${clicked === "manager" && "clicked"}`}
                  onClick={(e) => {
                    setClicked("manager");
                    dropDownFunctionality("manager");
                  }}
                >
                  <i>
                    <FontAwesomeIcon icon={faBriefcase} />
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
              )}

              {USER_ROLE === "PM" && (
                <div
                  className={`options ${
                    dropDown === "manager" && "openDropDown"
                  }`}
                >
                  <span>
                    <FontAwesomeIcon icon={faStarOfLife} />

                    <Link to="/projects/manage-projects">
                      <p>Manage Projects</p>
                    </Link>
                  </span>
                </div>
              )}
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

// **************************
const DropDownToggle = ({ currentUser, logout }) => {
  const miniDropDownRef = useRef(null);

  const closeMiniDropDown = () => {
    miniDropDownRef.current.classList.remove("showMiniDropDown");
  };

  return (
    <ul className="dropDown" ref={miniDropDownRef}>
      <li onClick={closeMiniDropDown}>
        <FontAwesomeIcon icon={faUser} />
        <Link
          to={`/profile/member-profile/${currentUser._id}`}
          reloadDocument={true}
        >
          My Profile
        </Link>
      </li>

      <li onClick={closeMiniDropDown}>
        <FontAwesomeIcon icon={faGear} />
        <Link to={`/profile/manage-profile`}>Settings</Link>
      </li>

      <li
        onClick={() => {
          logout();
          closeMiniDropDown();
        }}
      >
        <FontAwesomeIcon icon={faPowerOff} />
        Logout
      </li>
    </ul>
  );
};

export default NavBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
// context
import { useAuth } from "../../context/auth/Auth-context";
import { useMainContext } from "../../context/global";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faSliders,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// components
import Settings from "../shared/Settings";
// css
import "../../styles/components/header/index.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user")).role;

const Header = () => {
  const { logout } = useAuth();
  const { isHamOpen, setIsHamOpen } = useMainContext();

  const [isSettingsOn, setIsSettingsOn] = useState(false);

  return (
    <header className="header">
      <div className="hamburgerContainer">
        <Hamburger toggled={isHamOpen} toggle={setIsHamOpen} />
      </div>

      <img src="/assets/icons/logo.svg" alt="bugtracker" className="logo" />

      <div>
        {(USER_ROLE === "admin" || USER_ROLE === "PM") && (
          <Link to="tickets/create-ticket">
            <button className="newTicketBtn">New Ticket</button>
          </Link>
        )}

        <i>
          <FontAwesomeIcon icon={faBell} />
        </i>

        <i
          className="settingsIcon"
          onClick={() => setIsSettingsOn(!isSettingsOn)}
        >
          <FontAwesomeIcon icon={faSliders} />

          <Settings
            setIsSettingsOn={setIsSettingsOn}
            className={`${isSettingsOn && "showSettings"}`}
          />
        </i>

        <i onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </i>
      </div>
    </header>
  );
};

export default Header;

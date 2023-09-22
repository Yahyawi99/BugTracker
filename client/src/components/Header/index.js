import React from "react";
// context
import { useAuth } from "../../context/auth/Auth-context";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faSliders,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/header/index.css";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <img src="/assets/icons/logo.svg" alt="bugtracker" className="logo" />

      <div>
        <button className="newTicketBtn">New Ticket</button>

        <i>
          <FontAwesomeIcon icon={faBell} />
        </i>

        <i>
          <FontAwesomeIcon icon={faSliders} />
        </i>

        <i onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </i>
      </div>
    </header>
  );
};

export default Header;

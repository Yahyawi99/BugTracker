import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faSliders,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/header/index.css";

const Header = () => {
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

        <i>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </i>
      </div>
    </header>
  );
};

export default Header;

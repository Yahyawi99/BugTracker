import React from "react";
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
// css
import "../../styles/components/header/index.css";

const Header = () => {
  const { logout } = useAuth();
  const { isHamOpen, setIsHamOpen } = useMainContext();

  return (
    <header className="header">
      <div className="hamburgerContainer">
        <Hamburger toggled={isHamOpen} toggle={setIsHamOpen} />
      </div>

      <img src="/assets/icons/logo.svg" alt="bugtracker" className="logo" />

      <div>
        <Link to="tickets/create-ticket">
          <button className="newTicketBtn">New Ticket</button>
        </Link>

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

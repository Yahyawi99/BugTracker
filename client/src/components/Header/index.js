import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// hooks
import useMessages from "../../hooks/useMessages";
// context
import { useAuth } from "../../context/auth/Auth-context";
import { useMainContext } from "../../context/global";
// Icons
import Hamburger from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faSliders,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// components
import Settings from "../shared/Settings";
import BellDropDown from "../shared/BellDropDown";
// css
import "../../styles/components/header/index.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;
const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

const Header = () => {
  const { logout } = useAuth();
  const { isHamOpen, setIsHamOpen } = useMainContext();
  const { getAllMessages, allMessages } = useMessages();

  const [isSettingsOn, setIsSettingsOn] = useState(false);
  const [isBellOn, setIsBellOn] = useState(false);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    getAllMessages(USER_ID);
<<<<<<< HEAD
=======
    // eslint-disable-next-line
>>>>>>> master
  }, []);

  // New messages
  useEffect(() => {
    if (allMessages.messages) {
      const myNewMessages = allMessages.messages.filter((message) => {
        const creationTime =
          new Date().getTime() - new Date(message.createdAt).getTime();

        const day = 24 * 3600 * 1000;

        return day - creationTime >= 0;
      });

      setNewMessages(myNewMessages.length);
    }
  }, [allMessages]);

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

        <i
          className="bell"
          onClick={() => {
            setIsBellOn(!isBellOn);
            setIsSettingsOn(false);
          }}
        >
          <FontAwesomeIcon icon={faBell} />

          <span className={`${newMessages && "showDot"}`}></span>

          <BellDropDown
            newMessages={newMessages}
            messages={allMessages}
            className={`${isBellOn && "showBellNotification"}`}
          />
        </i>

        <i
          className="settingsIcon"
          onClick={() => {
            setIsSettingsOn(!isSettingsOn);
            setIsBellOn(false);
          }}
        >
          <FontAwesomeIcon icon={faSliders} />

          <Settings
            setIsSettingsOn={setIsSettingsOn}
            className={`${isSettingsOn && "showSettings"}`}
          />
        </i>

        <i className="logout" onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </i>
      </div>
    </header>
  );
};

export default Header;

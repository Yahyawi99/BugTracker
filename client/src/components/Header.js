import React from "react";
// css
import "../styles/components/header.css";

const Header = () => {
  return (
    <header>
      <img src="/assets/icons/logo.svg" alt="bugtracker" className="logo" />

      <div>
        <button className="newTicketBtn">New Ticket</button>
      </div>
    </header>
  );
};

export default Header;

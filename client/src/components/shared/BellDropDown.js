import React from "react";
import { Link } from "react-router-dom";

const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

const BellDropDown = ({ newMessages, className }) => {
  return (
    <div className={`notificationDropDown ${className}`}>
      <p>You have {newMessages} new notification</p>

      <button>
        {" "}
        <Link to={`notification/my-inbox/${USER_ID}`}>
          see all notification
        </Link>
      </button>
    </div>
  );
};

export default BellDropDown;

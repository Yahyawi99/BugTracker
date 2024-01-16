import React from "react";

const BellDropDown = ({ newMessages }) => {
  return (
    <div className="notificationDropDown">
      <p>You have {newMessages} new notification</p>

      <div className="newNotifications"></div>

      <button>see all notification</button>
    </div>
  );
};

export default BellDropDown;

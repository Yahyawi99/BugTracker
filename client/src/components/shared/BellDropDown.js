import React from "react";

const BellDropDown = ({ newMessages, messages }) => {
  const myNewMessages = messages?.filter((message) => {
    const creationTime =
      new Date().getTime() - new Date(message.createdAt).getTime();

    const day = 24 * 3600 * 1000;

    return day - creationTime >= 0;
  });

  return (
    <div className="notificationDropDown">
      <p>You have {newMessages} new notification</p>

      <div className="newNotifications">
        {myNewMessages?.map((message) => {
          const { _id, subject } = message;

          return (
            <div key={_id} className="message">
              <p>{subject}</p>
            </div>
          );
        })}
      </div>

      <button>see all notification</button>
    </div>
  );
};

export default BellDropDown;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
// hooks
import useMessages from "../../hooks/useMessages";
// utils
import formatDate from "../../utils/formatDate";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import Form from "./Form";
// css
import "../../styles/containers/notification/inbox.css";

const USER_ROLE = JSON.parse(localStorage.getItem("user"))?.role;

const Inbox = () => {
  const [isFormShown, setIsFormShown] = useState(false);
  const [message, setMessage] = useState(null);
  const [newMessages, setNewMessages] = useState(0);

  const { memberId } = useParams();
  const { getAllMessages, allMessages, editMessage } = useMessages();

  useEffect(() => {
    getAllMessages(memberId, 1, 3);
  }, []);

  // New messages
  useEffect(() => {
    const myNewMessages = allMessages?.filter((message) => {
      const creationTime =
        new Date().getTime() - new Date(message.createdAt).getTime();

      const day = 24 * 3600 * 1000;

      return day - creationTime >= 0;
    });

    setNewMessages(myNewMessages.length);
  }, [allMessages]);

  console.log(allMessages);

  return (
    <section className="inboxContainer">
      <HomeBtn name="Notifications" />

      <div>
        <div className="menu">
          {USER_ROLE === "admin" && (
            <button type="button" onClick={() => setIsFormShown(true)}>
              Compose
            </button>
          )}

          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>New</p>
            <p>{newMessages}</p>
          </div>
        </div>

        <div className="mail">
          <div>
            <div className="title">
              <h2>Inbox</h2>
              <button className="menuBtn">Menu</button>
            </div>

            <form className="search">
              <input type="text" placeholder="Search Mail" />

              <button type="button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>

          <div className="main">
            <div className="navigation">
              <div>
                <p>Refresh</p>
                <p>Archive</p>
              </div>

              <div>
                <span className="numOfPages">
                  page : <p>1</p>
                </span>

                <div className="arrows">
                  <button type="button" className="arrow-left">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>

                  <button type="button" className="arrow-right">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>

            <div className="messagesContainer">
              {allMessages &&
                allMessages.map((message) => {
                  return (
                    <MessageHead
                      key={message._id}
                      data={message}
                      message={message}
                      setMessage={setMessage}
                      editMessage={editMessage}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <MessageContent message={message} />

      {isFormShown && <Form setIsFormShown={setIsFormShown} />}
    </section>
  );
};

// ==========================
const MessageHead = ({
  data,
  message: messageContent,
  setMessage,
  editMessage,
}) => {
  const {
    _id,
    subject,
    sender: { name },
    createdAt,
    message,
    isRead,
  } = data;

  const [isMessageRead, setIsMessageRead] = useState(isRead);

  const readMessage = () => {
    setMessage(messageContent);
    if (!isMessageRead) {
      editMessage(_id);
      setIsMessageRead(true);
    }
  };

  return (
    <div
      className={`singleMessage ${!isMessageRead && "unreadMessage"}`}
      onClick={readMessage}
    >
      <p className="sender">{name}</p>

      <p className="subject">{subject + " - " + message}</p>

      <p className="createdAt">
        {formatDate(createdAt, { day: "2-digit", month: "short" })}
      </p>
    </div>
  );
};

const MessageContent = ({ message: messageContent }) => {
  if (messageContent) {
    const {
      subject,
      sender: { _id: senderId, name, email, avatar },
      recipient: { _id: recipientId },
      message,
    } = messageContent;

    return (
      <div className="messageContent">
        <h3 className="subject">{subject}</h3>

        <div className="senderInfo">
          <img src={avatar} alt="sender" />

          <div>
            <div>
              <p className="name">{name}</p>
              <Link to={`/profile/member-profile/${senderId}`}>
                <p className="email">&lt;{email}&gt;</p>
              </Link>
            </div>

            <p className="recipient">
              to <Link to={`/profile/member-profile/${recipientId}`}>me</Link>
            </p>
          </div>
        </div>

        <p>{message}</p>
      </div>
    );
  }
};

export default Inbox;

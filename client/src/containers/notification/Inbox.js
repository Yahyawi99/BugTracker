import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const Inbox = () => {
  const [isFormShown, setIsFormShown] = useState(false);

  const { memberId } = useParams();
  const { getAllMessages, allMessages } = useMessages();

  useEffect(() => {
    getAllMessages(memberId);
  }, []);

  return (
    <section className="inboxContainer">
      <HomeBtn name="Notifications" />

      <div>
        <div className="menu">
          <button type="button" onClick={() => setIsFormShown(true)}>
            Compose
          </button>

          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>New</p>
            <p>0</p>
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
                  return <Message key={message._id} data={message} />;
                })}
            </div>
          </div>
        </div>
      </div>

      {isFormShown && <Form setIsFormShown={setIsFormShown} />}
    </section>
  );
};

// ==========================
const Message = ({ data }) => {
  const {
    subject,
    sender: { name },
    createdAt,
  } = data;

  return (
    <>
      <div className="singleMessage">
        <p className="sender">{name}</p>

        <p className="subject">{subject}</p>

        <p className="createdAt">
          {formatDate(createdAt, { day: "2-digit", month: "short" })}
        </p>
      </div>

      <div className="singleMessage">
        <p className="sender">{name}</p>

        <p className="subject">{subject}</p>

        <p className="createdAt">
          {formatDate(createdAt, { day: "2-digit", month: "short" })}
        </p>
      </div>

      <div className="singleMessage">
        <p className="sender">{name}</p>

        <p className="subject">{subject}</p>

        <p className="createdAt">
          {formatDate(createdAt, { day: "2-digit", month: "short" })}
        </p>
      </div>

      <div className="singleMessage">
        <p className="sender">{name}</p>

        <p className="subject">{subject}</p>

        <p className="createdAt">
          {formatDate(createdAt, { day: "2-digit", month: "short" })}
        </p>
      </div>
    </>
  );
};

export default Inbox;

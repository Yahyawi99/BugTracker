import React, { useState } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
// components
import HomeBtn from "../../components/shared/HomeBtn";
import Form from "./Form";
// css
import "../../styles/containers/notification/inbox.css";

const Inbox = () => {
  const [isFormShown, setIsFormShown] = useState(false);

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
          </div>
        </div>
      </div>

      {isFormShown && <Form setIsFormShown={setIsFormShown} />}
    </section>
  );
};

export default Inbox;

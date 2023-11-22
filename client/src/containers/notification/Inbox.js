import React from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/notification/inbox.css";

const Inbox = () => {
  return (
    <section className="inboxContainer">
      <HomeBtn name="Notifications" />

      <div>
        <div className="menu">
          <button>Compose</button>

          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>New</p>
            <p>0</p>
          </div>
        </div>

        <div className="mail">
          <div>
            <h2>Inbox</h2>
            <button>Menu</button>
          </div>

          <form className="search">
            <input type="text" placeholder="Search Mail" />

            <button type="button">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Inbox;

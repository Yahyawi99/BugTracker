import React from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/containers/notification/form.css";

const Form = () => {
  return (
    <section className="messageBox">
      <div className="boxHeader">
        <h1>New Message</h1>

        <FontAwesomeIcon icon={faXmark} />
      </div>

      <form>
        <input type="text" placeholder="Recipients" />

        <input type="text" placeholder="Subject" />

        <textarea cols="30" rows="5"></textarea>
      </form>
    </section>
  );
};

export default Form;

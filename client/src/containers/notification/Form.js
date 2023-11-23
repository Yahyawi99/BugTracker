import React from "react";
import { motion } from "framer-motion";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/containers/notification/form.css";

const Form = ({ setIsFormShown }) => {
  return (
    <motion.section
      initial={{ bottom: -500 }}
      animate={{ bottom: 5 }}
      transition={{ duration: 0.25 }}
      className="messageBox"
    >
      <div className="boxHeader">
        <h1>New Message</h1>

        <FontAwesomeIcon icon={faXmark} onClick={() => setIsFormShown(false)} />
      </div>

      <form>
        <input type="text" placeholder="Recipients" />

        <input type="text" placeholder="Subject" />

        <textarea rows="12" placeholder="Your message..."></textarea>

        <button type="submit">Send</button>
      </form>
    </motion.section>
  );
};

export default Form;

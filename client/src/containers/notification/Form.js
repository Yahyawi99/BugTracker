import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMainContext } from "../../context/global";
// hooks
import useUsers from "../../hooks/useUsers";
import useMessages from "../../hooks/useMessages";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/containers/notification/form.css";

const USER_ID = JSON.parse(localStorage.getItem("user"))?.userId;

const Form = ({ setIsFormShown }) => {
  const [data, setData] = useState({ recipient: "", subject: "", message: "" });

  const { getAllUsers, allUsers } = useUsers();
  const { createMessage } = useMessages();

  const { alertMe } = useMainContext();

  const formHandler = async (e) => {
    e.preventDefault();

    const { recipient, subject, message } = data;

    if (!recipient || !subject || !message) {
      await alertMe("All fields are required!", "var(--danger)");
    }

    const messageData = new FormData();
    messageData.append("data", JSON.stringify(data));

    createMessage(messageData, setData, setIsFormShown);
  };

  useEffect(() => {
    getAllUsers(1, "", Infinity);
    // eslint-disable-next-line
  }, []);

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

      <form onSubmit={(e) => formHandler(e)}>
        <Dropdown data={data} setData={setData} allUsers={allUsers} />

        <input
          type="text"
          placeholder="Subject"
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.currentTarget.value })}
        />

        <textarea
          rows="12"
          placeholder="Your message..."
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.currentTarget.value })}
        ></textarea>

        <button type="submit">Send</button>
      </form>
    </motion.section>
  );
};

// ==========================
const Dropdown = ({ data, setData, allUsers }) => {
  const [isShown, setIsShown] = useState(false);
  const { users } = allUsers;

  return (
    <div className="recipients">
      <div className="currentValue" onClick={() => setIsShown(!isShown)}>
        <input
          type="text"
          placeholder="Recipient"
          value={data.recipient}
          readOnly
        />

        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div className={`options ${isShown && "showOptions"}`}>
        {users &&
          users.map((member) => {
            const { _id, email } = member;

            return (
              USER_ID !== _id && (
                <p
                  key={_id}
                  onClick={() => {
                    setData({ ...data, recipient: email });
                    setIsShown(false);
                  }}
                >
                  {email}
                </p>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Form;

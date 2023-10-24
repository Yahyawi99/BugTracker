import React from "react";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/shared/settings.css";

const Settings = () => {
  const settingsOptions = [
    {
      name: "Profile",
      icon: faPenToSquare,
    },
    {
      name: "Email",
      icon: faEnvelope,
    },
    {
      name: "Password",
      icon: faLock,
    },
  ];

  return (
    <section className="settingsModal">
      <h4>ACCOUNT SETTINGS</h4>

      <ul>
        {settingsOptions.map((option, i) => {
          const { name, icon } = option;

          return (
            <li key={i}>
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Settings;

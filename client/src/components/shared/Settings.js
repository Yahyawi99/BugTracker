import React from "react";
import { useMainContext } from "../../context/global";
import { Link } from "react-router-dom";
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
  const { settingsNavigateTo, setSettingsNavigateTo } = useMainContext();

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
            <Link to="/profile/manage-profile">
              <li key={i} onClick={() => setSettingsNavigateTo(name)}>
                <FontAwesomeIcon icon={icon} />
                <span>{name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Settings;

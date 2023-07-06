import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
// css
import "../styles/components/homeBtn.css";

const HomeBtn = ({ name }) => {
  return (
    <div className="home-btn">
      <i>
        <FontAwesomeIcon icon={faHouse} />
      </i>
      <span>/</span>
      <p>{name}</p>
    </div>
  );
};

export default HomeBtn;

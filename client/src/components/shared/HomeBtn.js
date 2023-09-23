import React from "react";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/shared/homeBtn.css";

const HomeBtn = ({ name }) => {
  return (
    <div className="home-btn">
      <Link to="/dashboard">
        <FontAwesomeIcon icon={faHouse} />
      </Link>

      <span>/</span>
      <p>{name}</p>
    </div>
  );
};

export default HomeBtn;

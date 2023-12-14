import React from "react";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/shared/checkbox.css";

const Checkbox = ({ isChecked }) => {
  return (
    <span className={`${isChecked && "checkboxChecked"} checkbox`}>
      <FontAwesomeIcon icon={faCheck} />
    </span>
  );
};

export default Checkbox;

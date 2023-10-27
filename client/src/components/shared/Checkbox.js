import React from "react";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// css
import "../../styles/components/shared/checkbox.css";

const Checkbox = ({ isChecked }) => {
  return (
    <div className={`${isChecked && "checkboxChecked"} checkbox`}>
      <FontAwesomeIcon icon={faCheck} />
    </div>
  );
};

export default Checkbox;

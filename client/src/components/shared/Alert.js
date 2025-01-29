import React from "react";
import { useMainContext } from "../../context/global";
// css
import "../../styles/components/shared/alert.css";

const Alert = () => {
  const { alert, skin } = useMainContext();

  return (
    <div className={`alertContainer ${alert.isOn && "alertOn"}`}>
      <div
        style={{
          background: skin,
        }}
      ></div>
      <img src="/assets/icons/bug.svg" alt="bug" />
    </div>
  );
};

export default Alert;

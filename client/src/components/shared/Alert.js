import React from "react";
import { useMainContext } from "../../context/global";
// css
import "../../styles/components/shared/alert.css";

const Alert = () => {
  const { alert } = useMainContext();

  return (
    <section className={`alertContainer ${alert.isOn && "alertOn"}`}>
      <p style={{ background: alert.backClr }}>{alert.message}</p>
    </section>
  );
};

export default Alert;

import React from "react";
import { useMainContext } from "../../context/global";
// css
import "../../styles/components/shared/alert.css";

const Alert = () => {
  const { alert, setAlert } = useMainContext();

  return (
    <section className={`alertContainer ${alert && "alertOn"}`}>
      <p>my message</p>
    </section>
  );
};

export default Alert;

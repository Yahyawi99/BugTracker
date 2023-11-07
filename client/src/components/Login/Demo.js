import React from "react";
import { Link } from "react-router-dom";
// css
import "../../styles/pages/Login/demo.css";

const DemoAccounts = () => {
  return (
    <section className="demoAccountsContainer">
      <h2>Demo accounts</h2>

      <div>
        <button>admin</button>
        <button>developer</button>
        <button>project manager</button>
        <button>submitter</button>
      </div>

      <Link className="loginRegister" to="/login-register/login-register-form">
        <p>Back to login</p>
      </Link>
    </section>
  );
};

export default DemoAccounts;

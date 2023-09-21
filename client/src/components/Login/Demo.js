import React from "react";
import { Link } from "react-router-dom";
// css
import "../../styles/pages/Login/demo.css";

const DemoAccounts = () => {
  return (
    <section className="demoAccountsContainer">
      <div>
        <button>admin</button>
        <button>developer</button>
        <button>project manager</button>
        <button>user</button>
        <button>submitter</button>
      </div>

      <Link to="/login/login-form">login/register</Link>
    </section>
  );
};

export default DemoAccounts;

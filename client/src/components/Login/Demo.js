import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/Auth-context";
// css
import "../../styles/pages/Login/demo.css";

const DemoAccounts = () => {
  const { submitHandler, setMode, setEmail, setPassword } = useAuth();

  useEffect(() => {
    setPassword("1234567890");
  }, []);

  return (
    <section className="demoAccountsContainer">
      <h2>Demo accounts</h2>

      <form
        onSubmit={(e) => {
          setMode("login");
          submitHandler(e);
        }}
      >
        <button type="submit" onClick={() => setEmail("demoadmin@gmail.com")}>
          admin
        </button>
        <button type="submit" onClick={() => setEmail("demodev@gmail.com")}>
          developer
        </button>
        <button type="submit" onClick={() => setEmail("demopm@gmail.com")}>
          project manager
        </button>
        <button
          type="submit"
          onClick={() => setEmail("demosubmitter@gmail.com")}
        >
          submitter
        </button>
      </form>

      <Link className="loginRegister" to="/login-register/login-register-form">
        <p onClick={() => setPassword("")}>Back to login</p>
      </Link>
    </section>
  );
};

export default DemoAccounts;

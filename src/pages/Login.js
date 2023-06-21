import React from "react";
// components
import LoginForm from "../components/LoginForm";
// css
import "../styles/pages/Login.css";

const Login = () => {
  return (
    <section className="loginConatiner">
      <div>
        <div>
          <img src="/assets/icons/bug.png" alt="bug" className="bugImg" />

          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;

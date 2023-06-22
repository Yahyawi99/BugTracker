import React from "react";
import LoginProvider from "../context/Login";
// components
import LoginForm from "../components/LoginForm";
// css
import "../styles/pages/Login.css";

const Login = () => {
  return (
    <LoginProvider>
      <section className="loginConatiner">
        <div>
          <div>
            <img src="/assets/icons/bug.svg" alt="bug" className="bugImg" />

            <LoginForm />
          </div>
        </div>
      </section>
    </LoginProvider>
  );
};

export default Login;

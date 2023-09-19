import React from "react";
import { useLogin } from "../context/Login";
// components
import LoginForm from "../components/LoginForm";
// css
import "../styles/pages/Login.css";

const Login = () => {
  const { authenticated, authenticationCheck } = useLogin();

  authenticationCheck();

  if (authenticated) {
    return (
      <section className="loginConatiner">
        <div>
          <div>
            <img src="/assets/icons/bug.svg" alt="bug" className="bugImg" />

            <LoginForm />
          </div>
        </div>
      </section>
    );
  }
};

export default Login;

import React from "react";
// components
import LoginForm from "../../components/Login/LoginForm";
// css
import "../../styles/pages/Login/Login.css";

const Login = () => {
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
};

export default Login;

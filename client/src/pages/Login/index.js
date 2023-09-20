import React from "react";
import AuthProvider from "../../context/Auth-context";
// components
import LoginForm from "../../components/Login/LoginForm";
// css
import "../../styles/pages/Login/index.css";

const Login = () => {
  return (
    <section className="loginConatiner">
      <div>
        <div>
          <img src="/assets/icons/bug.svg" alt="bug" className="bugImg" />

          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </div>
      </div>
    </section>
  );
};

export default Login;

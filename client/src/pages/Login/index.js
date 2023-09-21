import React from "react";
import { Routes, Route } from "react-router-dom";
// contexts
import AuthProvider from "../../context/Auth-context";
// components
import LoginForm from "../../components/Login/LoginForm";
import DemoAccounts from "../../components/Login/Demo";
// css
import "../../styles/pages/Login/index.css";

const Login = () => {
  return (
    <section className="loginConatiner">
      <div>
        <div>
          <img src="/assets/icons/bug.svg" alt="bug" className="bugImg" />

          <AuthProvider>
            <Routes>
              <Route path="/login-register-form" Component={LoginForm} />
              <Route path="/demo-accounts" Component={DemoAccounts} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </section>
  );
};

export default Login;

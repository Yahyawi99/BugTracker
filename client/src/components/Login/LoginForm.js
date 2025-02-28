import React from "react";
import { Link } from "react-router-dom";
// contexts
import { useAuth } from "../../context/auth/Auth-context";
// css
import "../../styles/pages/Login/LoginForm.css";

const LoginForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    mode,
    submitHandler,
  } = useAuth();

  return (
    <div className="loginFormContainer">
      <div>
        {mode === "login" ? (
          <h2>Login to your account</h2>
        ) : (
          <h2>Create new account</h2>
        )}

        <form onSubmit={(e) => submitHandler(e)}>
          {mode === "register" && (
            <div>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <button type="sumbit" className="loginRegisterBtn">
            {mode}
          </button>
        </form>

        <Link className="demoLinks" to="/login-register/demo-accounts">
          <button type="button" className="demoBtn">
            Demo Accounts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

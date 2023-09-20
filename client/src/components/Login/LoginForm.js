import React from "react";
import { useAuth } from "../../context/Auth-context";
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
    setMode,
    submitHandler,
  } = useAuth();

  return (
    <div className="loginFormContainer">
      <div>
        <h2>Login to your account</h2>

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

          <button className="loginBtn">Login</button>
          <p className="errorMessage">{""}</p>
        </form>

        <button className="demoBtn">Demo Account</button>
      </div>
    </div>
  );
};

export default LoginForm;

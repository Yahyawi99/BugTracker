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
    errMsg,
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

          <button className="loginRegisterBtn">{mode}</button>

          <p className="registerLoginQuestion">
            {mode === "login" ? (
              <>
                You don't have an account?{" "}
                <span onClick={() => setMode("register")}>Register</span>
              </>
            ) : (
              <>
                You already have an account?{" "}
                <span onClick={() => setMode("login")}>Login</span>
              </>
            )}
          </p>

          <p className="errorMessage">{errMsg}</p>
        </form>

        <button className="demoBtn">Demo Account</button>
      </div>
    </div>
  );
};

export default LoginForm;
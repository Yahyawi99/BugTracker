import React from "react";
// css
import "../styles/components/LoginForm.css";

const LoginForm = () => {
  return (
    <div className="loginFormContainer">
      <div>
        <h2>Login to your account</h2>

        <form action="">
          <div>
            <input type="text" placeholder="email" />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </div>

          <button className="loginBtn">Login</button>
        </form>

        <button className="demoBtn">Demo Account</button>
      </div>
    </div>
  );
};

export default LoginForm;

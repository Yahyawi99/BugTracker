import React, { useContext, useState } from "react";
import { useMainContext } from "../global";
import axios from "axios";

const AppContext = React.createContext();
const AuthProvider = ({ children }) => {
  const { alertMe } = useMainContext();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Form handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (mode === "login") {
      login();
    }

    if (mode === "register") {
      register();
    }
  };

  //   Login
  const login = async () => {
    try {
      const response = await axios.post("/api/v1/login", {
        email,
        password,
      });

      await alertMe(response.data.msg, "var(--success)");

      window.location = "/dashboard";
    } catch (error) {
      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  //   Register
  const register = async () => {
    try {
      const response = await axios.post("/api/v1/register", {
        name,
        email,
        password,
      });

      await alertMe(response.data.msg, "var(--success)");
    } catch (error) {
      const msg = error.response.data.msg;
      await alertMe(msg, "var(--danger)");
    }
  };

  // Log out
  const logout = async () => {
    try {
      const response = await axios.delete("/api/v1/logout");

      console.log(response);

      window.location = "/login/login-form";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        submitHandler,
        errMsg,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);

export default AuthProvider;

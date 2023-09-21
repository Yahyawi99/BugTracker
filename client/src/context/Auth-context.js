import React, { useContext, useState } from "react";
import axios from "axios";
// Utils
import wait from "../utils/wait";
import { redirect } from "react-router-dom";

const AppContext = React.createContext();
const AuthProvider = ({ children }) => {
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

      window.location = "/dashboard";
    } catch (error) {
      const msg = error.response.data.msg;

      setErrMsg(msg);
      await wait(3000);
      setErrMsg("");
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
    } catch (error) {
      console.log(error);
    }
  };

  // Log out
  const logout = async () => {
    try {
      const response = await axios.delete("/api/v1/logout");

      console.log(response);

      window.location = "/login";
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

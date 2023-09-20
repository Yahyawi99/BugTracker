import React, { useContext, useState } from "react";
import axios from "axios";
// Utils
import wait from "../utils/wait";

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
    }
  };

  //   Login
  const login = async () => {
    try {
      if (!email || !password) {
        throw new Error("Please provide both values!");
      }

      const response = await axios.post("/api/v1/login", { email, password });
    } catch (error) {
      const {
        response: {
          data: { msg },
        },
      } = error;

      setErrMsg(msg);
      await wait(1000);
      setErrMsg("");
    }
  };

  //   Register
  const register = async () => {};

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
        login,
        errMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);

export default AuthProvider;

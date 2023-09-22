import React, { useContext, useState } from "react";
import { useMainContext } from "../global";
import axios from "axios";

const AppContext = React.createContext();
const AuthProvider = ({ children }) => {
  const { alertMe, loading } = useMainContext();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      loading(true);

      const response = await axios.post("/api/v1/login", {
        email,
        password,
      });

      loading(false);

      await alertMe(response.data.msg, "var(--success)");

      window.location = "/dashboard";
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  //   Register
  const register = async () => {
    try {
      loading(true);

      const response = await axios.post("/api/v1/register", {
        name,
        email,
        password,
      });

      loading(false);

      await alertMe(response.data.msg, "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg, "var(--danger)");
    }
  };

  // Log out
  const logout = async () => {
    try {
      loading(true);

      const response = await axios.delete("/api/v1/logout");

      loading(false);

      await alertMe(response.data.msg, "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
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

import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();
const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const emailValidator = (txt) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(txt);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const inputs = [...e.currentTarget.getElementsByTagName("div")].map(
      (e) => e.children[0]
    );

    if (!email || !password || !emailValidator(email)) {
      inputs.forEach((e) => {
        if (e.value === "") {
          e.style.borderColor = "red";

          setTimeout(() => {
            e.style.borderColor = "rgba(128, 128, 128, .55)";
          }, 2500);
        }
      });

      if (!emailValidator(email)) {
        inputs[1].style.borderColor = "red";

        setTimeout(() => {
          inputs[1].style.borderColor = "rgba(128, 128, 128, .55)";
        }, 2500);
      }

      setErrorMessage("Please check for errors");
      setTimeout(() => {
        setErrorMessage("");
      }, 2500);

      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login");

      localStorage.setItem("token", `Bearer ${response.data.token}`);

      window.location = "/";
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2500);
    }
  };

  // Authentication check
  const authenticationCheck = async () => {
    const storage = localStorage.getItem("token");

    try {
      await axios.get("http://localhost:3001/", {
        headers: {
          Authorization: `${storage}`,
        },
      });

      window.location = "/";

      setAuthenticated(false);
    } catch (error) {
      setAuthenticated(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,

        submitHandler,
        errorMessage,
        setErrorMessage,
        authenticationCheck,
        authenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useLogin = () => useContext(AppContext);

export default LoginProvider;

import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailValidator = (txt) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(txt);
  };

  const submitHandler = (e) => {
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
        inputs[0].style.borderColor = "red";
        setErrorMessage("Please enter a valid email");

        setTimeout(() => {
          inputs[0].style.borderColor = "rgba(128, 128, 128, .55)";
          setErrorMessage("");
        }, 2500);
      }
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default LoginProvider;

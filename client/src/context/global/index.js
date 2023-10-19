import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Utils
import wait from "../../utils/wait";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
  const [skin, setSkin] = useState("blue");
  const [alert, setAlert] = useState({
    isOn: false,
    message: "",
    backClr: "",
  });
  const [isHamOpen, setIsHamOpen] = useState(false);

  // Alert functionality
  const alertMe = async (msgTxt, clr) => {
    setAlert({
      isOn: true,
      message: msgTxt,
      backClr: clr,
    });

    await wait(1500);

    setAlert({
      isOn: false,
      message: msgTxt,
      backClr: clr,
    });
  };

  // Loading
  const loading = async (isLoading) => {
    setAlert({
      isOn: isLoading,
      message: "Loading...",
      backClr: "var(--warning)",
    });
  };

  // close dropdown after navigation
  const path = window.location.pathname;
  useEffect(() => {
    setIsHamOpen(false);
  }, [path]);

  return (
    <AppContext.Provider
      value={{
        skin,
        setSkin,
        alert,
        alertMe,
        loading,
        isHamOpen,
        setIsHamOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useMainContext = () => useContext(AppContext);

export default MainProvider;

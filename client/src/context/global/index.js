import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
  const [skin, setSkin] = useState("blue");
  const [alert, setAlert] = useState({
    isOn: false,
    message: "",
    backClr: "orange",
  });

  return (
    <AppContext.Provider
      value={{
        skin,
        setSkin,
        alert,
        setAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useMainContext = () => useContext(AppContext);

export default MainProvider;

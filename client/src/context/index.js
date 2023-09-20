import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [skin, setSkin] = useState("blue");

  return (
    <AppContext.Provider
      value={{
        skin,
        setSkin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useMainContext = () => useContext(AppContext);

export default MainProvider;

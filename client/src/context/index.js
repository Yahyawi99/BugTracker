import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
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

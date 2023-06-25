import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const NavBarProvider = ({ children }) => {
  const [clicked, setClicked] = useState("dashboard");

  return (
    <AppContext.Provider
      value={{
        clicked,
        setClicked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useNavGlobal = () => useContext(AppContext);

export default NavBarProvider;
